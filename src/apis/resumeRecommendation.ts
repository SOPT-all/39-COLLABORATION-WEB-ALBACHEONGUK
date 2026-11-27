import { client } from './client.ts';
import type {
  ResumeRecommendationRequest,
  ResumeRecommendationResponse,
} from '../types/resumeRecommendation.ts';

export async function getResumeRecommendations(
  params: ResumeRecommendationRequest,
  memberId?: string,
) {
  const response = await client.get<ResumeRecommendationResponse>(
    '/api/v1/recommendations/resume',
    {
      baseURL: '/',
      params,
      headers: memberId ? { 'X-Member-Id': memberId } : {},
      paramsSerializer: {
        indexes: null,
      },
    },
  );

  return response.data.data;
}

export function resumeRecommendationOptions(
  params: ResumeRecommendationRequest,
  memberId?: string,
) {
  return {
    queryKey: ['resume-recommendations', params, memberId],
    queryFn: () => getResumeRecommendations(params, memberId),
  };
}
