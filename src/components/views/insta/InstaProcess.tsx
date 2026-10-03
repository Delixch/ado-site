import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FlowNodes } from '../../fx/FlowNodes';
import { openSheet } from '../../spread/sheet';
import { useMode } from '../../../hooks/useMode';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const LAYOUTS: LayoutDef[] = [
  { name: 'Route', cols: '1fr 3fr 1fr', areas: ['detail flow flow'] },
  { name: 'Wide', cols: '1fr 1fr 1fr', areas: ['flow flow flow', 'detail detail detail'], rows: 'auto auto' },
  { name: 'Mirror', cols: '1fr 3fr 1fr', areas: ['flow flow detail'] },
];

export function InstaProcess({ tabs }: { tabs?: ReactNode }) {
  const { t } = useView();
  const p = t.i.process;
  const [active, setActive] = useState(0);
  const touched = useRef(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (Date.now() - touched.current > 9000) setActive((a) => (a + 1) % p.steps.length);
    }, 3400);
    return () => window.clearInterval(id);
  }, [p.steps.length]);

  const pick = (i: number) => {
    touched.current = Date.now();
    setActive(i);
  };
  const st = p.steps[active];
  const mobile = useMode() === 'mobile';
  const detail = (
    <motion.div key={active} className="ex-detail" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
      <span className="micro">{st.time}</span>
      <h3 className="poster">{st.t}</h3>
      <p className="lede">{st.d}</p>
    </motion.div>
  );

  const blocks: Block[] = [
    {
      id: 'flow',
      tone: 'deep',
      node: (
        <FlowNodes
          active={active}
          onPick={(i) => {
            pick(i);
            openSheet();
          }}
          items={p.steps.map((s, i) => (
            <>
              <span className="micro">
                <b>{String(i + 1).padStart(2, '0')}</b> · {s.time}
              </span>
              <span className="ex-title whisper">{s.t}</span>
            </>
          ))}
        />
      ),
    },
    {
      id: 'detail',
      tone: 'brand',
      node: (
        <div className="how-detail">
          {tabs}
          {!mobile && <AnimatePresence mode="wait">{detail}</AnimatePresence>}
        </div>
      ),
    },
    ...(mobile ? [{ id: 'more', tone: 'brand' as const, sheet: true, node: detail }] : []),
  ];

  return <Spread view="i-process" head={{ folio: '03', kicker: p.eyebrow, line1: p.line1, line2: p.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
