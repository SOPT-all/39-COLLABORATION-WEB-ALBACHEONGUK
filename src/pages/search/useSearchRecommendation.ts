import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MOCK_MEMBER_ID } from '../../apis/client.ts';
import { getJobFilterOptions } from '../../apis/searchJobs.ts';
import { useQaResumeScenario } from '../../hooks/useQaResumeScenario.ts';
import { useResumeRecommendations } from '../../hooks/useResumeRecommendations.ts';
import { getQaResumeRecommendation } from '../../utils/qaResumeRecommendation.ts';
import { mapRecommendedJobs } from './mapRecommendedJob.ts';
import { mapResumeRecommendationParams } from './resumeRecommendationParams.ts';

export function useSearchRecommendation(params: URLSearchParams) {
  const { isSignedIn, qa } = useQaResumeScenario();
  const memberId = isSignedIn ? MOCK_MEMBER_ID : undefined;
  const [selectedResumeId, setSelectedResumeId] = useState<number | undefined>(undefined);
  const qaRecommendation = getQaResumeRecommendation(qa, selectedResumeId);

  const filterOptionsQuery = useQuery({
    queryKey: ['job-search', 'filter-options'],
    queryFn: ({ signal }) => getJobFilterOptions(signal),
    enabled: isSignedIn && !qaRecommendation,
    staleTime: 5 * 60_000,
  });

  const recommendationQuery = useResumeRecommendations(
    mapResumeRecommendationParams(params, filterOptionsQuery.data, selectedResumeId),
    memberId,
    isSignedIn && !qaRecommendation && filterOptionsQuery.isSuccess,
  );

  const recommendationData = qaRecommendation ?? recommendationQuery.data;
  const recommendedJobs = mapRecommendedJobs(recommendationData?.jobs ?? []);
  const isRecommendationPending = !qaRecommendation && recommendationQuery.isPending;
  const hasRecommendationError =
    !qaRecommendation &&
    (recommendationQuery.isError || (isSignedIn && filterOptionsQuery.isError));
  function retry() {
    if (filterOptionsQuery.isError) void filterOptionsQuery.refetch();
    else void recommendationQuery.refetch();
  }

  return {
    isSignedIn,
    data: recommendationData,
    jobs: recommendedJobs,
    isPending: isRecommendationPending,
    isError: hasRecommendationError,
    retry,
    selectResume: (id: string) => setSelectedResumeId(Number(id)),
  };
}

export type SearchRecommendationState = ReturnType<typeof useSearchRecommendation>;
