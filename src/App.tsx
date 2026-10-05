import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState, type ComponentType } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react';
import { SleekSidebar } from './components/SleekSidebar';
import { Topbar } from './components/Topbar';
import { FullMenu } from './components/FullMenu';
import { PageContext, ViewContext } from './components/ViewFrame';
import { MastRobot } from './components/robot/MastRobot';
import { ToTop } from './components/common/ToTop';
import { ALL_ITEMS } from './content/menu';
import { texts, type Lang } from './content/ui';
import { COLORS, isColor } from './colors';
import { BAND_FX, BAND_SHAPE, CONTACT_MAIL, DEFAULT_COLOR, DEFAULT_LANG, MENU_STYLE } from './config';
import { BandFx } from './components/fx/BandFx';
import { BandPicker } from './components/BandPicker';
import type { LegalDoc } from './components/LegalDialog';
import { useMode } from './hooks/useMode';
import { useStored } from './hooks/useStored';

// Jede Seite ist ein eigener Chunk: das Handy laedt zuerst nur den offenen Bereich, den Rest im Leerlauf
type Loader = () => Promise<{ default: ComponentType }>;
const LOADERS: Record<string, Loader> = {
  'd-start': () => import('./components/views/design/DesignStart').then((m) => ({ default: m.DesignStart })),
  'd-about': () => import('./components/views/design/DesignAbout').then((m) => ({ default: m.DesignAbout })),
  'd-work': () => import('./components/views/design/DesignWork').then((m) => ({ default: m.DesignWork })),
  'd-skills': () => import('./components/views/design/DesignSkills').then((m) => ({ default: m.DesignSkills })),
  'd-repos': () => import('./components/views/design/DesignRepos').then((m) => ({ default: m.DesignRepos })),
  'd-construction': () => import('./components/views/design/DesignConstruction').then((m) => ({ default: m.DesignConstruction })),
  'd-experience': () => import('./components/views/design/DesignExperience').then((m) => ({ default: m.DesignExperience })),
  'd-contact': () => import('./components/views/design/DesignContact').then((m) => ({ default: m.DesignContact })),
  'f-start': () => import('./components/views/firma/FirmaStart').then((m) => ({ default: m.FirmaStart })),
  'f-flow': () => import('./components/views/firma/FirmaHow').then((m) => ({ default: m.FirmaHow })),
  'f-contact': () => import('./components/views/firma/FirmaContact').then((m) => ({ default: m.FirmaContact })),
  'i-start': () => import('./components/views/insta/InstaStart').then((m) => ({ default: m.InstaStart })),
  'i-flow': () => import('./components/views/insta/InstaHow').then((m) => ({ default: m.InstaHow })),
};
/** Impressum/Datenschutz: eigener Chunk, erst beim ersten Oeffnen geladen. */
const LegalDialog = lazy(() => import('./components/LegalDialog').then((m) => ({ default: m.LegalDialog })));

const VIEWS: Record<string, ComponentType> = Object.fromEntries(Object.entries(LOADERS).map(([id, load]) => [id, lazy(load)]));
const preload = (id: string) => void LOADERS[id]?.().catch(() => {});

/** Platzhalter, solange eine Seite laedt - haelt die Fusszeile unten. */
const PageWait = () => <div className="page-wait" aria-busy="true" />;

/** Meldet, wenn alle Seiten eines Bereichs da sind (Suspense zeigt sie gemeinsam). */
function Ready({ onReady }: { onReady: () => void }) {
  useEffect(onReady, []);
  return null;
}

const ids = ALL_ITEMS.map((i) => i.id);

