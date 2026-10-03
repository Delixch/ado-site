import { CalendarClock } from 'lucide-react';
import { useView } from '../ViewFrame';

/**
 * "Kostenloses Erstgespraech": kein Kalenderdienst, sondern der Brief der Seite.
 * Der Knopf merkt sich den Wunsch, wechselt zur Kontaktseite (oder bleibt dort)
 * und der Brief fuellt Betreff und Zeile "Passende Zeiten" vor.
 */
const EVENT = 'ado-intro-call';
let pending = false;

/** Vom Brief beim Erscheinen abgefragt (einmalig). */
export function takeIntroCall() {
  const p = pending;
  pending = false;
  return p;
}

export function onIntroCall(fn: () => void) {
  window.addEventListener(EVENT, fn);
  return () => window.removeEventListener(EVENT, fn);
}

export function IntroCall({ contact, here = false }: { contact: string; here?: boolean }) {
  const { t, go } = useView();
  const open = () => {
    if (here) {
      window.dispatchEvent(new Event(EVENT));
      document.querySelector('.desk')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      pending = true;
      go(contact);
    }
  };
  return (
    <button type="button" className="e-link intro-call" onClick={open}>
      <CalendarClock /> {t.ui.intro.cta}
    </button>
  );
}
