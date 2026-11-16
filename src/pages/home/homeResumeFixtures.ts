import coffeeImage from '../../assets/images/home/match-coffee.jpg';
import starbucksImage from '../../assets/images/home/match-starbucks.jpg';
import uclImage from '../../assets/images/home/match-ucl.jpg';
import type { JobCardData } from '../../components/JobCard.tsx';
import type { Resume } from '../../components/ResumeSelector.tsx';

export const HOME_RESUMES: Resume[] = [
  { id: 'winter', title: '26년 겨울 알바 이력서', desiredRegion: '강남구', updatedAt: '26.11.15' },
  { id: 'weekend', title: '주말 알바 이력서', desiredRegion: '서울 광진구', updatedAt: '26.11.10' },
];

export const HOME_MATCH_JOBS: JobCardData[] = [
  {
    id: 'home-match-starbucks',
    title: '스타벅스 강남R점 주말 바리스타',
    address: '서울 강남구 강남대로 360',
    salaryType: '시급',
    salaryText: '10,500',
    postedAt: '2026-11-13',
    imageUrl: starbucksImage,
  },
  {
    id: 'home-match-ucl',
    title: 'UCL 강남점 주말 알바',
    address: '서울특별시 서초구 서초대로 397',
    salaryType: '월급',
    salaryText: '2,300,000',
    postedAt: '2026-11-13',
    imageUrl: uclImage,
  },
  {
    id: 'home-match-coffee',
    title: '포피엠커피',
    address: '서울 강남구 삼성로133길 12',
    salaryType: '시급',
    salaryText: '12,000',
    postedAt: '2026-11-13',
    imageUrl: coffeeImage,
  },
];
