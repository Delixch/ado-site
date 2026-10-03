import { useState } from 'react';
import { ArrowRight, Database, KeyRound, Lock, RefreshCw, ShieldCheck, Trash2 } from 'lucide-react';
import { IntroCall } from '../../common/IntroCall';
import { Media } from '../../fx/Media';
import { HoverTile, useHoverTile } from '../../fx/HoverTile';
import { Plate } from '../../fx/Plate';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const LAYOUTS: LayoutDef[] = [
  { name: 'Reel', cols: '1fr 1fr 0.8fr', areas: ['intro intro film', 'stats stats plate', 'safe safe safe'], rows: 'minmax(var(--spread-row), auto) auto auto' },
  { name: 'Story', cols: '0.8fr 1fr 1fr', areas: ['film intro intro', 'plate stats stats', 'safe safe safe'], rows: 'minmax(var(--spread-row), auto) auto auto' },
  { name: 'Feed', cols: '1fr 1fr 1fr', areas: ['intro film plate', 'stats stats stats', 'safe safe safe'], rows: 'minmax(var(--spread-row), auto) auto auto' },
];

/** Daten & Sicherheit als ruhiger Streifen: sechs Kreise, Erklaerung nur beim Zeigen. */
const SAFE_ICONS = [Database, Lock, ShieldCheck, RefreshCw, Trash2, KeyRound];

export function InstaStart() {
  const { t, go } = useView();
  const statTile = useHoverTile();
  const s = t.i.start;
  const sec = t.i.security;
  const [safeHint, setSafeHint] = useState<string | null>(null);

  const blocks: Block[] = [
    {
      id: 'intro',
      node: (
        <div className="ds-lede in-intro">
          <span className="micro live">{s.eyebrow}</span>
          <h2 className="in-intro-head">
            {s.line1} <em>{s.line2}</em>
          </h2>
          <p className="lede">{s.lede}</p>
          <div className="e-links">
            <button type="button" className="e-link" data-solid onClick={() => go('i-flow')}>
              {s.cta} <ArrowRight />
            </button>
            <IntroCall contact="i-flow" tab={3} />
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
          {/* iPhone: Gehaeuse mit Seitentasten, Bildschirm mit Statusleiste, Story 9:16 in der Mitte */}
          <div className="iphone">
            <div className="iphone-screen">
              <div className="iphone-status" aria-hidden>
                <span>9:41</span>
                <span className="iphone-island" />
                <span className="iphone-icons">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <div className="iphone-story">
                <span className="iphone-progress" aria-hidden />
                <Media src={`/media/insta/promo-${t.lang === 'de' ? 'de' : 'tr'}.mp4`} fallback="/media/insta/promo-tr.mp4" poster={`/media/insta/promo-${t.lang === 'de' ? 'de' : 'tr'}.webp`} sound />
              </div>
              <span className="iphone-home" aria-hidden />
            </div>
          </div>
        </div>
      ),
    },
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
    {
      id: 'safe',
      tone: 'deep',
      node: (
        <div className="safe">
          <div className="safe-head">
            <span className="micro">
              <b>{sec.eyebrow}</b> · {sec.line1} {sec.line2}
            </span>
          </div>
          <ol className="safe-track">
            {sec.items.map((it, i) => {
              const I = SAFE_ICONS[i];
              return (
                <li key={it.t}>
                  <span
                    className="safe-node"
                    tabIndex={0}
                    onPointerEnter={() => setSafeHint(it.d)}
                    onPointerLeave={() => setSafeHint(null)}
                    onFocus={() => setSafeHint(it.d)}
                    onBlur={() => setSafeHint(null)}
                  >
                    <span className="safe-dot">
                      <I />
                    </span>
                    <span className="safe-t">{it.t}</span>
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="safe-hint" aria-live="polite">
            {safeHint ?? sec.hint}
          </p>
        </div>
      ),
    },
  ];

  return <Spread view="i-start" head={{ folio: '00', kicker: t.i.nav.start, line1: 'ADO InstaOto', line2: s.eyebrow }} blocks={blocks} layouts={LAYOUTS} />;
}
