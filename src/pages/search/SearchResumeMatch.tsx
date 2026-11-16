import { useState } from 'react';
import SearchEmptyIllustration from './SearchEmptyIllustration.tsx';
import SearchErrorIllustration from './SearchErrorIllustration.tsx';
import ResumeSelector from '../../components/ResumeSelector.tsx';
import type { Resume } from '../../components/ResumeSelector.tsx';
import { useMockSessionStore } from '../../stores/useMockSessionStore.ts';
import SearchJobItem from './SearchJobItem.tsx';
import SearchResumeGuest from './SearchResumeGuest.tsx';
import type { SearchJob } from './searchJobs.ts';

const SAMPLE_RESUMES: Resume[] = [
  { id: 'winter', title: '26년 겨울 알바 이력서', desiredRegion: '성동구', updatedAt: '26.11.15' },
  { id: 'weekend', title: '주말 알바 이력서', desiredRegion: '강남구', updatedAt: '26.11.10' },
];

type ResumeHintProps = {
  message: string;
  action: string;
  noMatch?: boolean;
  children?: React.ReactNode;
};

function ResumeHint({ message, action, noMatch = false, children }: ResumeHintProps) {
  return (
    <div className={`flex flex-col items-center gap-6 text-center ${noMatch ? 'pt-2' : 'pt-4'}`}>
      <div className="flex w-full flex-col items-center gap-2">
        {noMatch ? <SearchErrorIllustration /> : <SearchEmptyIllustration />}
        <p className="text-body-16r text-alba-gray-700">{message}</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        {children}
        <button
          type="button"
          disabled
          className="text-body-16b bg-alba-yellow-400 text-alba-black rounded-full h-10 px-5 py-2"
        >
          {action}
        </button>
      </div>
    </div>
  );
}

function SignedInMatch({
  items,
  hasSearchRegion,
}: {
  items: SearchJob[];
  hasSearchRegion: boolean;
}) {
  const status = useMockSessionStore((state) => state.resumeStatus);
  const [selectedId, setSelectedId] = useState(SAMPLE_RESUMES[0].id);
  const resume = SAMPLE_RESUMES.find(({ id }) => id === selectedId) ?? SAMPLE_RESUMES[0];
  const recommendations = items
    .filter(
      ({ job, district }) =>
        !job.isClosed && (hasSearchRegion || district === resume.desiredRegion),
    )
    .toSorted((left, right) => right.job.postedAt.localeCompare(left.job.postedAt))
    .slice(0, 3);
  const selector = (
    <ResumeSelector
      resumes={status === 'draft' ? SAMPLE_RESUMES.slice(0, 1) : SAMPLE_RESUMES}
      selectedResumeId={status === 'draft' ? SAMPLE_RESUMES[0].id : resume.id}
      onSelectResume={setSelectedId}
      showRegion={status === 'ready'}
    />
  );

  return (
    <section aria-labelledby="signed-in-match-title" className="py-8">
      <div className="flex min-h-10 flex-wrap items-center justify-between gap-2">
        <h2 id="signed-in-match-title" className="text-display-20sb text-alba-gray-800">
          이력서 매칭
        </h2>
        {status === 'ready' && selector}
      </div>
      {status === 'none' && (
        <ResumeHint
          message="이력서를 작성하고 지원 가능한 공고를 추천받으세요"
          action="이력서 작성하기"
        />
      )}
      {status === 'draft' && (
        <ResumeHint
          message="이력서를 완성하고 지원 가능한 공고를 추천받으세요"
          action="이력서 이어서 작성하기"
        >
          {selector}
        </ResumeHint>
      )}
      {status === 'ready' && (
        <>
          <p className="text-caption-12r text-alba-gray-600 mt-1 text-right">
            최근 수정일 {resume.updatedAt}
          </p>
          {recommendations.length === 0 ? (
            <ResumeHint
              message="현재 이력서와 조건에 맞는 추천 공고가 없어요"
              action="이력서 수정하기"
              noMatch
            />
          ) : (
            <div aria-label="이력서 추천 공고" className="mt-2">
              {recommendations.map((item) => (
                <SearchJobItem key={item.job.id} item={item} recommended />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

function SearchResumeMatch({
  items,
  keyword,
  hasSearchRegion,
}: {
  items: SearchJob[];
  keyword: string;
  hasSearchRegion: boolean;
}) {
  const isSignedIn = useMockSessionStore((state) => state.isSignedIn);
  return isSignedIn ? (
    <SignedInMatch items={items} hasSearchRegion={hasSearchRegion} />
  ) : (
    <SearchResumeGuest keyword={keyword} />
  );
}

export default SearchResumeMatch;
