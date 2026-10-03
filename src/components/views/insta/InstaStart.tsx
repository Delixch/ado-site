import { ArrowRight } from 'lucide-react';
import { Media } from '../../fx/Media';
import { HoverTile, useHoverTile } from '../../fx/HoverTile';
import { Plate } from '../../fx/Plate';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';
import { Shot } from './parts';

const LAYOUTS: LayoutDef[] = [
  { name: 'Reel', cols: '1fr 1fr 0.8fr', areas: ['headline headline film', 'lede shot film', 'stats stats plate'] },
  { name: 'Story', cols: '0.8fr 1fr 1fr', areas: ['film headline headline', 'film shot lede', 'plate stats stats'] },
  { name: 'Feed', cols: '1fr 1fr 1fr', areas: ['headline film lede', 'shot film plate', 'stats stats stats'], rows: 'minmax(var(--spread-row), auto) minmax(var(--spread-row), auto) auto' },
];

export function InstaStart() {
  const { t, go } = useView();
  const statTile = useHoverTile();
  const s = t.i.start;

  const blocks: Block[] = [
    {
      id: 'headline',
      node: (
        <h2 className="fs-head">
          <span className="poster">{s.line1}</span>
          <span className="whisper">
            <em>{s.line2}</em>
          </span>
        </h2>
      ),
    },
    {
      id: 'lede',
      node: (
        <div className="ds-lede">
          <span className="micro live">{s.eyebrow}</span>
          <p className="lede">{s.lede}</p>
          <div className="e-links">
            <button type="button" className="e-link" data-solid onClick={() => go('i-flow')}>
              {s.cta} <ArrowRight />
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'film',
      tone: 'media',
      bleed: true,
      node: (
        <div className="in-reel">
          <div className="in-reel-frame">
            <Media src={`/media/insta/promo-${t.lang === 'de' ? 'de' : 'tr'}.mp4`} fallback="/media/insta/promo-tr.mp4" poster={`/media/insta/promo-${t.lang === 'de' ? 'de' : 'tr'}.webp`} sound />
          </div>
        </div>
      ),
    },
    { id: 'shot', tone: 'deep', node: <Shot name="uebersicht" /> },
    {
      id: 'stats',
      bleed: true,
      node: (
        <div className="metrics" {...statTile.list}>
          {s.stats.map((x, i) => (
            <div className="metric" key={x.l} {...statTile.item(i)}>
              <HoverTile {...statTile.at(i)} className="hover-tile hover-tile-in" />
              <span className="micro">{String(i + 1).padStart(2, '0')}</span>
              <span>
                <span className="metric-v">{x.v}</span>
                <span className="micro">{x.l}</span>
              </span>
            </div>
          ))}
        </div>
      ),
    },
    { id: 'plate', tone: 'media', bleed: true, node: <Plate name="phone" caption={s.eyebrow} /> },
  ];

  return <Spread view="i-start" head={{ folio: '00', kicker: 'ADO InstaOto', line1: s.line1, line2: s.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
