import { useSearchParams } from 'react-router';
import { useMockSessionStore } from '../stores/useMockSessionStore.ts';

const QA_ENABLED = import.meta.env.DEV || import.meta.env.VITE_ENABLE_COMPONENT_PREVIEW === 'true';

export function useQaResumeScenario() {
  const [params, setParams] = useSearchParams();
  const mockSignedIn = useMockSessionStore((state) => state.isSignedIn);
  const mockResumeStatus = useMockSessionStore((state) => state.resumeStatus);
  const setSignedIn = useMockSessionStore((state) => state.setSignedIn);
  const setResumeStatus = useMockSessionStore((state) => state.setResumeStatus);
  const value = QA_ENABLED ? params.get('qa') : null;
  const qa =
    value === 'guest' ||
    value === 'no-resume' ||
    value === 'draft-resume' ||
    value === 'no-match' ||
    value === 'match-loading' ||
    value === 'match-error'
      ? value
      : null;
  const isSignedIn = qa ? qa !== 'guest' : mockSignedIn;
  const resumeStatus =
    qa === 'no-resume' ? 'none' : qa === 'draft-resume' ? 'draft' : qa ? 'ready' : mockResumeStatus;

  function toggleSignIn() {
    setSignedIn(!isSignedIn);
    if (qa) {
      setResumeStatus('ready');
      setParams(
        (current) => {
          const next = new URLSearchParams(current);
          next.delete('qa');
          return next;
        },
        { replace: true },
      );
    }
  }

  return { qa, isSignedIn, resumeStatus, toggleSignIn };
}
