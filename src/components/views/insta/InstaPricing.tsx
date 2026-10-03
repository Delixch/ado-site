import { useEffect, useState, type ComponentType } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AppWindow,
  BadgeCheck,
  Briefcase,
  Check,
  Clock,
  Database,
  Facebook,
  FileText,
  GitBranch,
  GraduationCap,
  Infinity as InfinityIcon,
  Instagram,
  KeyRound,
  Layers,
  LayoutDashboard,
  Mail,
  MessageSquareText,
  PenLine,
  RefreshCw,
  ScanSearch,
  Smartphone,
  Users,
  Webhook,
  Workflow,
  Zap,
} from 'lucide-react';
import { IntroCall } from '../../common/IntroCall';
import { LetterDesk } from '../../common/Letter';
import { TrustBadges } from '../../common/TrustBadges';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

type Icon = ComponentType<{ className?: string }>;

const LAYOUTS: LayoutDef[] = [
  { name: 'Halo', cols: '1fr 1fr 1fr', areas: ['plans plans offer', 'check check terms', 'desk desk desk'], rows: 'auto auto auto' },
  { name: 'Check', cols: '1fr 1fr 1fr', areas: ['offer check check', 'terms plans plans', 'desk desk desk'], rows: 'auto auto auto' },
  { name: 'Letter', cols: '1fr 1fr 1fr', areas: ['desk desk offer', 'plans plans plans', 'check check terms'], rows: 'auto auto auto' },
];

/** Symbole je Paket, in der Reihenfolge der Knoten in insta-texts.ts */
const PLAN_ICONS: Record<string, Icon[]> = {
  start: [AppWindow, Webhook, LayoutDashboard, Database, Workflow, GraduationCap],
  komplett: [Layers, Briefcase, BadgeCheck, ScanSearch, Smartphone, Mail],
  basis: [Mail, Clock, PenLine, RefreshCw],
  plus: [Layers, InfinityIcon, GitBranch, Zap],
};

/** Symbole der Checkliste, Gruppe fuer Gruppe */
const CHECK_ICONS: Icon[][] = [
  [Instagram, Facebook, Smartphone, Briefcase, FileText],
  [AppWindow, KeyRound, ScanSearch, Webhook, Database, Mail],
  [MessageSquareText, Users],
];

/** Fortschrittsring: wie viel von "Ihre Konten" schon bereit ist. */
function Ring({ done, total }: { done: number; total: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg className="ck-ring" viewBox="0 0 64 64" aria-hidden>
      <circle cx="32" cy="32" r={r} className="ck-ring-bg" />
      <circle cx="32" cy="32" r={r} className="ck-ring-fg" strokeDasharray={c} strokeDashoffset={c * (1 - done / total)} />
      <text x="32" y="36" textAnchor="middle" className="ck-ring-txt">
        {done}/{total}
      </text>
    </svg>
  );
}

