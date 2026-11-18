import { useState } from 'react';

import PopularSearches from '../../components/PopularSearches.tsx';
import {
  POPULAR_SEARCHES,
  POPULAR_SEARCH_UPDATE_DATE,
  type PopularSearch,
} from '../../data/popularSearches.ts';

const LONG_KEYWORD_EXAMPLE: readonly PopularSearch[] = [
  { rank: 1, keyword: '주말마다 일할 수 있는 집 근처 카페와 베이커리 아르바이트', trend: 'new' },
  ...POPULAR_SEARCHES.slice(1),
];

function PopularSearchesPreviewPage() {
  const [items, setItems] = useState(POPULAR_SEARCHES);
  const [selection, setSelection] = useState({ keyword: '', count: 0 });

  function handleSelect(keyword: string) {
    setSelection((previous) => ({ keyword, count: previous.count + 1 }));
  }

  const props = { items, updatedOn: POPULAR_SEARCH_UPDATE_DATE, onSelect: handleSelect };

  return (
    <section
      aria-labelledby="popular-searches-preview-title"
      className="mx-auto max-w-5xl space-y-6 px-6 py-8"
    >
      <h1 id="popular-searches-preview-title" className="text-display-24sb">
        인기 검색어 미리보기
      </h1>
      <div className="text-body-14r text-alba-blue-700 flex flex-wrap gap-4">
        <button
          type="button"
          className="cursor-pointer underline"
          onClick={() => setItems(POPULAR_SEARCHES)}
        >
          기본 데이터
        </button>
        <button
          type="button"
          className="cursor-pointer underline"
          onClick={() => setItems(LONG_KEYWORD_EXAMPLE)}
        >
          긴 검색어
        </button>
        <button type="button" className="cursor-pointer underline" onClick={() => setItems([])}>
          빈 데이터
        </button>
      </div>
      <p className="text-body-14r" aria-live="polite">
        전달 검색어 {selection.keyword || '없음'} · {selection.count}회
      </p>
      <div className="max-w-[938px]">
        <PopularSearches variant="home" {...props} />
      </div>
      <div className="max-w-[250px]">
        <PopularSearches variant="results" {...props} />
      </div>
    </section>
  );
}

export default PopularSearchesPreviewPage;
