import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, CalendarClock, Check, Clock, Target, UserRound, Wrench } from 'lucide-react';
import { takeIntroCall } from '../../common/IntroCall';
import { LetterDesk } from '../../common/Letter';
import { TrustBadges } from '../../common/TrustBadges';
import { openSheet } from '../../spread/sheet';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useMode } from '../../../hooks/useMode';
import { useView } from '../../ViewFrame';

/** Untereinander: Reiter zuerst (wie auf den anderen Seiten). */
const STACK = ['offer', 'plans'];

const LAYOUTS: LayoutDef[] = [
  { name: 'Halo', cols: '1fr 1fr 1fr', areas: ['plans plans offer'] },
  { name: 'Open', cols: '1fr 1fr 1fr', areas: ['offer plans plans'] },
  { name: 'Wide', cols: '1fr 1fr 1fr', areas: ['plans plans plans', 'offer offer offer'], rows: 'auto auto' },
];

/** Paket waehlen -> darunter alles zu genau diesem Paket: Ziel, was Sie mitbringen, was wir erledigen, Preis, Dauer. */
export function InstaPricing({ tabs }: { tabs?: ReactNode }) {
  const { t } = useView();
  const p = t.i.pricing;
  const I = t.ui.intro;
  const [sel, setSel] = useState('komplett');
  // Brief erscheint unter den Paketen statt des Paketblatts (Erstgespraech von der Uebersicht: gleich offen)
  const [ask, setAsk] = useState<string | null>(() => {
    const w = takeIntroCall();
    return w ? (w.topic ?? I.topic) : null;
  });
  const mobile = useMode() === 'mobile';
  const open = (topic: string) => {
    setAsk(topic);
    if (mobile) openSheet();
    else window.setTimeout(() => document.querySelector('.op .desk')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
  };

  // Erstgespraech von der Uebersicht: Brief gleich offen - auf dem Handy im Sheet
  useEffect(() => {
    if (mobile && ask) openSheet();
  }, []);
  const plan = p.plans.find((x) => x.id === sel) ?? p.plans[0];
  const unit = (care: boolean) => (care ? `/ ${p.perMonth}` : p.once);

  // Paketblatt bzw. Brief: Desktop unter den Paketen, Handy im Bottom Sheet
  const detail = (
    <AnimatePresence mode="wait">
      {ask ? (
        <motion.div
          key="ask"
          className="op-ask"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <button type="button" className="e-link op-back" onClick={() => setAsk(null)}>
            <ArrowLeft /> {p.back}
          </button>
          <LetterDesk key={ask} labels={p.form} to="ADO InstaOto" topic={ask} />
        </motion.div>
      ) : (
      <motion.div
        key={plan.id}
        className="op-sheet"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <header className="op-sheet-head">
          <h4 className="poster">
            {plan.name} <span>· {p.currency} {plan.price}.–{plan.care ? ` / ${p.perMonth}` : ''}</span>
          </h4>
          <span className="op-meta micro">
            {plan.care ? p.careLabel : p.setupLabel}
            {plan.time && (
              <>
                <Clock aria-hidden /> {plan.time}
              </>
            )}
          </span>
        </header>

        <p className="op-goal">
          <span className="op-ico" aria-hidden>
            <Target />
          </span>
          <span>
            <b className="micro">{p.goalLabel}</b>
            {plan.goal}
          </span>
        </p>

        <div className="op-cols">
          <section className="op-col" data-who="you">
            <h5 className="micro">
              <span className="op-ico" aria-hidden>
                <UserRound />
              </span>
              {p.youLabel}
            </h5>
            <ul>
              {plan.you.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
          <section className="op-col" data-who="we">
            <h5 className="micro">
              <span className="op-ico" aria-hidden>
                <Wrench />
              </span>
              {p.weLabel}
            </h5>
            <ul>
              {plan.we.map((x) => (
                <li key={x}>
                  <Check aria-hidden /> {x}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="op-foot">
          <span className="op-hourly micro">
            {plan.care ? '' : p.hourly}
            {!plan.care && <br />}
            {p.hostingNote}
          </span>
          <button
            type="button"
            className="e-link intro-call"
            onClick={() => open(`InstaOto · ${plan.name} (${p.currency} ${plan.price}.–${plan.care ? ` / ${p.perMonth}` : ''})`)}
          >
            {p.choose} →
          </button>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );

  const blocks: Block[] = [
    {
      id: 'offer',
      trace: true,
      tone: 'brand',
      node: (
        <div className="ex-detail">
          {tabs}
          {!tabs && <span className="micro">{p.eyebrow}</span>}
          <h3 className="poster">
            {p.line1} {p.line2}
          </h3>
          <p className="lede">{p.lede}</p>
          <button type="button" className="e-link intro-call" onClick={() => open(I.topic)}>
            <CalendarClock /> {I.cta}
          </button>
          <TrustBadges product="insta" />
        </div>
      ),
    },
    {
      id: 'plans',
      node: (
        <div className="op">
          <div className="op-groups">
            {[false, true].map((care) => (
              <div key={String(care)} className="op-group">
                <span className="op-label micro">{care ? p.careLabel : p.setupLabel}</span>
                <div className="op-row">
                  {p.plans
                    .filter((x) => x.care === care)
                    .map((x) => (
                      <button key={x.id} type="button" className="op-btn" aria-pressed={x.id === sel} onClick={() => {
                          setSel(x.id);
                          setAsk(null);
                          if (mobile) openSheet();
                        }}>
                        <span className="op-name">{x.name}</span>
                        <span className="op-price">{x.price}.–</span>
                        <span className="op-unit">{unit(x.care)}</span>
                        {x.id === 'komplett' && <span className="op-reco" aria-label={p.recommended} />}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {!mobile && detail}
        </div>
      ),
    },
    ...(mobile ? [{ id: 'more', sheet: true, node: <div className="op">{detail}</div> }] : []),
  ];

  return <Spread view="i-pricing" head={{ folio: '04', kicker: p.eyebrow, line1: p.line1, line2: p.line2 }} blocks={blocks} layouts={LAYOUTS} stack={STACK} />;
}
