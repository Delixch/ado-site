import { LetterDesk } from '../../common/Letter';
import { Plate } from '../../fx/Plate';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';
import { FIRMA_SECTIONS } from './FirmaStart';

const LAYOUTS: LayoutDef[] = [
  { name: 'Letter', cols: '1fr 1fr 1fr', areas: ['desk desk photo', 'desk desk benefits', 'desk desk areas'] },
  { name: 'Envelope', cols: '1fr 1fr 1fr', areas: ['photo desk desk', 'benefits desk desk', 'areas desk desk'] },
  { name: 'Open', cols: '1fr 1fr 1fr', areas: ['benefits photo areas', 'desk desk desk'], rows: 'minmax(var(--spread-row), auto) auto' },
];

export function FirmaContact() {
  const { t, go } = useView();
  const c = t.f.contact;

  const blocks: Block[] = [
    { id: 'desk', tone: 'deep', node: <LetterDesk labels={c} to="ADO Firma" /> },
    { id: 'photo', tone: 'media', bleed: true, node: <Plate name="zurich" caption={c.location} /> },
    {
      id: 'benefits',
      node: (
        <div className="fc-benefits">
          <p className="lede">{c.intro}</p>
          <ol>
            {c.benefits.map((b, i) => (
              <li key={b}>
                <span className="micro">{String(i + 1).padStart(2, '0')}</span>
                <span className="whisper">{b}</span>
              </li>
            ))}
          </ol>
        </div>
      ),
    },
    {
      id: 'areas',
      tone: 'brand',
      node: (
        <div className="fc-areas">
          <span className="micro">
            <b>{c.hub.center}</b> · {c.hub.centerSub}
          </span>
          <ul>
            {FIRMA_SECTIONS.map((s) => (
              <li key={s.view}>
                <button type="button" onClick={() => go(s.view)}>
                  <s.icon /> {t.menu[s.view]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
  ];

  return <Spread view="f-contact" head={{ folio: '07', kicker: c.eyebrow, line1: c.line1, line2: c.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
