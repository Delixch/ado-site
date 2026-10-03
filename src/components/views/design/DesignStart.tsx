import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { CONTACT_MAIL } from '../../../config';
import { ABOUT_STATS } from '../../../content/design-data';
import { FitHeadline } from '../../fx/FitHeadline';
import { HoverTile, useHoverTile } from '../../fx/HoverTile';
import { Plate } from '../../fx/Plate';
import { Proverb } from '../../fx/Proverb';
import { SlitMedia } from '../../fx/SlitMedia';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const LAYOUTS: LayoutDef[] = [
  { name: 'Cover', cols: '1.1fr 1fr 1fr', areas: ['headline cover cover', 'lede cover cover', 'plate quote stats'] },
  { name: 'Poster', cols: '1fr 1fr 1.1fr', areas: ['cover cover headline', 'cover cover lede', 'stats quote plate'] },
  { name: 'Index', cols: '1fr 1fr 1fr', areas: ['plate headline headline', 'plate cover cover', 'quote cover cover', 'stats lede lede'] },
];

export function DesignStart() {
  const { t, go } = useView();
  const statTile = useHoverTile();
  const h = t.d.hero;

  const blocks: Block[] = [
    {
      id: 'cover',
      tone: 'media',
      bleed: true,
      node: (
        <SlitMedia src="/media/design/schreibtisch.mp4" at={0.55}>
          <div className="cover-over">
            <span className="cover-ado poster" aria-hidden>
              <span>A</span>
              <span>D</span>
              <span>O</span>
            </span>
            <span className="micro cover-issue">
              <b>{t.ui.issue} 01</b> · {new Date().getFullYear()}
            </span>
            <span className="micro cover-role">
              {h.roleLine} — {h.badgeLocation}
            </span>
          </div>
        </SlitMedia>
      ),
    },
    {
      id: 'headline',
      node: (
        <FitHeadline className="ds-head" parts={[h.lineBuild, h.lineDigital, h.lineExperiences]} />
      ),
    },
    {
      id: 'lede',
      node: (
        <div className="ds-lede">
          <span className="micro live">{h.badgeAvailable}</span>
          <p className="lede drop">{h.subtitle}</p>
          <div className="e-links">
            <button type="button" className="e-link" data-solid onClick={() => go('d-work')}>
              {h.ctaWork.replace(/[↗↓]/g, '').trim()} <ArrowUpRight />
            </button>
            <a className="e-link" href={`mailto:${CONTACT_MAIL}`}>
              {h.ctaEmail.replace(/[↗↓]/g, '').trim()} <ArrowDown />
            </a>
          </div>
        </div>
      ),
    },
    {
      id: 'quote',
      tone: 'brand',
      node: (
        <figure className="ds-quote">
          <span className="ds-quote-mark poster" aria-hidden>
            “
          </span>
          <Proverb lang={t.lang} />
          <figcaption className="micro">— ADO · {t.lang === 'tr' ? 'Zürih' : 'Zürich'}</figcaption>
        </figure>
      ),
    },
    {
      id: 'stats',
      bleed: true,
      node: (
        <div className="metrics" {...statTile.list}>
          {ABOUT_STATS.map((s, i) => (
            <div className="metric" key={i} {...statTile.item(i)}>
              <HoverTile {...statTile.at(i)} className="hover-tile hover-tile-in" />
              <span className="micro">{String(i + 1).padStart(2, '0')}</span>
              <span>
                <span className="metric-v">
                  {s.value}
                  {s.suffix && <sup>{s.suffix}</sup>}
                </span>
                <span className="micro">{t.d.about.statLabels[i]}</span>
              </span>
            </div>
          ))}
        </div>
      ),
    },
    { id: 'plate', tone: 'media', bleed: true, node: <Plate name="type" caption={h.roleLine} /> },
  ];

  return (
    <Spread
      view="d-start"
      head={{ folio: '00', kicker: t.lang === 'tr' ? 'ADO DESIGN · PORTFOLYO' : 'ADO Design · Portfolio', line1: h.roleLine, line2: h.badgeLocation }}
      blocks={blocks}
      layouts={LAYOUTS}
    />
  );
}
