// 초기 세팅용 화면 타입입니다. (실제 API 응답 명세 X)
export type JobSummary = {
  id: number;
  title: string;
  companyName: string;
};

export type JobSearchParams = {
  keyword: string;
};
