import { useQuery } from '@tanstack/react-query';
import { getJobs } from '../apis/jobs.ts';
import type { JobSearchParams } from '../types/job.ts';

export function useJobs(params: JobSearchParams) {
  return useQuery({
    queryKey: ['jobs', 'setup-demo', params],
    queryFn: () => getJobs(params),
    staleTime: 30_000,
    retry: false,
  });
}
