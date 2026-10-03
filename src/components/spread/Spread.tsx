import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { LAYOUT_INTERVAL } from '../../config';
import { useLayoutCycle } from '../../hooks/useLayoutCycle';
import { useMode } from '../../hooks/useMode';
import { useView } from '../ViewFrame';
import { RevealLines } from '../fx/RevealLines';
import { BottomSheet } from './BottomSheet';
import { SHEET_EVENT } from './sheet';
import { MastRobot } from '../robot/MastRobot';

/** Ein Baustein der Doppelseite. `id` ist zugleich der Name im grid-template-areas. */
export interface Block {
  id: string;
  node: ReactNode;
  /** Flaeche: Papier (Standard), tiefes Papier, Tinte (invers), Markenfarbe, Bild (randlos). */
  tone?: 'paper' | 'deep' | 'ink' | 'brand' | 'media';
  /** Ohne Innenabstand (Bilder, Buehnen). */
  bleed?: boolean;
  className?: string;
  /** Handy: statt in der Liste im Bottom Sheet (Detail zu einer Auswahl weiter oben). */
  sheet?: boolean;
}

/** Ein Satzspiegel: Spalten + benannte Flaechen, wie in test.html. */
export interface LayoutDef {
  name: string;
  cols: string;
  areas: string[];
  rows?: string;
  /** Tablet: eigener Plan, sonst einspaltig in Lesereihenfolge. */
  tablet?: { cols: string; areas: string[]; rows?: string };
}

export interface Masthead {
  folio: string;
  kicker: string;
  line1: string;
  line2: string;
}

const morph = { type: 'spring', stiffness: 90, damping: 18, mass: 1 } as const;
const enter = { duration: 0.8, ease: [0.77, 0, 0.175, 1] } as const;

