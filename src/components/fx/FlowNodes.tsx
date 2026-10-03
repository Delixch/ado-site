import { Fragment, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { HoverTile, useHoverTile } from './HoverTile';
import { useMode } from '../../hooks/useMode';

/**
 * Knoten im Zickzack, verbunden durch rechtwinklige Leitungen mit wanderndem Lichtpunkt
 * (wie die Schritt-Karten mit orangen Leitungen). Geometrie wird gemessen, nicht geraten.
 */
export function FlowNodes({
  items,
  active,
  onPick,
  links,
  hoverTile = false,
  cols: colsWide = 2,
  place: placeWide,
}: {
  items: ReactNode[];
  active: number;
  onPick: (i: number) => void;
  cols?: number;
  /** Eigene Lage je Knoten (Spalte, Zeile, Zeilen-Spanne); sonst Zickzack. */
  place?: { col: number; row: number }[];
  /** Eigene Verbindungen [von, nach]; sonst der Reihe nach. */
  links?: [number, number][];
  /** Kachel-Effekt: Quadrat folgt dem Zeiger hinter den Karten. */
  hoverTile?: boolean;
}) {
  const tile = useHoverTile();
  // Handy: Karten untereinander statt Zickzack/Spalten (sonst wird der Text gequetscht)
  const narrow = useMode() === 'mobile';
  const cols = narrow ? 1 : colsWide;
  const place = narrow ? undefined : placeWide;
  const box = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLButtonElement | null)[]>([]);
  const [geo, setGeo] = useState<{ w: number; h: number; paths: string[] }>({ w: 0, h: 0, paths: [] });

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const b = el.getBoundingClientRect();
      const s = el.offsetWidth ? b.width / el.offsetWidth : 1;
      const rects = nodes.current.map((n) => {
        const r = n!.getBoundingClientRect();
        return { x: (r.left - b.left) / s, y: (r.top - b.top) / s, w: r.width / s, h: r.height / s };
      });
      const pairs = links ?? rects.slice(0, -1).map((_, i) => [i, i + 1] as [number, number]);
      const paths = pairs.map(([from, to]) => {
        const a = rects[from];
        const z = rects[to];
        if (z.x > a.x + a.w) {
          const hx = a.x + a.w;
          const hy = a.y + a.h / 2;
          const tx = z.x;
          const ty = z.y + z.h / 2;
          const mx = (hx + tx) / 2;
          const rr = Math.min(14, Math.abs(ty - hy) / 2, (tx - hx) / 2);
          const dy = ty > hy ? 1 : -1;
          if (Math.abs(ty - hy) < 2) return `M ${hx},${hy} L ${tx},${ty}`;
          return `M ${hx},${hy} L ${mx - rr},${hy} Q ${mx},${hy} ${mx},${hy + rr * dy} L ${mx},${ty - rr * dy} Q ${mx},${ty} ${mx + rr},${ty} L ${tx},${ty}`;
        }
        const sx = a.x + a.w / 2;
        const sy = a.y + a.h;
        const ex = z.x + z.w / 2;
        const ey = z.y;
        const my = (sy + ey) / 2;
        const r = Math.min(14, Math.abs(ex - sx) / 2, Math.abs(ey - sy) / 2);
        const dir = ex > sx ? 1 : -1;
        if (Math.abs(ex - sx) < 2) return `M ${sx},${sy} L ${ex},${ey}`;
        return `M ${sx},${sy} L ${sx},${my - r} Q ${sx},${my} ${sx + r * dir},${my} L ${ex - r * dir},${my} Q ${ex},${my} ${ex},${my + r} L ${ex},${ey}`;
      });
      setGeo({ w: el.offsetWidth, h: el.offsetHeight, paths });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length, cols, place, links]);

  return (
    <div ref={box} className="steps" style={{ ['--flow-cols' as string]: cols }} onPointerLeave={hoverTile ? tile.list.onPointerLeave : undefined}>
      <svg className="steps-wires" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w || 1} ${geo.h || 1}`} aria-hidden>
        {geo.paths.map((d, i) => (
          <g key={i} data-lit={links ? (links[i][1] <= active) : i < active}>
            <path d={d} className="steps-wire" />
            <circle r="4" className="steps-dot">
              <animateMotion dur="2.2s" begin={`${i * 0.35}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        ))}
      </svg>
      {items.map((node, i) => {
        const cell = place ? { gridColumn: place[i].col, gridRow: place[i].row } : { gridColumn: (i % cols) + 1, gridRow: i + 1 };
        return (
          <Fragment key={i}>
            {hoverTile && <HoverTile {...tile.at(i)} className="hover-tile-cell" style={cell} />}
            <button
              type="button"
              ref={(n) => {
                nodes.current[i] = n;
              }}
              className="step"
              data-side={i % cols}
              data-done={i <= active}
              aria-pressed={i === active}
              onClick={() => onPick(i)}
              onPointerEnter={hoverTile ? tile.item(i).onPointerEnter : undefined}
              style={cell}
            >
              <span className="step-pin step-pin-in" aria-hidden />
              {node}
              <span className="step-pin step-pin-out" aria-hidden />
            </button>
          </Fragment>
        );
      })}
    </div>
  );
}
