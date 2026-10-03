import { useEffect, useState } from 'react';
import { Mail, Package, Smartphone, Truck, Users } from 'lucide-react';
import { useInView } from '../../../hooks/useInView';
import { FlowNodes } from '../../fx/FlowNodes';
import { Plate } from '../../fx/Plate';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const STATS = ['1', '0', '100 %', '24 h'];

/* Team (0) -> App (1) -> drei Lieferanten (2..4), wie eine Leitung. */
const PLACE = [
  { col: 1, row: 2 },
  { col: 2, row: 2 },
  { col: 3, row: 1 },
  { col: 3, row: 2 },
  { col: 3, row: 3 },
];
const LINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [1, 4],
];

const LAYOUTS: LayoutDef[] = [
  { name: 'Pipeline', cols: '1fr 1fr 1fr', areas: ['pipe pipe pipe', 'bio stats plate', 'bio tags plate'], rows: 'auto minmax(var(--spread-row), auto) minmax(var(--spread-row), auto)' },
  { name: 'Ledger', cols: '1fr 1fr 1fr', areas: ['bio pipe pipe', 'tags pipe pipe', 'plate stats stats'] },
  { name: 'Stack', cols: '1fr 1fr 1fr', areas: ['plate bio bio', 'pipe pipe pipe', 'stats stats tags'], rows: 'minmax(var(--spread-row), auto) auto minmax(var(--spread-row), auto)' },
];

/** Bestellung laeuft durch: 0 Team schreibt, 1 App versendet, 2-4 Lieferanten bestaetigen. */
function useRun() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % 7), 1300);
    return () => window.clearInterval(id);
  }, [inView]);
  return { ref, step: Math.min(step, 4), setStep };
}

export function FirmaOrders() {
  const { t } = useView();
  const a = t.f.about;
  const m = a.mock;
  const { ref, step, setStep } = useRun();

  const supplierState = (k: number) => (step >= 2 + k ? m.confirmed : step >= 1 ? m.rows[0].state : m.rows[2].state);

  const items = [
    <>
      <span className="micro">
        <Users /> {a.flow.team}
      </span>
      <span className="whisper or-t">{m.title}</span>
      <span className="micro">{m.badge}</span>
    </>,
    <>
      <span className="micro">
        <Smartphone /> {a.flow.app}
      </span>
      <span className="whisper or-t">{m.mailTitle}</span>
      <span className="micro">
        <Mail /> {m.mailMeta}
      </span>
    </>,
    ...m.rows.map((r, k) => (
      <>
        <span className="micro">
          <Truck /> {r.supplier}
        </span>
        <span className="whisper or-t">{r.item}</span>
        <span className="or-state micro" data-ok={step >= 2 + k}>
          {supplierState(k)}
        </span>
      </>
    )),
  ];

  const blocks: Block[] = [
    {
      id: 'pipe',
      tone: 'deep',
      node: (
        <div ref={ref} className="or-pipe">
          <div className="or-cols micro">
            <span>{a.flow.team}</span>
            <span>{a.flow.app}</span>
            <span>{a.flow.suppliers}</span>
          </div>
          <FlowNodes items={items} active={step} onPick={setStep} cols={3} place={PLACE} links={LINKS} hoverTile />
        </div>
      ),
    },
    {
      id: 'bio',
      node: (
        <div className="ab-bio">
          <h2 className="whisper">{a.bioTitle}</h2>
          <p className="lede drop">
            {a.bioPart1}
            <em>{a.bioStrong1}</em>
            {a.bioPart2}
            <em>{a.bioStrong2}</em>
            {a.bioPart3}
          </p>
        </div>
      ),
    },
    {
      id: 'stats',
      bleed: true,
      node: (
        <div className="metrics">
          {STATS.map((v, i) => (
            <div className="metric" key={i}>
              <span className="micro">{String(i + 1).padStart(2, '0')}</span>
              <span>
                <span className="metric-v">{v}</span>
                <span className="micro">{a.statLabels[i]}</span>
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'tags',
      tone: 'brand',
      node: (
        <ul className="ab-tags">
          {a.tags.map((tag, i) => (
            <li key={tag}>
              <span className="micro">
                <Package /> {String(i + 1).padStart(2, '0')}
              </span>
              <span className="poster">{tag}</span>
            </li>
          ))}
        </ul>
      ),
    },
    { id: 'plate', tone: 'media', bleed: true, node: <Plate name="boxes" caption={a.eyebrow} /> },
  ];

  return <Spread view="f-orders" head={{ folio: '01', kicker: a.eyebrow, line1: a.line1, line2: a.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
