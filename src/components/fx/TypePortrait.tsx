import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * Typografisches Portraet: links das Foto, rechts dasselbe Foto - nur aus Buchstaben.
 * Die Trennlinie folgt dem Zeiger.
 */
export function TypePortrait({ src, words, label }: { src: string; words: string[]; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const text = Array.from({ length: 160 }, (_, i) => words[i % words.length]).join(' · ');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let target: number | null = null;
    let x = 0.5;
    let raf = 0;
    const t0 = performance.now();
    const frame = (now: number) => {
      const goal = target ?? 0.5 + (reduced ? 0 : Math.sin((now - t0) / 3000) * 0.18);
      x += (goal - x) * 0.07;
      el.style.setProperty('--split', `${(x * 100).toFixed(2)}%`);
      raf = requestAnimationFrame(frame);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target = Math.min(0.95, Math.max(0.05, (e.clientX - r.left) / r.width));
    };
    const leave = () => (target = null);
    const io = new IntersectionObserver(([en]) => {
      cancelAnimationFrame(raf);
      if (en.isIntersecting) raf = requestAnimationFrame(frame);
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
  }, [reduced]);

  return (
    <div ref={ref} className="tp" style={{ ['--tp-src' as string]: `url(${src})` }}>
      <img className="tp-photo" src={src} alt="" loading="lazy" />
      <p className="tp-text poster" aria-hidden>
        {text}
      </p>
      <span className="tp-line" aria-hidden />
      {label && <span className="tp-label micro">{label}</span>}
    </div>
  );
}
