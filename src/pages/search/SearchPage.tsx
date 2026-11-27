import { useState } from 'react';
import type { Ref } from 'react';
import FilterTags from '../../components/FilterTags.tsx';
import JobCategoryFilter from '../../components/JobCategoryFilter.tsx';
import MoneyFilter from '../../components/Dropdown/MoneyFilter.tsx';
import RegionFilter from '../../components/RegionFilter.tsx';
import WorkConditionFilter from '../../components/WorkConditionFilter.tsx';
import PopularSearches from '../../components/PopularSearches.tsx';
import RecentSearches from '../../components/RecentSearches.tsx';
import SearchBar from '../../components/SearchBar.tsx';
import TextImage from '../../components/TextImage.tsx';
import { POPULAR_SEARCHES, POPULAR_SEARCH_UPDATE_DATE } from '../../data/popularSearches.ts';
import { removeSearchFilterTag, resetSearchFilters } from './searchFilterTags.ts';
import SearchResultToolbar from './SearchResultToolbar.tsx';
import SearchJobResults from './SearchJobResults.tsx';
import SearchPagination from './SearchPagination.tsx';
import SearchRecommendationSection from './SearchRecommendationSection.tsx';
import { useSearchPage } from './useSearchPage.ts';
import filterResetText from '../../assets/text/button/filter-reset.svg';

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
  const {
    keyword,
    recommendation,
    draftFilters,
    tags,
    sort,
    pageSize,
    page,
    pageCount,
    items,
    total,
    isPending,
    isError,
    unsupported,
    needsPageCorrection,
    activeOnly,
    showToolbar,
    inputRef,
    resultsRef,
    searchRevision,
    appliedFilters,
    recentKeywords,
    removeKeyword,
    clearKeywords,
    updateDraftFilters,
    handleSearch,
    goToPage,
    toggleActiveOnly,
    updateResultOption,
    resetFilters,
    browseAllJobs,
    refetch,
    hasAppliedFilters,
    resultKey,
  } = useSearchPage();

  return (
    <div className="mx-auto grid w-[calc(100%-2rem)] max-w-[1072px] gap-5 pt-8 pb-16 xl:grid-cols-[minmax(0,800px)_250px]">
      <div className="min-w-0">
        <SearchKeywordInput
          keyword={keyword}
          onSearch={(value) => handleSearch(value, draftFilters)}
          inputRef={inputRef}
          hasSelectedFilters={tags.length > 0}
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
          <SearchRecommendationSection
            visible={!isError && (isPending || total > 0)}
            keyword={keyword}
            resetKey={String(searchRevision) + ':' + keyword + ':' + appliedFilters}
            recommendation={recommendation}
          />
          <div ref={resultsRef} className="scroll-mt-8 pt-8">
            {unsupported.length > 0 ? (
              <div className="flex min-h-[414px] flex-col items-center justify-center gap-6 py-8 text-center">
                <p role="alert" className="text-body-16r text-alba-gray-700">
                  {'검색에서 지원하지 않는 조건이 포함되어 있어요. ' + unsupported.join(', ')}
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-body-16b text-alba-gray-500 border-alba-gray-300 inline-flex h-[46px] w-40 cursor-pointer items-center justify-center rounded-lg border"
                >
                  <TextImage src={filterResetText} label="조건 초기화" width={76} height={15} />
                </button>
              </div>
            ) : (
              <SearchJobResults
                key={resultKey}
                items={items}
                total={total}
                isPending={isPending || needsPageCorrection}
                onRetry={isError ? () => void refetch() : undefined}
                keyword={keyword}
                hasFilters={hasAppliedFilters}
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
          onEmptyAfterDelete={() => inputRef.current?.focus({ preventScroll: true })}
        />
      </aside>
    </div>
  );
}

export default SearchPage;
