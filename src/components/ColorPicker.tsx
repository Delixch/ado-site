import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { COLORS } from '../colors';
import type { Lang } from '../content/ui';

interface Props {
  value: string;
  onChange: (id: string) => void;
  lang: Lang;
  label: string;
}

/** Renk listesi src/styles/colors/ klasöründen otomatik gelir. Her örnek kendi data-color'ını taşır. */
export function ColorPicker({ value, onChange, lang, label }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = COLORS.find((c) => c.id === value) ?? COLORS[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="cp" ref={ref}>
      <button type="button" className="tb-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="listbox" title={label}>
        <span className="swatch" data-color={current.id} />
        <span className="tb-hide-sm">{current.name[lang]}</span>
        <ChevronDown className="cp-chevron" data-open={open} />
      </button>
      {open && (
        <div className="cp-panel" role="listbox" aria-label={label}>
          <div className="cp-title">{label}</div>
          {COLORS.map((c) => (
            <button
              type="button"
              key={c.id}
              role="option"
              aria-selected={c.id === value}
              className="cp-option"
              onClick={() => {
                onChange(c.id);
                setOpen(false);
              }}
            >
              <span className="swatch" data-color={c.id} />
              <span>{c.name[lang]}</span>
              {c.id === value && <Check className="cp-check" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
