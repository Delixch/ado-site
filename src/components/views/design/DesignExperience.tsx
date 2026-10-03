import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FlowNodes } from '../../fx/FlowNodes';
import { Plate } from '../../fx/Plate';
import { openSheet } from '../../spread/sheet';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const LAYOUTS: LayoutDef[] = [
  { name: 'Path', cols: '1fr 1fr 1fr', areas: ['flow flow detail', 'flow flow film', 'flow flow span'] },
  { name: 'Route', cols: '1fr 1fr 1fr', areas: ['detail flow flow', 'film flow flow', 'span flow flow'] },
  { name: 'Wide', cols: '1fr 1fr 1fr', areas: ['flow flow flow', 'detail film span'], rows: 'auto minmax(var(--spread-row), auto)' },
];

const IDLE_MS = 9000;

export function DesignExperience() {
  const { t } = useView();
  const e = t.d.experience;
  const [active, setActive] = useState(0);
  const touched = useRef(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (Date.now() - touched.current > IDLE_MS) setActive((a) => (a + 1) % e.journey.length);
    }, 3600);
    return () => window.clearInterval(id);
  }, [e.journey.length]);

  const pick = (i: number) => {
    touched.current = Date.now();
    setActive(i);
    openSheet();
  };

  const st = e.journey[active];
  const first = e.journey[e.journey.length - 1].year.match(/\d{4}/)?.[0];

  const blocks: Block[] = [
    {
      id: 'flow',
      tone: 'deep',
      node: (
        <FlowNodes
          active={active}
          onPick={pick}
          items={e.journey.map((j, i) => (
            <>
              <span className="micro">
                <b>{String(i + 1).padStart(2, '0')}</b> · {j.year}
              </span>
              <span className={`ex-title whisper${j.glow ? ' glow-blink' : ''}`}>{j.title}</span>
              <span className="micro">{j.organization}</span>
            </>
          ))}
        />
      ),
    },
    {
      id: 'detail',
      sheet: true,
      node: (
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="ex-detail"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="micro">{st.year}</span>
            <h3 className="poster">{st.title}</h3>
            <span className="micro">{st.organization}</span>
            <p className="lede">{st.description}</p>
          </motion.div>
        </AnimatePresence>
      ),
    },
    { id: 'film', trace: true, tone: 'media', bleed: true, node: <Plate name="path" caption={e.eyebrow} /> },
    {
      id: 'span',
      tone: 'brand',
      node: (
        <div className="ex-span">
          <span className="micro">{e.eyebrow}</span>
          <span className="poster">
            {first} — {new Date().getFullYear()}
          </span>
          <span className="micro">
            {e.journey.length} · {e.line2.replace(/\.$/, '')}
          </span>
        </div>
      ),
    },
  ];

  return <Spread view="d-experience" head={{ folio: '06', kicker: e.eyebrow, line1: e.line1, line2: e.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
