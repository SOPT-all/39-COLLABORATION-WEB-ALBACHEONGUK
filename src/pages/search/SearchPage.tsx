import { useRef, useState } from 'react';
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
import SearchResultToolbar from './SearchResultToolbar.tsx';
import { readResultToolbar, readSearchPage } from './searchResultOptions.ts';
import SearchJobResults from './SearchJobResults.tsx';
import SearchPagination from './SearchPagination.tsx';
import { sortSearchJobs } from './searchJobs.ts';
import { useSearchJobs } from './useSearchJobs.ts';
import RecentSearches from '../../components/RecentSearches.tsx';
import SearchBar from '../../components/SearchBar.tsx';
import { useRecentSearchStore } from '../../stores/useRecentSearchStore.ts';

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
  const { data: matchedJobs = [], isPending, isError, refetch } = useSearchJobs(lookup.toString());
  const sortedJobs = sortSearchJobs(matchedJobs, keyword, sort);
  const { page, pageCount, items } = readSearchPage(sortedJobs, pageSize, params.get('page'));
  const activeOnly = params.get('activeOnly') === 'true';
  const showToolbar = isPending || (!isError && matchedJobs.length > 0);
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
    if (nextParams.toString() === params.toString()) void refetch();
    else setParams(nextParams);
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
    setParams((current) => {
      const next = resetSearchFilters(current);
      next.delete('activeOnly');
      return next;
    });
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
          {!isError && matchedJobs.length > 0 && (
            <SearchResumeMatch
              key={String(searchRevision) + ':' + keyword + ':' + appliedFilters}
              keyword={keyword}
              items={matchedJobs}
              hasSearchRegion={lookup.has('sido')}
            />
          )}
          <div ref={resultsRef} className="scroll-mt-8 pt-8">
            <SearchJobResults
              key={params.toString() + ':' + searchRevision}
              items={items}
              total={matchedJobs.length}
              isPending={isPending}
              onRetry={isError ? () => void refetch() : undefined}
              keyword={keyword}
              hasFilters={getSearchFilterTags(params).length > 0 || activeOnly}
              onReset={resetFilters}
              onBrowseAll={browseAllJobs}
              onSearch={handleSearch}
            />
            <SearchPagination page={page} pageCount={pageCount} onPageChange={goToPage} />
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
