import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { firmaFlow } from '../../../content/firma-flow';
import { useMode } from '../../../hooks/useMode';
import { FlowNodes } from '../../fx/FlowNodes';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';
import { useHowTab } from '../insta/howTab';
import { FIRMA_SECTIONS } from './FirmaStart';

/** Schritt 02 blinkt in Gelb (Kundenwunsch 2026-10-04, alle Geraete). */
const BLINK = 1;

const LAYOUTS: LayoutDef[] = [
  { name: 'Route', cols: '1fr 3fr 1fr', areas: ['detail flow flow'] },
  { name: 'Wide', cols: '1fr 1fr 1fr', areas: ['flow flow flow', 'detail detail detail'], rows: 'auto auto' },
  { name: 'Mirror', cols: '1fr 3fr 1fr', areas: ['flow flow detail'] },
];

/**
 * EKADO Firma "Ablaeufe": sechs Bereiche hinter Reitern (wie InstaOto "So funktioniert's"),
 * je Bereich nur der Ablauf in vier Schritten. Handy: Schritte mit Text untereinander, kein Sheet.
 */
export function FirmaHow() {
  const { t, go } = useView();
  const fl = firmaFlow[t.lang];
  const [tab, setTab] = useHowTab('f-flow');
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const touched = useRef(0);
  const mobile = useMode() === 'mobile';

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

  /** Bereich waehlen: Seite springt nach oben, Ueberschrift oben, Inhalt direkt darunter. */
  const choose = (i: number) => {
    setTab(i);
    setMenuOpen(false);
    go('f-flow');
  };

  const list = (
    <div className="how-tabs" role="tablist" id="fh-menu">
      {FIRMA_SECTIONS.map((s, i) => (
        <button key={s.key} type="button" role="tab" aria-selected={i === tab} className="how-tab fh-tab" onClick={() => choose(i)}>
          <s.icon /> {t.f.nav[s.nav]}
        </button>
      ))}
    </div>
  );

  // Handy: Hamburger - nur der gewaehlte Bereich, die Liste klappt auf Wunsch auf
  const tabs = mobile ? (
    <div className="fh-burger">
      <button type="button" className="fh-burger-btn" aria-expanded={menuOpen} aria-controls="fh-menu" onClick={() => setMenuOpen((o) => !o)}>
        {menuOpen ? <X /> : <Menu />}
        <span>{t.f.nav[sec.nav]}</span>
        <span className="micro">
          {tab + 1}/{FIRMA_SECTIONS.length}
        </span>
      </button>
      {menuOpen && list}
    </div>
  ) : (
    list
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
                    <b className={i === BLINK ? 'blink-num' : undefined}>{String(i + 1).padStart(2, '0')}</b> · {s.who}
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
                    <b className={i === BLINK ? 'blink-num' : undefined}>{String(i + 1).padStart(2, '0')}</b> · {s.who}
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
