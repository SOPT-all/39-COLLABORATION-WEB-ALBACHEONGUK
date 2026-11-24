import { useEffect, useState } from 'react';

import { getMillisecondsUntilNextKstDay } from '../utils/jobDate.ts';

export function useKstNow(referenceNow?: Date): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (referenceNow) return;

    const timer = window.setTimeout(
      () => setNow(new Date()),
      getMillisecondsUntilNextKstDay(new Date()) + 50,
    );
    function refreshNow() {
      if (document.visibilityState === 'visible') setNow(new Date());
    }
    document.addEventListener('visibilitychange', refreshNow);
    window.addEventListener('focus', refreshNow);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', refreshNow);
      window.removeEventListener('focus', refreshNow);
    };
  }, [now, referenceNow]);

  return referenceNow ?? now;
}
