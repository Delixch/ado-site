/** Welcher Reiter auf "So funktioniert's" offen sein soll (z. B. Erstgespraech von der Uebersicht -> Preise). */
export const HOW_TAB_EVENT = 'ado-how-tab';
let next = 0;

export function requestHowTab(i: number) {
  next = i;
  window.dispatchEvent(new CustomEvent<number>(HOW_TAB_EVENT, { detail: i }));
}

export function takeHowTab() {
  const n = next;
  next = 0;
  return n;
}
