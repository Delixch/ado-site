import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ShieldAlert } from 'lucide-react';
import { FlowNodes } from '../../fx/FlowNodes';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const LAYOUTS: LayoutDef[] = [
  { name: 'Route', cols: '1fr 1fr 1fr', areas: ['flow flow detail', 'flow flow need', 'send send need'] },
  { name: 'Checklist', cols: '1fr 1fr 1fr', areas: ['need flow flow', 'need flow flow', 'detail send send'] },
  { name: 'Wide', cols: '1fr 1fr 1fr', areas: ['flow flow flow', 'detail need send'], rows: 'auto minmax(var(--spread-row), auto)' },
];

export function InstaProcess() {
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

  const blocks: Block[] = [
    {
      id: 'flow',
      tone: 'deep',
      node: (
        <FlowNodes
          active={active}
          onPick={pick}
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
        <AnimatePresence mode="wait">
          <motion.div key={active} className="ex-detail" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <span className="micro">{st.time}</span>
            <h3 className="poster">{st.t}</h3>
            <p className="lede">{st.d}</p>
          </motion.div>
        </AnimatePresence>
      ),
    },
    {
      id: 'need',
      node: (
        <div className="in-need">
          <span className="micro">
            <b>{p.needTitle}</b>
          </span>
          <ul>
            {p.need.map((n) => (
              <li key={n.t}>
                <span className="in-check">
                  <Check />
                </span>
                <span>
                  <span className="whisper">{n.t}</span>
                  <span className="in-sub">{n.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 'send',
      node: (
        <div className="in-send">
          <ShieldAlert />
          <span>
            <span className="micro">
              <b>{p.sendTitle}</b>
            </span>
            <p className="lede">{p.send}</p>
          </span>
        </div>
      ),
    },
  ];

  return <Spread view="i-process" head={{ folio: '03', kicker: p.eyebrow, line1: p.line1, line2: p.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
