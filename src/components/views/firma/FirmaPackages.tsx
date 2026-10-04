import { useState } from 'react';
import { ArrowRight, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { useView } from '../../ViewFrame';
import { SwissTrustCard } from '../../common/TrustBadges';

export function FirmaPackages() {
  const { t, go } = useView();
  const pkg = t.f.packages;
  const [selectedPlan, setSelectedPlan] = useState<string>('betrieb');

  return (
    <section className="fp-wrap" aria-labelledby="fp-title">
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
                    go('f-contact');
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
    </section>
  );
}
