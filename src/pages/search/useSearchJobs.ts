import { useQuery } from '@tanstack/react-query';
import { filterSearchJobs, SEARCH_JOBS } from './searchJobs.ts';

export function useSearchJobs(query: string) {
  return useQuery({
    queryKey: ['search-results', 'mock', query],
    queryFn: async () => {
      const params = new URLSearchParams(query);
      // 기존 초기 세팅용 오류 입력과 동일하되 개발 서버에서만 재현합니다.
      if (import.meta.env.DEV && params.get('keyword') === '오류테스트') {
        throw new Error('목업 공고 조회 실패');
      }
      return filterSearchJobs(SEARCH_JOBS, params);
    },
    staleTime: 30_000,
    retry: false,
  });
}
