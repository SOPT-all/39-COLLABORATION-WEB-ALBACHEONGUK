export type PopularSearch = {
  rank: number;
  keyword: string;
  trend: 'same' | 'up' | 'down' | 'new';
};

// 시스템 QA에 사용하는 고정 인기 검색어입니다. 메인과 검색이 같은 순위를 사용합니다.
export const POPULAR_SEARCH_UPDATE_DATE = '11.16';

export const POPULAR_SEARCHES: readonly PopularSearch[] = [
  { rank: 1, keyword: '카페', trend: 'same' },
  { rank: 2, keyword: '편의점', trend: 'up' },
  { rank: 3, keyword: '주말', trend: 'up' },
  { rank: 4, keyword: '베이커리', trend: 'same' },
  { rank: 5, keyword: '물류', trend: 'up' },
  { rank: 6, keyword: '단기', trend: 'down' },
  { rank: 7, keyword: '바리스타', trend: 'new' },
  { rank: 8, keyword: '사무', trend: 'down' },
  { rank: 9, keyword: '마트', trend: 'same' },
  { rank: 10, keyword: '야간', trend: 'new' },
];
