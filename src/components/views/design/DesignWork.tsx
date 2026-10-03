import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowDown, ArrowUp, ArrowUpRight, Lock } from 'lucide-react';
import { PROJECTS } from '../../../content/design-data';
import { RevealLines } from '../../fx/RevealLines';
import { TiltDeck } from '../../fx/TiltDeck';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const SHOTS = PROJECTS.map((p) => `/media/shots/${p.number}.webp`);
const IDLE_MS = 10000;
const CYCLE_MS = 4800;

const LAYOUTS: LayoutDef[] = [
  { name: 'Deck', cols: '1fr 1fr 1fr', areas: ['deck deck info', 'deck deck facts', 'index number tech'] },
  { name: 'Pitch', cols: '1fr 1fr 1fr', areas: ['info deck deck', 'facts deck deck', 'tech number index'] },
  { name: 'Ledger', cols: '1fr 1fr 1fr', areas: ['number info index', 'deck deck facts', 'deck deck tech'] },
];

const swap = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -14 }, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } } as const;

export function DesignWork() {
  const { t } = useView();
  const p = t.d.projects;
  const [active, setActive] = useState(0);
  const touched = useRef(0);

  // Blaettert von selbst, bis jemand selbst waehlt.
  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.hidden || Date.now() - touched.current < IDLE_MS) return;
      setActive((a) => (a + 1) % PROJECTS.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  const pick = (i: number) => {
    touched.current = Date.now();
    setActive((i + PROJECTS.length) % PROJECTS.length);
  };

  const project = PROJECTS[active];
  const text = p.items[active];

  const blocks: Block[] = [
    {
      id: 'deck',
      tone: 'deep',
      bleed: true,
      node: (
        <div className="wk-deck">
          <TiltDeck images={SHOTS} active={active} onChange={pick} label={p.eyebrow} />
          <div className="wk-deck-ui">
            <span className="micro">{t.ui.drag}</span>
            <span className="wk-arrows">
              <button type="button" onClick={() => pick(active - 1)} aria-label="←">
                <ArrowUp />
              </button>
              <button type="button" onClick={() => pick(active + 1)} aria-label="→">
                <ArrowDown />
              </button>
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'number',
      tone: 'brand',
      node: (
        <div className="wk-number">
          <AnimatePresence mode="wait">
            <motion.span key={project.number} className="poster" {...swap}>
              {project.number}
            </motion.span>
          </AnimatePresence>
          <span className="micro">/ {String(PROJECTS.length).padStart(2, '0')}</span>
        </div>
      ),
    },
    {
      id: 'info',
      node: (
        <AnimatePresence mode="wait">
          <motion.div key={project.number} className="wk-info" {...swap}>
            <span className="micro">{text.category}</span>
            <RevealLines lines={[project.title]} className="poster wk-title" />
            <p className="lede">{text.description}</p>
          </motion.div>
        </AnimatePresence>
      ),
    },
    {
      id: 'facts',
      node: (
        <AnimatePresence mode="wait">
          <motion.dl key={project.number} className="wk-facts" {...swap}>
            {text.metrics.map((m) => (
              <div key={m.label}>
                <dt className="micro">{m.label}</dt>
                <dd className="whisper">{m.value}</dd>
              </div>
            ))}
          </motion.dl>
        </AnimatePresence>
      ),
    },
    {
      id: 'tech',
      node: (
        <div className="wk-tech">
          <AnimatePresence mode="wait">
            <motion.p key={project.number} className="wk-tags" {...swap}>
              {project.tech.map((x, i) => (
                <span key={x}>
                  {x}
                  {i < project.tech.length - 1 && <i> / </i>}
                </span>
              ))}
            </motion.p>
          </AnimatePresence>
          {project.url ? (
            <a className="e-link" data-solid href={project.url} target="_blank" rel="noreferrer">
              {p.viewSite.replace('↗', '').trim()} <ArrowUpRight />
            </a>
          ) : (
            <span className="e-link">
              <Lock /> {p.onRequest}
            </span>
          )}
        </div>
      ),
    },
    {
      id: 'index',
      node: (
        <div className="wk-index">
          <span className="micro">
            <b>{p.line1}</b> {p.line2}
          </span>
          <ol style={{ ['--n' as string]: PROJECTS.length }}>
            {PROJECTS.map((x, i) => (
              <li key={x.number} style={{ ['--i' as string]: i }}>
                <button type="button" aria-pressed={i === active} title={x.title} onClick={() => pick(i)}>
                  {x.number}
                </button>
              </li>
            ))}
          </ol>
        </div>
      ),
    },
  ];

  return <Spread view="d-work" head={{ folio: '02', kicker: p.eyebrow, line1: p.line1, line2: p.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
