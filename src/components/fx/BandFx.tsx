import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/*
 * Effekte am Rand des Lichtbands - fuer alle Formen (1 gerade, 2 schraeg, 3 Schlange, 4 Ringe; die duennen
 * Formen 5-12 laufen ueber dieselben Geometrien, siehe KIND).
 * Ein Canvas fest im Fenster ganz hinten in .main, ein zweites nur ueber der Kopfzeile (wie das Band selbst).
 * Die Formen werden aus denselben Werten berechnet wie das Band (tokens.css), daher liegen die Effekte genau am Rand.
 * Effekte: 1 Licht · 2 Partikel · 3 Punkte · 4 EKADO-Buchstaben · 5 Herzschlag · 6 Streifen innen
 *          7 Funken · 8 Schimmer · 9 Sonar · 10 Datenregen · 11 EKADO-Regen (nur E K A D O)
 * Alle Varianten bleiben im Code (Kundenwunsch) - Auswahl ueber die Leiste unten rechts (BandPicker).
 */

const VB_W = 340;
const VB_H = 640;

/* Form 3: Mittellinie der Schlange im viewBox (zwei Bezier-Stuecke wie --snake), Strichbreite 92. */
const SNAKE_HALF = 46;
const SNAKE_X = (() => {
  const tx = new Float32Array(VB_H + 1).fill(NaN);
  const seg = (y0: number, cx: number, y1: number) => {
    const mid = (y0 + y1) / 2;
    for (let i = 0; i <= 4000; i++) {
      const t = i / 4000;
      const u = 1 - t;
      const x = u * u * u * 170 + 3 * u * u * t * cx + 3 * u * t * t * cx + t * t * t * 170;
      const y = u * u * u * y0 + 3 * u * u * t * mid + 3 * u * t * t * mid + t * t * t * y1;
      tx[Math.round(y)] = x;
    }
  };
  seg(0, 310, 320);
  seg(320, 30, 640);
  let last = 170;
  for (let i = 0; i <= VB_H; i++) {
    if (Number.isNaN(tx[i])) tx[i] = last;
    last = tx[i];
  }
  return tx;
})();

/* Form 4: Kreise im viewBox wie --rings (Aussenradius = Radius + halbe Strichbreite). */
const RINGS = [
  { cy: 150, r: 133 },
  { cy: 340, r: 16 },
  { cy: 400, r: 10 },
  { cy: 520, r: 87 },
  { cy: 620, r: 8 },
];

interface Geo {
  cx: number;
  w: number;
  top: number;
  period: number;
  tilt: number;
}

interface Span {
  cx: number;
  hw: number;
}

interface Edge {
  x: number;
  y: number;
  nx: number;
  ny: number;
}