export function InstaPricing() {
  const { t } = useView();
  const p = t.i.pricing;
  const own = p.checkGroups[0].items.length;
  const [ready, setReady] = useState<boolean[]>(() => Array(own).fill(false));
  const done = ready.filter(Boolean).length;
  const allReady = done === own;
  const reco = allReady ? 'start' : 'komplett';
  const [sel, setSel] = useState('komplett');
  const [hint, setHint] = useState<string | null>(null);

  // Checkliste fuehrt die Wahl: alles bereit -> Start, sonst Komplett
  useEffect(() => {
    if (allReady) setSel('start');
    else setSel((s) => (s === 'start' ? 'komplett' : s));
  }, [allReady]);

  const plan = p.plans.find((x) => x.id === sel) ?? p.plans[0];
  const icons = PLAN_ICONS[plan.id];
  const n = plan.nodes.length;
  const R = 38; // Bahnradius in Prozent
  const pos = plan.nodes.map((_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + Math.cos(a) * R, y: 50 + Math.sin(a) * R };
  });

  const pick = (id: string) => setSel(id);
  const toggle = (i: number) => setReady((r) => r.map((x, k) => (k === i ? !x : x)));

  const Selector = ({ care }: { care: boolean }) => (
    <div className="op-row" data-care={care}>
      {p.plans
        .filter((x) => x.care === care)
        .map((x) => (
          <button key={x.id} type="button" className="op-btn" aria-pressed={x.id === sel} onClick={() => pick(x.id)}>
            <span className="op-name">{x.name}</span>
            <span className="op-price">{x.price}.–</span>
            <span className="op-unit">{x.care ? `/ ${p.perMonth}` : p.once}</span>
            {x.id === reco && <span className="op-reco" aria-label={p.recommended} />}
          </button>
        ))}
    </div>
  );

  const blocks: Block[] = [
    { id: 'desk', tone: 'deep', node: <LetterDesk labels={p.form} to="ADO InstaOto" /> },
    {
      id: 'offer',
      tone: 'brand',
      node: (
        <div className="ex-detail">
          <span className="micro">{p.eyebrow}</span>
          <h3 className="poster">
            {p.line1} {p.line2}
          </h3>
          <p className="lede">{p.lede}</p>
          <IntroCall contact="i-pricing" here />
          <TrustBadges product="insta" />
        </div>
      ),
    },
    {
      id: 'plans',
      node: (
        <div className="op">
          <div className="op-pick">
            <span className="micro">{p.setupLabel}</span>
            <Selector care={false} />
            <span className="micro">{p.careLabel}</span>
            <Selector care />
            <span className="op-hourly micro">{p.hourly}</span>
          </div>

          <div className="op-stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={plan.id}
                className="op-orbit"
                initial={{ opacity: 0, scale: 0.94, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.94, rotate: 8 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <svg className="op-lines" viewBox="0 0 100 100" aria-hidden>
                  <circle cx="50" cy="50" r={R} className="op-track" />
                  {pos.map((q, i) => (
                    <motion.line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={q.x}
                      y2={q.y}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                    />
                  ))}
                </svg>
                <div className="op-core" data-reco={plan.id === reco}>
                  <span className="op-core-name">{plan.name}</span>
                  <span className="op-core-price">
                    <small>{p.currency}</small> {plan.price}.–
                  </span>
                  <span className="op-core-unit">{plan.care ? `/ ${p.perMonth}` : p.once}</span>
                </div>
                {plan.nodes.map((label, i) => {
                  const I = icons[i];
                  return (
                    <motion.span
                      key={label}
                      className="op-node"
                      style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%` }}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.06, type: 'spring', stiffness: 260, damping: 20 }}
                    >
                      <span className="op-node-dot">
                        <I />
                      </span>
                      <span className="op-node-label">{label}</span>
                    </motion.span>
                  );
                })}
              </motion.div>
            </AnimatePresence>
            <div className="op-foot">
              <span className="op-for">{plan.for}</span>
              <IntroCall
                contact="i-pricing"
                here
                topic={`InstaOto · ${plan.name} (${p.currency} ${plan.price}.–${plan.care ? ` / ${p.perMonth}` : ''})`}
                className="e-link op-choose"
              >
                {p.choose} →
              </IntroCall>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'check',
      tone: 'deep',
      node: (
        <div className="ck2">
          <div className="ck2-head">
            <span className="micro">
              <b>{p.checkTitle}</b>
            </span>
            <span className="ck2-verdict" data-all={allReady}>
              <Ring done={done} total={own} />
              <span>{allReady ? p.readyAll : p.readySome}</span>
            </span>
          </div>
          {p.checkGroups.map((g, gi) => (
            <div key={g.t} className="ck2-row" data-own={g.own}>
              <span className="ck2-label micro">{g.t}</span>
              <ol className="ck2-track">
                {g.items.map((it, i) => {
                  const I = CHECK_ICONS[gi][i];
                  const on = g.own && ready[i];
                  const props = {
                    className: 'ck2-node',
                    onPointerEnter: () => setHint(it.d),
                    onPointerLeave: () => setHint(null),
                    onFocus: () => setHint(it.d),
                    onBlur: () => setHint(null),
                  };
                  const inner = (
                    <>
                      <span className="ck2-dot" data-on={on}>
                        {on ? <Check /> : <I />}
                      </span>
                      <span className="ck2-t">{it.t}</span>
                    </>
                  );
                  return (
                    <li key={it.t}>
                      {g.own ? (
                        <button type="button" {...props} aria-pressed={on} onClick={() => toggle(i)}>
                          {inner}
                        </button>
                      ) : (
                        <span {...props} tabIndex={0}>
                          {inner}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
          <p className="ck2-hint" aria-live="polite">
            {hint ?? p.checkHint}
          </p>
        </div>
      ),
    },
    {
      id: 'terms',
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
          <p className="in-terms-note micro">{p.hostingNote}</p>
        </div>
      ),
    },
  ];

  return <Spread view="i-pricing" head={{ folio: '05', kicker: p.eyebrow, line1: p.line1, line2: p.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
