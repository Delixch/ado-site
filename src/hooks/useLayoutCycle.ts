import { useCallback, useEffect, useRef, useState } from 'react';
import { START_LAYOUT } from '../config';

/**
 * Welches Layout einer Doppelseite gerade gilt.
 * - Kopfzeilen-Knopf (nonce) und Automatik schalten zum naechsten,
 * - die Mini-Plaene im Kopf der Seite springen direkt.
 * Start: Layout aus config.ts START_LAYOUT (sonst das erste).
 */
export function useLayoutCycle(view: string, count: number, auto: boolean, interval: number, nonce: number) {
  const start = START_LAYOUT[view] ?? 0;
  const [index, setIndex] = useState(start);
  const firstNonce = useRef(nonce);

  useEffect(() => {
    setIndex(START_LAYOUT[view] ?? 0);
    firstNonce.current = nonce;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  const next = useCallback(() => setIndex((i) => (i + 1) % Math.max(count, 1)), [count]);

  useEffect(() => {
    if (nonce !== firstNonce.current) next();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce]);

  useEffect(() => {
    if (!auto || count < 2) return;
    const id = window.setInterval(() => {
      if (!document.hidden) next();
    }, interval);
    return () => window.clearInterval(id);
  }, [auto, count, interval, next, view]);

  return { index: Math.min(index, count - 1), setIndex, next };
}
