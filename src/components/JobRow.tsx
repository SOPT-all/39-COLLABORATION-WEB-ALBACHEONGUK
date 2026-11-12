import { useId } from 'react';
import type { ReactNode } from 'react';

import chevronIcon from '../assets/icons/job-row/chevron.svg';
import chevronClosedIcon from '../assets/icons/job-row/chevron-closed.svg';
import separatorIcon from '../assets/icons/job-row/separator.svg';
import { useKstNow } from '../hooks/useKstNow.ts';
import ScrapButton from './ScrapButton.tsx';
import { getJobDeadlineText } from '../utils/jobDeadline.ts';
import { getJobPostedAt } from '../utils/jobPostedAt.ts';

import JobThumbnail from './JobThumbnail.tsx';

// Figma의 Default/closed × Plus/Minus 원본 변환값입니다.
const EXPAND_BUTTON_STATES = {
  open: {
    collapsed: { src: chevronIcon, className: 'translate-y-[1.5px]' },
    expanded: { src: chevronIcon, className: 'rotate-180' },
  },
  closed: {
    collapsed: { src: chevronClosedIcon, className: 'translate-y-[1.5px]' },
    expanded: { src: chevronClosedIcon, className: '-translate-y-[1.5px] rotate-180' },
  },
};

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
  // 서버가 한국 날짜 기준으로 판정한 모집 마감 여부입니다.
  isClosed: boolean;
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
  const deadlineText = getJobDeadlineText(job.deadlineDate);
  const isClosed = job.isClosed;
  const postedAtText = getJobPostedAt(job.postedAt, now);
  const hasThumbnail = showThumbnail || Boolean(job.thumbnailUrl) || variant === 'recommended';
  const expandButton =
    EXPAND_BUTTON_STATES[isClosed ? 'closed' : 'open'][isExpanded ? 'expanded' : 'collapsed'];
  const hasWidePadding = hasThumbnail || variant !== 'default';
  const backgroundClass = isClosed
    ? 'bg-alba-gray-300'
    : variant === 'recommended'
      ? 'bg-alba-blue-100'
      : variant === 'highlighted'
        ? 'bg-alba-yellow-100'
        : 'bg-alba-white';
  const columnSpacingClass = hasThumbnail ? 'ml-[18px]' : 'ml-2.5';
  const primaryTextClass = isClosed ? 'text-alba-gray-600' : 'text-alba-black';
  const secondaryTextClass = isClosed ? 'text-alba-gray-600' : 'text-alba-gray-500';

  return (
    <article
      aria-labelledby={titleId}
      data-job-status={isClosed ? 'closed' : 'open'}
      className={`w-full min-w-0 border-b border-alba-gray-300 py-6 ${hasThumbnail ? 'pr-[18px]' : 'pr-5'} ${hasWidePadding ? 'pl-5' : 'pl-4'} ${backgroundClass}`}
    >
      <div
        className={`flex h-[82px] w-full items-center ${hasThumbnail ? 'max-w-[762px]' : 'max-w-[760px]'}`}
      >
        <div className={`flex min-w-0 flex-1 items-center ${hasThumbnail ? 'gap-4' : ''}`}>
          {hasThumbnail && <JobThumbnail src={job.thumbnailUrl} companyName={job.companyName} />}
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div
              className={`flex min-w-0 flex-col gap-1 ${hasThumbnail ? 'w-[calc(100%+33px)] max-w-[357px]' : ''}`}
            >
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
              <span className="min-w-0 max-w-[120px] truncate" title={job.workDays}>
                {job.workDays}
              </span>
              <img src={separatorIcon} alt="" width={2} height={2} className="shrink-0" />
              <span className="min-w-0 max-w-[120px] truncate" title={job.workHours}>
                {job.workHours}
              </span>
              <img src={separatorIcon} alt="" width={2} height={2} className="shrink-0" />
              <span className="w-[95.45px] shrink-0 truncate" title={deadlineText}>
                {deadlineText}
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
                className={`text-body-14b h-[17px] w-[26px] ${isClosed ? 'text-alba-gray-600' : 'text-alba-teal'}`}
              >
                {job.salaryType}
              </span>
              <span
                className={`text-body-16b w-full ${isClosed ? 'text-alba-gray-600' : 'text-alba-gray-700'}`}
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
                <span className="text-body-14b text-alba-closed-badge bg-alba-white rounded px-2 py-1">
                  마감
                </span>
              ) : (
                <>
                  <span className="text-caption-12b">등록일</span>
                  <span className="text-caption-12r">{postedAtText}</span>
                </>
              )}
            </div>
          )}
        </div>

        <div className={`flex shrink-0 items-center gap-1 ${hasThumbnail ? 'ml-[18px]' : 'ml-8'}`}>
          {scrapAction ?? (
            <ScrapButton
              label={`${job.title} 스크랩`}
              isScrapped={isScrapped}
              isClosed={isClosed}
              onToggle={onToggleScrap}
            />
          )}
          <button
            type="button"
            aria-label={`${job.title} 상세 ${isExpanded ? '접기' : '펼치기'}`}
            aria-expanded={isExpanded}
            aria-controls={children != null ? contentId : undefined}
            onClick={onToggleExpand}
            className="focus-visible:outline-alba-blue-600 flex size-6 cursor-pointer items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <img src={expandButton.src} alt="" className={expandButton.className} />
          </button>
        </div>
      </div>

      {children != null && (
        <div
          id={contentId}
          hidden={!isExpanded}
          className={`mt-4 ${hasThumbnail ? 'w-[calc(100%+1px)]' : ''}`}
        >
          {children}
        </div>
      )}
    </article>
  );
}

export default JobRow;
