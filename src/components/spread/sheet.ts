/**
 * Handy: Detail-Bausteine (Block.sheet) erscheinen in einem Bottom Sheet statt weit unten auf der Seite.
 * Seiten rufen openSheet() bei einer Auswahl durch den Nutzer; auf Tablet/Desktop passiert nichts.
 */
export const SHEET_EVENT = 'ado-sheet';

export function openSheet() {
  window.dispatchEvent(new Event(SHEET_EVENT));
}
