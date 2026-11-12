import type { ReactNode } from 'react';

import chevronRightSmallIcon from '../../../assets/icons/recommend/chevron-right-small.svg';
import JobCard from '../../../components/JobCard.tsx';
import type { JobCardData } from '../../../components/JobCard.tsx';

type RecommendSectionProps = {
  title: string;
  titleImage: string;
  description: string;
  chips: ReactNode;
  jobs: JobCardData[];
  spacingClassName: string;
};

function RecommendSection({
  title,
  titleImage,
  description,
  chips,
  jobs,
  spacingClassName,
}: RecommendSectionProps) {
  return (
    <section className={`flex flex-col ${spacingClassName}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* 피그마 글자 상자(136×28) 가운데에 SVG 글자(135×19)를 둡니다. */}
          <h2 className="flex h-7 w-[136px] shrink-0 items-center justify-center">
            <img src={titleImage} alt={title} width={135} height={19} />
          </h2>
          <p className="text-body-14r text-alba-gray-700 self-end pb-0.5">{description}</p>
        </div>
        {/* 이동할 화면이 정해지지 않아 모양만 구현했습니다. */}
        <button
          type="button"
          className="text-body-14r text-alba-gray-700 focus-visible:outline-alba-blue-600 flex cursor-pointer items-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          전체보기
          <img src={chevronRightSmallIcon} alt="" width={10} height={24} />
        </button>
      </div>

      {chips}

      <ul className="flex gap-[22px] pb-5">
        {jobs.map((job) => (
          <li key={job.id} className="w-[297px] shrink-0">
            <JobCard job={job} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecommendSection;
