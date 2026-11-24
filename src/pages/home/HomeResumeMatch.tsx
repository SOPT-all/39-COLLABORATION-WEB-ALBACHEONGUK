import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import resumeMatchImage from '../../assets/images/search/resume-match.png';
import loginRecommendText from '../../assets/text/button/login-recommend.svg';
import resumeMatchText from '../../assets/text/home/resume-match.svg';
import JobCard from '../../components/JobCard.tsx';
import type { JobCardData } from '../../components/JobCard.tsx';
import ResumeSelector from '../../components/ResumeSelector.tsx';
import ScrapButton from '../../components/ScrapButton.tsx';
import { useJobScrap } from '../../hooks/useJobScrap.ts';
import { useQaResumeScenario } from '../../hooks/useQaResumeScenario.ts';
import TextImage from '../../components/TextImage.tsx';
import SearchEmptyIllustration from '../search/SearchEmptyIllustration.tsx';
import SearchErrorIllustration from '../search/SearchErrorIllustration.tsx';
import { getResumeRecommendations } from '../../apis/resumeRecommendation.ts';
import type { ResumeRecommendationData } from '../../types/resumeRecommendation.ts';
import { HOME_MATCH_JOBS, HOME_RESUMES } from './homeResumeFixtures.ts';
import { toMatchJobCard, toResume } from './mapResumeRecommendation.ts';

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

type QaScenario = ReturnType<typeof useQaResumeScenario>['qa'];

async function getQaRecommendation(
  qa: Exclude<QaScenario, null | 'guest'>,
  resumeId: number | undefined,
  shouldFail: boolean,
  signal: AbortSignal,
): Promise<ResumeRecommendationData> {
  if (qa === 'match-loading') {
    await new Promise<void>((resolve) => window.setTimeout(resolve, 3500));
    signal.throwIfAborted();
  }
  if (shouldFail) throw new Error('QA 추천 조회 오류');

  const resumes = HOME_RESUMES.map((resume, index) => ({
    resumeId: index + 1,
    title: resume.title,
    status: 'COMPLETED' as const,
    modifiedAt: `20${resume.updatedAt?.replaceAll('.', '-') ?? ''}`,
    desiredRegionNames: [resume.desiredRegion],
  }));
  const selectedResume = resumes.find((resume) => resume.resumeId === resumeId) ?? resumes[0];
  const status =
    qa === 'no-resume'
      ? 'NO_RESUME'
      : qa === 'draft-resume'
        ? 'DRAFT_ONLY'
        : qa === 'no-match'
          ? 'NO_RECOMMENDATION'
          : 'OK';
  const jobs =
    status === 'OK'
      ? selectedResume.resumeId === 2
        ? HOME_MATCH_JOBS.slice(1)
        : HOME_MATCH_JOBS
      : [];

  return {
    status,
    selectedResume: status === 'NO_RESUME' ? null : selectedResume,
    resumes: status === 'NO_RESUME' ? [] : resumes,
    jobs: jobs.map((job, index) => ({
      jobId: index + 1,
      exposureType: 'NORMAL',
      title: job.title,
      companyName: '',
      imageUrl: job.imageUrl ?? '',
      regionName: job.address,
      dong: null,
      nearbySubway: null,
      categoryName: '',
      payType: job.salaryType === '월급' ? 'MONTHLY' : 'HOURLY',
      payAmount: Number(job.salaryText.replaceAll(',', '')),
      workPeriod: null,
      workdays: [],
      daysNegotiable: false,
      startTime: null,
      endTime: null,
      timeNegotiable: false,
      applyMethod: null,
      publishedAt: job.postedAt,
      deadline: null,
      closed: false,
      postedLabel: '',
      deadlineLabel: '',
    })),
  };
}

