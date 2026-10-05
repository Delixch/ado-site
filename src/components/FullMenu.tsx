import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Plus, X } from 'lucide-react';
import { MENU_SECTIONS } from '../content/menu';
import type { Lang, Texts } from '../content/ui';
import { CONTACT_MAIL } from '../config';

const LANGS: Lang[] = ['de', 'tr'];

/**
 * Menue-Tafel ueber die linke Bildschirmhaelfte (config.ts MENU_STYLE = 'full'), rechts abgedunkelt.
 * Die drei Bereiche (Design, Firma, InstaOto)
 * als grosse Zeilen, anfangs alle zu. Ein Klick klappt die Seiten des Bereichs darunter auf
 * (immer nur einer offen). Wer schon eine Seite gewaehlt hat, findet beim naechsten Oeffnen
 * deren Bereich offen und die Seite im Blick. Farben nur ueber Themenvariablen, Masse aus tokens.css.
 */
export function FullMenu({
  open,
  onClose,
  active,
  onSelect,
  t,
  lang,
  setLang,
}: {
  open: boolean;
  onClose: () => void;
  active: string;
  onSelect: (id: string) => void;
  t: Texts;
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  // Einmal ueber das Menue gewaehlt? Dann beim Oeffnen dort weitermachen
  const chosen = useRef(false);
  const panel = useRef<HTMLElement>(null);
  const activeGroup = MENU_SECTIONS.find((sec) => sec.items.some((it) => it.id === active))?.group ?? null;

  useEffect(() => {
    if (!open) return;
    setOpenGroup(chosen.current ? activeGroup : null);
    const scroll = window.setTimeout(() => {
      panel.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'center' });
    }, 450);
    const key = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    window.addEventListener('keydown', key);
    return () => {
      window.clearTimeout(scroll);
      html.style.overflow = prev;
      window.removeEventListener('keydown', key);
    };
    // nur beim Oeffnen, nicht bei jedem Seitenwechsel
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.button
          key="veil"
          type="button"
          className="fm-veil"
          aria-label={t.ui.closeMenu}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {open && (
        <motion.nav
          key="menu"
          ref={panel}
          className="fm"
          aria-label={t.ui.openMenu}
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="fm-head">
            <span className="fm-brand">
              Ekado WorkSuite
              <span className="tb-caret" aria-hidden>
                █
              </span>
            </span>
            <button type="button" className="fm-close" onClick={onClose} aria-label={t.ui.closeMenu}>
              {t.ui.close} <X aria-hidden />
            </button>
          </div>

          <ul className="fm-list">
            {MENU_SECTIONS.map((sec, si) => {
              const isOpen = openGroup === sec.group;
              const [name, sub] = t.ui.groups[sec.group].title.split(' · ');
              const here = sec.items.some((it) => it.id === active);
              return (
                <motion.li
                  key={sec.group}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + si * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    type="button"
                    className="fm-row fm-group-row"
                    aria-expanded={isOpen}
                    data-here={here || undefined}
                    onClick={() => setOpenGroup(isOpen ? null : sec.group)}
                  >
                    <span className="fm-num">{String(si + 1).padStart(2, '0')}</span>
                    <span className="fm-label">
                      {name}
                      {sub && <span className="fm-sub micro">{sub} · {sec.items.length}</span>}
                    </span>
                    <Plus className="fm-arrow fm-plus" aria-hidden />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.ul
                        className="fm-pages"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {sec.items.map((it, i) => (
                          <li key={it.id}>
                            <button
                              type="button"
                              className="fm-row fm-page-row"
                              aria-current={it.id === active ? 'page' : undefined}
                              onClick={() => {
                                chosen.current = true;
                                onSelect(it.id);
                                onClose();
                              }}
                            >
                              <span className="fm-num">{String(i + 1).padStart(2, '0')}</span>
                              <span className="fm-label">{t.menu[it.id]}</span>
                              <ArrowRight className="fm-arrow" aria-hidden />
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>

          {/* Fusszeile der Tafel: Kontakt, Sprache, Ort - in der Themenfarbe */}
          <div className="fm-foot">
            <a className="fm-foot-link" href={`mailto:${CONTACT_MAIL}`}>
              {CONTACT_MAIL}
            </a>
            <div className="fm-langs" role="group" aria-label="Sprache / Dil">
              {LANGS.map((l) => (
                <button type="button" key={l} lang={l} aria-pressed={lang === l} onClick={() => setLang(l)}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <span className="fm-foot-where">{t.ui.where}</span>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
