import { CalendarClock } from 'lucide-react';
import type { ReactNode } from 'react';
import { useView } from '../ViewFrame';

/**
 * "Kostenloses Erstgespraech": kein Kalenderdienst, sondern der Brief der Seite.
 * Der Knopf merkt sich den Wunsch, wechselt zur Kontaktseite (oder bleibt dort)
 * und der Brief fuellt Betreff und Zeile "Passende Zeiten" vor.
 * `topic` ersetzt den Betreff, z. B. "Paket Komplett".
 */
const EVENT = 'ado-intro-call';
type Wish = { topic?: string };
let pending: Wish | null = null;

/** Vom Brief beim Erscheinen abgefragt (einmalig). */
export function takeIntroCall(): Wish | null {
  const p = pending;
  pending = null;
  return p;
}

export function onIntroCall(fn: (w: Wish) => void) {
  const h = (e: Event) => fn((e as CustomEvent<Wish>).detail ?? {});
  window.addEventListener(EVENT, h);
  return () => window.removeEventListener(EVENT, h);
}

export function IntroCall({
  contact,
  here = false,
  topic,
  children,
  className = 'e-link intro-call',
}: {
  contact: string;
  here?: boolean;
  topic?: string;
  children?: ReactNode;
  className?: string;
}) {
  const { t, go } = useView();
  const open = () => {
    const wish: Wish = { topic };
    if (here) {
      window.dispatchEvent(new CustomEvent<Wish>(EVENT, { detail: wish }));
      document.querySelector('.desk')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      pending = wish;
      go(contact);
    }
  };
  return (
    <button type="button" className={className} onClick={open}>
      {children ?? (
        <>
          <CalendarClock /> {t.ui.intro.cta}
        </>
      )}
    </button>
  );
}
