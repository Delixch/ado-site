import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { LAB_TAGS } from '../../../content/design-data';
import { useInView } from '../../../hooks/useInView';
import { Plate } from '../../fx/Plate';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

/** Die Satzspiegel aus test.html - hier als Bauplan, der sich selbst umbaut. */
const PLANS = [
  { name: 'holy-grail', cols: '1fr 2fr 1fr', rows: '1fr 3fr 1fr', areas: ['header header header', 'nav main aside', 'footer footer footer'] },
  { name: 'sidebar', cols: '1fr 3fr', rows: '1fr 4fr 1fr', areas: ['header header', 'nav main', 'footer footer'] },
  { name: 'dashboard', cols: '1fr 2fr 1fr', rows: '1fr 2fr 1fr', areas: ['header header aside', 'nav main aside', 'footer footer footer'] },
  { name: 'magazine', cols: '2fr 1fr 1fr', rows: '1fr 2fr 1fr', areas: ['header header header', 'main main aside', 'footer nav aside'] },
  { name: 'hero', cols: '1fr 1fr', rows: '1fr 3fr 1fr', areas: ['header header', 'main aside', 'footer nav'] },
];
const NL = String.fromCharCode(10);
const PARTS = ['header', 'nav', 'main', 'aside', 'footer'] as const;
const spring = { type: 'spring', stiffness: 110, damping: 18 } as const;

/** Gleicher Inhalt, andere Geraete: Tablet stapelt die Seitenleisten, Handy alles untereinander. */
const DEVICES = {
  desktop: null,
  tablet: { cols: '1fr 2fr', rows: 'auto 1fr 1fr auto', areas: ['header header', 'nav main', 'aside main', 'footer footer'] },
  mobile: { cols: '1fr', rows: 'auto auto 1fr auto auto', areas: ['header', 'nav', 'main', 'aside', 'footer'] },
} as const;
type Device = keyof typeof DEVICES;
const DEVICE_ICONS: Record<Device, typeof Monitor> = { desktop: Monitor, tablet: Tablet, mobile: Smartphone };

function usePlan() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [i, setI] = useState(0);
  const [device, setDevice] = useState<Device>('desktop');
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (!inView || touched) return;
    const id = window.setInterval(() => setI((x) => (x + 1) % PLANS.length), 2600);
    return () => window.clearInterval(id);
  }, [inView, touched]);
  const base = PLANS[i];
  const plan = DEVICES[device] ? { ...base, ...DEVICES[device]! } : base;
  return {
    ref,
    plan,
    i,
    device,
    pick: (n: number) => {
      setTouched(true);
      setI(n);
    },
    setDevice: (d: Device) => {
      setTouched(true);
      setDevice(d);
    },
  };
}

const LAYOUTS: LayoutDef[] = [
  { name: 'Blueprint', cols: '1fr 1fr 1fr', areas: ['blue blue status', 'blue blue lab', 'plate para tags', 'plate code code'] },
  { name: 'Workbench', cols: '1fr 1fr 1fr', areas: ['lab blue blue', 'code blue blue', 'status plate tags', 'para plate tags'] },
  { name: 'Site', cols: '1fr 1fr 1fr', areas: ['para status tags', 'blue blue plate', 'blue blue lab', 'code code lab'] },
];

export function DesignConstruction() {
  const { t } = useView();
  const c = t.d.construction;
  const { ref, plan, i, device, pick, setDevice } = usePlan();

  const blocks: Block[] = [
    { id: 'plate', tone: 'media', bleed: true, node: <Plate name="build" caption={c.statusBadge} /> },
    {
      id: 'blue',
      tone: 'deep',
      node: (
        <div ref={ref} className="bp">
          <div className="bp-bar">
            <span className="bp-plans" role="group" aria-label="Layout">
              {PLANS.map((p, n) => (
                <button type="button" key={p.name} aria-pressed={n === i} onClick={() => pick(n)}>
                  {p.name}
                </button>
              ))}
            </span>
            <span className="bp-devices" role="group" aria-label="Device">
              {(Object.keys(DEVICES) as Device[]).map((d) => {
                const Icon = DEVICE_ICONS[d];
                return (
                  <button type="button" key={d} aria-pressed={d === device} aria-label={d} title={d} onClick={() => setDevice(d)}>
                    <Icon />
                  </button>
                );
              })}
            </span>
          </div>
          <div className="bp-stage">
            <motion.div layout transition={spring} className="bp-frame" data-device={device}>
              <span className="micro bp-cap">
                <b>{String(i + 1).padStart(2, '0')}</b> / {PLANS[i].name} · {device}
              </span>
              <div
                className="bp-grid"
                style={{ gridTemplateColumns: plan.cols, gridTemplateRows: plan.rows, gridTemplateAreas: plan.areas.map((a) => `"${a}"`).join(' ') }}
              >
                {PARTS.map((p) => (
                  <motion.span key={p} layout transition={spring} className="bp-part" data-part={p} style={{ gridArea: p }}>
                    <span className="micro">{p}</span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      id: 'code',
      tone: 'ink',
      node: (
        <pre className="bp-code" aria-label="layout.css">
          {device !== 'desktop' && (
            <span className="ck">
              @media (max-width: {device === 'tablet' ? '1179px' : '719px'}) {'{'}
              {NL}
            </span>
          )}
          <span className="ck">.layout</span> {'{'}
          {'\n  '}
          <span className="cp">display</span>: <span className="cv">grid</span>;{'\n  '}
          <span className="cp">grid-template-columns</span>: <span className="cv">{plan.cols}</span>;{'\n  '}
          <span className="cp">grid-template-rows</span>: <span className="cv">{plan.rows}</span>;{'\n  '}
          <span className="cp">grid-template-areas</span>:{plan.areas.map((a) => (
            <span key={a} className="cs">
              {'\n    '}"{a}"
            </span>
          ))}
          ;{'\n'}
          {'}'}
        </pre>
      ),
    },
    {
      id: 'status',
      tone: 'brand',
      node: (
        <div className="cn-status">
          <span className="micro live">{c.statusBadge}</span>
          <span className="poster">{c.line2.replace(/\.$/, '')}</span>
        </div>
      ),
    },
    {
      id: 'lab',
      node: (
        <div className="cn-lab">
          <span className="micro">{c.eyebrow}</span>
          <h3 className="poster">{c.cardTitle}</h3>
          <p className="lede">{c.cardDescription}</p>
        </div>
      ),
    },
    {
      id: 'para',
      node: <p className="lede drop cn-para">{c.paragraph}</p>,
    },
    {
      id: 'tags',
      tone: 'deep',
      node: (
        <ul className="cn-tags">
          {LAB_TAGS.map((x, k) => (
            <li key={x} className="poster" style={{ animationDelay: `${k * 0.4}s` }}>
              {x}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return <Spread view="d-construction" head={{ folio: '05', kicker: c.eyebrow, line1: c.line1, line2: c.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
