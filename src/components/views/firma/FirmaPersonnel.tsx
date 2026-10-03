import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BadgeCheck, Check, FileText, Folder, FolderOpen } from 'lucide-react';
import { dossierLabel } from '../../../content/firma-extra';
import { useInView } from '../../../hooks/useInView';
import { Plate } from '../../fx/Plate';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const LAYOUTS: LayoutDef[] = [
  { name: 'Dossier', cols: '1fr 1fr 1fr', areas: ['dossier dossier dossier', 'onboard intro plate', 'onboard count plate'], rows: 'auto minmax(var(--spread-row), auto) minmax(var(--spread-row), auto)' },
  { name: 'Desk', cols: '1fr 1fr 1fr', areas: ['onboard dossier dossier', 'intro dossier dossier', 'intro plate count'] },
  { name: 'Shelf', cols: '1fr 1fr 1fr', areas: ['intro count plate', 'dossier dossier dossier', 'onboard onboard onboard'], rows: 'minmax(var(--spread-row), auto) auto auto' },
];

/** Onboarding laeuft Schritt fuer Schritt durch und beginnt dann neu. */
function useOnboarding(steps: number) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [done, setDone] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setDone((d) => (d >= steps + 2 ? 0 : d + 1)), 1100);
    return () => window.clearInterval(id);
  }, [inView, steps]);
  return { ref, done: Math.min(done, steps) };
}

const swap = { initial: { opacity: 0, y: 12, rotate: 0.6 }, animate: { opacity: 1, y: 0, rotate: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } } as const;

export function FirmaPersonnel() {
  const { t } = useView();
  const e = t.f.experience;
  const m = e.mock;
  const L = dossierLabel(t.lang);
  const company = t.f.repos.doc.items[0].fields[0].value;
  const [tab, setTab] = useState(0);
  const [doc, setDoc] = useState(0);
  const { ref, done } = useOnboarding(e.steps.length);
  const docCount = m.docs.match(/\d+/)?.[0] ?? '';

  const folder = e.folders[tab];
  const d = folder.docs[Math.min(doc, folder.docs.length - 1)];
  const [title, person] = d.name.split(' · ');

  const openFolder = (i: number) => {
    setTab(i);
    setDoc(0);
  };

  const blocks: Block[] = [
    {
      id: 'dossier',
      tone: 'deep',
      node: (
        <div className="pf3">
          <ul className="pf3-folders" role="tablist" aria-label={L.dossier}>
            {e.folders.map((f, i) => (
              <li key={f.tab}>
                <button type="button" role="tab" aria-selected={i === tab} onClick={() => openFolder(i)}>
                  {i === tab ? <FolderOpen /> : <Folder />}
                  <span>{f.tab}</span>
                  <span className="micro">{f.docs.length}</span>
                </button>
              </li>
            ))}
          </ul>
          <AnimatePresence mode="wait">
            <motion.ul key={tab} className="pf3-docs" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.25 }}>
              {folder.docs.map((x, i) => (
                <li key={x.name}>
                  <button type="button" aria-pressed={i === doc} onClick={() => setDoc(i)}>
                    <FileText />
                    <span>
                      <span className="pf3-name">{x.name}</span>
                      <span className="micro">{x.meta}</span>
                    </span>
                    <Check className="pf-ok" />
                  </button>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
          <div className="pf3-preview">
            <AnimatePresence mode="wait">
              <motion.article key={`${tab}-${doc}`} className="sheet" {...swap}>
                <header>
                  <span className="micro">
                    <b>{L.dossier}</b> · {company}
                  </span>
                  <h3 className="whisper">{title}</h3>
                </header>
                <dl>
                  <div>
                    <dt className="micro">{L.person}</dt>
                    <dd>{person ?? m.name}</dd>
                  </div>
                  {(!person || person === m.name) && (
                    <>
                      <div>
                        <dt className="micro">{L.role}</dt>
                        <dd>{m.role}</dd>
                      </div>
                      <div>
                        <dt className="micro">{m.startLabel}</dt>
                        <dd>{m.start}</dd>
                      </div>
                    </>
                  )}
                  <div>
                    <dt className="micro">{L.status}</dt>
                    <dd>{d.meta}</dd>
                  </div>
                  <div>
                    <dt className="micro">{L.folder}</dt>
                    <dd>{folder.tab}</dd>
                  </div>
                </dl>
                <footer>
                  <span className="sheet-sign whisper">{person ?? m.name}</span>
                  <span className="micro sheet-ok">
                    <BadgeCheck /> {L.signed}
                  </span>
                  <span className="micro">{L.file}</span>
                </footer>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      ),
    },
    {
      id: 'onboard',
      node: (
        <div ref={ref} className="ob">
          <span className="micro">{e.onboardingTitle}</span>
          <div className="ob-person">
            <span className="whisper">{m.name}</span>
            <span className="micro">
              {m.role} · {m.startLabel} {m.start}
            </span>
          </div>
          <ol className="ob-steps">
            {e.steps.map((s, i) => (
              <li key={s} data-done={i < done}>
                <span className="ob-dot">
                  <Check />
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <span className="micro">
            {m.progressLabel} ·{' '}
            <b>
              {done}/{e.steps.length}
            </b>{' '}
            {m.stepsLabel}
          </span>
        </div>
      ),
    },
    { id: 'intro', node: <p className="lede drop">{e.intro}</p> },
    {
      id: 'count',
      tone: 'brand',
      node: (
        <div className="ex-span">
          <span className="micro">{e.eyebrow}</span>
          <span className="poster">{docCount}</span>
          <span className="micro">{m.docs.replace(docCount, '').trim()}</span>
        </div>
      ),
    },
    { id: 'plate', tone: 'media', bleed: true, node: <Plate name="team" caption={e.eyebrow} /> },
  ];

  return <Spread view="f-personnel" head={{ folio: '06', kicker: e.eyebrow, line1: e.line1, line2: e.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
