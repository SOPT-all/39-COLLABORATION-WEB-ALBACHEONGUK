import { useState } from 'react';
import SearchBar from '../../components/SearchBar.tsx';

type SearchBarExampleProps = {
  title: string;
  initialValue?: string;
  hasSelectedFilters?: boolean;
  disabled?: boolean;
  width?: number;
};

function SearchBarExample({
  title,
  initialValue = '',
  hasSelectedFilters = false,
  disabled = false,
  width = 853,
}: SearchBarExampleProps) {
  const [value, setValue] = useState(initialValue);
  const [lastSearch, setLastSearch] = useState<string | null>(null);
  const [searchCount, setSearchCount] = useState(0);

  function handleSearch(keyword: string) {
    setLastSearch(keyword);
    setSearchCount((count) => count + 1);
  }

  return (
    <section aria-label={title} className="max-w-full space-y-3" style={{ width }}>
      <h2 className="text-body-16b">{title}</h2>
      <SearchBar
        value={value}
        onValueChange={setValue}
        onSearch={handleSearch}
        hasSelectedFilters={hasSelectedFilters}
        disabled={disabled}
        ariaLabel={`${title} 검색`}
      />
      <p role="status" className="text-body-14r text-alba-gray-600">
        {lastSearch === null
          ? '아직 검색하지 않았습니다.'
          : `검색 ${searchCount}회 · 전달 검색어: ${JSON.stringify(lastSearch)}`}
      </p>
    </section>
  );
}

function SearchBarPreviewPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-display-24sb">검색창 컴포넌트</h1>
        <p className="text-body-14r text-alba-gray-600">
          목데이터·콜백 확인 화면입니다. 검색 결과 이동·URL·API·필터 UI는 연결하지 않았습니다. 빈
          입력을 클릭하면 포커스 상태를, 입력 후 바깥을 클릭하면 입력 완료 상태를 확인합니다.
        </p>
      </div>
      <SearchBarExample title="기본 · 빈 검색어" />
      <SearchBarExample title="입력값 있음" initialValue="카페" />
      <SearchBarExample title="공백만 입력" initialValue="   " />
      <SearchBarExample title="필터만 선택" hasSelectedFilters />
      <SearchBarExample title="앞뒤 공백 제거" initialValue="  주말 알바  " />
      <SearchBarExample title="최대 30자" initialValue={'가'.repeat(30)} />
      <SearchBarExample title="전체 비활성" initialValue="카페" disabled />
      <SearchBarExample title="메인 컨테이너 · 898px" width={898} />
      <SearchBarExample title="좁은 컨테이너 · 640px" width={640} initialValue="편의점" />
    </div>
  );
}

export default SearchBarPreviewPage;
