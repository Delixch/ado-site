import { LetterDesk } from '../../common/Letter';
import { IntroCall } from '../../common/IntroCall';
import { Plate } from '../../fx/Plate';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const LAYOUTS: LayoutDef[] = [
  { name: 'Letter', cols: '1fr 1fr 1fr', areas: ['desk desk photo', 'desk desk benefits'] },
  { name: 'Envelope', cols: '1fr 1fr 1fr', areas: ['photo desk desk', 'benefits desk desk'] },
  { name: 'Open', cols: '1fr 1fr 1fr', areas: ['benefits photo photo', 'desk desk desk'], rows: 'minmax(var(--spread-row), auto) auto' },
];

export function FirmaContact() {
  const { t } = useView();
  const c = t.f.contact;

  const blocks: Block[] = [
    { id: 'desk', tone: 'deep', node: <LetterDesk labels={c} to="EKADO Firma" /> },
    { id: 'photo', tone: 'media', bleed: true, node: <Plate name="zurich" caption={c.location} /> },
    {
      id: 'benefits',
      trace: true,
      node: (
        <div className="fc-benefits">
          <IntroCall contact="f-contact" here />
        </div>
      ),
    },
  ];

  return <Spread view="f-contact" head={{ folio: '07', kicker: c.eyebrow, line1: c.line1, line2: c.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
