import { useEffect, useRef, type ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';
import { Media } from './Media';

/**
 * Schwarzweiss und unscharf - nur ein schmales, senkrechtes Fenster zeigt das Bild scharf und farbig.
 * Das Fenster folgt dem Zeiger; ohne Zeiger wandert es langsam um seine Ruhelage.
 */
export function SlitMedia({ src, at = 0.5, children, className = '' }: { src: string; at?: number; children?: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let target: number | null = null;
    let x = el.clientWidth * at;
    let raf = 0;
    const t0 = performance.now();

    const frame = (now: number) => {
      const w = el.clientWidth;
      const goal = target ?? w * (at + (reduced ? 0 : Math.sin((now - t0) / 2600) * 0.1));
      x += (goal - x) * 0.08;
      el.style.setProperty('--sx', `${x.toFixed(1)}px`);
      raf = requestAnimationFrame(frame);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target = e.clientX - r.left;
    };
    const leave = () => (target = null);

    let visible = false;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });
    io.observe(el);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [at, reduced]);

  return (
    <div ref={ref} className={`slit ${className}`}>
      <Media src={src} className="slit-media" />
      <span className="slit-veil" aria-hidden />
      <span className="slit-frame" aria-hidden>
        <i />
      </span>
      {children}
    </div>
  );
}
