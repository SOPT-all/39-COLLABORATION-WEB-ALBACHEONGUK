import { useEffect, useRef, useState } from 'react';
import type { Ref } from 'react';
import { useSearchParams } from 'react-router';
import FilterTags from '../../components/FilterTags.tsx';
import JobCategoryFilter from '../../components/JobCategoryFilter.tsx';
import MoneyFilter from '../../components/Dropdown/MoneyFilter.tsx';
import RegionFilter from '../../components/RegionFilter.tsx';
import WorkConditionFilter from '../../components/WorkConditionFilter.tsx';
import {
  getSearchFilterTags,
  readSearchFilters,
  removeSearchFilterTag,
  resetSearchFilters,
} from './searchFilterTags.ts';
import PopularSearches from '../../components/PopularSearches.tsx';
import { POPULAR_SEARCHES, POPULAR_SEARCH_UPDATE_DATE } from '../../data/popularSearches.ts';
import SearchResumeMatch from './SearchResumeMatch.tsx';
import SearchResumeGuest from './SearchResumeGuest.tsx';
import SearchResultToolbar from './SearchResultToolbar.tsx';
import { readResultToolbar } from './searchResultOptions.ts';
import SearchJobResults from './SearchJobResults.tsx';
import SearchPagination from './SearchPagination.tsx';
import { useSearchJobs } from './useSearchJobs.ts';
import RecentSearches from '../../components/RecentSearches.tsx';
import SearchBar from '../../components/SearchBar.tsx';
import { useRecentSearchStore } from '../../stores/useRecentSearchStore.ts';
import { useResumeRecommendations } from './useResumeRecommendation.ts';
import { mapRecommendedJobs } from './mapRecommendedJob.ts';
import { useQaResumeScenario } from '../../hooks/useQaResumeScenario.ts';
import { useQuery } from '@tanstack/react-query';
import { getJobFilterOptions } from '../../apis/searchJobs.ts';
import { mapJobSearchParams } from './searchJobApiParams.ts';
import type { WorkPeriod } from '../../types/resumeRecommendation.ts';
import SearchResultsPending from './SearchResultsPending.tsx';
import { getQaResumeRecommendation } from './qaResumeRecommendation.ts';
import { readWorkCondition } from '../../utils/workConditionSelection.ts';

type SearchKeywordInputProps = {
  keyword: string;
  onSearch: (keyword: string) => void;
  inputRef: Ref<HTMLInputElement>;
  hasSelectedFilters: boolean;
};

function SearchKeywordInput({
  keyword,
  onSearch,
  inputRef,
  hasSelectedFilters,
}: SearchKeywordInputProps) {
  const [value, setValue] = useState(keyword);
  const [previousKeyword, setPreviousKeyword] = useState(keyword);
  if (keyword !== previousKeyword) {
    setPreviousKeyword(keyword);
    setValue(keyword);
  }

  function handleSearch(nextKeyword: string) {
    setValue(nextKeyword);
    onSearch(nextKeyword);
  }

  return (
    <SearchBar
      inputRef={inputRef}
      value={value}
      onValueChange={setValue}
      onSearch={handleSearch}
      hasSelectedFilters={hasSelectedFilters}
    />
  );
}

