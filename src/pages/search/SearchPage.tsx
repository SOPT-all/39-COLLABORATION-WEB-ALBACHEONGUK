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
  removeSearchFilterTag,
  resetSearchFilters,
} from './searchFilterTags.ts';
import PopularSearches from '../../components/PopularSearches.tsx';
import { POPULAR_SEARCHES, POPULAR_SEARCH_UPDATE_DATE } from '../../data/popularSearches.ts';
import SearchJobResults from './SearchJobResults.tsx';
import { filterSearchJobs, SEARCH_JOBS } from './searchJobs.ts';
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
  const tags = getSearchFilterTags(params);
  const items = filterSearchJobs(SEARCH_JOBS, params);
  const activeOnly = params.get('activeOnly') === 'true';
  const inputRef = useRef<HTMLInputElement>(null);
  const recentKeywords = useRecentSearchStore((state) => state.keywords);
  const removeKeyword = useRecentSearchStore((state) => state.removeKeyword);
  const clearKeywords = useRecentSearchStore((state) => state.clearKeywords);
  const addKeyword = useRecentSearchStore((state) => state.addKeyword);

  function handleSearch(nextKeyword: string) {
    addKeyword(nextKeyword);
    if (nextKeyword === keyword && !params.has('page')) return;

    const nextParams = new URLSearchParams(params);
    if (nextKeyword) {
      nextParams.set('keyword', nextKeyword);
    } else {
      nextParams.delete('keyword');
    }
    nextParams.delete('page');
    setParams(nextParams);
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

  function resetFilters() {
    setParams((current) => {
      const next = resetSearchFilters(current);
      next.delete('activeOnly');
      return next;
    });
  }

  function browseAllJobs() {
    setParams((current) => {
      const next = resetSearchFilters(current);
      next.delete('activeOnly');
      next.delete('keyword');
      return next;
    });
  }

  return (
    <div className="mx-auto grid w-[calc(100%-2rem)] max-w-[1070px] gap-5 pt-8 pb-16 xl:grid-cols-[minmax(0,800px)_250px]">
      <div className="min-w-0">
        <SearchKeywordInput
          keyword={keyword}
          onSearch={handleSearch}
          inputRef={inputRef}
          hasSelectedFilters={tags.length > 0 || activeOnly}
        />
        <section aria-label="검색 필터" className="mt-[11px] space-y-[11px]">
          <div className="flex flex-wrap items-start gap-2">
            <RegionFilter width={194} />
            <JobCategoryFilter width={194} />
            <WorkConditionFilter width={194} />
            <MoneyFilter width={194} />
          </div>
          <FilterTags
            tags={tags}
            onRemove={(tag) => setParams((current) => removeSearchFilterTag(current, tag))}
            onReset={resetFilters}
          />
          <div className="flex min-h-[52px] items-center rounded-xl bg-alba-gray-200 px-4">
            <button
              type="button"
              role="switch"
              aria-checked={activeOnly}
              onClick={toggleActiveOnly}
              className="text-body-14r text-alba-gray-800 flex cursor-pointer items-center gap-2"
            >
              <span
                aria-hidden="true"
                className={`flex h-6 w-[42px] items-center rounded-full px-1 ${activeOnly ? 'justify-end bg-alba-yellow-500' : 'bg-alba-gray-400'}`}
              >
                <span className="size-[18px] rounded-full bg-alba-white" />
              </span>
              진행중 공고만 보기
            </button>
          </div>
        </section>
        <div className="mt-12">
          <SearchJobResults
            items={items}
            keyword={keyword}
            hasFilters={tags.length > 0 || activeOnly}
            onReset={resetFilters}
            onBrowseAll={browseAllJobs}
          />
        </div>
      </div>
      <aside aria-label="검색 기록과 인기 검색어" className="flex flex-col gap-8 xl:pt-[230px]">
        <PopularSearches
          items={POPULAR_SEARCHES}
          updatedOn={POPULAR_SEARCH_UPDATE_DATE}
          variant="results"
          onSelect={handleSearch}
        />
        <RecentSearches
          keywords={recentKeywords}
          onSearch={handleSearch}
          onRemove={removeKeyword}
          onClear={clearKeywords}
          onEmptyAfterDelete={() => inputRef.current?.focus()}
        />
      </aside>
    </div>
  );
}

export default SearchPage;
