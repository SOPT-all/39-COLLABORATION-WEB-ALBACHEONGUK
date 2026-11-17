import type { JobCardData } from '../../components/JobCard.tsx';
import type { Resume } from '../../components/ResumeSelector.tsx';
import type { RecommendedJob, ResumeSummary } from '../../types/resumeRecommendation.ts';

const PAY_LABELS: Partial<Record<string, string>> = {
  HOURLY: '시급',
  DAILY: '일급',
  WEEKLY: '주급',
  MONTHLY: '월급',
  YEARLY: '연봉',
  PER_CASE: '건별',
};

export function toMatchJobCard(job: RecommendedJob): JobCardData {
  return {
    id: String(job.jobId),
    title: job.title,
    address: [job.regionName, job.dong].filter(Boolean).join(' '),
    salaryType: job.payType ? (PAY_LABELS[job.payType] ?? '') : '',
    salaryText: job.payAmount?.toLocaleString('ko-KR') ?? '',
    postedAt: job.publishedAt,
    imageUrl: job.imageUrl || undefined,
  };
}

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
