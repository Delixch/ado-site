import { Check } from 'lucide-react';
import { LetterDesk } from '../../common/Letter';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const LAYOUTS: LayoutDef[] = [
  { name: 'Letter', cols: '1fr 1fr 1fr', areas: ['desk desk offer', 'desk desk included'] },
  { name: 'Envelope', cols: '1fr 1fr 1fr', areas: ['offer desk desk', 'included desk desk'] },
  { name: 'Open', cols: '1fr 1fr 1fr', areas: ['offer included included', 'desk desk desk'], rows: 'minmax(var(--spread-row), auto) auto' },
];

export function InstaPricing() {
  const { t } = useView();
  const p = t.i.pricing;

  const blocks: Block[] = [
    { id: 'desk', tone: 'deep', node: <LetterDesk labels={p.form} to="ADO InstaOto" /> },
    {
      id: 'offer',
      tone: 'brand',
      node: (
        <div className="ex-detail">
          <span className="micro">{p.eyebrow}</span>
          <h3 className="poster">{p.line2}</h3>
          <p className="lede">{p.lede}</p>
        </div>
      ),
    },
    {
      id: 'included',
      node: (
        <ul className="in-need">
          {p.included.map((x) => (
            <li key={x}>
              <span className="in-check">
                <Check />
              </span>
              <span className="whisper">{x}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return <Spread view="i-pricing" head={{ folio: '05', kicker: p.eyebrow, line1: p.line1, line2: p.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
