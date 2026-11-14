import { useState } from 'react';

import FilterTags, { type FilterTag } from '../../components/FilterTags.tsx';

const SAMPLE_TAGS: FilterTag[] = [
  { id: 'gangnam', kind: 'region', label: '강남구' },
  { id: 'mapo', kind: 'region', label: '마포구' },
  { id: 'coffee', kind: 'occupation', label: '커피전문점' },
  { id: 'fast-food', kind: 'occupation', label: '패스트푸드' },
  { id: 'short-term', kind: 'duration', label: '1주일~1개월' },
  { id: 'five-days', kind: 'days', label: '주5일' },
  { id: 'hourly', kind: 'pay', label: '시급' },
];

function FilterTagsPreviewPage() {
  const [tags, setTags] = useState<FilterTag[]>(SAMPLE_TAGS);
  const [keyword, setKeyword] = useState('편의점');

  function handleRemove(removedTag: FilterTag) {
    setTags((previous) =>
      previous.filter((tag) => tag.kind !== removedTag.kind || tag.id !== removedTag.id),
    );
  }

  return (
    <section
      aria-labelledby="filter-tags-preview-title"
      className="mx-auto max-w-5xl space-y-6 p-6"
    >
      <h1 id="filter-tags-preview-title" className="text-display-24sb">
        선택 조건 태그 미리보기
      </h1>
      <label className="text-body-16r flex items-center gap-3">
        검색어
        <input
          className="border-alba-gray-300 rounded-lg border px-3 py-2"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
      </label>
      <div className="max-w-[801px]">
        <FilterTags tags={tags} onRemove={handleRemove} onReset={() => setTags([])} />
      </div>
      <div className="text-body-14r flex flex-wrap gap-4">
        <button
          type="button"
          className="text-alba-blue-700 cursor-pointer underline"
          onClick={() => setTags([SAMPLE_TAGS[0], SAMPLE_TAGS[2], SAMPLE_TAGS[3]])}
        >
          한 줄 상태 보기
        </button>
        <button
          type="button"
          className="text-alba-blue-700 cursor-pointer underline"
          onClick={() => setTags(SAMPLE_TAGS)}
        >
          가로 이동 상태 보기
        </button>
      </div>
      <p className="text-body-14r" aria-live="polite">
        선택한 조건 {tags.length}개
      </p>
    </section>
  );
}

export default FilterTagsPreviewPage;
