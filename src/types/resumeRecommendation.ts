type Workday = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
export type WorkPeriod =
  | 'ONE_DAY'
  | 'UNDER_ONE_WEEK'
  | 'ONE_WEEK_TO_ONE_MONTH'
  | 'ONE_TO_THREE_MONTHS'
  | 'THREE_TO_SIX_MONTHS'
  | 'SIX_MONTHS_TO_ONE_YEAR'
  | 'OVER_ONE_YEAR';

type PayType = 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | 'PER_CASE';

export type ResumeRecommendationRequest = {
  resumeId?: number;
  keyword?: string;
  regionIds?: number[];
  categoryCodes?: string[];
  workdays?: Workday[];
  workPeriod?: WorkPeriod;
  payType?: PayType;
};

export type ResumeSummary = {
  resumeId: number;
  title: string;
  status: 'COMPLETED' | 'DRAFT' | 'NOT_APPLICABLE';
  modifiedAt: string;
  desiredRegionNames: string[];
};

export type RecommendedJob = {
  jobId: number;
  exposureType: 'PREMIUM' | 'LIGHT' | 'NORMAL';
  title: string;
  companyName: string;
  imageUrl: string;
  regionName: string;
  dong: string;
  nearbySubway: string;
  categoryName: string;
  payType: PayType;
  payAmount: number;
  workPeriod: string;
  workdays: Workday[];
  daysNegotiable: boolean;
  startTime: string;
  endTime: string;
  timeNegotiable: boolean;
  applyMethod: string;
  publishedAt: string;
  deadline: string;
  closed: boolean;
  postedLabel: string;
  deadlineLabel: string;
};

export type ResumeRecommendationData = {
  status: 'OK' | 'NO_RESUME' | 'DRAFT_ONLY' | 'NO_RECOMMENDATION' | 'GUEST';
  selectedResume: ResumeSummary | null;
  resumes: ResumeSummary[];
  jobs: RecommendedJob[];
};

export type ResumeRecommendationResponse = {
  status: number;
  code: string;
  message: string;
  data: ResumeRecommendationData;
};
