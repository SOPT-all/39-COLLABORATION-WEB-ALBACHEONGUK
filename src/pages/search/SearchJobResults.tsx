import allJobsText from '../../assets/text/search/all-jobs.svg';
import SearchJobItem from './SearchJobItem.tsx';
import SearchResultsPending from './SearchResultsPending.tsx';
import SearchEmptyIllustration from './SearchEmptyIllustration.tsx';
import { POPULAR_SEARCHES } from '../../data/popularSearches.ts';
import { SEARCH_JOBS } from './searchJobs.ts';
import type { SearchJob } from './searchJobs.ts';

const GROUPS = [
  { tier: 'premium', label: '키워드 프리미엄' },
  { tier: 'light', label: '키워드 라이트' },
  { tier: undefined, label: '일반 채용정보' },
] as const;

type SearchJobResultsProps = {
  items: SearchJob[];
  total: number;
  isPending: boolean;
  onRetry?: () => void;
  keyword: string;
  hasFilters: boolean;
  onReset: () => void;
  onBrowseAll: () => void;
  onSearch: (keyword: string) => void;
};

function SearchJobResults({
  items,
  total,
  isPending,
  onRetry,
  keyword,
  hasFilters,
  onReset,
  onBrowseAll,
  onSearch,
}: SearchJobResultsProps) {
  return (
    <section aria-labelledby="search-result-title" className="min-w-0">
      <h1 id="search-result-title" className="text-display-20sb flex min-h-11 items-start gap-2">
        <span className="flex h-7 items-center">
          <img src={allJobsText} alt="전체 채용정보" width={112} height={19} />
        </span>
        <span className="text-body-16b text-alba-blue-600 self-start pt-0.5" aria-live="polite">
          {total.toLocaleString('ko-KR')}
        </span>
      </h1>
      {isPending || onRetry ? (
        <SearchResultsPending onRetry={onRetry} />
      ) : items.length === 0 ? (
        <>
          <div className="flex flex-col items-center gap-6 px-4 pt-40 pb-32 text-center">
            <div className="flex flex-col items-center gap-2">
              <SearchEmptyIllustration />
              <p className="text-body-16r text-alba-gray-700">
                {keyword ? '‘' + keyword + '’에 대한 공고가 없어요.' : '조건에 맞는 공고가 없어요.'}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {hasFilters && (
                <button
                  type="button"
                  onClick={onReset}
                  className="text-body-16b text-alba-gray-500 cursor-pointer h-[46px] w-40 rounded-lg border border-alba-gray-300"
                >
                  조건 초기화
                </button>
              )}
              <button
                type="button"
                onClick={onBrowseAll}
                className="text-body-16b cursor-pointer h-[46px] w-40 rounded-lg border border-alba-yellow-500 bg-alba-yellow-400"
              >
                전체 공고 둘러보기
              </button>
            </div>
            <div className="bg-alba-gray-200 mt-10 flex max-w-full flex-col items-center gap-4 rounded-xl px-8 py-4">
              <h2 className="text-body-16b">이런 키워드 어때요?</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {POPULAR_SEARCHES.filter((item) => item.keyword !== keyword)
                  .slice(0, 5)
                  .map((item) => (
                    <button
                      key={item.keyword}
                      type="button"
                      onClick={() => onSearch(item.keyword)}
                      className="text-body-14r text-alba-gray-700 border-alba-gray-300 bg-alba-white cursor-pointer rounded-lg border px-3 py-2"
                    >
                      {item.keyword}
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <section aria-labelledby="popular-jobs-title">
            <h2 id="popular-jobs-title" className="text-display-20sb mb-5">
              지금 인기있는 공고
            </h2>
            {SEARCH_JOBS.map((item) => (
              <SearchJobItem key={item.job.id} item={item} />
            ))}
          </section>
        </>
      ) : (
        GROUPS.map(({ tier, label }) => {
          const group = items.filter((item) => item.tier === tier);
          if (group.length === 0) return null;

          return (
            <section key={label} aria-label={label}>
              <div
                className={`flex min-h-[46px] items-center justify-between border-b border-alba-gray-300 px-4 ${tier ? 'bg-alba-yellow-100' : 'bg-alba-white'}`}
              >
                <h2 className="text-body-14b text-alba-gray-600">{label}</h2>
                <span className="text-caption-12r text-alba-gray-500">스크랩/펼치기</span>
              </div>
              {group.map((item) => (
                <SearchJobItem key={item.job.id} item={item} />
              ))}
            </section>
          );
        })
      )}
    </section>
  );
}

export default SearchJobResults;
