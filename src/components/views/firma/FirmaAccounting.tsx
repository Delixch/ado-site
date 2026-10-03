import { useEffect, useRef, useState } from 'react';
import { Check, Inbox, Landmark } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useInView } from '../../../hooks/useInView';
import { Plate } from '../../fx/Plate';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const LAYOUTS: LayoutDef[] = [
  { name: 'Ledger', cols: '1fr 1fr 1fr', areas: ['split split total', 'demo demo steps', 'demo demo plate'] },
  { name: 'Report', cols: '1fr 1fr 1fr', areas: ['steps demo demo', 'total demo demo', 'plate split split'] },
  { name: 'Desk', cols: '1fr 1fr 1fr', areas: ['demo demo split', 'demo demo steps', 'total plate steps'] },
];

const swap = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } } as const;

/** Der Beleg druckt Zeile fuer Zeile, haelt kurz und beginnt von vorn. */
function usePrinter(lines: number, key: number) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [n, setN] = useState(0);
  useEffect(() => setN(0), [key]);
  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setN((x) => (x >= lines + 6 ? 0 : x + 1)), 520);
    return () => window.clearInterval(id);
  }, [inView, lines, key]);
  return { ref, shown: Math.min(n, lines), done: n >= lines };
}

export function FirmaAccounting() {
  const { t } = useView();
  const s = t.f.skills;
  const m = s.mock;
  const l = s.ledger;
  const [step, setStep] = useState(0);
  const { ref, shown, done } = usePrinter(l.lines.length, step);
  const touched = useRef(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (Date.now() - touched.current > 14000) setStep((x) => (x + 1) % s.blocks.length);
    }, 9000);
    return () => window.clearInterval(id);
  }, [s.blocks.length]);

  const pickStep = (i: number) => {
    touched.current = Date.now();
    setStep(i);
  };
  /** Rechnung -> Kostenart (Index in m.bars): Einkauf, Miete, Sonstiges. */
  const CAT = [0, 0, 2, 3, 0, 3, 3, 3];
  const [, inbox2, inbox3] = s.blocks[1].items;
  const [bank1, bank2] = s.blocks[2].items;
  const total = l.lines.reduce((sum, x) => sum + Number(x.amount.replace(/'/g, '')), 0);
  const fmt = (v: number) => v.toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const blocks: Block[] = [
    {
      id: 'demo',
      tone: 'deep',
      node: (
        <div ref={ref} className="rc-wrap">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="s0" className="rc" {...swap}>
                <p className="rc-title micro">
                  <b>{l.title}</b>
                </p>
                <ul>
                  {l.lines.slice(0, shown).map((x) => (
                    <motion.li key={x.date + x.text} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                      <span>{x.date}</span>
                      <span>{x.text}</span>
                      <span>{x.amount}</span>
                    </motion.li>
                  ))}
                </ul>
                <p className="rc-total" data-on={done}>
                  <span>Total CHF</span>
                  <span>{done ? fmt(total) : '…'}</span>
                </p>
                {done && (
                  <motion.span
                    className="rc-stamp micro"
                    initial={{ scale: 1.6, opacity: 0, rotate: -14 }}
                    animate={{ scale: 1, opacity: 1, rotate: -6 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    {l.status}
                  </motion.span>
                )}
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="s1" className="ac-demo" {...swap}>
                <p className="micro ac-demo-head">
                  <Inbox /> <b>{inbox2}</b> · {s.blocks[1].stat} · {inbox3}
                </p>
                <ul className="ac-inbox">
                  {l.lines.slice(0, shown).map((x, i) => (
                    <motion.li key={x.text} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                      <span className="ac-pdf micro">PDF</span>
                      <span>
                        <b>{x.text}</b>
                        <span className="micro">
                          {x.date} · CHF {x.amount}
                        </span>
                      </span>
                      <motion.span className="ac-tag micro" data-i={CAT[i]} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 }}>
                        {m.bars[CAT[i]].label}
                      </motion.span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="s2" className="ac-demo" {...swap}>
                <p className="micro ac-demo-head">
                  <Landmark /> <b>{bank1}</b> · {bank2}
                </p>
                <ul className="ac-bank">
                  {l.lines.map((x, i) => (
                    <li key={x.text} data-paid={i < shown}>
                      <span className="micro">{x.date}</span>
                      <span>{x.text}</span>
                      <span className="ac-amt">CHF {x.amount}</span>
                      <span className="ac-paid">
                        <Check />
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="ac-bank-foot micro" data-on={done}>
                  {done ? l.status : `${shown} / ${l.lines.length}`}
                </p>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="s3" className="ac-demo ac-over" {...swap}>
                <p className="micro ac-demo-head">
                  <b>{m.title}</b>
                </p>
                <div className="ac-ring" role="img" aria-label={m.bars.map((b) => `${b.label} ${b.share}%`).join(', ')}>
                  <svg viewBox="0 0 42 42" aria-hidden>
                    {m.bars.map((b, i) => {
                      const before = m.bars.slice(0, i).reduce((sum, x) => sum + x.share, 0);
                      return (
                        <motion.circle
                          key={b.label}
                          data-i={i}
                          cx="21"
                          cy="21"
                          r="15.915"
                          pathLength={100}
                          strokeDasharray={`${b.share} ${100 - b.share}`}
                          strokeDashoffset={25 - before}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.15 * i }}
                        />
                      );
                    })}
                  </svg>
                  <span>
                    <span className="micro">{m.totalLabel}</span>
                    <b className="whisper">{m.totalValue}</b>
                  </span>
                </div>
                <dl className="ac-kpis">
                  <div>
                    <dt className="micro">{m.paidLabel}</dt>
                    <dd className="whisper">{m.paidValue}</dd>
                  </div>
                  <div>
                    <dt className="micro">{m.openLabel}</dt>
                    <dd className="whisper">{m.openValue}</dd>
                  </div>
                </dl>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ),
    },
    {
      id: 'split',
      node: (
        <div className="ac-split">
          <span className="micro">
            <b>{m.title}</b>
          </span>
          <div className="ac-bar" role="img" aria-label={m.bars.map((b) => `${b.label} ${b.share}%`).join(', ')}>
            {m.bars.map((b, i) => (
              <motion.i
                key={b.label}
                data-i={i}
                style={{ flexGrow: b.share }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: [0.77, 0, 0.175, 1] }}
              />
            ))}
          </div>
          <ul className="ac-legend">
            {m.bars.map((b, i) => (
              <li key={b.label} data-i={i}>
                <i />
                <span className="micro">{b.label}</span>
                <span className="whisper">{b.amount}</span>
                <span className="micro">{b.share} %</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 'steps',
      node: (
        <div className="ac-steps">
          <ol>
            {s.blocks.map((b, i) => (
              <li key={b.title}>
                <button type="button" aria-pressed={i === step} onClick={() => pickStep(i)}>
                  <span className="micro">{b.badge}</span>
                  <span className="whisper">{b.title}</span>
                </button>
              </li>
            ))}
          </ol>
          <AnimatePresence mode="wait">
            <motion.div key={step} className="ac-step" {...swap}>
              <span className="micro">
                <b>{s.blocks[step].stat}</b>
              </span>
              <p className="lede">{s.blocks[step].description}</p>
              <p className="micro">{s.blocks[step].items.join(' · ')}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      ),
    },
    {
      id: 'total',
      tone: 'brand',
      node: (
        <div className="ex-span">
          <span className="micro">{m.totalLabel}</span>
          <span className="poster">{m.totalValue}</span>
          <span className="micro">
            {m.paidLabel} {m.paidValue} · {m.openLabel} {m.openValue}
          </span>
        </div>
      ),
    },
    { id: 'plate', tone: 'media', bleed: true, node: <Plate name="receipts" caption={s.eyebrow} /> },
  ];

  return <Spread view="f-accounting" head={{ folio: '03', kicker: s.eyebrow, line1: s.line1, line2: s.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
