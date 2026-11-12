import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ScrapState = {
  scrappedJobIds: string[];
  toggleScrap: (jobId: string) => void;
};

export const useScrapStore = create<ScrapState>()(
  persist(
    (set) => ({
      scrappedJobIds: [],
      toggleScrap: (jobId) =>
        set((state) => ({
          scrappedJobIds: state.scrappedJobIds.includes(jobId)
            ? state.scrappedJobIds.filter((id) => id !== jobId)
            : [...state.scrappedJobIds, jobId],
        })),
    }),
    {
      name: 'albacheonguk-scrapped-jobs',
      partialize: (state) => ({ scrappedJobIds: state.scrappedJobIds }),
    },
  ),
);
