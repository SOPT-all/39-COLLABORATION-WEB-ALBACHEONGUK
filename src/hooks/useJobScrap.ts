import { useScrapStore } from '../stores/useScrapStore.ts';

export function useJobScrap(jobId: string) {
  const isScrapped = useScrapStore((state) => state.scrappedJobIds.includes(jobId));
  const toggleScrap = useScrapStore((state) => state.toggleScrap);

  return {
    isScrapped,
    toggleScrap: () => toggleScrap(jobId),
  };
}
