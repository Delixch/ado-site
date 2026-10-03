import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Bell, MapPin, Monitor, Phone, Smartphone, Star, Tablet } from 'lucide-react';
import { CONTACT_MAIL } from '../../../config';
import { STOCK } from '../../../content/stock';
import { useInView } from '../../../hooks/useInView';
import { Plate } from '../../fx/Plate';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const WEEK = [42, 55, 48, 66, 72, 100, 58];
const DEVICES = { desktop: Monitor, tablet: Tablet, mobile: Smartphone } as const;
type Device = keyof typeof DEVICES;

const LAYOUTS: LayoutDef[] = [
  { name: 'Browser', cols: '1fr 1fr 1fr', areas: ['site site intro', 'site site tiles', 'stats always plate'] },
  { name: 'Studio', cols: '1fr 1fr 1fr', areas: ['intro site site', 'tiles site site', 'plate always stats'] },
  { name: 'Gallery', cols: '1fr 1fr 1fr', areas: ['always intro plate', 'site site tiles', 'site site stats'] },
];

const spring = { type: 'spring', stiffness: 120, damping: 20 } as const;

export function FirmaHomepage() {
  const { t } = useView();
  const c = t.f.construction;
  const m = c.mock;
  const [device, setDevice] = useState<Device>('desktop');
  const [focus, setFocus] = useState(-1);
  const [toast, setToast] = useState(-1);
  const [ref, inView] = useInView<HTMLDivElement>();
  const sections = useRef<(HTMLElement | null)[]>([]);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = window.setInterval(() => {
      setToast(i % m.toasts.length);
      i += 1;
      window.setTimeout(() => setToast(-1), 2600);
    }, 4200);
    return () => window.clearInterval(id);
  }, [inView, m.toasts.length]);

  /** Kachel waehlen: die Beispielseite rollt zum passenden Abschnitt; "Mobil zuerst" holt das Handy. */
  const show = (i: number) => {
    setFocus(i);
    if (i === 0) setDevice('mobile');
    const el = sections.current[i];
    const box = scroller.current;
    if (el && box) box.scrollTo({ top: el.offsetTop - box.offsetTop, behavior: 'smooth' });
  };

  const sec = (i: number) => ({ ref: (n: HTMLElement | null) => void (sections.current[i] = n), 'data-focus': focus === i || undefined });

  const blocks: Block[] = [
    {
      id: 'site',
      tone: 'deep',
      node: (
        <div ref={ref} className="hp">
          <div className="hp-bar">
            <span className="micro">
              <b>{m.url}</b>
            </span>
            <span className="bp-devices" role="group" aria-label="Device">
              {(Object.keys(DEVICES) as Device[]).map((d) => {
                const Icon = DEVICES[d];
                return (
                  <button type="button" key={d} aria-pressed={d === device} aria-label={d} title={d} onClick={() => setDevice(d)}>
                    <Icon />
                  </button>
                );
              })}
            </span>
          </div>
          <div className="hp-stage">
            <motion.div layout transition={spring} className="hp-frame" data-device={device}>
              <div className="hp-chrome">
                <i />
                <i />
                <i />
                <span>{m.url}</span>
              </div>
              <div ref={scroller} className="hp-site" data-device={device}>
                <nav className="hp-nav">
                  <b>{m.brand}</b>
                  <span className="hp-links">
                    {m.nav.map((n) => (
                      <span key={n}>{n}</span>
                    ))}
                  </span>
                  <span className="hp-btn">{m.button}</span>
                </nav>
                <section className="hp-hero" {...sec(0)}>
                  <div>
                    <span className="micro">{m.since}</span>
                    <h4>{m.headline}</h4>
                    <span className="hp-btn">{m.button}</span>
                  </div>
                  <img src={STOCK.bread.src} alt="" loading="lazy" />
                </section>
                <section className="hp-services" {...sec(1)}>
                  {m.services.map((s, i) => (
                    <div key={s}>
                      <b>{s}</b>
                      <span>{m.prices[i]}</span>
                    </div>
                  ))}
                </section>
                <section className="hp-team" {...sec(2)}>
                  <p>{m.teamLine}</p>
                  <span className="hp-values">
                    {m.values.map((v) => (
                      <span key={v}>{v}</span>
                    ))}
                  </span>
                </section>
                <section className="hp-contact" {...sec(3)}>
                  <span>
                    <MapPin /> {m.address}
                  </span>
                  <span>{m.hours}</span>
                  <span className="hp-actions">
                    <span className="hp-btn">
                      <Phone /> {m.call}
                    </span>
                    <span className="hp-btn" data-ghost>
                      {m.route}
                    </span>
                  </span>
                </section>
              </div>
              <AnimatePresence>
                {toast >= 0 && (
                  <motion.span
                    key={toast}
                    className="hp-toast"
                    initial={{ opacity: 0, y: -12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Bell /> {m.toasts[toast]}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      id: 'intro',
      node: (
        <div className="ab-bio">
          <span className="micro">{c.kicker}</span>
          <h2 className="whisper">{c.title}</h2>
          <p className="lede">{c.paragraph}</p>
          <a className="e-link" data-solid href={`mailto:${CONTACT_MAIL}?subject=${encodeURIComponent(c.cta)}`}>
            {c.cta} <ArrowUpRight />
          </a>
        </div>
      ),
    },
    {
      id: 'tiles',
      node: (
        <ol className="pl-features hp-tiles">
          {c.tiles.map((tile, i) => (
            <li key={tile.title}>
              <button type="button" aria-pressed={i === focus} onClick={() => show(i)}>
                <span className="micro">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="whisper">{tile.title}</span>
                  <span className="hp-tile-text">{tile.text}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: 'stats',
      node: (
        <div className="hp-stats">
          <span className="micro">
            <b>{m.stats.title}</b> · {m.stats.visitors}
          </span>
          <div className="hp-bars">
            {WEEK.map((v, i) => (
              <span key={i}>
                <motion.i initial={{ scaleY: 0 }} animate={{ scaleY: v / 100 }} transition={{ duration: 0.8, delay: 0.3 + i * 0.06, ease: [0.77, 0, 0.175, 1] }} data-top={v === 100} />
                <span className="micro">{m.stats.days[i]}</span>
              </span>
            ))}
          </div>
          <span className="micro">
            <Star /> ★★★★★ {m.stats.rating}
          </span>
        </div>
      ),
    },
    {
      id: 'always',
      tone: 'brand',
      node: (
        <div className="ex-span">
          <span className="micro">{c.eyebrow}</span>
          <span className="poster">{c.always.value}</span>
          <span className="micro">{c.always.label}</span>
        </div>
      ),
    },
    { id: 'plate', tone: 'media', bleed: true, node: <Plate name="cafe" caption={c.kicker} /> },
  ];

  return <Spread view="f-homepage" head={{ folio: '05', kicker: c.eyebrow, line1: c.line1, line2: c.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
