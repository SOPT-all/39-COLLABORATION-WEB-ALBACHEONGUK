import { useEffect, useRef, useState } from 'react';

import chevronLeft from '../assets/icons/filter-tags/chevron-left.svg';
import chevronRight from '../assets/icons/filter-tags/chevron-right.svg';
import removeIcon from '../assets/icons/filter-tags/remove.svg';
import resetIcon from '../assets/icons/filter-tags/reset.svg';

const FILTER_KIND_LABELS = {
  region: '지역',
  occupation: '업직종',
  duration: '근무기간',
  days: '근무요일',
  pay: '급여',
};

export type FilterTag = {
  id: string;
  kind: keyof typeof FILTER_KIND_LABELS;
  label: string;
};

type FilterTagsProps = {
  tags: readonly FilterTag[];
  onRemove: (tag: FilterTag) => void;
  onReset: () => void;
};

const ARROW_SLOT_WIDTH = 48; // 40px button + 8px gap

// Figma hugs labels at whole-pixel widths; the browser keeps fractional text widths.
const LABEL_WIDTH = '[inline-size:calc-size(max-content,round(up,size,1px))]';

// Mixed Korean/numeric labels render narrower on the web than these Figma text frames.
const LABEL_MIN_WIDTHS: Partial<Record<string, string>> = {
  '1주일~1개월': 'min-w-[79px]',
  주5일: 'min-w-[37px]',
};

const FOCUS_OUTLINE =
  'focus-visible:outline-alba-blue-600 focus-visible:outline-2 focus-visible:-outline-offset-2';

function FilterTags({ tags, onRemove, onReset }: FilterTagsProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ canScrollLeft: false, canScrollRight: false });
  const hasTags = tags.length > 0;

  useEffect(() => {
    const row = rowRef.current;
    const viewport = viewportRef.current;
    const list = listRef.current;
    if (!row || !viewport || !list) return;

    const updateEdges = () => {
      // Compare against the whole row so arrow buttons cannot create overflow.
      const listWidth = list.getBoundingClientRect().width;
      const hasOverflow = listWidth - row.clientWidth > 0.5;
      const canScrollLeft = hasOverflow && viewport.scrollLeft > 1;
      // At either end only one arrow is visible, even if both are visible while scrolling.
      const maxScrollAtEdge = listWidth - row.clientWidth + ARROW_SLOT_WIDTH;
      const canScrollRight = hasOverflow && maxScrollAtEdge - viewport.scrollLeft > 1;

      setEdges((previous) =>
        previous.canScrollLeft === canScrollLeft && previous.canScrollRight === canScrollRight
          ? previous
          : { canScrollLeft, canScrollRight },
      );
    };

    const observer = new ResizeObserver(updateEdges);
    observer.observe(row);
    observer.observe(viewport);
    observer.observe(list);
    viewport.addEventListener('scroll', updateEdges, { passive: true });
    updateEdges();

    return () => {
      observer.disconnect();
      viewport.removeEventListener('scroll', updateEdges);
    };
  }, [hasTags]);

  function scrollTags(direction: -1 | 1) {
    const viewport = viewportRef.current;
    if (viewport) viewport.scrollBy({ left: direction * viewport.clientWidth });
  }

  if (!hasTags) return null;

  return (
    <div className="flex items-start gap-4">
      <div ref={rowRef} className="flex h-[42px] min-w-0 flex-1 items-center gap-2">
        {edges.canScrollLeft && (
          <button
            type="button"
            aria-label="이전 선택 조건 보기"
            className={`flex h-full w-10 shrink-0 cursor-pointer items-center justify-center ${FOCUS_OUTLINE}`}
            onClick={() => scrollTags(-1)}
          >
            <img src={chevronLeft} alt="" width={10} height={24} />
          </button>
        )}
        <div className="relative min-w-0 flex-1">
          <div
            ref={viewportRef}
            className="overflow-x-auto scroll-smooth [scrollbar-width:none] motion-reduce:scroll-auto"
          >
            <ul ref={listRef} aria-label="선택한 검색 조건" className="flex w-max gap-2">
              {tags.map((tag) => (
                <li
                  key={`${tag.kind}:${tag.id}`}
                  className="border-alba-gray-300 bg-alba-white text-alba-black text-body-16r flex h-[42px] items-center gap-2 rounded-lg border pr-2.5 pl-3 whitespace-nowrap"
                >
                  <span className={`${LABEL_WIDTH} ${LABEL_MIN_WIDTHS[tag.label] ?? ''}`}>
                    {tag.label}
                  </span>
                  <button
                    type="button"
                    aria-label={`${FILTER_KIND_LABELS[tag.kind]} ${tag.label} 조건 삭제`}
                    className={`size-5 shrink-0 cursor-pointer rounded-sm ${FOCUS_OUTLINE}`}
                    onClick={() => onRemove(tag)}
                  >
                    <img src={removeIcon} alt="" width={20} height={20} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {edges.canScrollLeft && (
            <div className="from-alba-white pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r to-transparent" />
          )}
          {edges.canScrollRight && (
            <div className="to-alba-white pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-r from-transparent" />
          )}
        </div>
        {edges.canScrollRight && (
          <button
            type="button"
            aria-label="다음 선택 조건 보기"
            className={`flex h-full w-10 shrink-0 cursor-pointer items-center justify-center ${FOCUS_OUTLINE}`}
            onClick={() => scrollTags(1)}
          >
            <img src={chevronRight} alt="" width={10} height={24} />
          </button>
        )}
      </div>
      <button
        type="button"
        aria-label="선택한 필터 초기화"
        className={`text-alba-gray-800 text-body-16r flex shrink-0 cursor-pointer items-center gap-0.5 py-2 ${FOCUS_OUTLINE}`}
        onClick={onReset}
      >
        <img src={resetIcon} alt="" width={24} height={24} />
        <span className={LABEL_WIDTH}>초기화</span>
      </button>
    </div>
  );
}

export default FilterTags;
