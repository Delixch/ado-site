import { lazy, Suspense } from 'react';
import { useView } from '../ViewFrame';

/** three.js nur laden, wenn der Roboter wirklich erscheint (eigener Chunk). */
const AdoRobot = lazy(() => import('./AdoRobot').then((m) => ({ default: m.AdoRobot })));

/** Der KI-Roboter von ADO Design, rechts neben den Layout-Plaenen im Seitenkopf.
 *  Antworten kommen von /api/chat (Schluessel nur auf Vercel bzw. in .env.local). */
export function MastRobot() {
  const { t } = useView();
  return (
    <div className="mast-robot">
      <Suspense fallback={null}>
        <AdoRobot lang={t.lang} className="mast-robot-in" />
      </Suspense>
    </div>
  );
}
