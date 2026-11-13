import { useState } from 'react';

import defaultThumbnail from '../assets/images/job-row/thumbnail-default.png';
import { useKstNow } from '../hooks/useKstNow.ts';
import { getJobPostedAt } from '../utils/jobPostedAt.ts';
import SalaryText from './SalaryText.tsx';

export type JobCardData = {
  id: string;
  title: string;
  address: string;
  salaryType: string;
  salaryText: string;
  postedAt: string;
  imageUrl?: string;
};

type JobCardProps = {
  job: JobCardData;
  referenceNow?: Date;
};

function JobCard({ job, referenceNow }: JobCardProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const now = useKstNow(referenceNow);
  const postedAtText = getJobPostedAt(job.postedAt, now);
  const canShowImage = job.imageUrl && failedImageUrl !== job.imageUrl;

  return (
    <article className="border-alba-gray-300 bg-alba-white hover:bg-alba-yellow-500 flex h-[376px] w-full flex-col rounded-[15px] border px-[18px] pt-5 pb-5 transition-colors hover:border-transparent hover:shadow-[0_6px_10px_rgba(0,0,0,0.25)]">
      <div className="bg-alba-gray-200 flex h-[200px] w-full shrink-0 items-center justify-center overflow-hidden rounded-xl">
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

      <div className="mt-[25px] flex min-w-0 flex-col gap-0.5">
        <h3 className="text-display-20sb text-alba-gray-800 truncate" title={job.title}>
          {job.title}
        </h3>
        <p className="text-body-16r text-alba-gray-500 truncate" title={job.address}>
          {job.address}
        </p>
      </div>

      <div className="mt-auto flex min-w-0 items-center gap-[25px]">
        <SalaryText salaryType={job.salaryType} salaryText={job.salaryText} layout="horizontal" />
        <p className="flex shrink-0 items-center gap-1">
          <span className="text-body-14b text-alba-gray-400">등록</span>
          <span className="text-body-14r text-alba-gray-500">{postedAtText}</span>
        </p>
      </div>
    </article>
  );
}

export default JobCard;
