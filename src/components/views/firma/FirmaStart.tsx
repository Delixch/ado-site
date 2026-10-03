import { IntroCall } from '../../common/IntroCall';
import { ArrowDown, ArrowUpRight, CalendarDays, FolderOpen, Globe, Landmark, Package, Receipt } from 'lucide-react';
import { CONTACT_MAIL } from '../../../config';
import { Media } from '../../fx/Media';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';
import { requestHowTab } from '../insta/howTab';

/** Sechs Bereiche = Reiter auf "Ablaeufe" (FirmaHow); key = Texte in t.f, nav = Name in t.f.nav. */
export const FIRMA_SECTIONS = [
  { key: 'about', nav: 'about', icon: Package },
  { key: 'projects', nav: 'work', icon: CalendarDays },
  { key: 'skills', nav: 'skills', icon: Receipt },
  { key: 'repos', nav: 'repos', icon: Landmark },
  { key: 'construction', nav: 'construction', icon: Globe },
  { key: 'experience', nav: 'experience', icon: FolderOpen },
] as const;

const LAYOUTS: LayoutDef[] = [
  { name: 'Control', cols: '1fr 1fr 1fr', areas: ['headline headline app', 'film film app', 'lede lede quote'] },
  { name: 'Panel', cols: '1fr 1fr 1fr', areas: ['app headline headline', 'app film film', 'quote lede lede'] },
  { name: 'Wide', cols: '1fr 1fr 1fr', areas: ['film film headline', 'film film lede', 'app app quote'] },
];

export function FirmaStart() {
  const { t, go, color } = useView();
  const f = t.f;
  const h = f.hero;

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
            <button type="button" className="e-link" data-solid onClick={() => go('f-flow')}>
              {h.ctaWork.replace(/[↗↓]/g, '').trim()} <ArrowDown />
            </button>
            <a className="e-link" href={`mailto:${CONTACT_MAIL}`}>
              {h.ctaEmail.replace(/[↗↓]/g, '').trim()} <ArrowUpRight />
            </a>
            <IntroCall contact="f-contact" />
          </div>
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
              {FIRMA_SECTIONS.map((s, i) => (
                <li key={s.key}>
                  <button
                    type="button"
                    className="fs-line"
                    onClick={() => {
                      requestHowTab(i);
                      go('f-flow');
                    }}
                  >
                    <s.icon />
                    <span>
                      <span className="fs-label">{f.nav[s.nav]}</span>
                      <span className="micro">{states[i]}</span>
                    </span>
                    <span className="fs-dot" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="fs-meter">
              <span className="fs-meter-bar">
                <i />
              </span>
              <span className="micro">
                <b>
                  {FIRMA_SECTIONS.length}/{FIRMA_SECTIONS.length}
                </b>{' '}
                {h.lineDigital} {h.lineExperiences}
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
