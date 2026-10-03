import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, CalendarDays, FolderOpen, Globe, Landmark, Package, Receipt } from 'lucide-react';
import { CONTACT_MAIL } from '../../../config';
import { Media } from '../../fx/Media';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

export const FIRMA_SECTIONS = [
  { key: 'about', view: 'f-orders', icon: Package },
  { key: 'projects', view: 'f-planning', icon: CalendarDays },
  { key: 'skills', view: 'f-accounting', icon: Receipt },
  { key: 'repos', view: 'f-reports', icon: Landmark },
  { key: 'construction', view: 'f-homepage', icon: Globe },
  { key: 'experience', view: 'f-personnel', icon: FolderOpen },
] as const;

const LAYOUTS: LayoutDef[] = [
  { name: 'Control', cols: '1fr 1fr 1fr', areas: ['headline headline app', 'film film app', 'switch lede quote'] },
  { name: 'Panel', cols: '1fr 1fr 1fr', areas: ['app headline headline', 'app film film', 'quote switch lede'] },
  { name: 'Wide', cols: '1fr 1fr 1fr', areas: ['film film headline', 'film film lede', 'switch app quote'] },
];

export function FirmaStart() {
  const { t, go, color } = useView();
  const f = t.f;
  const h = f.hero;
  const [on, setOn] = useState<boolean[]>(() => FIRMA_SECTIONS.map(() => true));
  const count = on.filter(Boolean).length;

  /** Was jeder Bereich in der Mini-App gerade meldet (alles aus den Texten der Firmenseite). */
  const states = [
    `${f.about.mock.badge} · ${f.about.mock.confirmed}`,
    f.projects.mock.title,
    `${f.skills.mock.totalLabel} · ${f.skills.mock.totalValue}`,
    `${f.repos.doc.items[1].title} · ${f.repos.doc.stamp}`,
    `${f.construction.always.value} · ${f.construction.always.label}`,
    f.experience.mock.docs,
  ];

  const blocks: Block[] = [
    {
      id: 'headline',
      node: (
        <h2 className="fs-head">
          <span className="poster">{h.lineBuild}</span>
          <span className="whisper">
            {h.lineDigital} <em>{h.lineExperiences}</em>
          </span>
        </h2>
      ),
    },
    {
      id: 'lede',
      node: (
        <div className="ds-lede">
          <span className="micro live">
            {h.badgeAvailable} · {h.badgeLocation}
          </span>
          <p className="lede">{h.subtitle}</p>
          <div className="e-links">
            <button type="button" className="e-link" data-solid onClick={() => go('f-orders')}>
              {h.ctaWork.replace(/[↗↓]/g, '').trim()} <ArrowDown />
            </button>
            <a className="e-link" href={`mailto:${CONTACT_MAIL}`}>
              {h.ctaEmail.replace(/[↗↓]/g, '').trim()} <ArrowUpRight />
            </a>
          </div>
        </div>
      ),
    },
    {
      id: 'switch',
      node: (
        <div className="fs-switch">
          <span className="micro">
            <b>{f.contact.hub.center}</b> · {f.contact.hub.centerSub}
          </span>
          <ul>
            {FIRMA_SECTIONS.map((s, i) => (
              <li key={s.view} data-on={on[i]}>
                <button type="button" className="fs-name" onClick={() => go(s.view)}>
                  <s.icon />
                  <span>
                    <span className="micro">{String(i + 1).padStart(2, '0')}</span>
                    <span className="fs-label">{t.menu[s.view]}</span>
                  </span>
                </button>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on[i]}
                  aria-label={t.menu[s.view]}
                  className="toggle"
                  onClick={() => setOn((o) => o.map((v, k) => (k === i ? !v : v)))}
                >
                  <i />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 'app',
      tone: 'deep',
      node: (
        <div className="fs-app">
          <div className="fs-phone">
            <div className="fs-phone-head">
              <span className="micro">
                <b>ADO App</b>
              </span>
              <span className="micro">{f.repos.doc.items[0].fields[0].value}</span>
            </div>
            <ul className="fs-lines">
              <AnimatePresence initial={false}>
                {FIRMA_SECTIONS.map((s, i) =>
                  on[i] ? (
                    <motion.li
                      key={s.view}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="fs-line">
                        <s.icon />
                        <span>
                          <span className="fs-label">{t.menu[s.view]}</span>
                          <span className="micro">{states[i]}</span>
                        </span>
                        <span className="fs-dot" />
                      </span>
                    </motion.li>
                  ) : null,
                )}
              </AnimatePresence>
            </ul>
            <div className="fs-meter">
              <span className="fs-meter-bar">
                <motion.i animate={{ scaleX: count / FIRMA_SECTIONS.length }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
              </span>
              <span className="micro">
                <b>
                  {count}/{FIRMA_SECTIONS.length}
                </b>{' '}
                {count === FIRMA_SECTIONS.length ? `${h.lineDigital} ${h.lineExperiences}` : f.contact.hub.centerSub}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    { id: 'film', tone: 'media', bleed: true, node: <Media src={`/media/firma/plattform-de-${color}.mp4`} fallback="/media/firma/plattform-de-cyan.mp4" sound /> },
    {
      id: 'quote',
      tone: 'brand',
      node: (
        <figure className="ds-quote">
          <span className="ds-quote-mark poster" aria-hidden>
            “
          </span>
          <blockquote className="whisper">
            {h.quoteLine1} <em>{h.quoteLine2}</em>
          </blockquote>
          <figcaption className="micro">— ADO Firma</figcaption>
        </figure>
      ),
    },
  ];

  return <Spread view="f-start" head={{ folio: '00', kicker: 'ADO Firma', line1: h.badgeAvailable, line2: h.badgeLocation }} blocks={blocks} layouts={LAYOUTS} />;
}
