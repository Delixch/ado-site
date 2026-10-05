import { useEffect, useRef } from 'react';
import { heroCurves } from './heroCurves';

/**
 * Stroemungsfeld wie im Vorbild (klonlamatest heroCanvas.ts, 1:1 uebernommen): kurze senkrechte Marken
 * wandern auf 22 Kurven nach oben, ein paar leuchten kurz auf. Angepasst:
 *  - Marke = senkrechtes "EKADO" (oder Strich, MARK = 'dash')
 *  - Farben aus dem Thema (--ink gedimmt, Aufleuchten in --brand), Grund durchsichtig
 *  - oben/unten blendet die CSS-Maske aus (.word-flow) statt Schwarz zu malen
 *  - feste Groesse (SCALE): kleine Flaechen zeigen einen Ausschnitt statt alles winzig zu machen
 */
const MARK: 'word' | 'dash' = 'word';
const WORD = 'EKADO';
const DESIGN_W = 1440;
const DESIGN_H = 842;
const SCALE = 0.62;
const CFG = { omega: 0.7, bn: 6, bl: 1.2, shRatio: 30 / DESIGN_W, dim: 0.42 };

interface Blink {
  ci: number;
  slot: number;
  birth: number;
  life: number;
}

export function WordFlow({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const count = heroCurves.length;

    let cw = 0;
    let ch = 0;
    let dashH = 0;
    let lineW = 0;
    let ox = 0;
    let oy = 0;
    let ink = '#fff';
    let brand = '#fc0';
    let font = 'monospace';

    const readTheme = () => {
      const cs = getComputedStyle(canvas);
      ink = cs.getPropertyValue('--ink').trim() || ink;
      brand = cs.getPropertyValue('--brand').trim() || brand;
      font = cs.getPropertyValue('--font-mono').trim() || font;
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      cw = canvas.clientWidth;
      ch = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(cw * dpr));
      canvas.height = Math.max(1, Math.round(ch * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dashH = SCALE * DESIGN_W * CFG.shRatio;
      lineW = 2.5;
      // Ausschnitt mittig aus dem Feld
      ox = (cw - DESIGN_W * SCALE) / 2;
      oy = (ch - DESIGN_H * SCALE) / 2;
      readTheme();
    };

    let phase = 0;
    let blinks: Blink[] = [];
    let seeded = false;

    const spawn = (now: number) => {
      for (let tries = 0; tries < 30; tries++) {
        const ci = (Math.random() * count) | 0;
        const slot = (Math.random() * heroCurves[ci].length) | 0;
        if (!blinks.some((b) => b.ci === ci && b.slot === slot)) {
          blinks.push({ ci, slot, birth: now, life: CFG.bl * (0.7 + 0.6 * Math.random()) });
          return true;
        }
      }
      return false;
    };

    const pointAt = (curve: ReadonlyArray<readonly [number, number]>, slot: number) => {
      const len = curve.length;
      let pos = (phase + slot) % len;
      if (pos < 0) pos += len;
      const i = pos | 0;
      if (i === len - 1) return null;
      const f = pos - i;
      const a = curve[i];
      const b = curve[i + 1];
      return [(a[0] + (b[0] - a[0]) * f) * SCALE + ox, (a[1] + (b[1] - a[1]) * f) * SCALE + oy] as const;
    };

    const mark = (x: number, y: number) => {
      if (MARK === 'dash') {
        ctx.moveTo(x, y - dashH / 2);
        ctx.lineTo(x, y + dashH / 2);
        return;
      }
      // senkrechtes Wort, so hoch wie der Strich im Vorbild, von unten nach oben zu lesen
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(WORD, 0, 0);
      ctx.restore();
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, cw, ch);
      ctx.lineWidth = lineW;
      ctx.lineCap = 'butt';
      // Schriftgroesse so, dass das Wort genau die Strichlaenge hat
      ctx.font = `${font.includes('Mono') ? 600 : 500} 10px ${font}`;
      const size = (10 * dashH) / Math.max(1, ctx.measureText(WORD).width);
      ctx.font = `${font.includes('Mono') ? 600 : 500} ${size}px ${font}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const half = dashH / 2;
      const visible = (x: number, y: number) => x >= -half - 4 && x <= cw + half + 4 && y >= -half - 4 && y <= ch + half + 4;

      if (!seeded) {
        for (let i = 0; i < CFG.bn; i++) spawn(now);
        seeded = true;
      }
      blinks = blinks.filter((b) => now - b.birth < b.life);
      while (blinks.length < CFG.bn && spawn(now));
      const blue = new Set(blinks.map((b) => 1000 * b.ci + b.slot));

      ctx.globalAlpha = CFG.dim;
      ctx.strokeStyle = ink;
      ctx.fillStyle = ink;
      ctx.beginPath();
      for (let c = 0; c < count; c++) {
        const curve = heroCurves[c];
        if (curve.length < 2) continue;
        for (let s = 0; s < curve.length; s++) {
          const p = pointAt(curve, s);
          if (!p || !visible(p[0], p[1]) || blue.has(1000 * c + s)) continue;
          mark(p[0], p[1]);
        }
      }
      if (MARK === 'dash') ctx.stroke();

      ctx.globalAlpha = 1;
      ctx.strokeStyle = brand;
      ctx.fillStyle = brand;
      ctx.beginPath();
      for (const b of blinks) {
        const p = pointAt(heroCurves[b.ci], b.slot);
        if (!p || !visible(p[0], p[1])) continue;
        mark(p[0], p[1]);
      }
      if (MARK === 'dash') ctx.stroke();
    };

    let raf = 0;
    let last = performance.now();
    let inView = true;
    const frame = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      phase += CFG.omega * dt;
      draw(t / 1000);
      raf = inView ? requestAnimationFrame(frame) : 0;
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(performance.now() / 1000);
    });
    ro.observe(canvas);
    resize();

    // Themenwechsel (data-color am <html>) - Farben neu lesen
    const mo = new MutationObserver(readTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-color'] });

    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      if (inView && !raf && !reduced) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(canvas);

    if (reduced) draw(0);
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={`word-flow ${className}`} aria-hidden />;
}

/**
 * Fuellt im Kennzahlen-Raster (.metrics) die leeren Zellen hinter der letzten Kennzahl.
 * Ist das Raster genau voll, gibt es keine leere Zelle und die Flaeche bleibt aus.
 */
export function MetricFlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const grid = el?.parentElement;
    if (!el || !grid) return;
    const check = () => {
      // Spalten des Rasters und Zahl der Kennzahlen davor -> ab der Spalte nach der letzten Kennzahl bis zum Ende
      const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length;
      const items = grid.querySelectorAll(':scope > .metric').length;
      const start = (items % cols) + 1;
      el.hidden = cols < 2 || start === 1;
      el.style.gridColumn = `${start} / -1`;
    };
    const ro = new ResizeObserver(check);
    ro.observe(grid);
    check();
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="metric-flow" aria-hidden>
      <WordFlow />
    </div>
  );
}
