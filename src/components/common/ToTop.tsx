import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/** Handy: runder Knopf unten rechts, erscheint nach gut einer Bildschirmhoehe und fuehrt nach oben. */
export function ToTop({ label }: { label: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const check = () => setShow(window.scrollY > window.innerHeight);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  return (
    <button type="button" className="to-top" data-show={show} tabIndex={show ? 0 : -1} aria-label={label} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <ArrowUp />
    </button>
  );
}
