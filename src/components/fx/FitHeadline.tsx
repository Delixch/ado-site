import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Schlagzeile aus drei Teilen (weiss · Akzent · weiss), alle in derselben Schrift - der Akzent nur in Themenfarbe.
 * Passt sie in eine Zeile, steht sie in einer Zeile; sonst zwei Zeilen, beide gleich
 * linksbuendig, und der Block als Ganzes mittig. CSS allein kann einen umbrechenden
 * Block nicht auf seine Breite schrumpfen - deshalb wird gemessen.
 */
export function FitHeadline({ className, parts }: { className: string; parts: [ReactNode, ReactNode, ReactNode] }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [one, setOne] = useState(true);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const kids = [...el.children] as HTMLElement[];
      // erst alle umstellen, dann alle messen: ein Layout statt eines pro Teil
      const prev = kids.map((k) => k.style.whiteSpace);
      kids.forEach((k) => (k.style.whiteSpace = 'nowrap'));
      const widths = kids.map((k) => {
        const r = document.createRange();
        r.selectNodeContents(k);
        return r.getBoundingClientRect().width;
      });
      kids.forEach((k, i) => (k.style.whiteSpace = prev[i]));
      const cs = getComputedStyle(el);
      const gap = parseFloat(cs.columnGap) || 0;
      const room = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      setOne(widths.reduce((a, b) => a + b, 0) + gap * (kids.length - 1) <= room);
    };
    measure();
    // nur bei neuer Breite neu messen (jede Messung erzwingt ein Layout der ganzen Seite);
    // der erste Aufruf direkt nach observe() und der Wechsel ein-/zweizeilig aendern die Breite nicht
    let lastW = el.clientWidth;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      if (w === lastW) return;
      lastW = w;
      measure();
    });
    ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [parts[0], parts[1], parts[2]]);

  return (
    <h2 ref={ref} className={className} data-one={one}>
      <span className="fit-line">
        <span className="poster">{parts[0]}</span>
        <span className="poster fit-accent">{parts[1]}</span>
      </span>
      <span className="poster">{parts[2]}</span>
    </h2>
  );
}
