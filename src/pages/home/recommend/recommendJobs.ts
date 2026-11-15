import regionAbcMartImage from '../../../assets/images/recommend/region-abc-mart.jpg';
import regionHaidilaoImage from '../../../assets/images/recommend/region-haidilao.jpg';
import regionNyunyuHouseImage from '../../../assets/images/recommend/region-nyunyu-house.jpg';
import regionOutbackImage from '../../../assets/images/recommend/region-outback.jpg';
import targetDaisoImage from '../../../assets/images/recommend/target-daiso.jpg';
import targetMcdonaldsImage from '../../../assets/images/recommend/target-mcdonalds.jpg';
import targetWoongjinImage from '../../../assets/images/recommend/target-woongjin.jpg';
import targetYukbayeonImage from '../../../assets/images/recommend/target-yukbayeon.jpg';
import themeCuImage from '../../../assets/images/recommend/theme-cu.jpg';
import themeHollysImage from '../../../assets/images/recommend/theme-hollys.jpg';
import themeParisBaguetteImage from '../../../assets/images/recommend/theme-paris-baguette.jpg';
import type { JobCardData } from '../../../components/JobCard.tsx';

const DAY_MS = 24 * 60 * 60 * 1000;
const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

function getKstDateDaysAgo(days: number): string {
  return new Date(Date.now() + KST_OFFSET_MS - days * DAY_MS).toISOString().slice(0, 10);
}

const POSTED_AT = getKstDateDaysAgo(3);

export const REGION_RECOMMEND_JOBS: JobCardData[] = [
  {
    id: 'region-1',
    title: '뉴뉴 하우스 성수역점 직원 모집',
    address: '서울 성동구 성수이로 93',
    salaryType: '월급',
    salaryText: '3,120,000',
    postedAt: POSTED_AT,
    imageUrl: regionNyunyuHouseImage,
  },
  {
    id: 'region-2',
    title: '하이디라오 청량리 오픈 모집',
    address: '서울 동대문구 왕산로 200',
    salaryType: '월급',
    salaryText: '3,300,000',
    postedAt: POSTED_AT,
    imageUrl: regionHaidilaoImage,
  },
  {
    id: 'region-3',
    title: 'ABC 마트 동대문점 직원 모집',
    address: '서울 중구 을지로 264',
    salaryType: '연봉',
    salaryText: '25,882,560',
    postedAt: POSTED_AT,
    imageUrl: regionAbcMartImage,
  },
  {
    id: 'region-4',
    title: '아웃백코엑스점 직원 모집',
    address: '서울 강남구 영동대로 513',
    salaryType: '시급',
    salaryText: '12,400',
    postedAt: POSTED_AT,
    imageUrl: regionOutbackImage,
  },
];

export const THEME_RECOMMEND_JOBS: JobCardData[] = [
  {
    id: 'theme-1',
    title: 'CU 신촌피어점 알바 급구',
    address: '서울 마포구 서강로 75-16',
    salaryType: '시급',
    salaryText: '10,320',
    postedAt: POSTED_AT,
    imageUrl: themeCuImage,
  },
  {
    id: 'theme-2',
    title: '파리바게트 역삼포스틸점',
    address: '서울 강남구 테헤란로20길 5',
    salaryType: '시급',
    salaryText: '11,000',
    postedAt: POSTED_AT,
    imageUrl: themeParisBaguetteImage,
  },
  {
    id: 'theme-3',
    title: '할리스 강남2점 파트타이머',
    address: '서울 강남구 강남대로 422',
    salaryType: '시급',
    salaryText: '10,320',
    postedAt: POSTED_AT,
    imageUrl: themeHollysImage,
  },
  {
    id: 'theme-4',
    title: 'CU 송파레미안점 알바',
    address: '서울 송파구 오금로32길 14',
    salaryType: '시급',
    salaryText: '10,320',
    postedAt: POSTED_AT,
    imageUrl: themeCuImage,
  },
];

export const TARGET_RECOMMEND_JOBS: JobCardData[] = [
  {
    id: 'target-1',
    title: '육바연 주말 파트타이머 모집',
    address: '서울 성동구 왕십리로 287-1',
    salaryType: '시급',
    salaryText: '11,000',
    postedAt: POSTED_AT,
    imageUrl: targetYukbayeonImage,
  },
  {
    id: 'target-2',
    title: '웅진씽크빅 선생님 모집',
    address: '서울 양천구 목동로 234',
    salaryType: '월급',
    salaryText: '3,000,000',
    postedAt: POSTED_AT,
    imageUrl: targetWoongjinImage,
  },
  {
    id: 'target-3',
    title: '맥도날드 마리오점 매니저 모집',
    address: '서울 금천구 디지털로 185',
    salaryType: '월급',
    salaryText: '2,300,000',
    postedAt: POSTED_AT,
    imageUrl: targetMcdonaldsImage,
  },
  {
    id: 'target-4',
    title: '다이소 신길점 파트타이머 모집',
    address: '서울 영등포구 가마산로 476',
    salaryType: '월급',
    salaryText: '2,156,880',
    postedAt: POSTED_AT,
    imageUrl: targetDaisoImage,
  },
];
