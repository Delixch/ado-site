import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { firmaFlow } from '../../../content/firma-flow';
import { useMode } from '../../../hooks/useMode';
import { FlowNodes } from '../../fx/FlowNodes';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';
import { HOW_TAB_EVENT, takeHowTab } from '../insta/howTab';
import { FIRMA_SECTIONS } from './FirmaStart';

const LAYOUTS: LayoutDef[] = [
  { name: 'Route', cols: '1fr 3fr 1fr', areas: ['detail flow flow'] },
  { name: 'Wide', cols: '1fr 1fr 1fr', areas: ['flow flow flow', 'detail detail detail'], rows: 'auto auto' },
  { name: 'Mirror', cols: '1fr 3fr 1fr', areas: ['flow flow detail'] },
];

/**
 * ADO Firma "Ablaeufe": sechs Bereiche hinter Reitern (wie InstaOto "So funktioniert's"),
 * je Bereich nur der Ablauf in vier Schritten. Handy: Schritte mit Text untereinander, kein Sheet.
 */
export function FirmaHow() {
  const { t } = useView();
  const fl = firmaFlow[t.lang];
  const [tab, setTab] = useState(takeHowTab);
  const [active, setActive] = useState(0);
  const touched = useRef(0);
  const mobile = useMode() === 'mobile';

  useEffect(() => {
    const h = (e: Event) => {
      setTab((e as CustomEvent<number>).detail);
      takeHowTab();
    };
    window.addEventListener(HOW_TAB_EVENT, h);
    return () => window.removeEventListener(HOW_TAB_EVENT, h);
  }, []);

  const sec = FIRMA_SECTIONS[tab] ?? FIRMA_SECTIONS[0];
  const area = fl.areas[tab] ?? fl.areas[0];
  const head = t.f[sec.key];

  useEffect(() => {
    setActive(0);
    if (mobile) return;
    const id = window.setInterval(() => {
      if (Date.now() - touched.current > 9000) setActive((a) => (a + 1) % area.steps.length);
    }, 3400);
    return () => window.clearInterval(id);
  }, [tab, mobile, area.steps.length]);

  const pick = (i: number) => {
    touched.current = Date.now();
    setActive(i);
  };

  const tabs = (
    <div className="how-tabs" role="tablist">
      {FIRMA_SECTIONS.map((s, i) => (
        <button key={s.key} type="button" role="tab" aria-selected={i === tab} className="how-tab fh-tab" onClick={() => setTab(i)}>
          <s.icon /> {t.f.nav[s.nav]}
        </button>
      ))}
    </div>
  );

  const st = area.steps[active];

  const blocks: Block[] = mobile
    ? [
        {
          id: 'detail',
          tone: 'brand',
          node: (
            <div className="how-detail">
              {tabs}
              <p className="lede">{area.lede}</p>
            </div>
          ),
        },
        {
          id: 'flow',
          tone: 'deep',
          node: (
            <ol className="fh-list">
              {area.steps.map((s, i) => (
                <li key={s.t}>
                  <span className="micro">
                    <b>{String(i + 1).padStart(2, '0')}</b> · {s.who}
                  </span>
                  <span className="whisper">{s.t}</span>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
          ),
        },
      ]
    : [
        {
          id: 'flow',
          tone: 'deep',
          node: (
            <FlowNodes
              active={active}
              onPick={pick}
              items={area.steps.map((s, i) => (
                <>
                  <span className="micro">
                    <b>{String(i + 1).padStart(2, '0')}</b> · {s.who}
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
              <AnimatePresence mode="wait">
                <motion.div key={`${tab}-${active}`} className="ex-detail" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <span className="micro">
                    {String(active + 1).padStart(2, '0')} · {st.who}
                  </span>
                  <h3 className="poster">{st.t}</h3>
                  <p className="lede">{st.d}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          ),
        },
      ];

  return <Spread key={tab} view="f-flow" head={{ folio: String(tab + 1).padStart(2, '0'), kicker: head.eyebrow, line1: head.line1, line2: head.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
