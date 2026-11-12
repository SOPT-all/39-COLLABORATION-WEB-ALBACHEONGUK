import { useId } from 'react';

import downIcon from '../assets/icons/popular-searches/down.svg';
import newIcon from '../assets/icons/popular-searches/new.svg';
import sameIcon from '../assets/icons/popular-searches/same.svg';
import upIcon from '../assets/icons/popular-searches/up.svg';
import type { PopularSearch } from '../data/popularSearches.ts';

const TREND_ICONS = {
  same: { src: sameIcon, label: '순위 유지' },
  up: { src: upIcon, label: '순위 상승' },
  down: { src: downIcon, label: '순위 하락' },
  new: { src: newIcon, label: '신규 진입' },
};

type PopularSearchesProps = {
  items: readonly PopularSearch[];
  updatedOn: string;
  variant: 'home' | 'results';
  onSelect: (keyword: string) => void;
};

function PopularSearches({ items, updatedOn, variant, onSelect }: PopularSearchesProps) {
  const titleId = useId();
  const isHome = variant === 'home';
  const visibleItems = items.slice(0, isHome ? 5 : 10);
  const updatedLabel = `업데이트 ${updatedOn}`;

  if (!visibleItems.length) return null;

  return (
    <section
      aria-labelledby={titleId}
      className={
        isHome
          ? 'bg-alba-gray-100 flex items-center gap-8 rounded-b-2xl px-6 py-3'
          : 'border-alba-gray-300 bg-alba-white flex flex-col gap-3.5 rounded-2xl border py-6 pr-[21px] pl-6'
      }
    >
      {isHome ? (
        <h2 id={titleId} className="text-body-16b text-alba-black min-w-[76px] shrink-0">
          인기 검색어
        </h2>
      ) : (
        <div className="flex h-6 items-center justify-between gap-2">
          <h2 id={titleId} className="text-title-18sb text-alba-gray-800">
            인기 검색어
          </h2>
          <span className="text-caption-12r text-alba-gray-500 shrink-0">{updatedLabel}</span>
        </div>
      )}

      {!isHome && <div className="bg-alba-gray-300 h-px" aria-hidden="true" />}

      <ol
        role="list"
        className={
          isHome
            ? 'flex min-w-0 flex-1 flex-wrap gap-x-8 gap-y-1'
            : 'flex flex-col gap-[3px] pb-[9px]'
        }
      >
        {visibleItems.map(({ rank, keyword, trend }) => {
          const icon = TREND_ICONS[trend];
          const homeRankWidth = rank === 1 ? 'w-[7px]' : 'w-[9px]';
          const keywordStyle = isHome
            ? 'text-body-14r text-alba-black [inline-size:calc-size(max-content,round(up,size,1px))]'
            : rank === 1
              ? 'text-body-14b text-alba-gray-800'
              : 'text-body-14r text-alba-gray-800';

          return (
            <li key={rank} className={isHome ? 'min-w-0 max-w-full' : 'min-w-0'}>
              <button
                type="button"
                className={`focus-visible:outline-alba-blue-600 flex min-w-0 max-w-full cursor-pointer items-center rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-2 ${isHome ? 'gap-2 py-1' : 'h-[25px] w-full gap-3'}`}
                onClick={() => onSelect(keyword)}
                title={keyword}
              >
                <span
                  className={
                    isHome
                      ? `text-body-14r text-alba-blue-700 shrink-0 ${homeRankWidth}`
                      : 'text-caption-12r text-alba-gray-500 w-[18px] shrink-0'
                  }
                >
                  {rank}
                  <span className="sr-only">위</span>
                </span>
                <span className={`min-w-0 truncate ${keywordStyle}`}>{keyword}</span>
                <img
                  src={icon.src}
                  alt={icon.label}
                  width={20}
                  height={20}
                  className={isHome ? '-ml-1 shrink-0' : 'ml-auto shrink-0'}
                />
              </button>
            </li>
          );
        })}
      </ol>

      {isHome && (
        <span className="text-caption-12r text-alba-gray-400 shrink-0">{updatedLabel}</span>
      )}
    </section>
  );
}

export default PopularSearches;
