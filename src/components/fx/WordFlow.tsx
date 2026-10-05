import { useEffect, useRef } from 'react';

/**
 * Kleine "EKADO"-Woerter fliessen auf sanften S-Kurven von unten nach oben,
 * ein paar leuchten kurz in der Themenfarbe auf. Oben/unten blendet eine Maske weich aus (CSS .word-flow).
 * Eigene Kurven (aus Sinus erzeugt), Farben aus dem Thema (--ink, --brand), Schrift --font-mono.
 * Steht still, wenn ausser Sicht oder "Bewegung reduzieren" aktiv ist.
 */
const WORD = 'EKADO';
const CFG = {
  lanes: 7, // Kurven nebeneinander
  gap: 64, // Abstand der Woerter auf einer Kurve (px)
  speed: 16, // px pro Sekunde nach oben
  size: 10, // Schriftgroesse (px)
  dim: 0.22, // Deckkraft der normalen Woerter
  flashes: 3, // gleichzeitig leuchtende Woerter
  flashLife: 1.4, // Sekunden
};

type Flash = { lane: number; slot: number; birth: number; life: number };

export function WordFlow({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let ink = '#fff';
    let brand = '#fc0';
    let font = 'monospace';
    // je Kurve: Grundlage x, Ausschlag, Wellenlaenge, Versatz
    let lanes: { x: number; amp: number; k: number; phi: number; lag: number }[] = [];

    const readTheme = () => {
      const cs = getComputedStyle(canvas);
      ink = cs.getPropertyValue('--ink').trim() || ink;
      brand = cs.getPropertyValue('--brand').trim() || brand;
      font = cs.getPropertyValue('--font-mono').trim() || font;
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(2, Math.min(CFG.lanes, Math.round(w / 70)));
      lanes = Array.from({ length: n }, (_, i) => ({
        x: ((i + 0.5) / n) * w,
        // Ausschlag klein halten: Woerter benachbarter Kurven beruehren sich nie
        amp: (w / n) * (0.1 + 0.08 * (((i * 37) % 5) / 5)),
        lag: ((i * 0.37) % 1) * CFG.gap,
        k: (Math.PI * 2) / (h * (0.9 + 0.25 * (i % 3))),
        phi: i * 1.7,
      }));
      readTheme();
    };

    let phase = 0;
    let flashes: Flash[] = [];
    const slots = () => Math.ceil((h + CFG.gap * 2) / CFG.gap);
    const spawn = (now: number) => {
      const lane = (Math.random() * lanes.length) | 0;
      const slot = (Math.random() * slots()) | 0;
      if (!flashes.some((f) => f.lane === lane && f.slot === slot)) flashes.push({ lane, slot, birth: now, life: CFG.flashLife * (0.7 + 0.6 * Math.random()) });
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.font = `${CFG.size}px ${font}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      flashes = flashes.filter((f) => now - f.birth < f.life);
      while (flashes.length < CFG.flashes) spawn(now);
      const n = slots();
      const offset = phase % CFG.gap;
      lanes.forEach((ln, li) => {
        for (let s = 0; s < n; s++) {
          // von unten nach oben: y sinkt mit der Zeit
          const y = h + CFG.gap - s * CFG.gap - ((offset + ln.lag) % CFG.gap);
          const x = ln.x + ln.amp * Math.sin(y * ln.k + ln.phi);
          const f = flashes.find((q) => q.lane === li && q.slot === s);
          if (f) {
            const t = (now - f.birth) / f.life;
            ctx.globalAlpha = Math.sin(Math.PI * t);
            ctx.fillStyle = brand;
          } else {
            ctx.globalAlpha = CFG.dim;
            ctx.fillStyle = ink;
          }
          ctx.fillText(WORD, x, y);
        }
      });
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    let last = performance.now();
    let visible = true;
    const frame = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      phase += CFG.speed * dt;
      draw(t / 1000);
      raf = visible ? requestAnimationFrame(frame) : 0;
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
      visible = e.isIntersecting;
      if (visible && !raf && !reduced) {
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
 * Steht die Flaeche allein in einer neuen Zeile (Raster genau voll), wird sie ausgeblendet.
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
      // Raster genau voll (start = 1): keine leere Zelle, Flaeche ausblenden
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
