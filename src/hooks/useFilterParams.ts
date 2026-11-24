import { useSearchParams } from 'react-router';

export type FilterParams = readonly [
  URLSearchParams,
  (update: (params: URLSearchParams) => URLSearchParams) => void,
];

export function useFilterParams(filterParams?: FilterParams): FilterParams {
  const routerParams = useSearchParams();
  return filterParams ?? routerParams;
}
