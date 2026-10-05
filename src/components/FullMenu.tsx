import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Plus, Search, X } from 'lucide-react';
import { ALL_ITEMS, MENU_SECTIONS } from '../content/menu';
import { buildIndex, searchSite } from '../content/search';
import type { Lang, Texts } from '../content/ui';
import { CONTACT_MAIL, MENU_MEMORY_MS } from '../config';

const LANGS: Lang[] = ['de', 'tr'];

/**
 * Menue-Tafel ueber die linke Bildschirmhaelfte (config.ts MENU_STYLE = 'full'), rechts abgedunkelt.
 * Die drei Bereiche (Design, Firma, InstaOto)
 * als grosse Zeilen, anfangs alle zu. Ein Klick klappt die Seiten des Bereichs darunter auf
 * (immer nur einer offen). Wer eine Seite gewaehlt hat und innerhalb von MENU_MEMORY_MS wieder
 * oeffnet, findet deren Bereich offen und die Seite im Blick; spaeter sind wieder alle zu. Farben nur ueber Themenvariablen, Masse aus tokens.css.
 * Suche (wie im alten Seitenmenue): durchsucht alle Texte der Website (content/search.ts). Enter oeffnet
 * die Treffer als Tafel in der rechten Bildschirmhaelfte (Themenfarbe als Grund, Seite + Ausschnitt gross);
 * Esc oder X schliesst erst die Treffer, dann das Menue. Am Handy liegt die Treffertafel ueber dem Menue.
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
  const [query, setQuery] = useState('');
  // mit Enter abgeschickte Suche: solange gesetzt, steht die Treffertafel rechts
  const [shown, setShown] = useState<string | null>(null);
  const shownRef = useRef<string | null>(null);
  shownRef.current = shown;
  const index = useMemo(() => buildIndex(t), [t]);
  const hits = useMemo(() => (shown ? searchSite(index, shown) : []), [index, shown]);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) setShown(query);
  };
  const pick = (id: string) => {
    chosenAt.current = Date.now();
    onSelect(id);
    onClose();
  };
  // Zeitpunkt der letzten Wahl im Menue: kurz danach beim Oeffnen dort weitermachen
  const chosenAt = useRef(0);
  const panel = useRef<HTMLElement>(null);
  const activeGroup = MENU_SECTIONS.find((sec) => sec.items.some((it) => it.id === active))?.group ?? null;

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setShown(null);
    setOpenGroup(Date.now() - chosenAt.current < MENU_MEMORY_MS ? activeGroup : null);
    const scroll = window.setTimeout(() => {
      panel.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'center' });
    }, 450);
    const key = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (shownRef.current === null) onClose();
      else setShown(null);
    };
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

          {/* Suche: duenne Linie mit Lupe; Enter zeigt die Treffer rechts */}
          <form className="fm-search" onSubmit={submit} role="search">
            <Search aria-hidden />
            <input
              type="search"
              placeholder={t.ui.search}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value.trim() === '') setShown(null);
              }}
              aria-label={t.ui.search}
              enterKeyHint="search"
            />
          </form>

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
                                chosenAt.current = Date.now();
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
      {open && shown && (
        <motion.section
          key="results"
          className="fm-results"
          aria-label={t.ui.foundOnSite}
          initial={{ x: -48, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -48, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="fm-results-head">
            <div>
              <span className="fm-results-kicker micro">{t.ui.foundOnSite}</span>
              <h2 className="fm-results-q">„{shown.trim()}“</h2>
              <span className="fm-results-n micro">
                {hits.length === 0 ? t.ui.noResults : `${hits.length} · ${hits.reduce((n, h) => n + h.count, 0)}`}
              </span>
            </div>
            <button type="button" className="fm-results-close" onClick={() => setShown(null)} aria-label={t.ui.close}>
              <X aria-hidden />
            </button>
          </div>
          <ul className="fm-results-list">
            {hits.map((h, i) => {
              const item = ALL_ITEMS.find((it) => it.id === h.id)!;
              const [groupName] = t.ui.groups[item.group].title.split(' · ');
              return (
                <motion.li
                  key={h.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button type="button" className="fm-result" aria-current={h.id === active ? 'page' : undefined} onClick={() => pick(h.id)}>
                    <span className="fm-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="fm-result-body">
                      <span className="fm-result-title">{t.menu[h.id]}</span>
                      <span className="fm-result-meta micro">
                        {groupName} · {h.count}
                      </span>
                      <span className="fm-result-snippet">
                        {h.snippet[0]}
                        <mark>{h.snippet[1]}</mark>
                        {h.snippet[2]}
                      </span>
                    </span>
                    <ArrowRight className="fm-arrow" aria-hidden />
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
