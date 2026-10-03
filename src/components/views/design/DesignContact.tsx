import { ArrowUpRight, Github, Instagram, Mail, MapPin } from 'lucide-react';
import { CONTACT_MAIL } from '../../../config';
import { SOCIAL } from '../../../content/design-data';
import { LetterDesk } from '../../common/Letter';
import { Plate } from '../../fx/Plate';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const LAYOUTS: LayoutDef[] = [
  { name: 'Letter', cols: '1fr 1fr 1fr', areas: ['desk desk photo', 'desk desk info', 'desk desk intro'] },
  { name: 'Envelope', cols: '1fr 1fr 1fr', areas: ['photo desk desk', 'info desk desk', 'intro desk desk'] },
  { name: 'Open', cols: '1fr 1fr 1fr', areas: ['intro photo info', 'desk desk desk'], rows: 'minmax(var(--spread-row), auto) auto' },
];

export function DesignContact() {
  const { t } = useView();
  const c = t.d.contact;

  const rows = [
    { icon: Mail, label: c.emailLabelFooter.replace(':', ''), value: CONTACT_MAIL, href: `mailto:${CONTACT_MAIL}` },
    { icon: MapPin, label: c.locationLabelFooter.replace(':', ''), value: c.location },
    { icon: Instagram, label: 'INSTAGRAM', value: '@adnanaydin53', href: SOCIAL.instagram },
    { icon: Github, label: 'GITHUB', value: 'Delixch', href: SOCIAL.github },
  ];

  const blocks: Block[] = [
    { id: 'desk', tone: 'deep', node: <LetterDesk labels={c} /> },
    { id: 'photo', tone: 'media', bleed: true, node: <Plate name="letter" caption={c.eyebrow} /> },
    {
      id: 'info',
      node: (
        <ul className="ct-rows">
          {rows.map((r) => (
            <li key={r.label}>
              <r.icon />
              <span className="micro">{r.label}</span>
              {r.href ? (
                <a href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {r.value} <ArrowUpRight />
                </a>
              ) : (
                <span>{r.value}</span>
              )}
            </li>
          ))}
        </ul>
      ),
    },
    { id: 'intro', node: <p className="lede drop">{c.intro}</p> },
  ];

  return <Spread view="d-contact" head={{ folio: '07', kicker: c.eyebrow, line1: c.line1, line2: c.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
