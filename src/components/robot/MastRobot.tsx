import { lazy, Suspense, useEffect, useState } from 'react';
import { useView } from '../ViewFrame';

/** three.js nur laden, wenn der Roboter wirklich erscheint (eigener Chunk). */
const AdoRobot = lazy(() => import('./AdoRobot').then((m) => ({ default: m.AdoRobot })));

/** Roboter erst nach dem Seitenaufbau holen (Seite zuerst, dann three.js) - oder sofort bei der ersten Beruehrung.
 *  Handy: nur bei der ersten Beruehrung - three.js blockiert schwache Telefone sonst sekundenlang. */
function useAfterLoad() {
  const [go, setGo] = useState(false);
  useEffect(() => {
    let idle = 0;
    let timer = 0;
    const start = () => setGo(true);
    // kein 'scroll': der Sprung zur gemerkten Seite beim Laden scrollt auch
    const events = ['pointerdown', 'keydown', 'touchstart'] as const;
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    const phone = window.matchMedia('(max-width: 719.98px), (pointer: coarse)').matches;
    const whenIdle = () => {
      if (phone) return;
      timer = window.setTimeout(() => {
        if ('requestIdleCallback' in window) idle = window.requestIdleCallback(start, { timeout: 2000 });
        else start();
      }, 1500);
    };
    if (document.readyState === 'complete') whenIdle();
    else window.addEventListener('load', whenIdle, { once: true });
    return () => {
      events.forEach((e) => window.removeEventListener(e, start));
      window.removeEventListener('load', whenIdle);
      window.clearTimeout(timer);
      if (idle) window.cancelIdleCallback(idle);
    };
  }, []);
  return go;
}

/** Der KI-Roboter von ADO Design, rechts neben den Layout-Plaenen im Seitenkopf.
 *  Antworten kommen von /api/chat (Schluessel nur auf Vercel bzw. in .env.local). */
export function MastRobot() {
  const { t } = useView();
  const go = useAfterLoad();
  return (
    <div className="mast-robot">
      {go && (
        <Suspense fallback={null}>
          <AdoRobot lang={t.lang} className="mast-robot-in" />
        </Suspense>
      )}
    </div>
  );
}
