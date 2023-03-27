import { useEffect } from 'react';

export function useWindowEventListener<E extends keyof WindowEventMap>(
  event: E,
  callback: (this: Window, ev: WindowEventMap[E]) => unknown,
) {
  useEffect(() => {
    window.addEventListener(event, callback);
    return () => {
      window.removeEventListener(event, callback);
    };
  });
}

export function useDocumentEventListener<E extends keyof DocumentEventMap>(
  event: E,
  callback: (this: Document, ev: DocumentEventMap[E]) => unknown,
) {
  useEffect(() => {
    document.addEventListener(event, callback);
    return () => {
      document.removeEventListener(event, callback);
    };
  });
}
