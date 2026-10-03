import { BadgeCheck, Globe, Handshake, Languages, MapPin, Ruler, Server } from 'lucide-react';
import { useView } from '../ViewFrame';

const ICONS = {
  insta: [BadgeCheck, MapPin],
  firma: [MapPin, Languages, Ruler, Handshake],
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
