import { useQuery } from '@tanstack/react-query';
import { getResumeRecommendations } from '../../apis/resumeRecommendation.ts';
import type { ResumeRecommendationRequest } from '../../types/resumeRecommendation.ts';

export function useResumeRecommendations(
  params: ResumeRecommendationRequest,
  memberId?: string,
  enabled = true,
) {
  return useQuery({
    queryKey: ['resume-recommendations', params, memberId],
    queryFn: () => getResumeRecommendations(params, memberId),
    enabled,
  });
}
