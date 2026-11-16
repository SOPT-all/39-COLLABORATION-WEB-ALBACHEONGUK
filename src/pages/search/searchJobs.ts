import type { JobRowData } from '../../components/JobRow.tsx';
import {
  getCategoryOnlySelection,
  getSelectedJobGroups,
} from '../../utils/jobCategorySelection.ts';
import { readRegionSelection } from '../../utils/regionSelection.ts';
import { matchesWorkCondition, readWorkCondition } from '../../utils/workConditionSelection.ts';
import { PAY_TYPES } from '../../data/payTypes.ts';

type SearchJob = {
  job: JobRowData;
  sido: string;
  district: string;
  category: string;
  subcategory: string;
  period: string;
  days: string[];
  address: string;
  nearbySubway?: string;
  applyMethod?: string;
  tier?: 'premium' | 'light';
};

export const SEARCH_JOBS: SearchJob[] = [
  {
    job: {
      id: 'search-mock-cafe',
      companyName: '카페 성수점',
      location: '서울 성동구',
      title: '카페 성수점 평일 바리스타 모집',
      workDays: '월~금',
      workHours: '10:00~15:00',
      deadlineDate: null,
      postedAt: '2026-11-13',
      salaryType: '시급',
      salaryText: '12,000',
      isClosed: false,
    },
    sido: '서울',
    district: '성동구',
    category: '외식·음료',
    subcategory: '커피전문점',
    period: '3개월~6개월',
    days: ['월', '화', '수', '목', '금'],
    address: '서울 성동구 성수이로',
    tier: 'premium',
  },
  {
    job: {
      id: 'search-mock-store',
      companyName: '편의점 강남점',
      location: '서울 강남구',
      title: '편의점 강남점 주말 스태프 모집',
      workDays: '토·일',
      workHours: '15:00~22:00',
      deadlineDate: null,
      postedAt: '2026-11-14',
      salaryType: '시급',
      salaryText: '11,000',
      isClosed: false,
    },
    sido: '서울',
    district: '강남구',
    category: '유통·판매',
    subcategory: '편의점',
    period: '1개월~3개월',
    days: ['토', '일'],
    address: '서울 강남구 테헤란로',
    tier: 'light',
  },
  {
    job: {
      id: 'search-mock-cafe-closed',
      companyName: '동네 카페',
      location: '서울 강남구',
      title: '주말 카페 마감 스태프 모집',
      workDays: '토·일',
      workHours: '16:00~21:00',
      deadlineDate: '2026-11-12',
      postedAt: '2026-11-09',
      salaryType: '시급',
      salaryText: '12,000',
      isClosed: true,
    },
    sido: '서울',
    district: '강남구',
    category: '외식·음료',
    subcategory: '커피전문점',
    period: '1개월~3개월',
    days: ['토', '일'],
    address: '서울 강남구 강남대로',
  },
];

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function relevance(item: SearchJob, keyword: string) {
  if (!keyword) return 0;
  const fields = [item.job.title, item.job.companyName, item.subcategory];
  return Math.max(
    0,
    ...fields.map((field, index) => {
      const normalized = normalizeSearchText(field);
      if (!normalized.includes(keyword)) return 0;
      return (normalized === keyword ? fields.length : 0) + fields.length - index;
    }),
  );
}

export function sortSearchJobs(items: SearchJob[], keyword: string, sort: 'relevance' | 'latest') {
  const query = normalizeSearchText(keyword);
  const tierOrder = { premium: 0, light: 1 };
  return items.toSorted((left, right) => {
    const leftTier = left.tier ? tierOrder[left.tier] : 2;
    const rightTier = right.tier ? tierOrder[right.tier] : 2;
    const byRelevance = sort === 'relevance' ? relevance(right, query) - relevance(left, query) : 0;
    return (
      leftTier - rightTier ||
      byRelevance ||
      right.job.postedAt.localeCompare(left.job.postedAt) ||
      String(left.job.id).localeCompare(String(right.job.id), 'ko', { numeric: true })
    );
  });
}

export function filterSearchJobs(items: SearchJob[], params: URLSearchParams) {
  const keyword = normalizeSearchText(params.get('keyword') ?? '');
  const region = readRegionSelection(params);
  const category = getCategoryOnlySelection(params);
  const groups = getSelectedJobGroups(params);
  const work = readWorkCondition(params);
  const pay = params.get('pay');
  const isActiveOnly = params.get('activeOnly') === 'true';

  return items.filter((item) => {
    const { job } = item;
    const searchableText = normalizeSearchText(
      [job.title, job.companyName, job.location, item.subcategory, job.workDays, ...item.days].join(
        ' ',
      ),
    );
    if (keyword && !searchableText.includes(keyword)) return false;
    if (isActiveOnly && job.isClosed) return false;
    if (region.sido && region.sido !== '전체' && region.sido !== item.sido) return false;
    if (region.guguns.length > 0 && !region.guguns.includes(item.district)) return false;
    if (category && category !== item.category) return false;
    if (
      groups.length &&
      !groups.some(
        (group) =>
          group.name === item.category && group.selected.some((name) => name === item.subcategory),
      )
    )
      return false;
    if (!matchesWorkCondition(work, item)) return false;
    return !pay || pay === '전체' || !PAY_TYPES.includes(pay) || pay === job.salaryType;
  });
}

export type { SearchJob };