interface Ell {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

/** Eine Form: waagrechte Spanne je Hoehe (Linienformen) oder Ellipsen (Ringe). */
/* Duenne Formen -> Grundgeometrie fuer die Randeffekte: Faden wie gerade/schraeg (Breite kommt vom Band selbst),
   duenne und doppelte Schlange wie Schlange (nur schmaler Strich), Linien/Schraffur/Zickzack/Punkte wie gerade. */
const KIND: Record<string, string> = { '5': '1', '6': '2', '7': '3', '8': '3', '9': '1', '10': '1', '11': '1', '12': '1', '13': '1', '14': '2', '15': '2', '16': '3', '17': '3' };
/* halbe Strichbreite im viewBox: Schlange 92/2, duenne Schlangen 8/2 */
const HALF: Record<string, number> = { '7': 4, '8': 4, '16': 4, '17': 4 };

function makeShape(shapeIn: string, g: Geo, y0: number, H: number) {
  const shape = KIND[shapeIn] ?? shapeIn;
  const snakeHalf = HALF[shapeIn] ?? SNAKE_HALF;
  const sx = g.w / VB_W;
  const sy = g.period / VB_H;
  const origin = g.top - g.period * 0.25;

  const span = (vy: number): Span => {
    if (shape === '1') return { cx: g.cx, hw: g.w / 2 };
    if (shape === '2') return { cx: g.cx + (vy - g.top) * Math.tan(g.tilt), hw: g.w / 2 };
    const u = ((((vy - origin) % g.period) + g.period) % g.period) / sy;
    const i = Math.min(VB_H - 1, Math.floor(u));
    const x = SNAKE_X[i] + (SNAKE_X[i + 1] - SNAKE_X[i]) * (u - i);
    const sv = (SNAKE_X[Math.min(VB_H, i + 2)] - SNAKE_X[Math.max(0, i - 2)]) / 4;
    return { cx: g.cx + (x / VB_W - 0.5) * g.w, hw: snakeHalf * sx * Math.sqrt(1 + sv * sv) };
  };

  const ellipses: Ell[] = [];
  if (shape === '4') {
    const k0 = Math.floor((y0 - origin) / g.period) - 1;
    const k1 = Math.ceil((H - origin) / g.period) + 1;
    for (let k = k0; k <= k1; k++) {
      for (const r of RINGS) {
        const e = { cx: g.cx, cy: origin + k * g.period + r.cy * sy, rx: r.r * sx, ry: r.r * sy };
        if (e.cy + e.ry > y0 - 10 && e.cy - e.ry < H + 10) ellipses.push(e);
      }
    }
  }
  const lineShape = shape !== '4';

  /** Zufaelliger Punkt auf dem Rand mit Normale nach aussen. */
  const randomEdge = (out = 0): Edge => {
    if (lineShape) {
      const vy = y0 + Math.random() * (H - y0);
      const s = span(vy);
      const side = Math.random() < 0.5 ? -1 : 1;
      return { x: s.cx + side * (s.hw + out), y: vy, nx: side, ny: 0 };
    }
    const e = ellipses[Math.floor(Math.random() * ellipses.length)] ?? { cx: g.cx, cy: H / 2, rx: 50, ry: 50 };
    const a = Math.random() * Math.PI * 2;
    return { x: e.cx + Math.cos(a) * (e.rx + out), y: e.cy + Math.sin(a) * (e.ry + out), nx: Math.cos(a), ny: Math.sin(a) };
  };

  /** Randlinien als Polylinien (fuer Licht und Punkte). */
  const paths = (out = 0): [number, number][][] => {
    if (lineShape) {
      const l: [number, number][] = [];
      const r: [number, number][] = [];
      for (let vy = y0; vy < H + 6; vy += 6) {
        const s = span(vy);
        l.push([s.cx - s.hw - out, vy]);
        r.push([s.cx + s.hw + out, vy]);
      }
      return [l, r];
    }
    return ellipses.map((e) => {
      const n = Math.max(24, Math.round((e.rx + e.ry) / 3));
      const p: [number, number][] = [];
      for (let i = 0; i <= n; i++) {
        const a = (i / n) * Math.PI * 2;
        p.push([e.cx + Math.cos(a) * (e.rx + out), e.cy + Math.sin(a) * (e.ry + out)]);
      }
      return p;
    });
  };

  /** Mittelpunkte fuer Sonar. */
  const randomCenter = (): [number, number] => {
    if (lineShape) {
      const vy = y0 + 30 + Math.random() * Math.max(1, H - y0 - 60);
      return [span(vy).cx, vy];
    }
    const e = ellipses[Math.floor(Math.random() * ellipses.length)] ?? { cx: g.cx, cy: H / 2 };
    return [e.cx, e.cy];
  };

  /** Breite fuer Effekte im Inneren (Ringe: ganze Breite, die Maske schneidet zu). */
  const inner = (vy: number): Span => (lineShape ? span(vy) : { cx: g.cx, hw: g.w / 2 });

  return { span, randomEdge, paths, randomCenter, inner, lineShape };
}

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  s: number;
  ch?: string;
  nx?: number;
  ny?: number;
  pts?: [number, number][];
}

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const MASK: Record<string, string> = {
  '3': 'var(--snake)',
  '4': 'var(--rings)',
  '7': 'var(--snake-thin)',
  '8': 'var(--snake-double)',
  '9': 'var(--lines3)',
  '10': 'var(--hatch)',
  '11': 'var(--zigzag)',
  '12': 'var(--dots)',
  '13': 'var(--lines4)',
  '14': 'var(--lines3)',
  '15': 'var(--lines4)',
  '16': 'var(--snakes3)',
  '17': 'var(--snakes4)',
};

