import { useId } from 'react';
import type { ReactNode } from 'react';

import chevronIcon from '../assets/icons/job-row/chevron.svg';
import scrapOffIcon from '../assets/icons/job-row/scrap-off.svg';
import scrapOnIcon from '../assets/icons/job-row/scrap-on.svg';
import separatorIcon from '../assets/icons/job-row/separator.svg';
import { useKstNow } from '../hooks/useKstNow.ts';
import { getJobDeadline } from '../utils/jobDeadline.ts';
import { getJobPostedAt } from '../utils/jobPostedAt.ts';

import JobThumbnail from './JobThumbnail.tsx';

// 화면 표시용 데이터입니다. 실제 API 응답은 화면에서 이 형태로 변환합니다.
export type JobRowData = {
  id: string;
  companyName: string;
  location: string;
  title: string;
  workDays: string;
  workHours: string;
  // KST 날짜 YYYY-MM-DD. null은 상시모집입니다.
  deadlineDate: string | null;
  postedAt: string;
  salaryType: string;
  salaryText: string;
  // API에서 전달받은 채용 완료 여부입니다. 날짜 경과 마감과 함께 판정합니다.
  isClosed?: boolean;
  thumbnailUrl?: string;
};

export type JobRowVariant = 'default' | 'highlighted' | 'recommended';

type JobRowProps = {
  job: JobRowData;
  variant?: JobRowVariant;
  showThumbnail?: boolean;
  isScrapped: boolean;
  isExpanded: boolean;
  onToggleScrap: () => void;
  onToggleExpand: () => void;
  salaryContent?: ReactNode;
  dateContent?: ReactNode;
  scrapAction?: ReactNode;
  children?: ReactNode;
  referenceNow?: Date;
};

function JobRow({
  job,
  variant = 'default',
  showThumbnail = false,
  isScrapped,
  isExpanded,
  onToggleScrap,
  onToggleExpand,
  salaryContent,
  dateContent,
  scrapAction,
  children,
  referenceNow,
}: JobRowProps) {
  const contentId = useId();
  const titleId = useId();
  const now = useKstNow(referenceNow);
  const deadline = getJobDeadline(job.deadlineDate, job.isClosed ?? false, now);
  // 서버가 내려준 모집 상태를 우선 사용합니다. 미연결 예시만 날짜로 보완합니다.
  const isClosed = job.isClosed ?? deadline.status === 'closed';
  const postedAtText = getJobPostedAt(job.postedAt, now);
  const hasThumbnail = showThumbnail || Boolean(job.thumbnailUrl) || variant === 'recommended';
  const isWide = hasThumbnail || variant !== 'default';
  const backgroundClass = isClosed
    ? 'bg-alba-gray-300'
    : variant === 'recommended'
      ? 'bg-alba-blue-100'
      : variant === 'highlighted'
        ? 'bg-alba-yellow-100'
        : 'bg-alba-white';
  const columnSpacingClass = hasThumbnail ? 'ml-[18px]' : isClosed ? 'ml-px' : 'ml-2.5';
  const primaryTextClass = isClosed ? 'text-alba-gray-600' : 'text-alba-black';
  const secondaryTextClass = isClosed ? 'text-alba-gray-600' : 'text-alba-gray-500';

  return (
    <article
      aria-labelledby={titleId}
      data-job-status={isClosed ? 'closed' : 'open'}
      className={`shrink-0 border-b border-alba-gray-300 py-6 pr-5 ${isWide ? 'w-[800px] pl-5' : 'w-[796px] pl-4'} ${backgroundClass}`}
    >
      <div className="flex h-[82px] items-center">
        <div
          className={`flex min-w-0 items-center ${hasThumbnail ? 'w-[444px] shrink-0 gap-4' : isClosed ? 'w-[444px] shrink-0' : 'flex-1'}`}
        >
          {hasThumbnail && <JobThumbnail src={job.thumbnailUrl} companyName={job.companyName} />}
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex min-w-0 flex-col gap-1">
              <div className="flex min-w-0 items-center gap-1">
                <p
                  title={job.companyName}
                  className={`text-body-16b max-w-full shrink-0 truncate ${primaryTextClass}`}
                >
                  {job.companyName}
                </p>
                <p className={`text-body-16r truncate ${secondaryTextClass}`} title={job.location}>
                  {job.location}
                </p>
              </div>
              <h3
                id={titleId}
                className={`text-title-18sb truncate ${primaryTextClass}`}
                title={job.title}
              >
                {job.title}
              </h3>
            </div>

            <div className={`text-body-14r flex min-w-0 items-center gap-2 ${secondaryTextClass}`}>
              <span className="min-w-0 max-w-[120px] shrink-0 truncate" title={job.workDays}>
                {job.workDays}
              </span>
              <img src={separatorIcon} alt="" width={2} height={2} className="shrink-0" />
              <span className="min-w-0 max-w-[120px] shrink-0 truncate" title={job.workHours}>
                {job.workHours}
              </span>
              <img src={separatorIcon} alt="" width={2} height={2} className="shrink-0" />
              <span className="truncate" title={deadline.dateText}>
                {deadline.dateText}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`flex w-[122px] shrink-0 flex-col items-center justify-center gap-0.5 text-center ${columnSpacingClass}`}
        >
          {salaryContent ?? (
            <>
              <span
                className={`text-body-14b h-[17px] ${isClosed ? 'text-alba-gray-600' : 'text-alba-teal'}`}
              >
                {job.salaryType}
              </span>
              <span
                className={`text-body-16b ${isClosed ? 'text-alba-gray-600' : 'text-alba-gray-700'}`}
              >
                {job.salaryText.trim() || '협의'}
              </span>
            </>
          )}
        </div>

        <div
          className={`flex w-[90px] shrink-0 flex-col items-center justify-center ${columnSpacingClass} ${secondaryTextClass}`}
        >
          {dateContent ?? (
            <div
              className="flex flex-col items-center"
              aria-label={isClosed ? '마감된 공고' : `등록일 ${postedAtText}`}
            >
              {isClosed ? (
                <span className="text-body-14b bg-alba-white rounded px-2 py-1">마감</span>
              ) : (
                <>
                  <span className="text-caption-12b">등록일</span>
                  <span className="text-body-14r">{postedAtText}</span>
                </>
              )}
            </div>
          )}
        </div>

        <div
          className={`flex shrink-0 items-center gap-1 ${hasThumbnail ? 'ml-[18px]' : 'ml-[31px]'}`}
        >
          {scrapAction ?? (
            <button
              type="button"
              aria-label={`${job.title} 스크랩`}
              aria-pressed={isScrapped}
              onClick={onToggleScrap}
              className="focus-visible:outline-alba-blue-600 flex size-6 cursor-pointer items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <img src={isScrapped ? scrapOnIcon : scrapOffIcon} alt="" width={24} height={24} />
            </button>
          )}
          <button
            type="button"
            aria-label={`${job.title} 상세 ${isExpanded ? '접기' : '펼치기'}`}
            aria-expanded={isExpanded}
            aria-controls={children != null ? contentId : undefined}
            onClick={onToggleExpand}
            className="focus-visible:outline-alba-blue-600 flex size-6 cursor-pointer items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <img src={chevronIcon} alt="" className={isExpanded ? 'rotate-180' : undefined} />
          </button>
        </div>
      </div>

      {children != null && (
        <div id={contentId} hidden={!isExpanded} className="mt-4">
          {children}
        </div>
      )}
    </article>
  );
}

export default JobRow;
