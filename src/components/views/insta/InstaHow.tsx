import { InstaFeatures } from './InstaFeatures';
import { InstaFlow } from './InstaFlow';
import { InstaProcess } from './InstaProcess';

/** So funktioniert's: Live-Probe (4 Schritte), Funktionen des Panels, Weg bis live - eine Seite statt drei. */
export function InstaHow() {
  return (
    <div className="insta-how">
      <InstaFlow />
      <InstaFeatures />
      <InstaProcess />
    </div>
  );
}