function HomeResumeMatch() {
  const { isSignedIn, qa } = useQaResumeScenario();
  const [selectedResumeId, setSelectedResumeId] = useState<number | undefined>();
  const [hasRetried, setHasRetried] = useState(false);
  const isQaSimulation = qa !== null && qa !== 'guest';
  const shouldFailQa = qa === 'match-error' && !hasRetried;
  // 목업 로그인 상태면 회원 번호 '1'을 보내고, 비로그인이면 보내지 않습니다. (#80 공용 함수 기준)
  const memberId = isSignedIn ? '1' : undefined;

  function getRecommendation(resumeId: number | undefined, signal: AbortSignal) {
    return isQaSimulation
      ? getQaRecommendation(qa, resumeId, shouldFailQa, signal)
      : getResumeRecommendations({ resumeId }, memberId);
  }

  const queryOptions = {
    // 비로그인은 서버를 부르지 않고 바로 로그인 안내를 보여줍니다.
    enabled: isSignedIn,
    retry: false,
    refetchOnWindowFocus: false,
  } as const;

  const baseQuery = useQuery({
    ...queryOptions,
    queryKey: ['resume-recommendation', 'home', memberId, undefined, qa, shouldFailQa],
    queryFn: ({ signal }) => getRecommendation(undefined, signal),
  });

  const query = useQuery({
    ...queryOptions,
    queryKey: ['resume-recommendation', 'home', memberId, selectedResumeId, qa, shouldFailQa],
    // 이력서를 바꿔 다시 불러오는 동안 이전 추천을 유지해 화면이 깜빡이지 않게 합니다.
    placeholderData: keepPreviousData,
    queryFn: ({ signal }) => getRecommendation(selectedResumeId, signal),
  });

  const data = query.data;
  const resumes = (baseQuery.data?.resumes ?? [])
    .filter((resume) => resume.status === 'COMPLETED')
    .map(toResume);
  const selectedResumeKey = String(
    selectedResumeId ?? data?.selectedResume?.resumeId ?? baseQuery.data?.selectedResume?.resumeId,
  );
  const selectedResume = data?.selectedResume ? toResume(data.selectedResume) : undefined;
  const jobs = (data?.jobs ?? []).map(toMatchJobCard);
  const isMatched = isSignedIn && data?.status === 'OK' && jobs.length > 0;
  const showResumeRow = isSignedIn && (query.isPending || query.isError || isMatched);
  const canSelectResume = showResumeRow && resumes.some(({ id }) => id === selectedResumeKey);

  function handleRetry() {
    setHasRetried(true);
    void baseQuery.refetch();
    void query.refetch();
  }

  function handleSelectResume(id: string) {
    setSelectedResumeId(Number(id));
  }

  let content;
  if (isSignedIn && query.isPending) content = <MatchSkeleton />;
  else if (isSignedIn && query.isError) {
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
    // 서버 응답 상태(status)에 맞는 안내를 보여줍니다. OK인데 공고가 없으면 추천 없음으로 봅니다.
    const variant =
      !isSignedIn || data?.status === 'GUEST'
        ? 'guest'
        : data?.status === 'NO_RESUME'
          ? 'none'
          : data?.status === 'DRAFT_ONLY'
            ? 'draft'
            : 'no-match';
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
          {variant === 'draft' && selectedResume && (
            <ResumeSelector
              resumes={[selectedResume]}
              selectedResumeId={selectedResume.id}
              showRegion={false}
            />
          )}
          <button
            type="button"
            disabled
            className="text-body-16b bg-alba-yellow-400 text-alba-black inline-flex h-10 items-center justify-center rounded-full px-5"
          >
            {variant === 'guest' ? (
              <TextImage src={loginRecommendText} label={action} width={136} height={15} />
            ) : (
              action
            )}
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
      <div
        className={`flex flex-wrap items-center justify-between gap-4 ${showResumeRow ? 'min-h-[52px]' : 'min-h-7'}`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <h2 id="home-match-title" className="flex h-7 shrink-0 items-center">
            <img src={resumeMatchText} alt="이력서 매칭" width={93} height={19} />
          </h2>
          {showResumeRow && (
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
