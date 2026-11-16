import { create } from 'zustand';

export type MockResumeStatus = 'ready' | 'none' | 'draft';

type MockSessionState = {
  isSignedIn: boolean;
  resumeStatus: MockResumeStatus;
  setResumeStatus: (resumeStatus: MockResumeStatus) => void;
  setSignedIn: (isSignedIn: boolean) => void;
};

export const useMockSessionStore = create<MockSessionState>()((set) => ({
  isSignedIn: false,
  resumeStatus: 'ready',
  setResumeStatus: (resumeStatus) => set({ resumeStatus }),
  setSignedIn: (isSignedIn) => set({ isSignedIn }),
}));