// InstaOto: Funktionen und Ablauf stehen jetzt auf "So funktioniert's" - alte Merkzeichen umlenken
try {
  const v = localStorage.getItem('ado_view2');
  if (v === 'i-features' || v === 'i-process') localStorage.setItem('ado_view2', 'i-flow');
  if (v === 'i-security') localStorage.setItem('ado_view2', 'i-start');
  if (v === 'i-pricing') localStorage.setItem('ado_view2', 'i-flow');
  // EKADO Firma: Beispielseiten aus dem Menue, nur noch "Ablaeufe" (Beispiele kommen spaeter als Beta)
  if (v && /^f-(orders|planning|accounting|reports|homepage|personnel)$/.test(v)) localStorage.setItem('ado_view2', 'f-flow');
} catch {
  /* Speicher gesperrt - egal */
}

// Den Bereich der Startseite sofort holen (parallel zum Aufbau), alle anderen Seiten im Leerlauf
{
  const ids0 = ALL_ITEMS.map((i) => i.id);
  let first = window.location.hash.replace(/^#/, '');
  if (!ids0.includes(first)) {
    try {
      first = localStorage.getItem('ado_view2') ?? '';
    } catch {
      first = '';
    }
  }
  const group = (ALL_ITEMS.find((i) => i.id === first) ?? ALL_ITEMS[0]).group;
  ALL_ITEMS.filter((i) => i.group === group).forEach((i) => preload(i.id));
  const rest = () => ids0.forEach(preload);
  const later = () => window.setTimeout(() => ('requestIdleCallback' in window ? window.requestIdleCallback(rest, { timeout: 4000 }) : rest()), 2500);
  if (document.readyState === 'complete') later();
  else window.addEventListener('load', later, { once: true });
}

export default function App() {
  const mode = useMode();
  const reduced = useReducedMotion();
  const [lang, setLang] = useStored<Lang>('ado_lang', DEFAULT_LANG, (v) => v === 'de' || v === 'tr');
  const [color, setColor] = useStored<string>('ado_color2', isColor(DEFAULT_COLOR) ? DEFAULT_COLOR : COLORS[0].id, isColor);
  const getInitialActive = (): string => {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && ids.includes(hash)) return hash;
    try {
      const v = localStorage.getItem('ado_view2');
      if (v && ids.includes(v)) return v;
    } catch {}
    return 'd-start';
  };

  const [active, setActive] = useStored<string>('ado_view2', getInitialActive(), (v) => !!v && ids.includes(v));
  // Karten wechseln ihr Layout nicht von selbst: jeder Besuch startet angehalten (Play in der Kopfzeile startet)
  const [autoPref, setAutoPref] = useState<'on' | 'off'>('off');
  const [desktopExpanded, setDesktopExpanded] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [legal, setLegal] = useState<LegalDoc | null>(null);
  const [legalUsed, setLegalUsed] = useState(false);
  useEffect(() => {
    if (legal) setLegalUsed(true);
  }, [legal]);
  // Lichtband: Adresse ?band= / ?fx= > gemerkte Wahl > config.ts
  const query = new URLSearchParams(window.location.search);
  const [band, setBand] = useStored<string>('ado_band', query.get('band') ?? BAND_SHAPE, (v) => !!v && /^([1-9]|1[0-2])$/.test(v));
  const [bandFx, setBandFx] = useStored<string>('ado_fx', query.get('fx') ?? BAND_FX, (v) => !!v && /^(1[01]|[0-9])$/.test(v));

  const t = useMemo(() => texts(lang), [lang]);
  const item = ALL_ITEMS.find((i) => i.id === active) ?? ALL_ITEMS[0];
  const View = VIEWS[item.id];
  const auto = autoPref === 'on' && !reduced;

  useEffect(() => {
    document.documentElement.dataset.color = color;
    document.documentElement.lang = lang;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', color === 'claude' ? '#EEDED4' : '#000000');
    }
  }, [color, lang]);

  useEffect(() => setOverlayOpen(false), [mode]);

  // Lichtband (spread.css): Abstand Kopfzeile <-> .main oben, damit das schraege Band auf der Kopfzeile genau anschliesst.
  useEffect(() => {
    const main = document.querySelector<HTMLElement>('.main');
    const tb = main?.querySelector<HTMLElement>('.tb');
    if (!main || !tb) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      main.style.setProperty('--tb-y', `${tb.getBoundingClientRect().top - main.getBoundingClientRect().top}px`);
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
  }, []);

  useEffect(() => {
    if (!overlayOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOverlayOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [overlayOpen]);

  const isExpanded = mode === 'desktop' ? desktopExpanded : mode === 'tablet' ? overlayOpen : true;
  const [fullMenu, setFullMenu] = useState(false);
  const closeFullMenu = useCallback(() => setFullMenu(false), []);
  const setPanel = mode === 'desktop' ? setDesktopExpanded : setOverlayOpen;
  // Vollbild-Menue: Aufklappen oeffnet es statt des Seitenmenues (config.ts MENU_STYLE)
  const setIsExpanded = (v: boolean) => (MENU_STYLE === 'full' && v ? setFullMenu(true) : setPanel(v));

  // Handy: die Seiten eines Bereichs (Design, Firma, InstaOto) stehen untereinander -
  // Menue springt zur Seite, Scrollen fuehrt weiter zur naechsten Seite desselben Bereichs
  const stacked = mode === 'mobile';
  const spy = useRef(true);
  const [jumpTo, setJumpTo] = useState<string | null>(active);
  // zaehlt hoch, sobald die (nachgeladenen) Seiten eines Bereichs im DOM stehen
  const [ready, setReady] = useState(0);

  // Tarayıcı Geri/İleri (History) ve URL Hash senkronizasyonu
  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && ids.includes(hash) && hash !== active) {
        setActive(hash);
        if (stacked) setJumpTo(hash);
      }
    };
    window.addEventListener('hashchange', syncHash);
    window.addEventListener('popstate', syncHash);
    return () => {
      window.removeEventListener('hashchange', syncHash);
      window.removeEventListener('popstate', syncHash);
    };
  }, [active, stacked]);

  useEffect(() => {
    if (window.location.hash !== `#${active}`) {
      window.history.replaceState(null, '', `#${active}`);
    }
  }, [active]);

  const go = (id: string) => {
    setActive(id);
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, '', `#${id}`);
    }
    if (mode !== 'desktop') setOverlayOpen(false);
    if (stacked) setJumpTo(id);
    else window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  // Sprung erst nach dem Aufbau (auch beim Laden und beim Bereichswechsel); solange meldet der Beobachter nichts
  useEffect(() => {
    if (!stacked || !jumpTo) return;
    history.scrollRestoration = 'manual';
    spy.current = false;
    const t1 = window.setTimeout(() => {
      const target = document.getElementById(`page-${jumpTo}`);
      if (!target) return; // Seite laedt noch - neuer Versuch, wenn 'ready' hochzaehlt
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
      window.setTimeout(() => (spy.current = true), 300);
      setJumpTo(null);
    }, 60);
    return () => window.clearTimeout(t1);
  }, [stacked, jumpTo, item.group, lang, ready]);

  // Beim Scrollen gilt die Seite unter dem Kopf als aktiv
  useEffect(() => {
    if (!stacked) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!spy.current) return;
        const hit = entries.find((e) => e.isIntersecting);
        const id = (hit?.target as HTMLElement | undefined)?.dataset.page;
        if (id) setActive(id);
      },
      { rootMargin: '-30% 0px -69% 0px' },
    );
    document.querySelectorAll('[data-page]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [stacked, lang, item.group, ready]);

  const ctx = { t, color, auto: auto && mode !== 'mobile', nonce, go, stacked };


  return (
    <MotionConfig reducedMotion="user">
      <ViewContext.Provider value={ctx}>
        <div className="app" data-mode={mode} data-group={item.group}>
          <span className="grain" aria-hidden />
          {MENU_STYLE === 'full' && <FullMenu open={fullMenu} onClose={closeFullMenu} active={item.id} onSelect={go} t={t} lang={lang} setLang={setLang} />}
          <div className="sb-slot" data-open={mode === 'mobile' ? overlayOpen : undefined}>
            <SleekSidebar
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              activeTab={item.id}
              onSelect={(i) => go(i.id)}
              t={t}
              expandedWidth={mode === 'mobile' ? Math.min(300, window.innerWidth - 24) : 275}
              collapsible
              openByDefault={[]}
              footer={mode === 'tablet' ? <BandPicker inline band={band} fx={bandFx} setBand={setBand} setFx={setBandFx} /> : undefined}
            />
            {mode === 'desktop' && !desktopExpanded && <BandPicker strip band={band} fx={bandFx} setBand={setBand} setFx={setBandFx} />}
          </div>

          {mode !== 'desktop' && (
            <button
              type="button"
              className="backdrop"
              data-show={overlayOpen}
              tabIndex={overlayOpen ? 0 : -1}
              aria-label={t.ui.closeMenu}
              onClick={() => setOverlayOpen(false)}
            />
          )}

          {/* Handy: kein Lichtband (Kundenwunsch 2026-10-04) */}
          <main className="main" data-band={mode === 'mobile' ? undefined : band}>
            {mode !== 'mobile' && (
              <span className="band" aria-hidden>
                <i />
              </span>
            )}
            {mode !== 'mobile' && bandFx !== '0' && <BandFx key={`${band}-${bandFx}`} fx={bandFx} shape={band} />}
            <Topbar
              t={t}
              lang={lang}
              setLang={setLang}
              color={color}
              setColor={setColor}
              title={t.menu[item.id]}
              group={item.group}
              auto={auto}
              setAuto={(v) => setAutoPref(v ? 'on' : 'off')}
              onShuffle={() => setNonce((n) => n + 1)}
              onHome={() => go('d-start')}
              onMenu={mode === 'mobile' ? () => (MENU_STYLE === 'full' ? setFullMenu(true) : setOverlayOpen(true)) : undefined}
            />

            {stacked ? (
              <>
                <Suspense fallback={<PageWait />}>
                  {ALL_ITEMS.filter((i) => i.group === item.group).map(({ id }) => {
                    const Page = VIEWS[id];
                    return (
                      <section key={`${id}-${lang}`} id={`page-${id}`} data-page={id} className="page page-stacked">
                        <PageContext.Provider value={id}>
                          <Page />
                        </PageContext.Provider>
                      </section>
                    );
                  })}
                  <Ready key={`${item.group}-${lang}`} onReady={() => setReady((n) => n + 1)} />
                </Suspense>
                <MastRobot />
              </>
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                <motion.section
                  key={`${item.id}-${lang}`}
                  className="page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <PageContext.Provider value={item.id}>
                    <Suspense fallback={<PageWait />}>
                      <View />
                    </Suspense>
                  </PageContext.Provider>
                </motion.section>
              </AnimatePresence>
            )}

            <footer className="foot">
              <span>© {new Date().getFullYear()} EKADO Design · EKADO Firma</span>
              <span>{lang === 'tr' ? 'Zürih · İsviçre' : 'Zürich · Schweiz'}</span>
              <span className="foot-legal">
                <button type="button" onClick={() => setLegal('impressum')}>
                  {t.ui.impressum}
                </button>
                <button type="button" onClick={() => setLegal('privacy')}>
                  {t.ui.privacy}
                </button>
              </span>
              <a href={`mailto:${CONTACT_MAIL}`}>{CONTACT_MAIL}</a>
            </footer>
          </main>
          {mode === 'mobile' && <ToTop label={t.ui.toTop} />}
          {mode === 'desktop' && desktopExpanded && <BandPicker band={band} fx={bandFx} setBand={setBand} setFx={setBandFx} dock />}
          {legalUsed && (
            <Suspense fallback={null}>
              <LegalDialog doc={legal} lang={lang} onOpen={setLegal} onClose={() => setLegal(null)} />
            </Suspense>
          )}
        </div>
      </ViewContext.Provider>
    </MotionConfig>
  );
}
