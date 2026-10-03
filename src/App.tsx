import { useEffect, useMemo, useRef, useState, type ComponentType } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react';
import { SleekSidebar } from './components/SleekSidebar';
import { Topbar } from './components/Topbar';
import { PageContext, ViewContext } from './components/ViewFrame';
import { MastRobot } from './components/robot/MastRobot';
import { DesignStart } from './components/views/design/DesignStart';
import { DesignAbout } from './components/views/design/DesignAbout';
import { DesignWork } from './components/views/design/DesignWork';
import { DesignSkills } from './components/views/design/DesignSkills';
import { DesignRepos } from './components/views/design/DesignRepos';
import { DesignConstruction } from './components/views/design/DesignConstruction';
import { DesignExperience } from './components/views/design/DesignExperience';
import { DesignContact } from './components/views/design/DesignContact';
import { FirmaStart } from './components/views/firma/FirmaStart';
import { FirmaHow } from './components/views/firma/FirmaHow';
import { ToTop } from './components/common/ToTop';
import { FirmaContact } from './components/views/firma/FirmaContact';
import { InstaStart } from './components/views/insta/InstaStart';
import { InstaHow } from './components/views/insta/InstaHow';
import { ALL_ITEMS } from './content/menu';
import { texts, type Lang } from './content/ui';
import { COLORS, isColor } from './colors';
import { BAND_FX, BAND_SHAPE, CONTACT_MAIL, DEFAULT_COLOR, DEFAULT_LANG } from './config';
import { BandFx } from './components/fx/BandFx';
import { BandPicker } from './components/BandPicker';
import { LegalDialog, type LegalDoc } from './components/LegalDialog';
import { legalTexts } from './content/legal-texts';
import { useMode } from './hooks/useMode';
import { useStored } from './hooks/useStored';

const VIEWS: Record<string, ComponentType> = {
  'd-start': DesignStart,
  'd-about': DesignAbout,
  'd-work': DesignWork,
  'd-skills': DesignSkills,
  'd-repos': DesignRepos,
  'd-construction': DesignConstruction,
  'd-experience': DesignExperience,
  'd-contact': DesignContact,
  'f-start': FirmaStart,
  'f-flow': FirmaHow,
  'f-contact': FirmaContact,
  'i-start': InstaStart,
  'i-flow': InstaHow,
};
const ids = ALL_ITEMS.map((i) => i.id);

// InstaOto: Funktionen und Ablauf stehen jetzt auf "So funktioniert's" - alte Merkzeichen umlenken
try {
  const v = localStorage.getItem('ado_view2');
  if (v === 'i-features' || v === 'i-process') localStorage.setItem('ado_view2', 'i-flow');
  if (v === 'i-security') localStorage.setItem('ado_view2', 'i-start');
  if (v === 'i-pricing') localStorage.setItem('ado_view2', 'i-flow');
  // ADO Firma: Beispielseiten aus dem Menue, nur noch "Ablaeufe" (Beispiele kommen spaeter als Beta)
  if (v && /^f-(orders|planning|accounting|reports|homepage|personnel)$/.test(v)) localStorage.setItem('ado_view2', 'f-flow');
} catch {
  /* Speicher gesperrt - egal */
}

