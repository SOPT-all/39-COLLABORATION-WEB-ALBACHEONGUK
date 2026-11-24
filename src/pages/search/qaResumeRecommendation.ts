import type { ResumeRecommendationData, ResumeSummary } from '../../types/resumeRecommendation.ts';

const QA_RESUME: ResumeSummary = {
  resumeId: 1,
  title: '26년 겨울 알바 이력서',
  status: 'COMPLETED',
  modifiedAt: '2026-11-15T09:00:00',
  desiredRegionNames: ['서울 성동구'],
};

// Only pass qa values validated by useQaResumeScenario's preview environment gate.
export function getQaResumeRecommendation(qa: string | null): ResumeRecommendationData | undefined {
  if (qa === 'no-resume') {
    return { status: 'NO_RESUME', selectedResume: null, resumes: [], jobs: [] };
  }

  if (qa === 'draft-resume') {
    const draft: ResumeSummary = { ...QA_RESUME, status: 'DRAFT' };
    return { status: 'DRAFT_ONLY', selectedResume: draft, resumes: [draft], jobs: [] };
  }

  if (qa === 'no-match') {
    return {
      status: 'NO_RECOMMENDATION',
      selectedResume: QA_RESUME,
      resumes: [QA_RESUME],
      jobs: [],
    };
  }

  return undefined;
}
