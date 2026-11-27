import type { Resume } from '../components/ResumeSelector.tsx';
import type { ResumeSummary } from '../types/resumeRecommendation.ts';

function formatModifiedAt(modifiedAt: string) {
  const [year, month, day] = modifiedAt.slice(0, 10).split('-');
  return year && month && day ? `${year.slice(2)}.${month}.${day}` : undefined;
}

export function toResume(resume: ResumeSummary): Resume {
  return {
    id: String(resume.resumeId),
    title: resume.title,
    desiredRegion: resume.desiredRegionNames.join(', '),
    updatedAt: formatModifiedAt(resume.modifiedAt),
  };
}
