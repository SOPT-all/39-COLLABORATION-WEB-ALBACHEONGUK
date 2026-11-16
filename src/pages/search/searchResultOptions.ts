export const SORT_LABELS = { relevance: '정확도순', latest: '최신순' };
export const PAGE_SIZES = [20, 30, 50];
export const PAGE_SIZE_LABELS = PAGE_SIZES.map((size) => size + '개씩 보기');

export function readSearchPage<T>(jobs: T[], pageSize: number, requested: string | null) {
  const pageCount = Math.ceil(jobs.length / pageSize);
  const number = Number(requested);
  const page = Number.isSafeInteger(number) ? Math.max(1, Math.min(number, pageCount)) : 1;
  return { page, pageCount, items: jobs.slice((page - 1) * pageSize, page * pageSize) };
}

export function readResultToolbar(params: URLSearchParams) {
  const sort = params.get('sort') === 'latest' ? 'latest' : 'relevance';
  const requestedSize = Number(params.get('size'));
  const pageSize = PAGE_SIZES.includes(requestedSize) ? requestedSize : 20;
  return { sort, pageSize } as const;
}
