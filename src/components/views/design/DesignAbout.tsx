import { ArrowUpRight } from 'lucide-react';
import { CONTACT_MAIL } from '../../../config';
import { ABOUT_STATS, LAB_TAGS } from '../../../content/design-data';
import { CountUp } from '../../common/CountUp';
import { TypePortrait } from '../../fx/TypePortrait';
import { Plate } from '../../fx/Plate';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const LAYOUTS: LayoutDef[] = [
  { name: 'Portrait', cols: '1.1fr 1fr 1fr', areas: ['type bio bio', 'type tags stats', 'type film cta'] },
  { name: 'Column', cols: '1fr 1fr 1fr', areas: ['bio type type', 'stats type type', 'cta tags film'] },
  { name: 'Mirror', cols: '1fr 1fr 1.1fr', areas: ['bio bio type', 'film tags type', 'cta stats type'] },
];

export function DesignAbout() {
  const { t } = useView();
  const a = t.d.about;

  const blocks: Block[] = [
    {
      id: 'type',
      tone: 'ink',
      bleed: true,
      node: <TypePortrait src="/media/design/koltuk.webp" words={[...a.tags, ...LAB_TAGS, 'ADO', 'Zürich']} label={t.ui.split} />,
    },
    {
      id: 'bio',
      node: (
        <div className="ab-bio">
          <h2 className="whisper">{a.bioTitle}</h2>
          <p className="lede drop">
            {a.bioPart1}
            <em>{a.bioStrong1}</em>
            {a.bioPart2}
            <em>{a.bioStrong2}</em>
            {a.bioPart3}
          </p>
        </div>
      ),
    },
    {
      id: 'tags',
      tone: 'deep',
      node: (
        <ul className="ab-tags">
          {a.tags.map((tag, i) => (
            <li key={tag}>
              <span className="micro">{String(i + 1).padStart(2, '0')}</span>
              <span className="poster">{tag}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'film',
      tone: 'media',
      bleed: true,
      node: (
        <Plate name="about" caption={a.tags[2]} />
      ),
    },
    {
      id: 'stats',
      bleed: true,
      node: (
        <div className="metrics">
          {ABOUT_STATS.map((s, i) => (
            <div className="metric" key={i}>
              <span className="micro">{String(i + 1).padStart(2, '0')}</span>
              <span>
                <span className="metric-v">
                  <CountUp value={s.value} />
                  {s.suffix && <sup>{s.suffix}</sup>}
                </span>
                <span className="micro">{a.statLabels[i]}</span>
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'cta',
      tone: 'deep',
      node: (
        <div className="ab-cta">
          <span className="micro">E-Mail</span>
          <a className="ab-mail whisper" href={`mailto:${CONTACT_MAIL}`}>
            {CONTACT_MAIL}
          </a>
          <a className="e-link" data-solid href={`mailto:${CONTACT_MAIL}`}>
            {a.cta} <ArrowUpRight />
          </a>
        </div>
      ),
    },
  ];

  return <Spread view="d-about" head={{ folio: '01', kicker: a.eyebrow, line1: a.line1, line2: a.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
