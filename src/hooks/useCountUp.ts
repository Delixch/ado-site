import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './useInView';

/** Zaehlt eine Zahl hoch, sobald das Element im Bild steht (wie auf adodesign.ch). */
export function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) {
      node.textContent = String(target);
      return;
    }
    let frame = 0;
    let start = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const step = (now: number) => {
          if (!start) start = now;
          const p = Math.min((now - start) / duration, 1);
          node.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);
  return ref;
}
