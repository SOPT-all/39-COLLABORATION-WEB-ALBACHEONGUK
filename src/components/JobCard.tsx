import { useState } from 'react';

import defaultThumbnail from '../assets/images/job-card/thumbnail-default.png';

export type JobCardData = {
  id: string;
  title: string;
  address: string;
  salaryType: string;
  salaryText: string;
  postedAtText: string;
  imageUrl?: string;
};

type JobCardProps = {
  job: JobCardData;
};

const SALARY_TYPE_COLOR_CLASS: Record<string, string> = {
  시급: 'text-alba-teal',
  월급: 'text-alba-red',
  연봉: 'text-alba-purple-200',
};

function JobCard({ job }: JobCardProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const canShowImage = job.imageUrl && failedImageUrl !== job.imageUrl;
  const salaryTypeColorClass = SALARY_TYPE_COLOR_CLASS[job.salaryType] ?? 'text-alba-gray-700';

  return (
    <article className="border-alba-gray-300 bg-alba-white hover:bg-alba-yellow-500 flex h-[376px] w-full flex-col rounded-xl border px-[18px] pt-5 pb-5 transition-colors hover:border-transparent hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
      <div className="bg-alba-gray-200 flex h-[200px] w-full shrink-0 items-center justify-center overflow-hidden rounded-lg">
        {canShowImage ? (
          <img
            src={job.imageUrl}
            alt={`${job.title} 대표 이미지`}
            className="size-full object-cover"
            onError={() => setFailedImageUrl(job.imageUrl ?? null)}
          />
        ) : (
          <img
            src={defaultThumbnail}
            alt=""
            aria-hidden="true"
            width={64}
            height={64}
            className="size-16 object-contain"
          />
        )}
      </div>

      <div className="mt-6 flex min-w-0 flex-col gap-1">
        <h3 className="text-title-18sb text-alba-gray-800 truncate" title={job.title}>
          {job.title}
        </h3>
        <p className="text-body-16r text-alba-gray-500 truncate" title={job.address}>
          {job.address}
        </p>
      </div>

      <div className="mt-auto flex min-w-0 items-center gap-6">
        <p className="flex min-w-0 items-center gap-1.5">
          <span className={`text-body-14b shrink-0 ${salaryTypeColorClass}`}>{job.salaryType}</span>
          <span className="text-display-20sb text-alba-gray-700 truncate">
            {job.salaryText.trim() || '협의'}
          </span>
        </p>
        <p className="text-body-14r text-alba-gray-400 shrink-0">등록 {job.postedAtText}</p>
      </div>
    </article>
  );
}

export default JobCard;
