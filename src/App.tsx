import React, { useState, useEffect } from 'react';
import { SleekSidebar, MenuItemDef } from './components/SleekSidebar';
import { MobileGlassMenu } from './components/MobileGlassMenu';
import { IntegratedPageContent } from './components/IntegratedPageContent';
import { APP_PAGES, WebPageSection } from './types/layout';
import { Language, THEMES_LIST, TRANSLATIONS } from './i18n/translations';
import { 
  ChevronDown, 
  Check
} from 'lucide-react';

export default function App() {
  // Varsayılan Dil: Almanca (DE)
  const [lang, setLang] = useState<Language>('de');

  // Varsayılan Tema: 1. Tema (Obsidian Crimson & Ice)
  const [currentTheme, setCurrentTheme] = useState<string>('obsidian-crimson');

  // Sidebar Açık/Kapalı Durumu (İstenildiği sıklıkta açılıp kapatılabilir)
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Tema Dropdown Durumu
  const [themeDropdownOpen, setThemeDropdownOpen] = useState<boolean>(false);

  const t = TRANSLATIONS[lang];
  const activeThemeConfig = THEMES_LIST.find(t => t.id === currentTheme) || THEMES_LIST[0];

  const handleMenuItemClick = (item: MenuItemDef) => {
    setActiveTab(item.id);
  };

  const currentPage: WebPageSection = APP_PAGES[activeTab] || APP_PAGES.home;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  return (
    <div 
      data-theme={currentTheme}
      className="relative min-h-screen w-full overflow-x-hidden bg-[var(--theme-bg)] p-3 sm:p-5 select-none font-sans text-[var(--theme-text)] transition-colors duration-400"
    >
      {/* Canlı Metalik Arka Plan: Ateş Turuncusu, Siber Mavi ve Canlı Zümrüt Yeşili Işıkları */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-60 z-0">
        {/* Ateş Turuncusu Üst Parıltı (#ff5a1f) */}
        <div className="absolute -top-32 -left-32 w-[680px] h-[680px] rounded-full bg-[var(--theme-primary)]/15 blur-[120px] transform rotate-12" />
        
        {/* Siber Camgöbeği Mavi Sağ Parıltı (#00d4ff) */}
        <div className="absolute top-1/4 -right-40 w-[650px] h-[650px] rounded-full bg-[var(--theme-secondary)]/15 blur-[130px]" />
        
        {/* Canlı Zümrüt Yeşili Alt Parıltı (#00ff88) */}
        <div className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full bg-[var(--theme-accent-green)]/12 blur-[140px]" />
        
        {/* Metalik Mikro Çizgiler */}
        <svg
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <path
            d="M-100,450 C250,180 450,750 850,380 C1150,90 1350,550 1650,280 L1650,900 L-100,900 Z"
            fill="url(#metalGrad)"
          />
          <defs>
            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--theme-primary)" stopOpacity="0.30" />
              <stop offset="45%" stopColor="var(--theme-secondary)" stopOpacity="0.22" />
              <stop offset="85%" stopColor="var(--theme-accent-green)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--theme-bg)" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ANA DÜZEN: Sol Sidebar ve Sağ Alan Kusursuz Tek Üst Çizgide */}
      <div className="flex flex-col lg:flex-row items-start justify-start gap-4 w-full relative z-10">
        
        {/* 1. SOLDA SABİT AÇILIR/KAPANIR SLEEK GLASS SIDEBAR (Sağ üst barla tam sıfır piksel hizada) */}
        <div className="hidden lg:block shrink-0">
          <SleekSidebar
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onMenuItemClick={handleMenuItemClick}
            lang={lang}
          />
        </div>

        {/* 2. YAN TARAFTA ENTEGRE SAYFA ÇALIŞMA ALANI */}
        <main className="flex-1 min-w-0 w-full flex flex-col justify-start pb-24 lg:pb-4">
          
          <div className="w-full flex flex-col gap-4 transition-all duration-300">
            
            {/* Üst Bar: Sol sidebar üst kontrol çubuğu ile tam 46px ve birebir aynı hizada */}
            <div className="flex items-center justify-between text-xs text-[var(--theme-text)] bg-[var(--theme-surface)] backdrop-blur-2xl px-4 rounded-2xl border border-[var(--theme-border)] shadow-xl relative z-20 h-[46px]">
              
              {/* Sol: Aktif Başlık & Canlı Gösterge */}
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--theme-primary)] animate-pulse shadow-[0_0_8px_var(--theme-primary)]" />
                <span className="font-extrabold tracking-wide text-xs sm:text-sm">
                  {t.menuItems[activeTab as keyof typeof t.menuItems] || currentPage.title}
                </span>
                <span className="text-[10px] bg-[var(--theme-badge-bg)] text-[var(--theme-badge-text)] border border-[var(--theme-badge-border)] px-2 py-0.5 rounded-full font-mono font-bold hidden sm:inline">
                  NETMEDIA
                </span>
              </div>

              {/* Sağ: Tema Dropdown & Sade Dil Seçici (DE / TR) */}
              <div className="flex items-center gap-2.5">
                
                {/* Tema Seçici Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-[var(--theme-border)] transition-all cursor-pointer text-xs font-semibold"
                  >
                    <span 
                      className="w-3 h-3 rounded-full shadow-sm"
                      style={{ backgroundColor: activeThemeConfig.accentColor }}
                    />
                    <span className="hidden sm:inline">{activeThemeConfig.name[lang]}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${themeDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Tema Listesi Menüsü */}
                  {themeDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[var(--theme-surface)] backdrop-blur-3xl border border-[var(--theme-border)] shadow-2xl p-1.5 space-y-1 z-50">
                      <div className="text-[10px] font-bold text-[var(--theme-text-muted)] uppercase tracking-wider px-2.5 py-1">
                        {t.theme}
                      </div>
                      {THEMES_LIST.map((th) => {
                        const isSelected = th.id === currentTheme;
                        return (
                          <button
                            key={th.id}
                            onClick={() => {
                              setCurrentTheme(th.id);
                              setThemeDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[var(--theme-primary)] text-white shadow-md'
                                : 'text-[var(--theme-text)] hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span 
                                className="w-3.5 h-3.5 rounded-full border border-black/30"
                                style={{ backgroundColor: th.accentColor }}
                              />
                              <span>{th.name[lang]}</span>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Sade Dil Seçici: Yalnızca DE ve TR */}
                <div className="flex items-center bg-black/40 p-0.5 rounded-xl border border-[var(--theme-border)]">
                  <button
                    onClick={() => setLang('de')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-extrabold text-xs tracking-wider ${
                      lang === 'de' 
                        ? 'bg-[var(--theme-primary)] text-white shadow-md' 
                        : 'text-[var(--theme-text-muted)] hover:text-white'
                    }`}
                    title="Deutsch"
                  >
                    DE
                  </button>
                  <button
                    onClick={() => setLang('tr')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-extrabold text-xs tracking-wider ${
                      lang === 'tr' 
                        ? 'bg-[var(--theme-primary)] text-white shadow-md' 
                        : 'text-[var(--theme-text-muted)] hover:text-white'
                    }`}
                    title="Türkçe"
                  >
                    TR
                  </button>
                </div>

              </div>
            </div>

            {/* SAĞ TARAFA TAM ENTEGRE OLMUŞ CANLI DÜZEN IZGARASI */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: currentPage.cols,
                gridTemplateRows: currentPage.rows,
                gridTemplateAreas: currentPage.areas.join(' '),
                gap: '14px',
                minHeight: '620px',
                width: '100%',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <IntegratedPageContent pageId={activeTab} device="desktop" lang={lang} />
            </div>

          </div>
        </main>
      </div>

      {/* 3. MOBİL İÇİN YÜZEN CAM DOCK (Masaüstü düzenini etkilemeyecek şekilde dışarıda) */}
      <MobileGlassMenu
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        lang={lang}
      />

    </div>
  );
}
