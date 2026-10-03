import { useEffect, useState } from 'react';

/**
 * Welcher Reiter auf einer Seite mit Reitern offen sein soll (InstaOto "So funktioniert's" = i-flow,
 * ADO Firma "Ablaeufe" = f-flow), z. B. Erstgespraech von der Uebersicht -> Preise.
 * Je Seite getrennt: auf dem Handy stehen alle Seiten gleichzeitig untereinander.
 */
const EVENT = 'ado-how-tab';
const next: Record<string, number> = {};

export function requestHowTab(i: number, view = 'i-flow') {
  next[view] = i;
  window.dispatchEvent(new CustomEvent<{ i: number; view: string }>(EVENT, { detail: { i, view } }));
}

function takeHowTab(view: string) {
  const n = next[view] ?? 0;
  delete next[view];
  return n;
}

/** Reiter-Zustand einer Seite: Startwert aus einer Anfrage, spaetere Anfragen schalten um. */
export function useHowTab(view: string) {
  const [tab, setTab] = useState(() => takeHowTab(view));
  useEffect(() => {
    const h = (e: Event) => {
      const d = (e as CustomEvent<{ i: number; view: string }>).detail;
      if (d.view !== view) return;
      setTab(d.i);
      takeHowTab(view);
    };
    window.addEventListener(EVENT, h);
    return () => window.removeEventListener(EVENT, h);
  }, [view]);
  return [tab, setTab] as const;
}
