import SearchResumeMatch from './SearchResumeMatch.tsx';
import SearchResumeGuest from './SearchResumeGuest.tsx';
import SearchResultsPending from './SearchResultsPending.tsx';
import resumeMatchText from '../../assets/text/home/resume-match.svg';
import type { SearchRecommendationState } from './useSearchRecommendation.ts';

type SearchRecommendationSectionProps = {
  visible: boolean;
  keyword: string;
  resetKey: string;
  recommendation: SearchRecommendationState;
};

function SearchRecommendationSection({
  visible,
  keyword,
  resetKey,
  recommendation,
}: SearchRecommendationSectionProps) {
  return (
    visible && (
      <>
        {!recommendation.isSignedIn && <SearchResumeGuest keyword={keyword} />}

        {recommendation.isSignedIn && !recommendation.isError && recommendation.isPending && (
          <section className="py-8">
            <h2 className="mb-4 flex h-7 items-center">
              <img src={resumeMatchText} alt="이력서 매칭" width={93} height={19} />
            </h2>
            <SearchResultsPending rowCount={3} />
          </section>
        )}

        {/* 추천 조회에 실패한 상태 */}
        {recommendation.isSignedIn && recommendation.isError && (
          <section className="py-8">
            <h2 className="mb-4 flex h-7 items-center">
              <img src={resumeMatchText} alt="이력서 매칭" width={93} height={19} />
            </h2>
            <SearchResultsPending onRetry={recommendation.retry} />
          </section>
        )}

        {recommendation.isSignedIn &&
          !recommendation.isPending &&
          !recommendation.isError &&
          recommendation.data && (
            <SearchResumeMatch
              key={resetKey}
              keyword={keyword}
              items={recommendation.jobs}
              recommendation={recommendation.data}
              onSelectResume={recommendation.selectResume}
            />
          )}
      </>
    )
  );
}

export default SearchRecommendationSection;
