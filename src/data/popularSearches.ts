export type PopularSearch = {
  rank: number;
  keyword: string;
  trend: 'same' | 'up' | 'down' | 'new';
};

export const POPULAR_SEARCH_UPDATE_DATE = '10.29';

export const POPULAR_SEARCHES: readonly PopularSearch[] = [
  { rank: 1, keyword: '학원', trend: 'same' },
  { rank: 2, keyword: '카페', trend: 'up' },
  { rank: 3, keyword: '올리브영', trend: 'same' },
  { rank: 4, keyword: '편의점', trend: 'up' },
  { rank: 5, keyword: 'CU', trend: 'up' },
  { rank: 6, keyword: '쿠팡', trend: 'down' },
  { rank: 7, keyword: '마트', trend: 'down' },
  { rank: 8, keyword: '다이소', trend: 'up' },
  { rank: 9, keyword: '주말', trend: 'new' },
  { rank: 10, keyword: '당일지급', trend: 'same' },
];
