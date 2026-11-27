import { QA_RESUMES } from '../../data/qaResumes.ts';
import type { ResumeRecommendationData } from '../../types/resumeRecommendation.ts';

// Only pass qa values validated by useQaResumeScenario's preview environment gate.
export function getQaResumeRecommendation(
  qa: string | null,
  resumeId?: number,
): ResumeRecommendationData | undefined {
  if (qa === 'no-resume') {
    return { status: 'NO_RESUME', selectedResume: null, resumes: [], jobs: [] };
  }

  if (qa === 'draft-resume') {
    const resumes = QA_RESUMES.filter((resume) => resume.status === 'DRAFT');
    return { status: 'DRAFT_ONLY', selectedResume: resumes[0], resumes, jobs: [] };
  }

  if (qa === 'no-match') {
    const resumes = QA_RESUMES.filter((resume) => resume.status === 'COMPLETED');
    const selectedResume = resumes.find((resume) => resume.resumeId === resumeId) ?? resumes[0];
    return { status: 'NO_RECOMMENDATION', selectedResume, resumes, jobs: [] };
  }

  return undefined;
}
