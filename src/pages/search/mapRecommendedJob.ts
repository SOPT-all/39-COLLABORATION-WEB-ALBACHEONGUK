import type { RecommendedJob } from '../../types/resumeRecommendation.ts';
import { mapJob } from './mapApiSearchJobs.ts';

export function mapRecommendedJobs(jobs: RecommendedJob[]) {
  return jobs.map((job) => {
    const address = [job.regionName, job.dong].filter(Boolean).join(' ');

    return mapJob(
      {
        ...job,
        fullAddress: address,
      },
      job.exposureType,
    );
  });
}
