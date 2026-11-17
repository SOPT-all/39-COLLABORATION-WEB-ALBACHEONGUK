import type { ResumeRecommendationData } from '../../types/resumeRecommendation.ts';
import SearchErrorIllustration from './SearchErrorIllustration.tsx';
import ResumeSelector from '../../components/ResumeSelector.tsx';
import { useQaResumeScenario } from '../../hooks/useQaResumeScenario.ts';
import SearchJobItem from './SearchJobItem.tsx';
import SearchResumeGuest from './SearchResumeGuest.tsx';
import type { SearchJob } from './searchJobs.ts';
import SearchEmptyIllustration from './SearchEmptyIllustration.tsx';

type SearchResumeMatchProps = {
  items: SearchJob[];
  keyword: string;
  recommendation: ResumeRecommendationData;
  onSelectResume: (id: string) => void;
};

type ResumeHintProps = {
  message: string;
  action: string;
  noMatch?: boolean;
  children?: React.ReactNode;
};

function ResumeHint({ message, action, noMatch = false, children }: ResumeHintProps) {
  return (
    <div className="flex flex-col items-center gap-6 pt-4 text-center">
      <div className="flex w-full flex-col items-center gap-2">
        {noMatch ? <SearchErrorIllustration /> : <SearchEmptyIllustration />}
        <p className="text-body-16r text-alba-gray-700">{message}</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        {children}
        <button
          type="button"
          disabled
          className={`text-body-16b bg-alba-yellow-400 text-alba-black h-10 rounded-full px-5 py-2 ${
            action === '이력서 이어서 작성하기' ? 'w-[192px]' : 'w-[145px]'
          }`}
        >
          {action}
        </button>
      </div>
    </div>
  );
}

function SignedInMatch({ items, recommendation, onSelectResume }: SearchResumeMatchProps) {
  const status =
    recommendation.status === 'NO_RESUME'
      ? 'none'
      : recommendation.status === 'DRAFT_ONLY'
        ? 'draft'
        : 'ready';

  const resumes = recommendation.resumes
    .filter((resume) =>
      status === 'draft' ? resume.status === 'DRAFT' : resume.status === 'COMPLETED',
    )
    .map((resume) => ({
      id: String(resume.resumeId),
      title: resume.title,
      desiredRegion: resume.desiredRegionNames.join(', '),
      updatedAt: resume.modifiedAt.slice(2, 10).replaceAll('-', '.'),
    }));

  const selectedId = String(recommendation.selectedResume?.resumeId ?? '');

  const recommendations = items;

  const hasNoMatch = recommendation.status === 'NO_RECOMMENDATION' || recommendations.length === 0;

  const selector = (
    <ResumeSelector
      resumes={resumes}
      selectedResumeId={selectedId}
      onSelectResume={status === 'ready' ? onSelectResume : undefined}
      showRegion={status === 'ready'}
    />
  );

  return (
    <section aria-labelledby="signed-in-match-title" className="py-8">
      <div className="flex min-h-10 flex-wrap items-center justify-between gap-2">
        <h2 id="signed-in-match-title" className="text-display-20sb text-alba-gray-800">
          이력서 매칭
        </h2>
        {status === 'ready' && !hasNoMatch && selector}
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
          {recommendation.status === 'NO_RECOMMENDATION' || recommendations.length === 0 ? (
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
  recommendation,
  onSelectResume,
}: SearchResumeMatchProps) {
  const { isSignedIn } = useQaResumeScenario();

  return isSignedIn && recommendation.status !== 'GUEST' ? (
    <SignedInMatch
      items={items}
      keyword={keyword}
      recommendation={recommendation}
      onSelectResume={onSelectResume}
    />
  ) : (
    <SearchResumeGuest keyword={keyword} />
  );
}

export default SearchResumeMatch;