export default function App() {
  const mode = useMode();
  const reduced = useReducedMotion();
  const [lang, setLang] = useStored<Lang>('ado_lang', DEFAULT_LANG, (v) => v === 'de' || v === 'tr');
  const [color, setColor] = useStored<string>('ado_color2', isColor(DEFAULT_COLOR) ? DEFAULT_COLOR : COLORS[0].id, isColor);
  const [active, setActive] = useStored<string>('ado_view2', 'd-start', (v) => !!v && ids.includes(v));
  const [autoPref, setAutoPref] = useStored<'on' | 'off'>('ado_auto', 'on', (v) => v === 'on' || v === 'off');
  const [desktopExpanded, setDesktopExpanded] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [legal, setLegal] = useState<LegalDoc | null>(null);
  // Lichtband: Adresse ?band= / ?fx= > gemerkte Wahl > config.ts
  const query = new URLSearchParams(window.location.search);
  const [band, setBand] = useStored<string>('ado_band', query.get('band') ?? BAND_SHAPE, (v) => !!v && /^[1-4]$/.test(v));
  const [bandFx, setBandFx] = useStored<string>('ado_fx', query.get('fx') ?? BAND_FX, (v) => !!v && /^(1[01]|[0-9])$/.test(v));

  const t = useMemo(() => texts(lang), [lang]);
  const item = ALL_ITEMS.find((i) => i.id === active) ?? ALL_ITEMS[0];
  const View = VIEWS[item.id];
  const auto = autoPref === 'on' && !reduced;

  useEffect(() => {
    document.documentElement.dataset.color = color;
    document.documentElement.lang = lang;
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
  const setIsExpanded = mode === 'desktop' ? setDesktopExpanded : setOverlayOpen;

  // Handy: alle Seiten untereinander - Menue springt zur Seite, Scrollen fuehrt weiter zur naechsten
  const stacked = mode === 'mobile';
  const spy = useRef(true);

  const go = (id: string) => {
    setActive(id);
    if (mode !== 'desktop') setOverlayOpen(false);
    if (stacked) {
      // Spruenge ueber mehrere Seiten sofort, damit der Kopf nicht unterwegs andere Titel zeigt
      spy.current = false;
      requestAnimationFrame(() => {
        document.getElementById(`page-${id}`)?.scrollIntoView({ block: 'start', behavior: 'instant' });
        window.setTimeout(() => (spy.current = true), 120);
      });
    } else window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  // Handy: beim Laden zur gemerkten Seite; beim Scrollen gilt die Seite unter dem Kopf als aktiv
  useEffect(() => {
    if (!stacked) return;
    // erst nach dem Aufbau springen; bis dahin meldet der Beobachter nichts (sonst gewinnt "Start")
    history.scrollRestoration = 'manual';
    spy.current = false;
    const jump = window.setTimeout(() => {
      document.getElementById(`page-${active}`)?.scrollIntoView({ block: 'start', behavior: 'instant' });
      window.setTimeout(() => (spy.current = true), 300);
    }, 150);
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
    return () => {
      window.clearTimeout(jump);
      io.disconnect();
    };
  }, [stacked, lang]);

  const ctx = { t, color, auto: auto && mode !== 'mobile', nonce, go, stacked };


  return (
    <MotionConfig reducedMotion="user">
      <ViewContext.Provider value={ctx}>
        <div className="app" data-mode={mode} data-group={item.group}>
          <span className="grain" aria-hidden />
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
              onMenu={mode === 'mobile' ? () => setOverlayOpen(true) : undefined}
            />

            {stacked ? (
              <>
                {ALL_ITEMS.map(({ id }) => {
                  const Page = VIEWS[id];
                  return (
                    <section key={`${id}-${lang}`} id={`page-${id}`} data-page={id} className="page page-stacked">
                      <PageContext.Provider value={id}>
                        <Page />
                      </PageContext.Provider>
                    </section>
                  );
                })}
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
                    <View />
                  </PageContext.Provider>
                </motion.section>
              </AnimatePresence>
            )}

            <footer className="foot">
              <span>© {new Date().getFullYear()} ADO Design · ADO Firma</span>
              <span>{lang === 'tr' ? 'Zürih · İsviçre' : 'Zürich · Schweiz'}</span>
              <span className="foot-legal">
                <button type="button" onClick={() => setLegal('impressum')}>
                  {legalTexts[lang].impressum}
                </button>
                <button type="button" onClick={() => setLegal('privacy')}>
                  {legalTexts[lang].privacy}
                </button>
              </span>
              <a href={`mailto:${CONTACT_MAIL}`}>{CONTACT_MAIL}</a>
            </footer>
          </main>
          {mode === 'mobile' && <ToTop label={t.ui.toTop} />}
          {mode === 'desktop' && (
            <BandPicker band={band} fx={bandFx} setBand={setBand} setFx={setBandFx} dock={mode === 'desktop' && desktopExpanded} />
          )}
          <LegalDialog doc={legal} lang={lang} onOpen={setLegal} onClose={() => setLegal(null)} />
        </div>
      </ViewContext.Provider>
    </MotionConfig>
  );
}
