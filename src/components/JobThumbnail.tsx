import { useState } from 'react';

import defaultThumbnail from '../assets/images/job-row/thumbnail-default.png';

type JobThumbnailProps = {
  src?: string;
  companyName: string;
};

function JobThumbnail({ src, companyName }: JobThumbnailProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const canShowImage = src && failedSrc !== src;

  return (
    <div className="border-alba-gray-300 bg-alba-white flex h-[68px] w-[104px] shrink-0 items-center justify-center rounded-lg border p-2.5">
      {canShowImage ? (
        <img
          src={src}
          alt={`${companyName} 로고`}
          className="max-h-full max-w-full object-contain"
          onError={() => setFailedSrc(src ?? null)}
        />
      ) : (
        <img
          src={defaultThumbnail}
          alt=""
          aria-hidden="true"
          width={32}
          height={32}
          className="size-8 object-cover"
        />
      )}
    </div>
  );
}

export default JobThumbnail;
