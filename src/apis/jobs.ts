import type { JobSearchParams, JobSummary } from '../types/job.ts';

const demoJobs: JobSummary[] = [
  { id: 1, title: '카페 주말 아르바이트', companyName: '예시 카페' },
  { id: 2, title: '편의점 평일 아르바이트', companyName: '예시 편의점' },
];

// 초기 세팅 확인용
export async function getJobs({ keyword }: JobSearchParams): Promise<JobSummary[]> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 500);
  });

  // 오류 화면 확인 위한 연습용 분기
  if (keyword === '오류테스트') {
    throw new Error('연습용 조회 오류입니다.');
  }

  return demoJobs.filter((job) => `${job.title} ${job.companyName}`.includes(keyword));
}
