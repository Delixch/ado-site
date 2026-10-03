import { useState } from 'react';
import { Database, KeyRound, Lock, RefreshCw, ShieldCheck, Trash2 } from 'lucide-react';
import { HoverTile, useHoverTile } from '../../fx/HoverTile';
import { Plate } from '../../fx/Plate';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const ICONS = [Database, Lock, ShieldCheck, RefreshCw, Trash2, KeyRound];

const LAYOUTS: LayoutDef[] = [
  { name: 'Vault', cols: '1fr 1fr 1fr', areas: ['grid grid plate', 'grid grid db'] },
  { name: 'Open', cols: '1fr 1fr 1fr', areas: ['plate grid grid', 'db grid grid'] },
  { name: 'Wide', cols: '1fr 1fr 1fr', areas: ['grid grid grid', 'db plate plate'], rows: 'auto minmax(var(--spread-row), auto)' },
];

export function InstaSecurity() {
  const { t } = useView();
  const s = t.i.security;
  const [open, setOpen] = useState(0);
  const tile = useHoverTile();

  const blocks: Block[] = [
    {
      id: 'grid',
      node: (
        <ul className="in-sec" {...tile.list}>
          {s.items.map((it, i) => {
            const Icon = ICONS[i];
            return (
              <li key={it.t} data-open={i === open} {...tile.item(i)}>
                <HoverTile {...tile.at(i)} />
                <button type="button" onClick={() => setOpen(i)} onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(i)} aria-expanded={i === open}>
                  <span className="in-sec-icon">
                    <Icon />
                  </span>
                  <span className="whisper">{it.t}</span>
                  <span className="in-sub">{it.d}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ),
    },
    { id: 'plate', tone: 'media', bleed: true, node: <Plate name="vault" caption={s.eyebrow} /> },
    {
      id: 'db',
      tone: 'brand',
      node: (
        <div className="ex-detail">
          <span className="micro">EU · Frankfurt</span>
          <h3 className="whisper">{s.dbTitle}</h3>
          <p className="lede">{s.dbText}</p>
        </div>
      ),
    },
  ];

  return <Spread view="i-security" head={{ folio: '04', kicker: s.eyebrow, line1: s.line1, line2: s.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