const parse = (areas: string[]) => areas.map((r) => r.replace(/"/g, '').trim().split(/\s+/));

/** Lesereihenfolge eines Plans: zeilenweise, jede Flaeche beim ersten Auftreten. */
const readingOrder = (areas: string[]) => {
  const seen: string[] = [];
  parse(areas).flat().forEach((n) => n !== '.' && !seen.includes(n) && seen.push(n));
  return seen;
};

const gridStyle = (cols: string, areas: string[], rows?: string): CSSProperties => ({
  gridTemplateColumns: cols,
  gridTemplateAreas: areas.map((a) => `"${a.replace(/"/g, '').trim()}"`).join(' '),
  gridTemplateRows: rows ?? `repeat(${areas.length}, minmax(var(--spread-row), auto))`,
});

/** Kleiner Plan eines Layouts (wie die farbigen Bloecke in test.html). */
function MiniPlan({ layout, blocks }: { layout: LayoutDef; blocks: Block[] }) {
  const names = readingOrder(layout.areas);
  return (
    <span className="mini" style={{ ...gridStyle(layout.cols, layout.areas, `repeat(${layout.areas.length}, 1fr)`) }} aria-hidden>
      {names.map((n) => (
        <i key={n} style={{ gridArea: n }} data-tone={blocks.find((b) => b.id === n)?.tone ?? 'paper'} />
      ))}
    </span>
  );
}

/**
 * Doppelseite: Kopf (Folio, Titel, Layout-Wahl) + Bausteine im Satzspiegel.
 * Wechselt der Satzspiegel, gleiten alle Bausteine an ihren neuen Platz.
 */
export function Spread({
  view,
  head,
  blocks,
  layouts,
  robot = true,
  tabs,
}: {
  view: string;
  head: Masthead;
  blocks: Block[];
  layouts: LayoutDef[];
  /** Mehrere Abschnitte auf einer Seite: nur der erste zeigt den Roboter. */
  robot?: boolean;
  /** Reiter unter der Ueberschrift (eine Seite mit mehreren Ansichten). */
  tabs?: ReactNode;
}) {
  const { auto, nonce, t } = useView();
  const mode = useMode();
  const [hover, setHover] = useState(false);
  const { index, setIndex } = useLayoutCycle(view, layouts.length, auto && !hover, LAYOUT_INTERVAL, nonce);
  const layout = layouts[index];
  const mobile = mode === 'mobile';
  const sheetBlocks = mobile ? blocks.filter((b) => b.sheet) : [];
  const shown = mobile ? blocks.filter((b) => !b.sheet) : blocks;
  const [sheetOpen, setSheetOpen] = useState(false);
  useEffect(() => {
    if (!mobile || sheetBlocks.length === 0) return;
    const h = () => setSheetOpen(true);
    window.addEventListener(SHEET_EVENT, h);
    return () => window.removeEventListener(SHEET_EVENT, h);
  }, [mobile, sheetBlocks.length]);
  useEffect(() => setSheetOpen(false), [view, mobile]);

  const plan = useMemo(() => {
    if (mode === 'desktop') return { style: gridStyle(layout.cols, layout.areas, layout.rows), order: null };
    if (mode === 'tablet' && layout.tablet) return { style: gridStyle(layout.tablet.cols, layout.tablet.areas, layout.tablet.rows), order: null };
    return { style: undefined, order: readingOrder(layout.areas) };
  }, [layout, mode]);

  return (
    <div className="spread-wrap" data-view={view}>
      <header className="mast">
        <span className="mast-folio" aria-hidden>
          {head.folio}
        </span>
        <div className="mast-text">
          <span className="mast-kicker">
            <b>№ {head.folio}</b>
            {head.kicker}
          </span>
          <h1 className="mast-title">
            <RevealLines lines={[head.line1]} className="mast-l1" />
            <RevealLines lines={[head.line2]} className="mast-l2" delay={0.12} />
          </h1>
          {tabs}
        </div>
        {robot && <MastRobot />}
        <nav className="dial" aria-label="Layout">
          <span className="dial-label">
            <span>{t.ui.layout}</span>
            <motion.b key={layout.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              {String(index + 1).padStart(2, '0')} · {layout.name}
            </motion.b>
          </span>
          <span className="dial-plans">
            {layouts.map((l, i) => (
              <button
                type="button"
                key={l.name}
                className="dial-btn"
                aria-pressed={i === index}
                aria-label={l.name}
                title={l.name}
                onClick={() => setIndex(i)}
              >
                <MiniPlan layout={l} blocks={blocks} />
              </button>
            ))}
          </span>
        </nav>
      </header>

      <div
        className="spread"
        data-layout={layout.name}
        data-flow={plan.order ? 'stack' : 'grid'}
        style={plan.style}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setHover(false)}
      >
        <i className="mark mark-tl" aria-hidden />
        <i className="mark mark-tr" aria-hidden />
        <i className="mark mark-bl" aria-hidden />
        <i className="mark mark-br" aria-hidden />
        <i className="spread-runner" aria-hidden />
        {shown.map((b, i) => (
          <motion.section
            key={b.id}
            layout
            className={`blk ${b.className ?? ''}`}
            data-tone={b.tone ?? 'paper'}
            data-bleed={b.bleed || undefined}
            style={{ gridArea: plan.order ? undefined : b.id, order: plan.order ? plan.order.indexOf(b.id) : undefined }}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            transition={{ layout: morph, default: { ...enter, delay: 0.15 + i * 0.07 } }}
          >
            <motion.div layout="position" className="blk-in" transition={{ layout: morph }}>
              {b.node}
            </motion.div>
          </motion.section>
        ))}
      </div>
      {sheetBlocks.length > 0 && (
        <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} label={t.ui.closeMenu}>
          {sheetBlocks.map((b) => (
            <section key={b.id} className={`blk bsheet-blk ${b.className ?? ''}`} data-tone={b.tone ?? 'paper'} data-bleed={b.bleed || undefined}>
              <div className="blk-in">{b.node}</div>
            </section>
          ))}
        </BottomSheet>
      )}
    </div>
  );
}
