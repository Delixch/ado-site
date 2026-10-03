import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Schlagzeile aus drei Teilen (weiss · Akzent · weiss).
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
      const widths = kids.map((k) => {
        const r = document.createRange();
        r.selectNodeContents(k);
        const prev = k.style.whiteSpace;
        k.style.whiteSpace = 'nowrap';
        const w = r.getBoundingClientRect().width;
        k.style.whiteSpace = prev;
        return w;
      });
      const cs = getComputedStyle(el);
      const gap = parseFloat(cs.columnGap) || 0;
      const room = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      setOne(widths.reduce((a, b) => a + b, 0) + gap * (kids.length - 1) <= room);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [parts[0], parts[1], parts[2]]);

  return (
    <h2 ref={ref} className={className} data-one={one}>
      <span className="fit-line">
        <span className="poster">{parts[0]}</span>
        <span className="whisper">{parts[1]}</span>
      </span>
      <span className="poster">{parts[2]}</span>
    </h2>
  );
}
