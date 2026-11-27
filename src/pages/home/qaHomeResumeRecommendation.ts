import type { useQaResumeScenario } from '../../hooks/useQaResumeScenario.ts';
import type { ResumeRecommendationData } from '../../types/resumeRecommendation.ts';
import { QA_RESUMES } from '../../data/qaResumes.ts';
import { getQaResumeRecommendation } from '../../utils/qaResumeRecommendation.ts';
import { HOME_MATCH_JOBS } from './homeResumeFixtures.ts';

type QaScenario = ReturnType<typeof useQaResumeScenario>['qa'];

export async function getQaHomeRecommendation(
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

  const scenario = getQaResumeRecommendation(qa, resumeId);
  if (scenario) return scenario;

  const resumes = QA_RESUMES.filter((resume) => resume.status === 'COMPLETED');
  const selectedResume = resumes.find((resume) => resume.resumeId === resumeId) ?? resumes[0];
  const jobs = selectedResume.resumeId === 2 ? HOME_MATCH_JOBS.slice(1) : HOME_MATCH_JOBS;

  return {
    status: 'OK',
    selectedResume,
    resumes,
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
