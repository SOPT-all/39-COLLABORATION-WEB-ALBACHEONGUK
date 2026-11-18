import separatorIcon from '../assets/icons/job-row/separator.svg';
import JobThumbnail from './JobThumbnail.tsx';
import type { JobRowData } from './JobRow.tsx';

type JobRowSummaryProps = {
  job: JobRowData;
  titleId: string;
  hasThumbnail: boolean;
  deadlineText: string;
};

function JobRowSummary({ job, titleId, hasThumbnail, deadlineText }: JobRowSummaryProps) {
  const primaryTextClass = job.isClosed ? 'text-alba-gray-600' : 'text-alba-black';
  const secondaryTextClass = job.isClosed ? 'text-alba-gray-600' : 'text-alba-gray-500';

  return (
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
  );
}

export default JobRowSummary;
