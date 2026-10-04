import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { usePage, useView } from '../../ViewFrame';
import { SwissTrustCard } from '../../common/TrustBadges';
import { LetterDesk } from '../../common/Letter';
import { onIntroCall, takeIntroCall } from '../../common/IntroCall';

export function FirmaPackages() {
  const { t } = useView();
  const page = usePage();
  const pkg = t.f.packages;
  const c = t.f.contact;
  const [selectedPlan, setSelectedPlan] = useState<string>('betrieb');

  // Brief erscheint direkt anstelle der Pakete (analog zu InstaOto)
  const [ask, setAsk] = useState<string | null>(() => {
    const w = takeIntroCall();
    return w ? (w.topic ?? null) : null;
  });

  const openInquiry = (plan: (typeof pkg.plans)[0]) => {
    const topic = `ADO Firma · ${plan.name} (${plan.badge ?? plan.id})`;
    setAsk(topic);
    window.setTimeout(() => {
      document.querySelector('.fp-ask .desk')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  };

  // Seite reagiert auf Erstgespräch / Paketaufrufe
  useEffect(() => {
    return onIntroCall(page, (w) => {
      if (w.topic) {
        setAsk(w.topic);
        window.setTimeout(() => {
          document.querySelector('.fp-ask .desk')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 60);
      }
    });
  }, [page]);

  return (
    <section className="fp-wrap" aria-labelledby="fp-title">
      <AnimatePresence mode="wait">
        {ask ? (
          <motion.div
            key="ask"
            className="fp-ask"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              className="e-link fp-back"
              onClick={() => setAsk(null)}
            >
              <ArrowLeft aria-hidden />
              <span>{pkg.back}</span>
            </button>

            <div className="fp-ask-paper-wrap">
              <LetterDesk
                key={ask}
                labels={{
                  namePlaceholder: c.namePlaceholder,
                  emailPlaceholder: c.emailPlaceholder,
                  messagePlaceholder: c.messagePlaceholder,
                  successTitle: c.successTitle,
                  successText: c.successText,
                  mailSubjectPrefix: `ADO Firma Anfrage ·`,
                }}
                to="ADO Firma"
                topic={ask}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="plans"
            className="fp-plans-view"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <header className="fp-head">
              <div className="fp-head-meta">
                <span className="micro live"><b>{pkg.eyebrow}</b></span>
                <h3 id="fp-title" className="poster fp-title">
                  {pkg.line1} <em>{pkg.line2}</em>
                </h3>
                <p className="lede fp-lede">{pkg.lede}</p>
              </div>
            </header>

            <div className="fp-grid">
              {pkg.plans.map((p) => {
                const isSelected = selectedPlan === p.id;
                const isFeatured = p.id === 'betrieb';
                return (
                  <article
                    key={p.id}
                    className="fp-card"
                    data-selected={isSelected}
                    data-featured={isFeatured}
                    onClick={() => setSelectedPlan(p.id)}
                  >
                    <div className="fp-card-top">
                      <div className="fp-card-badge-row">
                        <span className="fp-name">{p.name}</span>
                        {p.badge && (
                          <span className="micro fp-badge" data-featured={isFeatured}>
                            {isFeatured && <Sparkles aria-hidden />}
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <p className="fp-tagline micro">{p.tagline}</p>
                    </div>

                    <div className="fp-modules">
                      <span className="micro fp-section-label">{t.lang === 'tr' ? 'Dahil Modüller' : 'Enthaltene Module'}</span>
                      <ul className="fp-module-list">
                        {p.modules.map((m) => (
                          <li key={m} className="fp-module-item">
                            <span className="fp-dot" aria-hidden />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="fp-features">
                      <span className="micro fp-section-label">{t.lang === 'tr' ? 'Özellikler' : 'Highlights'}</span>
                      <ul className="fp-feat-list">
                        {p.features.map((f) => (
                          <li key={f} className="fp-feat-item">
                            <Check className="fp-check" aria-hidden />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="fp-card-foot">
                      <button
                        type="button"
                        className="e-link fp-cta"
                        data-solid={isFeatured ? true : undefined}
                        onClick={(e) => {
                          e.stopPropagation();
                          openInquiry(p);
                        }}
                      >
                        <span>{pkg.choose}</span>
                        <ArrowRight aria-hidden />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="fp-bottom">
              <p className="micro fp-note">{pkg.customNote}</p>
              <SwissTrustCard />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
