import { PAY_LABELS } from '../../data/payTypes.ts';
import type { JobCardData } from '../../components/JobCard.tsx';
import type { RecommendedJob } from '../../types/resumeRecommendation.ts';

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
