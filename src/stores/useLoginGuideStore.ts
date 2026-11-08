import { create } from 'zustand';

type LoginGuideState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useLoginGuideStore = create<LoginGuideState>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
