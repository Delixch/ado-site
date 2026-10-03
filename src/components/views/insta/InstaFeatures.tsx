import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';
import { Shot, type ShotName } from './parts';

/** Funktion -> passende Aufnahme des echten Panels. */
const SHOTS: ShotName[] = ['akislar', 'editor', 'simulator', 'inbox', 'posts', 'uebersicht'];

const LAYOUTS: LayoutDef[] = [
  { name: 'Screen', cols: '1fr 1fr 1fr', areas: ['shot shot list', 'shot shot detail'] },
  { name: 'Mirror', cols: '1fr 1fr 1fr', areas: ['list shot shot', 'detail shot shot'] },
  { name: 'Wide', cols: '1fr 1fr 1fr', areas: ['shot shot shot', 'list list detail'], rows: 'auto minmax(var(--spread-row), auto)' },
];

export function InstaFeatures({ tabs }: { tabs?: ReactNode }) {
  const { t } = useView();
  const f = t.i.features;
  const [sel, setSel] = useState(0);
  const touched = useRef(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (Date.now() - touched.current > 12000) setSel((s) => (s + 1) % f.items.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [f.items.length]);

  const pick = (i: number) => {
    touched.current = Date.now();
    setSel(i);
  };

  const blocks: Block[] = [
    {
      id: 'list',
      node: (
        <div className="ig-steps-wrap">
          {tabs}
          <ol className="ig-steps ig-steps-pick" data-idle="false">
            {f.items.map((it, i) => (
              <li key={it.t} data-on={i === sel} data-now={i === sel} style={{ ['--i' as string]: i }}>
                <button type="button" aria-pressed={i === sel} onClick={() => pick(i)} onPointerEnter={(e) => e.pointerType === 'mouse' && pick(i)}>
                  <span className="ig-dot">{i + 1}</span>
                  <span className="whisper">{it.t}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      ),
    },
    {
      id: 'shot',
      tone: 'deep',
      node: (
        <AnimatePresence mode="wait">
          <motion.div
            key={sel}
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Shot name={SHOTS[sel]} />
          </motion.div>
        </AnimatePresence>
      ),
    },
    {
      id: 'detail',
      tone: 'brand',
      node: (
        <AnimatePresence mode="wait">
          <motion.div key={sel} className="ex-detail" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <span className="micro">{String(sel + 1).padStart(2, '0')} / 06</span>
            <h3 className="poster">{f.items[sel].t}</h3>
            <p className="lede">{f.items[sel].d}</p>
          </motion.div>
        </AnimatePresence>
      ),
    },
  ];

  return <Spread view="i-features" head={{ folio: '02', kicker: f.eyebrow, line1: f.line1, line2: f.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
