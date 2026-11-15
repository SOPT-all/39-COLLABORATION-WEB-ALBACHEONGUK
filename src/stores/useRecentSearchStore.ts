import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MAX_RECENT_SEARCHES = 5;

type RecentSearchState = {
  keywords: string[];
  addKeyword: (keyword: string) => void;
  removeKeyword: (keyword: string) => void;
  clearKeywords: () => void;
};

export const useRecentSearchStore = create<RecentSearchState>()(
  persist(
    (set) => ({
      keywords: [],
      addKeyword: (value) => {
        const keyword = value.trim();
        if (!keyword) return;

        set(({ keywords }) => ({
          keywords: [keyword, ...keywords.filter((item) => item !== keyword)].slice(
            0,
            MAX_RECENT_SEARCHES,
          ),
        }));
      },
      removeKeyword: (keyword) =>
        set(({ keywords }) => ({ keywords: keywords.filter((item) => item !== keyword) })),
      clearKeywords: () => set({ keywords: [] }),
    }),
    {
      name: 'albacheonguk-recent-searches',
      partialize: ({ keywords }) => ({ keywords }),
    },
  ),
);
