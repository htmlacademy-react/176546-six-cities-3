import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

type OutsideEvent = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: OutsideEvent) => void
): void => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (event: OutsideEvent) => {
      const element = ref.current;
      const target = event.target as Node | null;

      if (element === null || target === null || element.contains(target)) {
        return;
      }

      handlerRef.current(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref]);
};
