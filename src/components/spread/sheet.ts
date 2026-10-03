/**
 * Handy: Detail-Bausteine (Block.sheet) erscheinen in einem Bottom Sheet statt weit unten auf der Seite.
 * Seiten rufen openSheet() bei einer Auswahl durch den Nutzer; auf Tablet/Desktop hoert niemand zu.
 * Da auf dem Handy alle Seiten untereinander stehen, oeffnet nur das Sheet der Doppelseite,
 * in die zuletzt getippt wurde - oder das der genannten Doppelseite (openSheet('i-pricing')).
 */
const EVENT = 'ado-sheet';
let lastTap: EventTarget | null = null;
if (typeof window !== 'undefined') window.addEventListener('pointerdown', (e) => (lastTap = e.target), true);

export function openSheet(view?: string) {
  window.dispatchEvent(new CustomEvent<string | undefined>(EVENT, { detail: view }));
}

/** Gibt die Abmeldung zurueck (fuer useEffect). `scope` = Wurzel der eigenen Doppelseite. */
export function onSheetOpen(view: string, scope: () => Element | null, fn: () => void) {
  const h = (e: Event) => {
    const target = (e as CustomEvent<string | undefined>).detail;
    const el = scope();
    if (target ? target === view : !el || !(lastTap instanceof Node) || el.contains(lastTap)) fn();
  };
  window.addEventListener(EVENT, h);
  return () => window.removeEventListener(EVENT, h);
}
