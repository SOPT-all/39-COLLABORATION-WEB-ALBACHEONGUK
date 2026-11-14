import { create } from 'zustand';

type MockSessionState = {
  isSignedIn: boolean;
  setSignedIn: (isSignedIn: boolean) => void;
};

export const useMockSessionStore = create<MockSessionState>()((set) => ({
  isSignedIn: false,
  setSignedIn: (isSignedIn) => set({ isSignedIn }),
}));
