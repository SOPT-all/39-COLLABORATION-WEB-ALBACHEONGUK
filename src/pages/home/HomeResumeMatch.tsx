import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import resumeMatchImage from '../../assets/images/search/resume-match.png';
import JobCard from '../../components/JobCard.tsx';
import type { JobCardData } from '../../components/JobCard.tsx';
import ResumeSelector from '../../components/ResumeSelector.tsx';
import ScrapButton from '../../components/ScrapButton.tsx';
import { useJobScrap } from '../../hooks/useJobScrap.ts';
import { useQaResumeScenario } from '../../hooks/useQaResumeScenario.ts';
import SearchEmptyIllustration from '../search/SearchEmptyIllustration.tsx';
import SearchErrorIllustration from '../search/SearchErrorIllustration.tsx';
import { HOME_MATCH_JOBS, HOME_RESUMES } from './homeResumeFixtures.ts';

const OUTLINE_BUTTON =
  'border-alba-gray-300 text-alba-gray-500 text-body-16b h-[46px] rounded-lg border bg-alba-white';

function MatchCard({ job }: { job: JobCardData }) {
  const { isScrapped, toggleScrap } = useJobScrap(job.id);
  return (
    <li className="flex min-w-0 flex-col gap-4">
      <JobCard
        job={job}
        variant="match"
        action={
          <ScrapButton
            label={job.title + ' 스크랩'}
            isScrapped={isScrapped}
            onToggle={toggleScrap}
          />
        }
      />
      <button type="button" disabled className={OUTLINE_BUTTON}>
        지원하기
      </button>
    </li>
  );
}

function MatchSkeleton() {
  return (
    <div role="status">
      <span className="sr-only">추천 공고를 불러오는 중입니다</span>
      <div aria-hidden="true" className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="border-alba-gray-300 rounded-[15px] border p-5">
            <div className="bg-alba-gray-200 h-[200px] rounded-xl" />
            <div className="bg-alba-gray-200 mt-5 h-5 w-3/4 rounded" />
            <div className="bg-alba-gray-200 mt-3 h-4 w-1/2 rounded" />
            <div className="mt-5 flex gap-6">
              <div className="bg-alba-gray-200 h-[18px] w-[90px] rounded" />
              <div className="bg-alba-gray-200 h-[18px] w-[69px] rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomeResumeMatch() {
  const { isSignedIn, resumeStatus, qa } = useQaResumeScenario();
  const [selectedId, setSelectedId] = useState(HOME_RESUMES[0].id);
  const [hasRetried, setHasRetried] = useState(false);
  const isReady = isSignedIn && resumeStatus === 'ready';
  const resume = HOME_RESUMES.find(({ id }) => id === selectedId) ?? HOME_RESUMES[0];
  const firstError = qa === 'match-error' && !hasRetried;
  const query = useQuery({
    queryKey: ['home-resume', resume.id, qa, firstError],
    enabled: isReady,
    retry: false,
    refetchOnWindowFocus: false,
    queryFn: async ({ signal }) => {
      if (qa === 'match-loading') {
        await new Promise<void>((resolve) => window.setTimeout(resolve, 3500));
        signal.throwIfAborted();
      }
      if (firstError) throw new Error('QA 추천 조회 오류');
      if (qa === 'no-match') return [];
      return resume.id === 'weekend' ? HOME_MATCH_JOBS.slice(1) : HOME_MATCH_JOBS;
    },
  });

  let content;
  if (isReady && query.isPending) content = <MatchSkeleton />;
  else if (isReady && query.isError) {
    content = (
      <div className="flex flex-col items-center gap-6 pt-4">
        <div className="flex flex-col items-center gap-2">
          <SearchErrorIllustration />
          <p role="alert" className="text-body-16r text-alba-gray-700">
            추천 공고를 불러오지 못했어요.
          </p>
        </div>
        <button
          type="button"
          className={OUTLINE_BUTTON + ' w-40 cursor-pointer'}
          onClick={() => setHasRetried(true)}
        >
          다시 시도
        </button>
      </div>
    );
  } else if (isReady && query.data?.length) {
    content = (
      <ul className="grid gap-6 md:grid-cols-3">
        {query.data.map((job) => (
          <MatchCard key={job.id} job={job} />
        ))}
      </ul>
    );
  } else {
    const variant = !isSignedIn ? 'guest' : resumeStatus === 'ready' ? 'no-match' : resumeStatus;
    const copy = {
      guest: [
        '로그인하고 내 이력서로 지원할 수 있는 추천 공고를 받아보세요',
        '로그인하고 추천 받기',
      ],
      none: ['이력서를 작성하고 지원 가능한 공고를 추천받으세요', '이력서 작성하기'],
      draft: ['이력서를 완성하고 지원 가능한 공고를 추천받으세요', '이력서 이어서 작성하기'],
      'no-match': ['현재 이력서와 조건에 맞는 추천 공고가 없어요', '이력서 수정하기'],
    };
    const [message, action] = copy[variant];

    content = (
      <div className="flex flex-col items-center gap-6 pt-4 text-center">
        <div className="flex flex-col items-center gap-2">
          {variant === 'guest' ? (
            <img
              src={resumeMatchImage}
              width={140}
              height={168}
              alt=""
              className="h-[168px] w-[140px] object-cover"
            />
          ) : variant === 'no-match' ? (
            <SearchErrorIllustration />
          ) : (
            <SearchEmptyIllustration />
          )}
          <p className="text-body-16r text-alba-gray-700">{message}</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          {variant === 'draft' && (
            <ResumeSelector
              resumes={HOME_RESUMES.slice(0, 1)}
              selectedResumeId={HOME_RESUMES[0].id}
              showRegion={false}
            />
          )}
          <button
            type="button"
            disabled
            className="text-body-16b bg-alba-yellow-400 text-alba-black h-10 rounded-full px-5"
          >
            {action}
          </button>
        </div>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="home-match-title"
      className="mx-auto flex w-[calc(100%-2rem)] max-w-[1260px] flex-col gap-6 pt-12 pb-[60px]"
    >
      <div className="flex min-h-7 flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <h2 id="home-match-title" className="text-display-20sb">
            이력서 매칭
          </h2>
          {isReady && qa !== 'no-match' && (
            <p className="text-body-14r text-alba-gray-700">
              내 이력서로 바로 지원할 수 있는 공고를 추천해 드려요!
            </p>
          )}
        </div>
        {isReady && qa !== 'no-match' && (
          <ResumeSelector
            resumes={HOME_RESUMES}
            selectedResumeId={resume.id}
            onSelectResume={setSelectedId}
          />
        )}
      </div>
      {content}
    </section>
  );
}

export default HomeResumeMatch;
