import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getJobFilterOptions, getJobSearchResults } from '../../apis/searchJobs.ts';
import { mapSearchResults } from './mapApiSearchJobs.ts';
import { matchesWorkCondition, readWorkCondition } from '../../utils/workConditionSelection.ts';
import { readResultToolbar, readSearchPage } from './searchResultOptions.ts';
import { mapJobSearchParams } from './searchJobApiParams.ts';
import { readSearchFilters } from './searchFilterTags.ts';

const QA_ENABLED = import.meta.env.DEV || import.meta.env.VITE_ENABLE_COMPONENT_PREVIEW === 'true';
const EMPTY_OPTIONS = { regions: [], categories: [], payConditions: [], workdays: [] };

export function useSearchJobs(query: string) {
  const input = new URLSearchParams(query);
  const serverFilters = readSearchFilters(input);
  serverFilters.delete('period');
  serverFilters.delete('workDays');
  const hasFilters = [...serverFilters.values()].some(Boolean);
  const filterOptions = useQuery({
    queryKey: ['job-search', 'filter-options'],
    queryFn: ({ signal }) => getJobFilterOptions(signal),
    enabled: hasFilters,
    staleTime: 5 * 60_000,
    retry: false,
  });
  const prepared =
    !hasFilters || filterOptions.data
      ? mapJobSearchParams(input, filterOptions.data ?? EMPTY_OPTIONS)
      : undefined;
  const scenario = input.get('qa');
  const qa =
    QA_ENABLED && (scenario === 'search-loading' || scenario === 'search-error') ? scenario : null;
  const request = prepared?.params.toString();
  const { days, period, workDays } = readWorkCondition(input);
  const filterWorkLocally = period !== '전체' || workDays !== '전체';
  const [retriedRequest, setRetriedRequest] = useState<string>();
  const shouldShowQaError = qa === 'search-error' && request !== retriedRequest;

  const results = useQuery({
    queryKey: ['job-search', 'list', request, period, workDays, qa, shouldShowQaError],
    enabled: request !== undefined && prepared?.unsupported.length === 0,
    queryFn: async ({ signal }) => {
      if (qa === 'search-loading') {
        await new Promise<void>((resolve) => window.setTimeout(resolve, 3000));
        signal.throwIfAborted();
      }
      if (shouldShowQaError) throw new Error('QA 공고 목록 조회 오류');
      const params = new URLSearchParams(request);
      if (!filterWorkLocally) return mapSearchResults(await getJobSearchResults(params, signal));

      // Work duration and exact week length are present on rows but lack query parameters.
      // Apply them across all server pages before counting and slicing the visible results.
      const requestedPage = Number(params.get('page'));
      params.set('page', '1');
      params.set('size', '50');
      const first = await getJobSearchResults(params, signal);
      const items = mapSearchResults(first).items;
      for (let page = 2; page <= first.totalPages; page += 1) {
        params.set('page', String(page));
        const next = await getJobSearchResults(params, signal);
        items.push(...mapSearchResults(next).items);
      }
      const matched = items.filter((item) =>
        matchesWorkCondition({ period, days, workDays }, item),
      );
      const { pageSize } = readResultToolbar(input);
      const result = readSearchPage(matched, pageSize, input.get('page'));
      return { ...result, total: matched.length, page: requestedPage };
    },
    staleTime: qa ? 0 : 30_000,
    gcTime: qa ? 0 : undefined,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const unsupported = prepared?.unsupported ?? [];
  return {
    data: results.data,
    isPending:
      unsupported.length === 0 && (!hasFilters || !filterOptions.isError) && results.isPending,
    isError: (hasFilters && filterOptions.isError) || results.isError,
    unsupported,
    refetch: () => {
      if (hasFilters && filterOptions.isError) return void filterOptions.refetch();
      if (shouldShowQaError) return setRetriedRequest(request);
      return void results.refetch();
    },
  };
}
