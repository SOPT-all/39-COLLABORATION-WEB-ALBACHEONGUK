import type { ApiJob, JobSearchResponse } from '../../apis/searchJobs.ts';
import type { SearchJob } from './searchJobs.ts';

const PAY_LABELS: Partial<Record<string, string>> = {
  HOURLY: '시급',
  DAILY: '일급',
  WEEKLY: '주급',
  MONTHLY: '월급',
  YEARLY: '연봉',
  PER_TASK: '건별',
  PER_CASE: '건별',
};

const WEEKDAY_LABELS: Partial<Record<string, string>> = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일',
};

function mapJob(
  item: ApiJob,
  exposure: JobSearchResponse['groups'][number]['exposureType'],
): SearchJob {
  const days = (item.workdays ?? [])
    .map((day) => WEEKDAY_LABELS[day])
    .filter((day) => day !== undefined);
  const workDays = item.daysNegotiable ? '요일 협의' : days.join('·') || '정보 없음';
  const workHours = item.timeNegotiable
    ? '시간 협의'
    : item.startTime && item.endTime
      ? item.startTime.slice(0, 5) + '~' + item.endTime.slice(0, 5)
      : '정보 없음';

  return {
    job: {
      id: String(item.jobId),
      companyName: item.companyName,
      location: [item.regionName, item.dong].filter(Boolean).join(' '),
      title: item.title,
      workDays,
      workHours,
      deadlineDate: item.deadline,
      postedAt: item.publishedAt,
      salaryType: item.payType ? (PAY_LABELS[item.payType] ?? '') : '',
      salaryText: item.payAmount?.toLocaleString('ko-KR') ?? '',
      isClosed: item.closed,
    },
    sido: '',
    district: '',
    category: item.categoryName ?? '',
    subcategory: item.categoryName ?? '',
    period: item.workPeriod ?? '',
    days,
    address: item.fullAddress ?? '',
    nearbySubway: item.nearbySubway ?? undefined,
    applyMethod: item.applyMethod ?? undefined,
    tier: exposure === 'PREMIUM' ? 'premium' : exposure === 'LIGHT' ? 'light' : undefined,
  };
}

export function mapSearchResults(data: JobSearchResponse) {
  return {
    items: data.groups.flatMap(({ jobs, exposureType }) =>
      jobs.map((job) => mapJob(job, exposureType)),
    ),
    total: data.totalCount,
    page: data.page,
    pageCount: data.totalPages,
  };
}
