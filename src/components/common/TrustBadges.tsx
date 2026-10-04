import { Globe, Handshake, Languages, MapPin, PhoneCall, Ruler, Server, ShieldCheck, Zap } from 'lucide-react';
import { useView } from '../ViewFrame';

const ICONS = {
  insta: [ShieldCheck, Zap, PhoneCall, Globe],
  firma: [ShieldCheck, Zap, PhoneCall, Handshake],
} as const;

/** Kleine, ruhige Vertrauens-Hinweise (Angebotsseiten). */
export function TrustBadges({ product }: { product: 'insta' | 'firma' }) {
  const { t } = useView();
  return (
    <ul className="trust" aria-label="Vertrauen">
      {t.ui.trust[product].map((label, i) => {
        const Icon = ICONS[product][i] ?? Globe;
        return (
          <li key={label}>
            <Icon aria-hidden /> {label}
          </li>
        );
      })}
    </ul>
  );
}

/** 3-B: Schweizer Vertrauens-Karte (Bento Card für Firma & InstaOto) */
export function SwissTrustCard() {
  const { t } = useView();
  const items = t.ui.trust.swiss ?? [
    { label: '100% Swiss Hosted', desc: 'Daten in Zürich · DSG-konform' },
    { label: 'Keine Vertragsbindung', desc: 'Monatlich kündbar' },
    { label: 'Direkter Support', desc: 'Zürich · DE & TR' },
  ];
  const icons = [ShieldCheck, Zap, PhoneCall];

  return (
    <div className="swiss-trust-card">
      <div className="swiss-trust-head">
        <span className="swiss-flag" aria-hidden>🇨🇭</span>
        <div>
          <span className="micro"><b>SCHWEIZER STANDARDS</b></span>
          <span className="whisper">{t.lang === 'tr' ? 'Güvenilirlik & Şeffaflık' : 'Verlässlichkeit & Nähe'}</span>
        </div>
      </div>
      <div className="swiss-trust-grid">
        {items.map((it, i) => {
          const Icon = icons[i] ?? ShieldCheck;
          return (
            <div key={it.label} className="swiss-trust-item">
              <span className="swiss-trust-icon">
                <Icon aria-hidden />
              </span>
              <div>
                <span className="swiss-trust-label">{it.label}</span>
                <span className="swiss-trust-desc micro">{it.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
