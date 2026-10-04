import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { onSheetOpen } from './sheet';

export interface SheetNav {
  current: number;
  total: number;
  title: string;
  subtitle?: string;
  onPrev: () => void;
  onNext: () => void;
  onJump?: (index: number) => void;
  canPrev?: boolean;
  canNext?: boolean;
}

/**
 * Panel, das von unten hereinfaehrt (Handy). Oeffnet sich auf openSheet(), schliesst ueber
 * Griff nach unten, Tippen daneben, X oder Esc.
 * Unterstuetzt Wischen (Swipe nach links/rechts) und Vor/Zurueck-Knoepfe zum Durchblaettern.
 */
export function BottomSheet({
  view,
  label,
  scope,
  nav,
  children,
}: {
  view: string;
  label: string;
  scope: RefObject<HTMLElement | null>;
  nav?: SheetNav;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null);

  useEffect(() => onSheetOpen(view, () => scope.current, () => setOpen(true)), [view, scope]);
  useEffect(() => setOpen(false), [view]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (nav && e.key === 'ArrowRight') nav.onNext();
      if (nav && e.key === 'ArrowLeft') nav.onPrev();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, nav]);

  const close = () => setOpen(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!nav) return;
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY, time: Date.now() };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!nav || !touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    const dt = Date.now() - touchStart.current.time;
    touchStart.current = null;

    // Yatay parmak hareketi kontrolu: En az 40px ve dikey hareketten 1.25 kat belirgin
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.25 && dt < 800) {
      if (dx < 0) {
        nav.onNext();
      } else {
        nav.onPrev();
      }
    }
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="veil" className="sheet-veil" aria-hidden onClick={close} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div
            key="sheet"
            className="bsheet"
            role="dialog"
            aria-modal="true"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 90 || info.velocity.y > 500) close();
            }}
          >
            <div className="bsheet-head">
              <span className="bsheet-grip" aria-hidden />
              {nav ? (
                <div className="bsheet-title-wrap">
                  {nav.subtitle && <span className="bsheet-badge">{nav.subtitle}</span>}
                  <span className="bsheet-title">{nav.title}</span>
                </div>
              ) : (
                <div className="bsheet-title-wrap" />
              )}
              <div className="bsheet-actions">
                {nav && (
                  <>
                    <button
                      type="button"
                      className="bsheet-nav-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        nav.onPrev();
                      }}
                      disabled={nav.canPrev === false}
                      aria-label="Zurück / Önceki"
                      title="Önceki"
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      type="button"
                      className="bsheet-nav-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        nav.onNext();
                      }}
                      disabled={nav.canNext === false}
                      aria-label="Weiter / Sonraki"
                      title="Nächste"
                    >
                      <ChevronRight />
                    </button>
                  </>
                )}
                <button type="button" className="bsheet-x" onClick={close} aria-label={label}>
                  <X />
                </button>
              </div>
            </div>
            <div
              className="bsheet-body"
              onPointerDownCapture={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {children}
            </div>
            {nav && nav.total > 1 && (
              <div className="bsheet-dots" aria-label="Schrittauswahl">
                {Array.from({ length: nav.total }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`bsheet-dot ${i === nav.current ? 'is-active' : ''}`}
                    onClick={() => nav.onJump?.(i)}
                    aria-label={`Schritt ${i + 1}`}
                    title={`${i + 1} / ${nav.total}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
