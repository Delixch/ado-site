import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Clock, Target, UserRound, Wrench } from 'lucide-react';
import { IntroCall } from '../../common/IntroCall';
import { LetterDesk } from '../../common/Letter';
import { TrustBadges } from '../../common/TrustBadges';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const LAYOUTS: LayoutDef[] = [
  { name: 'Halo', cols: '1fr 1fr 1fr', areas: ['plans plans offer', 'desk desk desk'], rows: 'auto auto' },
  { name: 'Open', cols: '1fr 1fr 1fr', areas: ['offer plans plans', 'desk desk desk'], rows: 'auto auto' },
  { name: 'Letter', cols: '1fr 1fr 1fr', areas: ['desk desk offer', 'plans plans plans'], rows: 'auto auto' },
];

/** Paket waehlen -> darunter alles zu genau diesem Paket: Ziel, was Sie mitbringen, was wir erledigen, Preis, Dauer. */
export function InstaPricing({ tabs }: { tabs?: ReactNode }) {
  const { t } = useView();
  const p = t.i.pricing;
  const [sel, setSel] = useState('komplett');
  const plan = p.plans.find((x) => x.id === sel) ?? p.plans[0];
  const unit = (care: boolean) => (care ? `/ ${p.perMonth}` : p.once);

  const blocks: Block[] = [
    { id: 'desk', tone: 'deep', node: <LetterDesk labels={p.form} to="ADO InstaOto" /> },
    {
      id: 'offer',
      tone: 'brand',
      node: (
        <div className="ex-detail">
          {tabs}
          {!tabs && <span className="micro">{p.eyebrow}</span>}
          <h3 className="poster">
            {p.line1} {p.line2}
          </h3>
          <p className="lede">{p.lede}</p>
          <IntroCall contact="i-flow" here />
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
                      <button key={x.id} type="button" className="op-btn" aria-pressed={x.id === sel} onClick={() => setSel(x.id)}>
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

          <AnimatePresence mode="wait">
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
                  {plan.name} <span>· {p.currency} {plan.price}.–</span>
                </h4>
                <span className="op-meta micro">
                  {unit(plan.care)}
                  <Clock aria-hidden /> {plan.time}
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
                <IntroCall
                  contact="i-flow"
                  here
                  topic={`InstaOto · ${plan.name} (${p.currency} ${plan.price}.–${plan.care ? ` / ${p.perMonth}` : ''})`}
                  className="e-link intro-call"
                >
                  {p.choose} →
                </IntroCall>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ),
    },
  ];

  return <Spread view="i-pricing" head={{ folio: '04', kicker: p.eyebrow, line1: p.line1, line2: p.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
