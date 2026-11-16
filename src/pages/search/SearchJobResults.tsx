import { useState } from 'react';
import emptyResultsImage from '../../assets/images/search/empty-results.png';
import JobRow from '../../components/JobRow.tsx';
import JobRowDetails from '../../components/JobRowDetails.tsx';
import { useJobScrap } from '../../hooks/useJobScrap.ts';
import { getJobDeadlineText } from '../../utils/jobDeadline.ts';
import type { SearchJob } from './searchJobs.ts';

const GROUPS = [
  { tier: 'premium', label: '키워드 프리미엄' },
  { tier: 'light', label: '키워드 라이트' },
  { tier: undefined, label: '일반 채용정보' },
] as const;

function SearchJobItem({ item }: { item: SearchJob }) {
  const [expanded, setExpanded] = useState(false);
  const { isScrapped, toggleScrap } = useJobScrap(item.job.id);
  const { job } = item;

  return (
    <JobRow
      job={job}
      variant={item.tier ? 'highlighted' : 'default'}
      showThumbnail={item.tier === 'premium'}
      isExpanded={expanded}
      isScrapped={isScrapped}
      onToggleExpand={() => setExpanded((value) => !value)}
      onToggleScrap={toggleScrap}
    >
      <JobRowDetails
        details={{
          category: item.subcategory,
          address: item.address,
          stations: [],
          workHours: job.workHours,
          periodAndDays: [item.period, job.workDays].join(', '),
          applicationMethod: '',
          deadline: getJobDeadlineText(job.deadlineDate),
        }}
      />
    </JobRow>
  );
}

type SearchJobResultsProps = {
  items: SearchJob[];
  keyword: string;
  hasFilters: boolean;
  onReset: () => void;
  onBrowseAll: () => void;
};

function SearchJobResults({
  items,
  keyword,
  hasFilters,
  onReset,
  onBrowseAll,
}: SearchJobResultsProps) {
  return (
    <section aria-labelledby="search-result-title" className="min-w-0">
      <h1 id="search-result-title" className="text-display-20sb flex min-h-11 items-start gap-2">
        전체 채용정보
        <span className="text-body-16b text-alba-blue-600 self-start pt-0.5" aria-live="polite">
          {items.length.toLocaleString('ko-KR')}
        </span>
      </h1>
      {items.length === 0 ? (
        <div className="flex min-h-[360px] flex-col items-center justify-center gap-4 px-4 text-center">
          <img
            src={emptyResultsImage}
            alt=""
            width={140}
            height={168}
            className="h-[168px] w-[140px] object-contain"
          />
          <p className="text-body-16r text-alba-gray-700">
            {keyword ? '‘' + keyword + '’에 대한 공고가 없어요.' : '조건에 맞는 공고가 없어요.'}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {hasFilters && (
              <button
                type="button"
                onClick={onReset}
                className="text-body-14b cursor-pointer w-40 rounded-lg border border-alba-gray-300 px-5 py-2.5"
              >
                조건 초기화
              </button>
            )}
            <button
              type="button"
              onClick={onBrowseAll}
              className="text-body-14b cursor-pointer w-40 rounded-lg border border-alba-yellow-500 bg-alba-yellow-400 px-5 py-2.5"
            >
              전체 공고 둘러보기
            </button>
          </div>
        </div>
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
