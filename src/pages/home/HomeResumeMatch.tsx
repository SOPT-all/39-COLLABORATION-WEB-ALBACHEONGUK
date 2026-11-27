import { useHomeResumeMatch } from './useHomeResumeMatch.ts';
import HomeResumeNotice from './HomeResumeNotice.tsx';
import resumeMatchText from '../../assets/text/home/resume-match.svg';
import JobCard from '../../components/JobCard.tsx';
import type { JobCardData } from '../../components/JobCard.tsx';
import ResumeSelector from '../../components/ResumeSelector.tsx';
import ScrapButton from '../../components/ScrapButton.tsx';
import { useJobScrap } from '../../hooks/useJobScrap.ts';
import SearchErrorIllustration from '../search/SearchErrorIllustration.tsx';

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
          <div key={index} className="border-alba-gray-300 h-[350px] rounded-[15px] border p-5">
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
  const {
    isSignedIn,
    resumes,
    selectedResumeKey,
    selectedResume,
    jobs,
    isMatched,
    isNoMatch,
    showResumeRow,
    canSelectResume,
    noticeVariant,
    isPending,
    isError,
    handleRetry,
    handleSelectResume,
  } = useHomeResumeMatch();
  let content;
  if (isSignedIn && isPending) content = <MatchSkeleton />;
  else if (isSignedIn && isError) {
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
          onClick={handleRetry}
        >
          다시 시도
        </button>
      </div>
    );
  } else if (isMatched) {
    content = (
      <ul className="grid gap-6 md:grid-cols-3">
        {jobs.map((job) => (
          <MatchCard key={job.id} job={job} />
        ))}
      </ul>
    );
  } else {
    content = <HomeResumeNotice variant={noticeVariant} selectedResume={selectedResume} />;
  }

  return (
    <section
      aria-labelledby="home-match-title"
      className="mx-auto flex w-[calc(100%-2rem)] max-w-[1260px] flex-col gap-6 pt-12 pb-[60px]"
    >
      <div
        className={`flex flex-wrap items-center justify-between gap-4 ${showResumeRow ? 'min-h-[52px]' : 'min-h-7'}`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <h2 id="home-match-title" className="flex h-7 shrink-0 items-center">
            <img src={resumeMatchText} alt="이력서 매칭" width={93} height={19} />
          </h2>
          {showResumeRow && !isNoMatch && (
            <p className="text-body-14r text-alba-gray-700">
              내 이력서로 바로 지원할 수 있는 공고를 추천해 드려요!
            </p>
          )}
        </div>
        {canSelectResume && (
          <ResumeSelector
            resumes={resumes}
            selectedResumeId={selectedResumeKey}
            onSelectResume={handleSelectResume}
          />
        )}
      </div>
      {content}
    </section>
  );
}

export default HomeResumeMatch;
