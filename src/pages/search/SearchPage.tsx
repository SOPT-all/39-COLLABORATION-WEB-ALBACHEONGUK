import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import RecentSearches from '../../components/RecentSearches.tsx';
import SearchBar from '../../components/SearchBar.tsx';
import { useRecentSearchStore } from '../../stores/useRecentSearchStore.ts';

type SearchKeywordInputProps = {
  keyword: string;
  onSearch: (keyword: string) => void;
};

function SearchKeywordInput({ keyword, onSearch }: SearchKeywordInputProps) {
  const [value, setValue] = useState(keyword);
  const [previousKeyword, setPreviousKeyword] = useState(keyword);
  const inputRef = useRef<HTMLInputElement>(null);
  const keywords = useRecentSearchStore((state) => state.keywords);
  const removeKeyword = useRecentSearchStore((state) => state.removeKeyword);
  const clearKeywords = useRecentSearchStore((state) => state.clearKeywords);

  if (keyword !== previousKeyword) {
    setPreviousKeyword(keyword);
    setValue(keyword);
  }

  function handleSearch(nextKeyword: string) {
    setValue(nextKeyword);
    onSearch(nextKeyword);
  }

  return (
    <>
      <div className="max-w-[853px]">
        <SearchBar
          inputRef={inputRef}
          value={value}
          onValueChange={setValue}
          onSearch={handleSearch}
        />
      </div>
      <RecentSearches
        keywords={keywords}
        onSearch={handleSearch}
        onRemove={removeKeyword}
        onClear={clearKeywords}
        onEmptyAfterDelete={() => inputRef.current?.focus()}
      />
    </>
  );
}

function SearchPage() {
  const [params, setParams] = useSearchParams();
  const keyword = params.get('keyword') ?? '';
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

  return (
    <div className="space-y-4">
      <h1 className="text-display-24sb">검색 화면</h1>
      <SearchKeywordInput keyword={keyword} onSearch={handleSearch} />
    </div>
  );
}

export default SearchPage;
