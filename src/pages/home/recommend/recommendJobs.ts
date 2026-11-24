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

// 메인 시스템 QA에 사용하는 서울·경기 공고 샘플입니다.
export const REGION_RECOMMEND_MOCKS: Partial<Record<string, JobCardData[]>> = {
  서울: [
    {
      id: '18',
      title: '분식점 평일 매장 운영',
      address: '서울 마포구 서교동',
      salaryType: '월급',
      salaryText: '2,450,000',
      postedAt: '2026-11-13',
      imageUrl:
        'https://images.pexels.com/photos/38668374/pexels-photo-38668374.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    },
    {
      id: '25',
      title: '생활잡화 판매 요일 협의',
      address: '서울 강남구 역삼동',
      salaryType: '시급',
      salaryText: '11,500',
      postedAt: '2026-11-13',
      imageUrl:
        'https://images.pexels.com/photos/18135184/pexels-photo-18135184.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    },
    {
      id: '1',
      title: '성수 카페 평일 바리스타 모집',
      address: '서울 성동구 성수동1가',
      salaryType: '시급',
      salaryText: '10,500',
      postedAt: '2026-11-12',
      imageUrl:
        'https://images.pexels.com/photos/5864216/pexels-photo-5864216.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      id: '37',
      title: '편의점 야간 계산 스태프',
      address: '서울 마포구 서교동',
      salaryType: '시급',
      salaryText: '12,500',
      postedAt: '2026-11-12',
      imageUrl:
        'https://images.pexels.com/photos/40726672/pexels-photo-40726672.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    },
  ],
  경기: [
    {
      id: '11',
      title: '제과 매장 계산 담당',
      address: '경기 안양시 동안구 범계동',
      salaryType: '시급',
      salaryText: '10,800',
      postedAt: '2026-11-13',
      imageUrl:
        'https://images.pexels.com/photos/36445005/pexels-photo-36445005.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      id: '32',
      title: '재고 조사 주간 근무',
      address: '경기 수원시 팔달구 인계동',
      salaryType: '주급',
      salaryText: '500,000',
      postedAt: '2026-11-13',
      imageUrl:
        'https://images.pexels.com/photos/10697106/pexels-photo-10697106.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    },
    {
      id: '39',
      title: '편의점 심야 상품 진열',
      address: '경기 안양시 동안구 범계동',
      salaryType: '시급',
      salaryText: '12,500',
      postedAt: '2026-11-13',
      imageUrl:
        'https://images.pexels.com/photos/31320528/pexels-photo-31320528.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    },
    {
      id: '9',
      title: '베이커리 주말 포장 직원',
      address: '경기 성남시 분당구 정자동',
      salaryType: '시급',
      salaryText: '11,500',
      postedAt: '2026-11-12',
      imageUrl:
        'https://images.pexels.com/photos/40842630/pexels-photo-40842630.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    },
  ],
};
