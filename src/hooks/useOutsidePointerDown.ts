import { useEffect } from 'react';
import type { RefObject } from 'react';

export function useOutsidePointerDown<T extends HTMLElement>(
  ref: RefObject<T | null>,
  enabled: boolean,
  onOutside: () => void,
) {
  useEffect(() => {
    if (!enabled) return;
    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && ref.current && !ref.current.contains(event.target)) {
        onOutside();
      }
    }
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [ref, enabled, onOutside]);
}
