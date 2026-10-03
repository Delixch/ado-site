/**
 * Handy: Detail-Bausteine (Block.sheet) erscheinen in einem Bottom Sheet statt weit unten auf der Seite.
 * Seiten rufen openSheet() bei einer Auswahl durch den Nutzer; auf Tablet/Desktop hoert niemand zu.
 */
const EVENT = 'ado-sheet';

export function openSheet() {
  window.dispatchEvent(new Event(EVENT));
}

/** Gibt die Abmeldung zurueck (fuer useEffect). */
export function onSheetOpen(fn: () => void) {
  window.addEventListener(EVENT, fn);
  return () => window.removeEventListener(EVENT, fn);
}
