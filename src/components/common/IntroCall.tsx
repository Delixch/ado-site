import { CalendarClock } from 'lucide-react';
import type { ReactNode } from 'react';
import { usePage, useView } from '../ViewFrame';
import { requestHowTab } from '../views/insta/howTab';

/**
 * "Kostenloses Erstgespraech": kein Kalenderdienst, sondern der Brief der Seite.
 * Der Knopf merkt sich den Wunsch, wechselt zur Kontaktseite (oder bleibt dort)
 * und der Brief fuellt Betreff und Zeile "Passende Zeiten" vor.
 * `topic` ersetzt den Betreff, z. B. "Paket Komplett".
 */
const EVENT = 'ado-intro-call';
type Wish = { topic?: string };
type Call = Wish & { page: string };
let pending: Wish | null = null;

/** Vom Brief beim Erscheinen abgefragt (einmalig). */
export function takeIntroCall(): Wish | null {
  const p = pending;
  pending = null;
  return p;
}

/** Nur Briefe auf `page` reagieren (auf dem Handy stehen alle Seiten untereinander). */
export function onIntroCall(page: string, fn: (w: Wish) => void) {
  const h = (e: Event) => {
    const call = (e as CustomEvent<Call>).detail;
    if (call.page !== page) return;
    pending = null;
    fn(call);
  };
  window.addEventListener(EVENT, h);
  return () => window.removeEventListener(EVENT, h);
}

export function IntroCall({
  contact,
  tab,
  here = false,
  topic,
  children,
  className = 'e-link intro-call',
}: {
  contact: string;
  /** Reiter auf der Zielseite (InstaOto: 3 = Preise & Anfrage). */
  tab?: number;
  here?: boolean;
  topic?: string;
  children?: ReactNode;
  className?: string;
}) {
  const { t, go } = useView();
  const page = usePage();
  const open = () => {
    const wish: Wish = { topic };
    const target = here ? page : contact;
    // Brief noch nicht da: beim Erscheinen abholen; schon da (Handy, alles untereinander): Ereignis
    pending = wish;
    if (tab !== undefined) requestHowTab(tab, contact);
    window.dispatchEvent(new CustomEvent<Call>(EVENT, { detail: { ...wish, page: target } }));
    if (here) (document.getElementById(`page-${page}`) ?? document).querySelector('.desk')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    else go(contact);
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
