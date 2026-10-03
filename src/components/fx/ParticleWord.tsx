import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  hot: boolean;
  on: boolean;
}

const POOL = 1600;

/**
 * Ein Wort aus Teilchen. Wechselt das Wort, fliegen die Teilchen in die neue Form;
 * der Zeiger stoesst sie weg, danach finden sie zurueck. Farben aus dem Thema (--ink, --brand).
 */
export function ParticleWord({ word, label }: { word: string; label: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const state = useRef<{ setWord: (w: string) => void } | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const off = document.createElement('canvas');
    const octx = off.getContext('2d', { willReadFrequently: true })!;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let current = word;
    let ink = 'black';
    let brand = 'red';
    const mouse = { x: -9999, y: -9999 };
    const parts: P[] = Array.from({ length: POOL }, () => ({ x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, hot: Math.random() < 0.14, on: false }));

    const readColors = () => {
      const css = getComputedStyle(el);
      ink = css.getPropertyValue('--ink').trim() || ink;
      brand = css.getPropertyValue('--brand').trim() || brand;
    };

    /** Ziele aus den Pixeln des gesetzten Worts. */
    const layout = (text: string, scatter: boolean) => {
      off.width = Math.max(1, Math.round(w));
      off.height = Math.max(1, Math.round(h));
      const family = getComputedStyle(el).getPropertyValue('--font-poster').trim() || 'serif';
      octx.clearRect(0, 0, off.width, off.height);
      let size = 100;
      octx.font = `400 ${size}px ${family}`;
      const m = octx.measureText(text.toUpperCase());
      size = Math.min(h * 0.42, (w * 0.86 * 100) / Math.max(1, m.width));
      octx.font = `400 ${size}px ${family}`;
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.fillStyle = 'black';
      octx.fillText(text.toUpperCase(), w / 2, h / 2);
      const data = octx.getImageData(0, 0, off.width, off.height).data;
      const gap = Math.max(3, Math.round(size / 26));
      const pts: [number, number][] = [];
      for (let y = 0; y < off.height; y += gap) {
        for (let x = 0; x < off.width; x += gap) {
          if (data[(y * off.width + x) * 4 + 3] > 128) pts.push([x, y]);
        }
      }
      for (let i = pts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pts[i], pts[j]] = [pts[j], pts[i]];
      }
      parts.forEach((p, i) => {
        const t = pts[i];
        p.on = !!t;
        if (t) {
          p.tx = t[0];
          p.ty = t[1];
        } else {
          p.tx = Math.random() * w;
          p.ty = h + 40 + Math.random() * 60;
        }
        if (scatter) {
          p.x = Math.random() * w;
          p.y = Math.random() * h;
        }
      });
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = el.clientWidth;
      h = el.clientHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      readColors();
      layout(current, true);
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 9000) {
          const f = (9000 - d2) / 9000;
          p.vx += (dx / Math.sqrt(d2 + 0.01)) * f * 3.2;
          p.vy += (dy / Math.sqrt(d2 + 0.01)) * f * 3.2;
        }
        p.vx = (p.vx + (p.tx - p.x) * 0.045) * 0.84;
        p.vy = (p.vy + (p.ty - p.y) * 0.045) * 0.84;
        p.x += p.vx;
        p.y += p.vy;
        if (!p.on && p.y > h) continue;
        const speed = Math.min(1, Math.abs(p.vx) + Math.abs(p.vy));
        ctx.fillStyle = p.hot ? brand : ink;
        ctx.globalAlpha = p.on ? 0.55 + speed * 0.45 : 0.25;
        const r = p.hot ? 1.8 : 1.4;
        ctx.fillRect(p.x - r / 2, p.y - r / 2, r, r);
      }
      ctx.globalAlpha = 1;
    };

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const leave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    state.current = {
      setWord: (next) => {
        current = next;
        readColors();
        layout(next, false);
      },
    };

    const io = new IntersectionObserver(([en]) => {
      cancelAnimationFrame(raf);
      if (en.isIntersecting) raf = requestAnimationFrame(frame);
    });
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    io.observe(el);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    document.fonts?.ready.then(() => layout(current, false));
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      state.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useEffect(() => {
    state.current?.setWord(word);
  }, [word]);

  return (
    <div ref={wrap} className="pw" role="img" aria-label={label}>
      <canvas ref={canvas} aria-hidden />
    </div>
  );
}