function SearchPage() {
  const [params, setParams] = useSearchParams();
  const keyword = params.get('keyword') ?? '';
  const recommendationKeyword = keyword.trim().slice(0, 30);

  const { isSignedIn, qa } = useQaResumeScenario();
  const memberId = isSignedIn ? '1' : undefined;
  const qaRecommendation = getQaResumeRecommendation(qa);

  const [selectedResumeId, setSelectedResumeId] = useState<number | undefined>(undefined);

  const filterOptionsQuery = useQuery({
    queryKey: ['job-search', 'filter-options'],
    queryFn: ({ signal }) => getJobFilterOptions(signal),
    enabled: isSignedIn && !qaRecommendation,
    staleTime: 5 * 60_000,
  });

  const preparedFilters = filterOptionsQuery.data
    ? mapJobSearchParams(params, filterOptionsQuery.data)
    : undefined;

  const regionIds = preparedFilters?.params.getAll('regionIds').map(Number);
  const categoryCodes = preparedFilters?.params.getAll('categoryCodes');
  const workdays = preparedFilters?.params
    .getAll('workdays')
    .filter(
      (day) =>
        day === 'MON' ||
        day === 'TUE' ||
        day === 'WED' ||
        day === 'THU' ||
        day === 'FRI' ||
        day === 'SAT' ||
        day === 'SUN',
    );

  const WORK_PERIOD_CODES: Record<string, WorkPeriod | undefined> = {
    '1일': 'ONE_DAY',
    '1주일이하': 'UNDER_ONE_WEEK',
    '1주일~1개월': 'ONE_WEEK_TO_ONE_MONTH',
    '1개월~3개월': 'ONE_TO_THREE_MONTHS',
    '3개월~6개월': 'THREE_TO_SIX_MONTHS',
    '6개월~1년': 'SIX_MONTHS_TO_ONE_YEAR',
    '1년이상': 'OVER_ONE_YEAR',
  };

  const DAYS_PER_WEEK: Partial<Record<string, number>> = {
    주1일: 1,
    주2일: 2,
    주3일: 3,
    주4일: 4,
    주5일: 5,
    주6일: 6,
  };

  const workPeriod = WORK_PERIOD_CODES[params.get('period') ?? ''];
  const { workDays } = readWorkCondition(params);
  const daysPerWeek = DAYS_PER_WEEK[workDays];
  const selectedPayType = preparedFilters?.params.get('payType');

  const payType =
    selectedPayType === 'PER_TASK'
      ? 'PER_CASE'
      : selectedPayType === 'HOURLY' ||
          selectedPayType === 'DAILY' ||
          selectedPayType === 'WEEKLY' ||
          selectedPayType === 'MONTHLY' ||
          selectedPayType === 'YEARLY' ||
          selectedPayType === 'PER_CASE'
        ? selectedPayType
        : undefined;

  const recommendationQuery = useResumeRecommendations(
    {
      keyword: recommendationKeyword,
      resumeId: selectedResumeId,
      regionIds,
      categoryCodes,
      workdays,
      daysPerWeek,
      workPeriod,
      payType,
    },
    memberId,
    isSignedIn && !qaRecommendation && filterOptionsQuery.isSuccess,
  );

  const recommendationData = qaRecommendation ?? recommendationQuery.data;
  const recommendedJobs = mapRecommendedJobs(recommendationData?.jobs ?? []);
  const isRecommendationPending = !qaRecommendation && recommendationQuery.isPending;
  const hasRecommendationError =
    !qaRecommendation &&
    (recommendationQuery.isError || (isSignedIn && filterOptionsQuery.isError));
  const appliedFilters = readSearchFilters(params).toString();
  const [draft, setDraft] = useState({ source: appliedFilters, filters: appliedFilters });
  if (draft.source !== appliedFilters) {
    setDraft({ source: appliedFilters, filters: appliedFilters });
  }
  const draftFilters = new URLSearchParams(
    draft.source === appliedFilters ? draft.filters : appliedFilters,
  );
  const tags = getSearchFilterTags(draftFilters);
  const { sort, pageSize } = readResultToolbar(params);
  const lookup = readSearchFilters(params);
  if (keyword) lookup.set('keyword', keyword);
  if (params.get('activeOnly') === 'true') lookup.set('activeOnly', 'true');
  for (const key of ['sort', 'size', 'page', 'qa']) {
    const value = params.get(key);
    if (value) lookup.set(key, value);
  }
  const { data, isPending, isError, unsupported, refetch } = useSearchJobs(lookup.toString());
  const { page = 1, pageCount = 0, items = [], total = 0 } = data ?? {};
  const needsPageCorrection = !isError && pageCount > 0 && page > pageCount;
  useEffect(() => {
    if (!needsPageCorrection) return;
    setParams(
      (current) => {
        const next = new URLSearchParams(current);
        next.set('page', String(pageCount));
        return next;
      },
      { replace: true },
    );
  }, [needsPageCorrection, pageCount, setParams]);
  const activeOnly = params.get('activeOnly') === 'true';
  const showToolbar = isPending || (!isError && total > 0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [searchRevision, setSearchRevision] = useState(0);
  const recentKeywords = useRecentSearchStore((state) => state.keywords);
  const removeKeyword = useRecentSearchStore((state) => state.removeKeyword);
  const clearKeywords = useRecentSearchStore((state) => state.clearKeywords);
  const addKeyword = useRecentSearchStore((state) => state.addKeyword);

  function updateDraftFilters(update: (current: URLSearchParams) => URLSearchParams) {
    setDraft((current) => {
      const currentFilters = current.source === appliedFilters ? current.filters : appliedFilters;
      return {
        source: appliedFilters,
        filters: update(new URLSearchParams(currentFilters)).toString(),
      };
    });
  }

  function handleSearch(nextKeyword: string, filters = readSearchFilters(params)) {
    addKeyword(nextKeyword);
    setSearchRevision((revision) => revision + 1);
    const nextParams = resetSearchFilters(params);
    for (const [key, value] of filters) nextParams.append(key, value);
    if (nextKeyword) {
      nextParams.set('keyword', nextKeyword);
    } else {
      nextParams.delete('keyword');
    }
    if (nextParams.toString() !== params.toString()) setParams(nextParams);
    else if (unsupported.length === 0) refetch();
  }

  function goToPage(nextPage: number) {
    setParams((current) => {
      const next = new URLSearchParams(current);
      if (nextPage === 1) next.delete('page');
      else next.set('page', String(nextPage));
      return next;
    });
    resultsRef.current?.scrollIntoView();
  }

  function toggleActiveOnly() {
    setParams((current) => {
      const next = new URLSearchParams(current);
      if (activeOnly) next.delete('activeOnly');
      else next.set('activeOnly', 'true');
      next.delete('page');
      return next;
    });
  }

  function updateResultOption(key: 'sort' | 'size', value: string) {
    setParams((current) => {
      const next = new URLSearchParams(current);
      next.set(key, value);
      next.delete('page');
      return next;
    });
  }

  function resetFilters() {
    updateDraftFilters(resetSearchFilters);
    setParams(resetSearchFilters);
  }

  function browseAllJobs() {
    updateDraftFilters(resetSearchFilters);
    setParams((current) => {
      const next = resetSearchFilters(current);
      next.delete('activeOnly');
      next.delete('keyword');
      return next;
    });
  }

  return (
    <div className="mx-auto grid w-[calc(100%-2rem)] max-w-[1072px] gap-5 pt-8 pb-16 xl:grid-cols-[minmax(0,800px)_250px]">
      <div className="min-w-0">
        <SearchKeywordInput
          keyword={keyword}
          onSearch={(value) => handleSearch(value, draftFilters)}
          inputRef={inputRef}
          hasSelectedFilters={tags.length > 0 || activeOnly}
        />
        <section aria-label="검색 필터" className="mt-[11px] space-y-[11px]">
          <div className="flex flex-wrap items-start gap-2">
            <RegionFilter width={194} overlay filterParams={[draftFilters, updateDraftFilters]} />
            <JobCategoryFilter
              width={194}
              overlay
              filterParams={[draftFilters, updateDraftFilters]}
            />
            <WorkConditionFilter
              width={194}
              overlay
              filterParams={[draftFilters, updateDraftFilters]}
            />
            <MoneyFilter width={194} overlay filterParams={[draftFilters, updateDraftFilters]} />
          </div>
          <FilterTags
            tags={tags}
            onRemove={(tag) => updateDraftFilters((current) => removeSearchFilterTag(current, tag))}
            onReset={() => updateDraftFilters(resetSearchFilters)}
          />
          {showToolbar && (
            <SearchResultToolbar
              activeOnly={activeOnly}
              sort={sort}
              pageSize={pageSize}
              onToggleActive={toggleActiveOnly}
              onSort={(value) => updateResultOption('sort', value)}
              onPageSize={(size) => updateResultOption('size', String(size))}
            />
          )}
        </section>
        <div className="pt-8">
          {!isError && (isPending || total > 0) && (
            <>
              {!isSignedIn && <SearchResumeGuest keyword={keyword} />}

              {isSignedIn && !hasRecommendationError && isRecommendationPending && (
                <section className="py-8">
                  <h2 className="text-display-20sb mb-4">이력서 매칭</h2>
                  <SearchResultsPending rowCount={3} />
                </section>
              )}

              {/* 추천 조회에 실패한 상태 */}
              {isSignedIn && hasRecommendationError && (
                <section className="py-8">
                  <h2 className="text-display-20sb mb-4">이력서 매칭</h2>
                  <SearchResultsPending
                    onRetry={() => {
                      if (filterOptionsQuery.isError) {
                        void filterOptionsQuery.refetch();
                      } else {
                        void recommendationQuery.refetch();
                      }
                    }}
                  />
                </section>
              )}

              {isSignedIn &&
                !isRecommendationPending &&
                !hasRecommendationError &&
                recommendationData && (
                  <SearchResumeMatch
                    key={String(searchRevision) + ':' + keyword + ':' + appliedFilters}
                    keyword={keyword}
                    items={recommendedJobs}
                    recommendation={recommendationData}
                    onSelectResume={(id) => setSelectedResumeId(Number(id))}
                  />
                )}
            </>
          )}
          <div ref={resultsRef} className="scroll-mt-8 pt-8">
            {unsupported.length > 0 ? (
              <div className="flex min-h-[414px] flex-col items-center justify-center gap-6 py-8 text-center">
                <p role="alert" className="text-body-16r text-alba-gray-700">
                  {'검색에서 지원하지 않는 조건이 포함되어 있어요. ' + unsupported.join(', ')}
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-body-16b text-alba-gray-500 border-alba-gray-300 h-[46px] w-40 cursor-pointer rounded-lg border"
                >
                  조건 초기화
                </button>
              </div>
            ) : (
              <SearchJobResults
                key={params.toString() + ':' + searchRevision}
                items={items}
                total={total}
                isPending={isPending || needsPageCorrection}
                onRetry={isError ? () => void refetch() : undefined}
                keyword={keyword}
                hasFilters={getSearchFilterTags(params).length > 0}
                onReset={resetFilters}
                onBrowseAll={browseAllJobs}
                onSearch={handleSearch}
              />
            )}
            {!needsPageCorrection && (
              <SearchPagination page={page} pageCount={pageCount} onPageChange={goToPage} />
            )}
          </div>
        </div>
      </div>
      <aside
        aria-label="검색 기록과 인기 검색어"
        className={`flex flex-col gap-8 ${showToolbar ? 'xl:pt-[262px]' : 'xl:pt-[199px]'} ${tags.length > 0 ? 'xl:mt-[53px]' : ''}`}
      >
        <PopularSearches
          items={POPULAR_SEARCHES}
          updatedOn={POPULAR_SEARCH_UPDATE_DATE}
          variant="results"
          onSelect={handleSearch}
        />
        <RecentSearches
          keywords={recentKeywords}
          onSearch={(value) => handleSearch(value)}
          onRemove={removeKeyword}
          onClear={clearKeywords}
          onEmptyAfterDelete={() => inputRef.current?.focus()}
        />
      </aside>
    </div>
  );
}

export default SearchPage;
