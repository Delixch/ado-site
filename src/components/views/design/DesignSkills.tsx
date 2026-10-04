import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MousePointer2 } from 'lucide-react';
import { SKILL_ITEMS } from '../../../content/design-data';
import { ParticleWord } from '../../fx/ParticleWord';
import { Terminal } from '../../fx/Terminal';
import { openSheet } from '../../spread/sheet';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const LAYOUTS: LayoutDef[] = [
  { name: 'Particles', cols: '1fr 1fr 1fr', areas: ['stage stage domains', 'stage stage focus', 'terminal count focus'] },
  { name: 'Column', cols: '1fr 1fr 1fr', areas: ['domains stage stage', 'focus stage stage', 'focus terminal count'] },
  { name: 'Wide', cols: '1fr 1fr 1fr', areas: ['stage stage stage', 'domains focus terminal', 'domains focus count'], rows: 'auto minmax(var(--spread-row), auto) minmax(var(--spread-row), auto)' },
];

const WORD_MS = 2400;

export function DesignSkills() {
  const { t } = useView();
  const s = t.d.skills;
  const [domain, setDomain] = useState(0);
  const [word, setWord] = useState(0);
  const touched = useRef(0);
  const total = SKILL_ITEMS.flat().length;
  const tools = SKILL_ITEMS[domain];

  // Werkzeug fuer Werkzeug; nach dem letzten weiter zum naechsten Bereich (solange niemand waehlt).
  useEffect(() => {
    const id = window.setInterval(() => {
      setWord((w) => {
        if (w + 1 < SKILL_ITEMS[domain].length) return w + 1;
        if (Date.now() - touched.current > 12000) setDomain((d) => (d + 1) % SKILL_ITEMS.length);
        return 0;
      });
    }, WORD_MS);
    return () => window.clearInterval(id);
  }, [domain]);

  const pick = (i: number) => {
    touched.current = Date.now();
    setDomain(i);
    setWord(0);
    openSheet();
  };

  const onPrev = () => {
    touched.current = Date.now();
    setDomain((d) => (d - 1 + SKILL_ITEMS.length) % SKILL_ITEMS.length);
    setWord(0);
  };

  const onNext = () => {
    touched.current = Date.now();
    setDomain((d) => (d + 1) % SKILL_ITEMS.length);
    setWord(0);
  };

  const onJump = (i: number) => {
    touched.current = Date.now();
    setDomain(i);
    setWord(0);
  };

  const b = s.blocks[domain];
  const term = s.terminal;

  const sheetNav = {
    current: domain,
    total: SKILL_ITEMS.length,
    title: b.title,
    subtitle: `${String(domain + 1).padStart(2, '0')} / ${String(SKILL_ITEMS.length).padStart(2, '0')}`,
    onPrev,
    onNext,
    onJump,
  };

  const blocks: Block[] = [
    {
      id: 'stage',
      trace: true,
      tone: 'deep',
      bleed: true,
      node: (
        <div className="sk-stage">
          <ParticleWord word={tools[word]} label={tools.join(', ')} />
          <div className="sk-stage-ui">
            <span className="micro">
              <b>{String(domain + 1).padStart(2, '0')}</b> · {b.title}
            </span>
            <span className="sk-ticks" aria-hidden>
              {tools.map((x, i) => (
                <i key={x} data-on={i === word} />
              ))}
            </span>
            <span className="micro">
              <MousePointer2 /> {tools[word]}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'domains',
      node: (
        <ol className="pl-features">
          {s.blocks.map((blk, i) => (
            <li key={blk.title}>
              <button type="button" aria-pressed={i === domain} onClick={() => pick(i)} onPointerEnter={(e) => e.pointerType === 'mouse' && pick(i)}>
                <span className="micro">{String(i + 1).padStart(2, '0')}</span>
                <span className="whisper">{blk.title}</span>
              </button>
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: 'focus',
      sheet: true,
      tone: 'ink',
      node: (
        <AnimatePresence mode="wait">
          <motion.div
            key={domain}
            className="sk-focus"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="micro">
              <b>{b.badge}</b> · {b.stat}
            </span>
            <p className="lede">{b.description}</p>
            <ul className="sk-tools">
              {tools.map((x, i) => (
                <li key={x}>
                  <button type="button" aria-pressed={i === word} onClick={() => setWord(i)}>
                    {x}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      ),
    },
    {
      id: 'count',
      trace: true,
      tone: 'brand',
      node: (
        <div className="sk-count">
          <span className="poster">{total}</span>
          <span className="whisper">
            {s.line1} {s.line2}
          </span>
        </div>
      ),
    },
    {
      id: 'terminal',
      tone: 'deep',
      node: (
        <Terminal
          title="ado@zuerich ~ skills"
          lines={[
            { cmd: term.whoami.replace(/^\$\s*/, ''), out: term.name },
            { cmd: 'ls ~/werkzeuge', out: SKILL_ITEMS.map((x) => x[0]).join('  ') },
            { cmd: term.echo.replace(/^\$\s*/, ''), out: term.found },
            { cmd: term.openFull.replace(/^\$\s*/, ''), out: term.clickMore },
          ]}
        />
      ),
    },
  ];

  return (
    <Spread
      view="d-skills"
      head={{ folio: '03', kicker: s.eyebrow, line1: s.line1, line2: s.line2 }}
      blocks={blocks}
      layouts={LAYOUTS}
      sheetNav={sheetNav}
    />
  );
}
