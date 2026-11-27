import { useQuery } from '@tanstack/react-query';
import { resumeRecommendationOptions } from '../apis/resumeRecommendation.ts';
import type { ResumeRecommendationRequest } from '../types/resumeRecommendation.ts';

export function useResumeRecommendations(
  params: ResumeRecommendationRequest,
  memberId?: string,
  enabled = true,
) {
  return useQuery({
    ...resumeRecommendationOptions(params, memberId),
    enabled,
  });
}
