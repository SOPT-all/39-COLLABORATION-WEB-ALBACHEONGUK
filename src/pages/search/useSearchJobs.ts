import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getJobFilterOptions, getJobSearchResults } from '../../apis/searchJobs.ts';
import { mapSearchResults } from './mapApiSearchJobs.ts';
import { mapJobSearchParams } from './searchJobApiParams.ts';
import { readSearchFilters } from './searchFilterTags.ts';

const QA_ENABLED = import.meta.env.DEV || import.meta.env.VITE_ENABLE_COMPONENT_PREVIEW === 'true';
const EMPTY_OPTIONS = { regions: [], categories: [], payConditions: [], workdays: [] };

export function useSearchJobs(query: string) {
  const input = new URLSearchParams(query);
  const hasFilters = [...readSearchFilters(input).values()].some(Boolean);
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
  const [retriedRequest, setRetriedRequest] = useState<string>();
  const shouldShowQaError = qa === 'search-error' && request !== retriedRequest;

  const results = useQuery({
    queryKey: ['job-search', 'list', request, qa, shouldShowQaError],
    enabled: request !== undefined && prepared?.unsupported.length === 0,
    queryFn: async ({ signal }) => {
      if (qa === 'search-loading') {
        await new Promise<void>((resolve) => window.setTimeout(resolve, 3000));
        signal.throwIfAborted();
      }
      if (shouldShowQaError) throw new Error('QA 공고 목록 조회 오류');
      const data = await getJobSearchResults(new URLSearchParams(request), signal);
      return mapSearchResults(data);
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
