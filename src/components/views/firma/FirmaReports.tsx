import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';
import { calLabel, reportInfo, reportMonths } from '../../../content/firma-extra';
import { HoverTile, useHoverTile } from '../../fx/HoverTile';
import { Plate } from '../../fx/Plate';
import { openSheet } from '../../spread/sheet';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const LAYOUTS: LayoutDef[] = [
  { name: 'Dossier', cols: '1fr 1fr 1fr', areas: ['docs docs freq', 'docs docs cal', 'intro count cal', 'intro plate plate'] },
  { name: 'Calendar', cols: '1fr 1fr 1fr', areas: ['freq docs docs', 'cal docs docs', 'cal intro count', 'plate intro count'] },
  { name: 'Archive', cols: '1fr 1fr 1fr', areas: ['cal cal freq', 'docs docs freq', 'docs docs intro', 'plate count intro'] },
];

const spring = { type: 'spring', stiffness: 140, damping: 20 } as const;

export function FirmaReports() {
  const { t } = useView();
  const r = t.f.repos;
  const d = r.doc;
  const [top, setTop] = useState(0);
  const monthTile = useHoverTile();
  const [stamped, setStamped] = useState(false);
  const touched = useRef(0);
  const perYear = r.reports.reduce((sum, x) => sum + parseInt(x.freq, 10), 0);
  const [rep, setRep] = useState(0);
  const repTouched = useRef(0);
  const info = reportInfo(t.lang);
  const cal = calLabel(t.lang);
  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat(t.lang === 'tr' ? 'tr-TR' : 'de-CH', { month: 'short' }).format(new Date(2026, i, 1)).replace('.', ''),
  );
  const due = reportMonths(r.reports[rep].freq);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (Date.now() - repTouched.current > 10000) setRep((x) => (x + 1) % r.reports.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [r.reports.length]);

  const pickRep = (i: number) => {
    repTouched.current = Date.now();
    setRep(i);
  };

  useEffect(() => {
    setStamped(false);
    const id = window.setTimeout(() => setStamped(true), 1400);
    return () => window.clearTimeout(id);
  }, [top]);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (Date.now() - touched.current > 10000) setTop((x) => (x + 1) % d.items.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [d.items.length]);

  const pick = (i: number) => {
    touched.current = Date.now();
    setTop(i);
  };

  const blocks: Block[] = [
    {
      id: 'docs',
      tone: 'deep',
      node: (
        <div className="rp-docs">
          <div className="rp-tabs" role="tablist">
            {d.items.map((it, i) => (
              <button type="button" role="tab" key={it.title} aria-selected={i === top} onClick={() => pick(i)}>
                <span className="micro">{it.year}</span>
                {it.title}
              </button>
            ))}
          </div>
          <div className="rp-stack">
            {d.items.map((it, i) => {
              const depth = (i - top + d.items.length) % d.items.length;
              return (
                <motion.article
                  key={it.title}
                  className="doc"
                  animate={{ y: depth * -14, x: depth * 10, rotate: depth === 0 ? -0.6 : depth * 2.2, scale: 1 - depth * 0.04, opacity: depth > 1 ? 0.55 : 1 }}
                  transition={spring}
                  style={{ zIndex: 10 - depth }}
                  onClick={() => depth && pick(i)}
                  aria-hidden={depth !== 0}
                >
                  <header className="doc-head">
                    <span className="micro">
                      <b>{d.kicker}</b> · {it.year}
                    </span>
                    <h3 className="poster">{it.title}</h3>
                    <span className="micro">{it.recipient}</span>
                  </header>
                  <ol className="doc-steps micro">
                    {d.steps.map((st, k) => (
                      <li key={st} data-on={depth === 0 && (stamped || k < 2)}>
                        <Check /> {st}
                      </li>
                    ))}
                  </ol>
                  <dl className="doc-fields">
                    {it.fields.map((f) => (
                      <div key={f.label}>
                        <dt className="micro">{f.label}</dt>
                        <dd>{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="doc-src micro">
                    {d.sourcesLabel}: {it.sources.join(' · ')}
                  </p>
                  <p className="doc-deadline whisper">{it.deadline}</p>
                  <AnimatePresence>
                    {depth === 0 && stamped && (
                      <motion.span
                        key="stamp"
                        className="doc-stamp"
                        initial={{ scale: 2, opacity: 0, rotate: -20 }}
                        animate={{ scale: 1, opacity: 1, rotate: -9 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                      >
                        <b>{d.stamp}</b>
                        <span>{it.stampDate}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      id: 'freq',
      node: (
        <div className="rp-freq">
          <span className="micro">
            <b>12 · {r.perYear}</b>
          </span>
          <ul>
            {r.reports.map((x, i) => {
              const n = parseInt(x.freq, 10);
              return (
                <li key={x.name}>
                  <button type="button" aria-pressed={i === rep} onClick={() => {
                    pickRep(i);
                    openSheet();
                  }} onPointerEnter={(e) => e.pointerType === 'mouse' && pickRep(i)}>
                    <span className="rp-dots" aria-label={x.freq}>
                      {Array.from({ length: 12 }, (_, k) => (
                        <i key={k} data-on={k < n} />
                      ))}
                    </span>
                    <span className="rp-fname">{x.name}</span>
                    <span className="micro">{x.authority}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ),
    },
    {
      id: 'cal',
      sheet: true,
      tone: 'deep',
      node: (
        <div className="rp-cal">
          <span className="micro">
            <b>{cal.title}</b> · {cal.hint}
          </span>
          <ol className="rp-months" {...monthTile.list}>
            {monthNames.map((mn, i) => (
              <li key={mn} data-due={due.includes(i + 1)} {...monthTile.item(i)}>
                <HoverTile {...monthTile.at(i)} />
                <span className="micro">{mn}</span>
                <motion.i layout transition={{ type: 'spring', stiffness: 200, damping: 22 }} />
              </li>
            ))}
          </ol>
          <AnimatePresence mode="wait">
            <motion.div
              key={rep}
              className="rp-info"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="micro">
                <b>{r.reports[rep].freq}</b> {r.perYear} · {r.reports[rep].authority} · {r.reports[rep].status}
              </span>
              <h3 className="whisper">{r.reports[rep].name}</h3>
              <p className="lede">{info[rep]}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      ),
    },
    {
      id: 'intro',
      node: (
        <div className="fc-benefits">
          <p className="lede drop">{r.intro}</p>
          <ol>
            {r.promises.map((p, i) => (
              <li key={p}>
                <span className="micro">{String(i + 1).padStart(2, '0')}</span>
                <span className="whisper">{p}</span>
              </li>
            ))}
          </ol>
        </div>
      ),
    },
    {
      id: 'count',
      tone: 'brand',
      node: (
        <div className="ex-span">
          <span className="micro">{r.eyebrow}</span>
          <span className="poster">{perYear}</span>
          <span className="micro">{r.perYear}</span>
        </div>
      ),
    },
    { id: 'plate', tone: 'media', bleed: true, node: <Plate name="stamp" caption={d.stamp} /> },
  ];

  return <Spread view="f-reports" head={{ folio: '04', kicker: r.eyebrow, line1: r.line1, line2: r.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
