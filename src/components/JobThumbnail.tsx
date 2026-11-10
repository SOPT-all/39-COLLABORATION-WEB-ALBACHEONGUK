import { useState } from 'react';

import defaultLogo from '../assets/images/job-row/default-logo.png';

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
        <div className="relative h-[44px] w-[39px] overflow-hidden" aria-hidden="true">
          {/* Figma 원본 스프라이트에서 기본 로고 영역만 표시합니다. */}
          <img
            src={defaultLogo}
            alt=""
            className="absolute top-[-1600%] left-[-1444.18%] h-[4214.66%] w-[5472.74%] max-w-none"
          />
        </div>
      )}
    </div>
  );
}

export default JobThumbnail;
