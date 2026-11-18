import { client } from './client.ts';

type JobFilterOption = { code: string; name: string; parentCode: string | null };

export type JobFilterOptions = {
  regions: JobFilterOption[];
  categories: JobFilterOption[];
  payConditions: { code: string; name: string }[];
  workdays: { code: string; name: string }[];
};

export type ApiJob = {
  jobId: number;
  title: string;
  companyName: string;
  regionName: string;
  dong: string | null;
  fullAddress: string | null;
  nearbySubway: string | null;
  categoryName: string;
  payType: string | null;
  payAmount: number | null;
  workdays: string[];
  startTime: string | null;
  endTime: string | null;
  workPeriod: string | null;
  applyMethod: string | null;
  publishedAt: string;
  deadline: string | null;
  daysNegotiable: boolean;
  timeNegotiable: boolean;
  closed: boolean;
};

export type JobSearchResponse = {
  page: number;
  totalCount: number;
  totalPages: number;
  groups: { exposureType: 'PREMIUM' | 'LIGHT' | 'NORMAL'; jobs: ApiJob[] }[];
};

async function getJobData<T>(path: string, signal: AbortSignal, params?: URLSearchParams) {
  const { data } = await client.get<{ status: number; data: T }>(path, {
    baseURL: '/',
    params,
    signal,
  });
  if (data?.status !== 200 || !data.data) throw new Error('공고 API 응답을 확인할 수 없습니다.');
  return data.data;
}

export function getJobFilterOptions(signal: AbortSignal) {
  return getJobData<JobFilterOptions>('/api/v1/jobs/filters', signal);
}

export function getJobSearchResults(params: URLSearchParams, signal: AbortSignal) {
  return getJobData<JobSearchResponse>('/api/v1/jobs', signal, params);
}
