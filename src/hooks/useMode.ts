import { useEffect, useState } from 'react';

export type Mode = 'mobile' | 'tablet' | 'desktop';

/* Kırılımlar src/styles/layout.css ile aynı olmalı. */
const TABLET = '(min-width: 720px)';
const DESKTOP = '(min-width: 1180px)';

const read = (): Mode =>
  window.matchMedia(DESKTOP).matches ? 'desktop' : window.matchMedia(TABLET).matches ? 'tablet' : 'mobile';

export function useMode(): Mode {
  const [mode, setMode] = useState<Mode>(read);
  useEffect(() => {
    const queries = [TABLET, DESKTOP].map((q) => window.matchMedia(q));
    const update = () => setMode(read());
    queries.forEach((q) => q.addEventListener('change', update));
    return () => queries.forEach((q) => q.removeEventListener('change', update));
  }, []);
  return mode;
}
