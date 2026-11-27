import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useRecentSearchStore } from '../../stores/useRecentSearchStore.ts';
import { readSearchFilters, getSearchFilterTags, resetSearchFilters } from './searchFilterTags.ts';
import { readResultToolbar } from './searchResultOptions.ts';
import { useSearchJobs } from './useSearchJobs.ts';
import { useSearchRecommendation } from './useSearchRecommendation.ts';

export function useSearchPage() {
  const [params, setParams] = useSearchParams();
  const keyword = params.get('keyword') ?? '';
  const recommendation = useSearchRecommendation(params);
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

  return {
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
    hasAppliedFilters: getSearchFilterTags(params).length > 0,
    resultKey: params.toString() + ':' + searchRevision,
  };
}
