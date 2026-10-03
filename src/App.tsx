import { useEffect, useMemo, useState, type ComponentType } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react';
import { SleekSidebar } from './components/SleekSidebar';
import { Topbar } from './components/Topbar';
import { ViewContext } from './components/ViewFrame';
import { DesignStart } from './components/views/design/DesignStart';
import { DesignAbout } from './components/views/design/DesignAbout';
import { DesignWork } from './components/views/design/DesignWork';
import { DesignSkills } from './components/views/design/DesignSkills';
import { DesignRepos } from './components/views/design/DesignRepos';
import { DesignConstruction } from './components/views/design/DesignConstruction';
import { DesignExperience } from './components/views/design/DesignExperience';
import { DesignContact } from './components/views/design/DesignContact';
import { FirmaStart } from './components/views/firma/FirmaStart';
import { FirmaOrders } from './components/views/firma/FirmaOrders';
import { FirmaPlanning } from './components/views/firma/FirmaPlanning';
import { FirmaAccounting } from './components/views/firma/FirmaAccounting';
import { FirmaReports } from './components/views/firma/FirmaReports';
import { FirmaHomepage } from './components/views/firma/FirmaHomepage';
import { FirmaPersonnel } from './components/views/firma/FirmaPersonnel';
import { FirmaContact } from './components/views/firma/FirmaContact';
import { InstaStart } from './components/views/insta/InstaStart';
import { InstaFlow } from './components/views/insta/InstaFlow';
import { InstaFeatures } from './components/views/insta/InstaFeatures';
import { InstaProcess } from './components/views/insta/InstaProcess';
import { InstaSecurity } from './components/views/insta/InstaSecurity';
import { InstaPricing } from './components/views/insta/InstaPricing';
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
  'f-orders': FirmaOrders,
  'f-planning': FirmaPlanning,
  'f-accounting': FirmaAccounting,
  'f-reports': FirmaReports,
  'f-homepage': FirmaHomepage,
  'f-personnel': FirmaPersonnel,
  'f-contact': FirmaContact,
  'i-start': InstaStart,
  'i-flow': InstaFlow,
  'i-features': InstaFeatures,
  'i-process': InstaProcess,
  'i-security': InstaSecurity,
  'i-pricing': InstaPricing,
};
const ids = ALL_ITEMS.map((i) => i.id);

export default function App() {
  const mode = useMode();
  const reduced = useReducedMotion();
  const [lang, setLang] = useStored<Lang>('ado_lang', DEFAULT_LANG, (v) => v === 'de' || v === 'tr');
  const [color, setColor] = useStored<string>('ado_color2', isColor(DEFAULT_COLOR) ? DEFAULT_COLOR : COLORS[0].id, isColor);
  const [active, setActive] = useStored<string>('ado_view2', 'd-start', (v) => !!v && ids.includes(v));
  const [autoPref, setAutoPref] = useStored<'on' | 'off'>('ado_auto', 'on', (v) => v === 'on' || v === 'off');
  const [desktopExpanded, setDesktopExpanded] = useState(true);
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

  const go = (id: string) => {
    setActive(id);
    if (mode !== 'desktop') setOverlayOpen(false);
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  const ctx = { t, color, auto: auto && mode !== 'mobile', nonce, go };


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
              openByDefault={mode === 'mobile' ? [] : ['design']}
              footer={mode === 'mobile' ? <BandPicker inline band={band} fx={bandFx} setBand={setBand} setFx={setBandFx} /> : undefined}
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

          <main className="main" data-band={band}>
            <span className="band" aria-hidden>
              <i />
            </span>
            {bandFx !== '0' && <BandFx key={`${band}-${bandFx}`} fx={bandFx} shape={band} />}
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

            <AnimatePresence mode="wait" initial={false}>
              <motion.section
                key={`${item.id}-${lang}`}
                className="page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <View />
              </motion.section>
            </AnimatePresence>

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
          {mode !== 'mobile' && (
            <BandPicker band={band} fx={bandFx} setBand={setBand} setFx={setBandFx} dock={mode === 'desktop' && desktopExpanded} />
          )}
          <LegalDialog doc={legal} lang={lang} onOpen={setLegal} onClose={() => setLegal(null)} />
        </div>
      </ViewContext.Provider>
    </MotionConfig>
  );
}
