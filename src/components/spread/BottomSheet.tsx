import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { onSheetOpen } from './sheet';

/**
 * Panel, das von unten hereinfaehrt (Handy). Oeffnet sich auf openSheet(), schliesst ueber
 * Griff nach unten, Tippen daneben, X oder Esc. Haelt den Offen-Zustand selbst, damit die
 * ganze Doppelseite beim Oeffnen nicht neu gemessen werden muss.
 */
export function BottomSheet({ view, label, children }: { view: string; label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => onSheetOpen(() => setOpen(true)), []);
  useEffect(() => setOpen(false), [view]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => setOpen(false);

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
            <div className="bsheet-grip" aria-hidden>
              <span />
            </div>
            <button type="button" className="bsheet-x" onClick={close} aria-label={label}>
              <X />
            </button>
            <div className="bsheet-body" onPointerDownCapture={(e) => e.stopPropagation()}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
