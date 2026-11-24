import type { JobRowData, JobRowVariant } from '../../components/JobRow.tsx';
import type { JobRowDetailsData } from '../../components/JobRowDetails.tsx';

export type JobRowDesignCase = {
  nodeId: string;
  label: string;
  width: number;
  variant: JobRowVariant;
  showThumbnail: boolean;
  expanded: boolean;
  scrapped: boolean;
  closed: boolean;
};

// 원본과 같은 문구로 비교하기 위한 전용 fixture입니다. 실제 API·서비스 데이터가 아닙니다.
export const DESIGN_JOB: JobRowData = {
  id: 'figma-job',
  companyName: '벌툰 아산탕정점',
  location: '충남 아산시 탕정면',
  title: '[벌툰 아산탕정점] 만화카페 파트타이머 모집',
  workDays: '월~금',
  workHours: '18:00~22:00',
  deadlineDate: '2026-11-13',
  postedAt: '2026-11-07',
  isClosed: false,
  salaryType: '시급',
  salaryText: '10,500',
};

export const DESIGN_DETAILS: JobRowDetailsData = {
  category: '유통·판매/편의점',
  address: '서울 동대문구 제기로 131 (한신아파트) 입구상가 1층',
  stations: [
    { id: 'station-1', line: '1', name: '청량리 0.8km', color: 'blue' },
    { id: 'station-jung', line: '중', name: '회기', color: 'green' },
    { id: 'station-6', line: '6', name: '고려대 1.2km', color: 'brown' },
  ],
  workHours: '00:00 ~ 07:00',
  periodAndDays: '3개월 ~ 6개월, 토, 일',
  applicationMethod: '문자지원',
  deadline: '상시모집',
};

const DEFAULT_CASE = {
  width: 800,
  variant: 'default',
  showThumbnail: false,
  expanded: false,
  scrapped: false,
  closed: false,
} as const;

export const JOB_ROW_DESIGN_CASES: JobRowDesignCase[] = [
  { ...DEFAULT_CASE, nodeId: '4030:26723', label: '일반 · 썸네일 없음 · 접힘', width: 796 },
  {
    ...DEFAULT_CASE,
    nodeId: '4030:26845',
    label: '일반 · 썸네일 있음 · 접힘',
    showThumbnail: true,
  },
  {
    ...DEFAULT_CASE,
    nodeId: '4030:26906',
    label: '강조 · 썸네일 있음 · 접힘',
    variant: 'highlighted',
    showThumbnail: true,
  },
  {
    ...DEFAULT_CASE,
    nodeId: '4030:26967',
    label: '강조 · 썸네일 없음 · 접힘',
    variant: 'highlighted',
  },
  {
    ...DEFAULT_CASE,
    nodeId: '4030:27028',
    label: '일반 · 썸네일 없음 · 펼침',
    width: 799,
    expanded: true,
  },
  {
    ...DEFAULT_CASE,
    nodeId: '4030:27055',
    label: '일반 · 썸네일 있음 · 펼침',
    showThumbnail: true,
    expanded: true,
  },
  {
    ...DEFAULT_CASE,
    nodeId: '4030:27082',
    label: '강조 · 썸네일 있음 · 펼침',
    variant: 'highlighted',
    showThumbnail: true,
    expanded: true,
  },
  {
    ...DEFAULT_CASE,
    nodeId: '4030:27109',
    label: '강조 · 썸네일 없음 · 펼침',
    variant: 'highlighted',
    width: 803,
    expanded: true,
  },
  { ...DEFAULT_CASE, nodeId: '4030:26784', label: '일반 · 마감', width: 796, closed: true },
  {
    ...DEFAULT_CASE,
    nodeId: '4030:26480',
    label: '매칭 · 접힘 · 스크랩 해제',
    variant: 'recommended',
    showThumbnail: true,
  },
  {
    ...DEFAULT_CASE,
    nodeId: '4030:26542',
    label: '매칭 · 마감',
    variant: 'recommended',
    showThumbnail: true,
    closed: true,
  },
  {
    ...DEFAULT_CASE,
    nodeId: '4030:26604',
    label: '매칭 · 접힘 · 스크랩 선택',
    variant: 'recommended',
    showThumbnail: true,
    scrapped: true,
  },
  {
    ...DEFAULT_CASE,
    nodeId: '4030:26666',
    label: '매칭 · 펼침 · 스크랩 해제',
    variant: 'recommended',
    showThumbnail: true,
    expanded: true,
  },
  {
    ...DEFAULT_CASE,
    nodeId: '4030:26694',
    label: '매칭 · 펼침 · 스크랩 선택',
    variant: 'recommended',
    showThumbnail: true,
    expanded: true,
    scrapped: true,
  },
];
