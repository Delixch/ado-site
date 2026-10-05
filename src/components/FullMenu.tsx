import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import { MENU_SECTIONS } from '../content/menu';
import type { Texts } from '../content/ui';

/**
 * Vollbild-Menue (config.ts MENU_STYLE = 'full'): grosse Zeilen mit Nummer und Pfeil,
 * Haarlinien dazwischen, je Bereich (Design, Firma, InstaOto) eine kleine Ueberschrift.
 * Farben nur ueber Themenvariablen, Masse aus tokens.css.
 */
export function FullMenu({ open, onClose, active, onSelect, t }: { open: boolean; onClose: () => void; active: string; onSelect: (id: string) => void; t: Texts }) {
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    window.addEventListener('keydown', key);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener('keydown', key);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          className="fm"
          aria-label={t.ui.openMenu}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="fm-head">
            <span className="fm-brand">
              EKADO
              <span className="tb-caret" aria-hidden>
                █
              </span>
            </span>
            <button type="button" className="fm-close" onClick={onClose} aria-label={t.ui.closeMenu}>
              {t.ui.close} <X aria-hidden />
            </button>
          </div>

          {MENU_SECTIONS.map((sec, si) => (
            <section key={sec.group} className="fm-group" data-group={sec.group}>
              <p className="fm-kicker micro">{t.ui.groups[sec.group].title}</p>
              <ul className="fm-list">
                {sec.items.map((it, i) => (
                  <motion.li
                    key={it.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + (si * 4 + i) * 0.03, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button
                      type="button"
                      className="fm-row"
                      aria-current={it.id === active ? 'page' : undefined}
                      onClick={() => {
                        onSelect(it.id);
                        onClose();
                      }}
                    >
                      <span className="fm-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="fm-label">{t.menu[it.id]}</span>
                      <ArrowRight className="fm-arrow" aria-hidden />
                    </button>
                  </motion.li>
                ))}
              </ul>
            </section>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
