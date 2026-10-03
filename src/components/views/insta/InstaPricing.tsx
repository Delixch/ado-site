import { Check } from 'lucide-react';
import { IntroCall } from '../../common/IntroCall';
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
          <IntroCall contact="i-pricing" here />
        </div>
      ),
    },
    {
      id: 'included',
      node: (
        <div className="in-need">
          <ul>
            {p.terms.map((x) => (
              <li key={x.t}>
                <span className="in-check">
                  <Check />
                </span>
                <span>
                  <span className="whisper">{x.t}</span>
                  <span className="in-sub">{x.d}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="in-terms-note micro">
            <b>{p.includedLabel}:</b> {p.included.slice(0, 4).join(' · ')}
          </p>
          <p className="in-terms-note micro">{p.hostingNote}</p>
        </div>
      ),
    },
  ];

  return <Spread view="i-pricing" head={{ folio: '05', kicker: p.eyebrow, line1: p.line1, line2: p.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
