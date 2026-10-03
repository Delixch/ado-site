import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BellRing } from 'lucide-react';
import { useInView } from '../../../hooks/useInView';
import { Plate } from '../../fx/Plate';
import { openSheet } from '../../spread/sheet';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const LAYOUTS: LayoutDef[] = [
  { name: 'Week', cols: '1fr 1fr 1fr', areas: ['plan plan key', 'features detail example', 'features plate example'] },
  { name: 'Agenda', cols: '1fr 1fr 1fr', areas: ['features plan plan', 'detail plan plan', 'key example plate'] },
  { name: 'Day', cols: '1fr 1fr 1fr', areas: ['detail example key', 'plan plan plan', 'features plate plate'], rows: 'minmax(var(--spread-row), auto) auto minmax(var(--spread-row), auto)' },
];

const swap = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } } as const;

/** Zelltyp aus dem Text: Schicht, frei, Urlaub, krank (DE + TR). */
const kind = (cell: string, legend: string[]) =>
  cell === legend[1] ? 'leave' : cell === legend[2] ? 'sick' : /\d/.test(cell) ? 'shift' : 'off';

/** Ein Krankheitsfall wird sichtbar eingeplant: vorher normale Schichten, dann "krank" + Hinweis. */
function useEvent() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [fired, setFired] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setFired((f) => !f), 4200);
    return () => window.clearInterval(id);
  }, [inView]);
  return { ref, fired };
}

export function FirmaPlanning() {
  const { t } = useView();
  const p = t.f.projects;
  const m = p.mock;
  const ex = p.examples;
  const [sel, setSel] = useState(0);
  const touched = useRef(0);
  const { ref, fired } = useEvent();

  useEffect(() => {
    const id = window.setInterval(() => {
      if (Date.now() - touched.current > 9000) setSel((s) => (s + 1) % p.items.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [p.items.length]);

  const pick = (i: number) => {
    touched.current = Date.now();
    setSel(i);
  };

  /* Vor dem Ereignis arbeitet die kranke Person ihre normale Schicht. */
  const sickRow = m.rows.findIndex((r) => r.cells.includes(m.legend[2]));
  const cellOf = (r: number, c: number) => {
    const v = m.rows[r].cells[c];
    if (!fired && r === sickRow && v === m.legend[2]) return m.rows[r].cells[0];
    return v;
  };

  const examples = [
    { key: ex.week.keyValue, label: ex.week.keyLabel, title: ex.week.title, rows: ex.week.rows.map((r) => [r.day, `${r.time}${r.place ? ` · ${r.place}` : ''}`]) },
    { key: ex.tasks.keyValue, label: ex.tasks.keyLabel, title: ex.tasks.title, rows: ex.tasks.rows.map((r) => [r.time, r.text]) },
    { key: ex.vacation.keyValue, label: ex.vacation.keyLabel, title: ex.vacation.title, rows: ex.vacation.rows.map((r) => [r.name, `${r.dates} · ${r.state}`]) },
    { key: ex.sick.keyValue, label: ex.sick.keyLabel, title: ex.sick.title, rows: ex.sick.rows.map((r) => [r.time, r.text]) },
    { key: ex.overtime.keyValue, label: ex.overtime.keyLabel, title: ex.overtime.title, rows: ex.overtime.rows.map((r) => [r.name, r.value]) },
    { key: m.footerValue, label: m.footerLabel, title: m.title, rows: m.rows.map((r) => [r.name, r.cells.join(' · ')]) },
  ];
  const e = examples[sel];
  const item = p.items[sel];

  const blocks: Block[] = [
    {
      id: 'plan',
      node: (
        <div ref={ref} className="pl-plan">
          <div className="pl-head">
            <span className="micro">
              <b>{m.title}</b> · {m.badge}
            </span>
            <AnimatePresence>
              {fired && (
                <motion.span key="n" className="pl-notice micro" {...swap}>
                  <BellRing /> {m.notice}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <table className="pl-table">
            <thead>
              <tr>
                <th />
                {m.days.map((d) => (
                  <th key={d} className="micro">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {m.rows.map((r, ri) => (
                <tr key={r.name}>
                  <th className="pl-name whisper">{r.name}</th>
                  {r.cells.map((_, ci) => {
                    const v = cellOf(ri, ci);
                    return (
                      <td key={ci}>
                        <motion.span
                          key={v}
                          className="pl-cell"
                          data-kind={kind(v, m.legend)}
                          initial={{ rotateX: 90, opacity: 0 }}
                          animate={{ rotateX: 0, opacity: 1 }}
                          transition={{ duration: 0.45, delay: ci * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {v}
                        </motion.span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pl-legend micro">
            {m.legend.map((l, i) => (
              <span key={l} data-kind={['shift', 'leave', 'sick', 'over'][i]}>
                <i /> {l}
              </span>
            ))}
            <span className="pl-over">
              {m.footerLabel} <b>{m.footerValue}</b>
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'features',
      node: (
        <ol className="pl-features">
          {p.items.map((it, i) => (
            <li key={it.title}>
              <button type="button" aria-pressed={i === sel} onClick={() => {
                pick(i);
                openSheet();
              }} onPointerEnter={(ev) => ev.pointerType === 'mouse' && pick(i)}>
                <span className="micro">{String(i + 1).padStart(2, '0')}</span>
                <span className="whisper">{it.title}</span>
              </button>
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: 'detail',
      sheet: true,
      node: (
        <AnimatePresence mode="wait">
          <motion.div key={sel} className="ex-detail" {...swap}>
            <span className="micro">{item.category}</span>
            <h3 className="poster">{item.title}</h3>
            <p className="lede">{item.description}</p>
            <dl className="pl-metrics">
              {item.metrics.map((x) => (
                <div key={x.label}>
                  <dt className="micro">{x.label}</dt>
                  <dd className="whisper">{x.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </AnimatePresence>
      ),
    },
    {
      id: 'example',
      sheet: true,
      tone: 'deep',
      node: (
        <AnimatePresence mode="wait">
          <motion.div key={sel} className="pl-example" {...swap}>
            <span className="micro">
              <b>{e.title}</b>
            </span>
            <ul>
              {e.rows.map(([a, b], i) => (
                <li key={i}>
                  <span className="micro">{a}</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      ),
    },
    {
      id: 'key',
      sheet: true,
      tone: 'brand',
      node: (
        <AnimatePresence mode="wait">
          <motion.div key={sel} className="ex-span" {...swap}>
            <span className="micro">{item.category}</span>
            <span className="poster">{e.key}</span>
            <span className="micro">{e.label}</span>
          </motion.div>
        </AnimatePresence>
      ),
    },
    { id: 'plate', tone: 'media', bleed: true, node: <Plate name="calendar" caption={p.eyebrow} /> },
  ];

  return <Spread view="f-planning" head={{ folio: '02', kicker: p.eyebrow, line1: p.line1, line2: p.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
