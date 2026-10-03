import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { REPOS } from '../../../content/design-data';
import { Terminal } from '../../fx/Terminal';
import { Plate } from '../../fx/Plate';
import { openSheet } from '../../spread/sheet';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const kilo = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace('.0', '')}K` : String(n));
const MAX = Math.max(...REPOS.map((r) => r.stars));

const LAYOUTS: LayoutDef[] = [
  { name: 'Chart', cols: '1fr 1fr 1fr', areas: ['chart chart big', 'detail detail cmd', 'detail detail plate'] },
  { name: 'Spread', cols: '1fr 1fr 1fr', areas: ['detail detail big', 'detail detail cmd', 'chart chart plate'] },
  { name: 'Ledger', cols: '1fr 1fr 1fr', areas: ['chart detail detail', 'chart detail detail', 'big cmd plate'] },
];

const swap = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 }, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } } as const;

export function DesignRepos() {
  const { t } = useView();
  const r = t.d.repos;
  const [sel, setSel] = useState(4);
  const [copied, setCopied] = useState(false);
  const repo = REPOS[sel];
  const text = r.items[sel];

  const copy = () => {
    navigator.clipboard?.writeText(repo.commands[0].cmd).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    });
  };

  const blocks: Block[] = [
    { id: 'plate', tone: 'media', bleed: true, node: <Plate name="repos" caption={r.eyebrow} /> },
    {
      id: 'chart',
      node: (
        <div className="rp-chart">
          <span className="micro">
            <b>GITHUB ★</b> · {r.eyebrow}
          </span>
          <p className="rp-intro-s">{r.intro}</p>
          <ol>
            {REPOS.map((x, i) => (
              <li key={x.title}>
                <button
                  type="button"
                  aria-pressed={i === sel}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setSel(i)}
                  onClick={() => {
                    setSel(i);
                    openSheet();
                  }}
                >
                  <span className="rp-name">{x.title}</span>
                  <span className="rp-bar">
                    <motion.i
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: x.stars / MAX }}
                      transition={{ duration: 1.1, delay: 0.3 + i * 0.07, ease: [0.77, 0, 0.175, 1] }}
                    />
                  </span>
                  <span className="rp-num">{kilo(x.stars)}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      ),
    },
    {
      id: 'big',
      tone: 'brand',
      node: (
        <div className="rp-big">
          <span className="micro">★ {t.lang === 'tr' ? 'Yıldız' : 'Stars'}</span>
          <AnimatePresence mode="wait">
            <motion.span key={sel} className="poster" {...swap}>
              {kilo(repo.stars)}
            </motion.span>
          </AnimatePresence>
        </div>
      ),
    },
    {
      id: 'detail',
      sheet: true,
      node: (
        <AnimatePresence mode="wait">
          <motion.div key={sel} className="rp-detail" {...swap}>
            <span className="micro">{text.badge}</span>
            <h3 className="poster">{repo.title}</h3>
            <p className="whisper">{text.description}</p>
            <p className="lede rp-details">{text.details}</p>
            <p className="rp-tags micro">{text.tags.join(' · ')}</p>
            <a className="e-link" href={repo.link} target="_blank" rel="noreferrer">
              {r.githubShort.replace('↗', '').trim().toUpperCase()} <ArrowUpRight />
            </a>
          </motion.div>
        </AnimatePresence>
      ),
    },
    {
      id: 'cmd',
      tone: 'ink',
      node: (
        <div className="rp-cmd">
          <Terminal
            key={sel}
            title={repo.title.toLowerCase().replace(/\s+/g, '-')}
            lines={repo.commands.map((c, i) => ({ cmd: c.kind === 'prompt' ? `“${c.cmd}”` : c.cmd, out: text.commandNotes[i] }))}
          />
          <button type="button" className="e-link rp-copy" onClick={copy}>
            {copied ? <Check /> : <Copy />} {copied ? r.copied : r.copy}
          </button>
        </div>
      ),
    },
  ];

  return <Spread view="d-repos" head={{ folio: '04', kicker: r.eyebrow, line1: r.line1, line2: r.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