export function BandFx({ fx, shape }: { fx: string; shape: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const topRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const cv = ref.current;
    const top = topRef.current;
    const main = cv?.closest<HTMLElement>('.main');
    const band = main?.querySelector<HTMLElement>('.band');
    if (!cv || !top || !main || !band || reduced) return;
    const ctx = cv.getContext('2d');
    const tctx = top.getContext('2d');
    const tb = main.querySelector<HTMLElement>('.tb');
    if (!ctx || !tctx) return;

    // Innen-Effekte bei Schlange/Ringen mit derselben Maske wie das Band beschneiden
    const inner = fx === '6' || fx === '8' || fx === '10' || fx === '11';
    const mask = inner ? MASK[shape] : undefined;
    for (const c of [cv, top]) {
      c.style.maskImage = mask ?? '';
      c.style.maskRepeat = mask ? 'repeat-y' : '';
    }

    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf = 0;
    let frame = 0;
    const parts: P[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = top.width = Math.round(W * dpr);
      cv.height = top.height = Math.round(H * dpr);
    };

    const read = () => {
      const css = getComputedStyle(main);
      const r = band.getBoundingClientRect();
      const tilt = parseFloat(css.getPropertyValue('--band-tilt')) || 0;
      return {
        on: !!css.getPropertyValue('--band-solid').trim(),
        brand: css.getPropertyValue('--brand').trim() || '#00D9FF',
        geo: {
          cx: r.left + r.width / 2,
          w: r.width,
          top: r.top,
          period: parseFloat(css.getPropertyValue('--snake-period')) || 640,
          tilt: (tilt * Math.PI) / 180,
        } as Geo,
      };
    };

    const strokePath = (p: [number, number][]) => {
      ctx.beginPath();
      p.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.stroke();
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      frame++;
      const { on, brand, geo } = read();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      tctx.setTransform(1, 0, 0, 1, 0, 0);
      tctx.clearRect(0, 0, top.width, top.height);
      if (!on || geo.w === 0) return;
      if (mask) {
        for (const c of [cv, top]) {
          c.style.maskPosition = `${geo.cx - geo.w / 2}px ${geo.top - geo.period * 0.25}px`;
          c.style.maskSize = `${geo.w}px ${geo.period}px`;
        }
      }
      const t = frame / 60;
      const sy = window.scrollY;
      const y0 = Math.max(0, geo.top);
      const S = makeShape(shape, geo, y0, H);

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalCompositeOperation = 'source-over';

      switch (fx) {
        case '1': {
          // Licht: Wellen laufen an den Raendern entlang
          ctx.globalCompositeOperation = 'lighter';
          ctx.shadowColor = brand;
          ctx.shadowBlur = 14;
          ctx.strokeStyle = brand;
          S.paths(4).forEach((p, pi) => {
            for (let i = 1; i < p.length; i++) {
              const [x0, y0p] = p[i - 1];
              const [x1, y1] = p[i];
              const k = Math.pow(Math.max(0, Math.sin((y1 + sy) * 0.012 + i * 0.05 - t * 3 + pi)), 6);
              ctx.globalAlpha = 0.12 + k * 0.85;
              ctx.lineWidth = 1.5 + k * 3;
              ctx.beginPath();
              ctx.moveTo(x0, y0p);
              ctx.lineTo(x1, y1);
              ctx.stroke();
            }
          });
          ctx.shadowBlur = 0;
          break;
        }
        case '2': {
          // Partikel: vom Rand nach aussen
          for (let i = 0; i < 5; i++) {
            const e = S.randomEdge();
            const v = rnd(0.3, 1.4);
            parts.push({ x: e.x, y: e.y + sy, vx: e.nx * v + rnd(-0.2, 0.2), vy: e.ny * v + rnd(-0.4, 0.4), life: 0, max: rnd(60, 130), s: rnd(0.8, 2.2) });
          }
          ctx.globalCompositeOperation = 'lighter';
          ctx.fillStyle = brand;
          break;
        }
        case '3': {
          // Punkte: zwei Punktreihen wandern den Rand entlang
          ctx.fillStyle = brand;
          for (const [out, gap, r, a] of [
            [10, 14, 1.8, 0.9],
            [24, 20, 1.1, 0.45],
          ] as const) {
            for (const p of S.paths(out)) {
              let acc = (t * 30) % gap;
              for (let i = 1; i < p.length; i++) {
                const [ax, ay] = p[i - 1];
                const [bx, by] = p[i];
                const seg = Math.hypot(bx - ax, by - ay);
                while (acc < seg) {
                  const f = acc / seg;
                  ctx.globalAlpha = a;
                  ctx.beginPath();
                  ctx.arc(ax + (bx - ax) * f, ay + (by - ay) * f, r, 0, Math.PI * 2);
                  ctx.fill();
                  acc += gap;
                }
                acc -= seg;
              }
            }
          }
          break;
        }
        case '4': {
          // EKADO-Buchstaben treiben ziellos nach aussen
          if (frame % 3 === 0) {
            const e = S.randomEdge(2);
            const v = rnd(0.15, 0.6);
            parts.push({ x: e.x, y: e.y + sy, vx: e.nx * v, vy: e.ny * v + rnd(-0.3, 0.3), life: 0, max: rnd(120, 220), s: rnd(8, 11), ch: 'EKADO'[Math.floor(Math.random() * 5)] });
          }
          ctx.fillStyle = brand;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          break;
        }
        case '5': {
          // Herzschlag: EKG-Linie zeichnet sich vom Rand nach aussen
          if (frame % 50 === 0) {
            const e = S.randomEdge(2);
            parts.push({ x: e.x, y: e.y + sy, vx: 0, vy: 0, life: 0, max: 110, s: rnd(110, 170), nx: e.nx, ny: e.ny });
          }
          ctx.strokeStyle = brand;
          ctx.lineWidth = 1.6;
          ctx.shadowColor = brand;
          ctx.shadowBlur = 8;
          break;
        }
        case '6': {
          // Streifen innen: duenne dunkle Linien laufen nach unten
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.lineWidth = 2;
          const gap = 16;
          const off = (t * 40) % gap;
          for (let py = Math.floor((y0 + sy) / gap) * gap + off; py - sy < H; py += gap) {
            const s = S.inner(py - sy);
            const k = mask ? 1.8 : 1;
            ctx.beginPath();
            ctx.moveTo(s.cx - s.hw * k + (mask ? 0 : 1), py - sy);
            ctx.lineTo(s.cx + s.hw * k - (mask ? 0 : 1), py - sy);
            ctx.stroke();
          }
          break;
        }
        case '7': {
          // Funken: kurze Blitze springen vom Rand
          if (Math.random() < 0.35) {
            const e = S.randomEdge(1);
            const len = rnd(18, 55);
            const pts: [number, number][] = [[0, 0]];
            for (let k = 1; k <= 7; k++) {
              const d = (len * k) / 7;
              const j = rnd(-7, 7);
              pts.push([e.nx * d - e.ny * j, e.ny * d + e.nx * j]);
            }
            parts.push({ x: e.x, y: e.y + sy, vx: 0, vy: 0, life: 0, max: rnd(6, 12), s: 1, pts });
          }
          ctx.strokeStyle = brand;
          ctx.shadowColor = brand;
          ctx.shadowBlur = 10;
          ctx.globalCompositeOperation = 'lighter';
          break;
        }
        case '8': {
          // Schimmer: helle Welle gleitet innen nach unten
          ctx.globalCompositeOperation = 'lighter';
          const L = 520;
          for (let vy = y0; vy < H; vy += 3) {
            const d = (((vy + sy - t * 220) % L) + L) % L;
            const k = Math.exp(-((d - L / 2) ** 2) / 1800);
            if (k < 0.02) continue;
            const s = S.inner(vy);
            const w = mask ? 1.8 : 0.95;
            ctx.strokeStyle = `rgba(255, 255, 255, ${(k * 0.55).toFixed(3)})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(s.cx - s.hw * w, vy);
            ctx.lineTo(s.cx + s.hw * w, vy);
            ctx.stroke();
          }
          break;
        }
        case '9': {
          // Sonar: Ringe breiten sich von der Mitte aus
          if (frame % 45 === 0) {
            const [x, y] = S.randomCenter();
            parts.push({ x, y: y + sy, vx: 0, vy: 0, life: 0, max: 150, s: 1 });
          }
          ctx.strokeStyle = brand;
          ctx.lineWidth = 1.4;
          break;
        }
        case '10':
        case '11': {
          // Datenregen innen (11: nur die Buchstaben E K A D O)
          const set = fx === '11' ? 'EKADO' : '01EKADO';
          if (parts.length < 70 && Math.random() < 0.6) {
            parts.push({ x: rnd(-0.75, 0.75), y: y0 + sy - 10, vx: 0, vy: rnd(1.4, 3.2), life: 0, max: 9999, s: rnd(9, 12), ch: set[Math.floor(Math.random() * set.length)] });
          }
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          break;
        }
      }

      // Partikel fortschreiben und zeichnen
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life++;
        const vy = p.y - sy;
        const k = 1 - p.life / p.max;
        if (k <= 0 || vy < -80 || vy > H + 80) {
          parts.splice(i, 1);
          continue;
        }
        switch (fx) {
          case '2':
            p.x += p.vx;
            p.y += p.vy;
            ctx.globalAlpha = k;
            ctx.beginPath();
            ctx.arc(p.x, vy, p.s, 0, Math.PI * 2);
            ctx.fill();
            break;
          case '4':
            p.vx += rnd(-0.03, 0.03);
            p.vy += rnd(-0.03, 0.03);
            p.x += p.vx;
            p.y += p.vy;
            ctx.globalAlpha = Math.min(1, p.life / 20) * k * 0.9;
            ctx.font = `600 ${p.s}px 'JetBrains Mono', monospace`;
            ctx.fillText(p.ch!, p.x, vy);
            break;
          case '5': {
            const prog = Math.min(1, p.life / 45);
            ctx.globalAlpha = Math.max(0, p.life > 60 ? 1 - (p.life - 60) / 50 : 1);
            const nx = p.nx!;
            const ny = p.ny!;
            const pts: [number, number][] = [];
            const steps = 40;
            for (let s = 0; s <= steps * prog; s++) {
              const f = s / steps;
              const e =
                f < 0.3 ? 0 : f < 0.36 ? -5 * Math.sin(((f - 0.3) / 0.06) * Math.PI) : f < 0.42 ? 0 : f < 0.46 ? -26 * ((f - 0.42) / 0.04) : f < 0.5 ? -26 + 38 * ((f - 0.46) / 0.04) : f < 0.54 ? 12 - 12 * ((f - 0.5) / 0.04) : 0;
              // entlang der Normale nach aussen, Ausschlag quer dazu
              pts.push([p.x + nx * f * p.s - ny * e, vy + ny * f * p.s + nx * e]);
            }
            if (pts.length > 1) strokePath(pts);
            break;
          }
          case '7':
            ctx.globalAlpha = k;
            ctx.lineWidth = 1.2;
            strokePath(p.pts!.map(([dx, dy]) => [p.x + dx, vy + dy]));
            break;
          case '9': {
            ctx.globalAlpha = k * 0.8;
            ctx.beginPath();
            ctx.arc(p.x, vy, (p.life / p.max) * 140, 0, Math.PI * 2);
            ctx.stroke();
            break;
          }
          case '10':
          case '11': {
            p.y += p.vy;
            const s = S.inner(vy);
            ctx.font = `700 ${p.s}px 'JetBrains Mono', monospace`;
            ctx.globalAlpha = 0.75;
            ctx.fillStyle = 'rgba(4, 20, 28, 0.85)';
            ctx.fillText(p.ch!, s.cx + p.x * s.hw, vy);
            if (Math.random() < 0.04) {
              const set = fx === '11' ? 'EKADO' : '01EKADO';
              p.ch = set[Math.floor(Math.random() * set.length)];
            }
            break;
          }
        }
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      // Ueber der Kopfzeile: dieselben Pixel noch einmal, nur im Bereich der Kopfzeile (wie das Band selbst)
      if (tb) {
        const r = tb.getBoundingClientRect();
        top.style.clipPath = `inset(${r.top}px ${W - r.right}px ${H - r.bottom}px ${r.left}px)`;
        tctx.drawImage(cv, 0, 0);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    };
    document.addEventListener('visibilitychange', onVis);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      for (const c of [cv, top]) c.style.maskImage = '';
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [fx, shape, reduced]);

  return (
    <>
      <canvas ref={ref} className="band-fx" aria-hidden />
      <canvas ref={topRef} className="band-fx band-fx-top" aria-hidden />
    </>
  );
}
