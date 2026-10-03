import { useEffect, useState } from 'react';
import { useMode } from './useMode';

/** Dauer einer Runde der Lichtlinie um eine Kachel (gleich wie --trace-step in fx.css). */
const STEP_MS = 2600;

/**
 * Handy: die Lichtlinie zieht der Reihe nach um jede Kachel (eine Runde, dann die naechste).
 * Gibt den Index der gerade umrandeten Kachel zurueck, -1 ausserhalb des Handys.
 */
export function useTraceStep(count: number) {
  const mobile = useMode() === 'mobile';
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!mobile || count < 1) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % count), STEP_MS);
    return () => window.clearInterval(id);
  }, [mobile, count]);
  return mobile ? step % Math.max(count, 1) : -1;
}
