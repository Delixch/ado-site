import React from 'react';
import { 
  Layout, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Copy, 
  Check, 
  Sliders, 
  Code2, 
  Layers, 
  Eye, 
  Sparkles,
  BookOpen,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { GridLayout, DisplayMode } from '../types/layout';
import { LAYOUT_PRESETS } from '../data/layouts';

interface SidebarMenuProps {
  currentLayoutId: string;
  onSelectLayout: (layoutId: string) => void;
  device: 'desktop' | 'tablet' | 'mobile';
  setDevice: (d: 'desktop' | 'tablet' | 'mobile') => void;
  displayMode: DisplayMode;
  setDisplayMode: (m: DisplayMode) => void;
  showGridLines: boolean;
  setShowGridLines: (s: boolean) => void;
  onCopyCss: () => void;
  copied: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  currentLayoutId,
  onSelectLayout,
  device,
  setDevice,
  displayMode,
  setDisplayMode,
  showGridLines,
  setShowGridLines,
  onCopyCss,
  copied,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  const layoutsList = Object.values(LAYOUT_PRESETS);

  return (
    <>
      {/* Mobil arka plan karartması */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0f172a] text-slate-200 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Üst Logo ve Başlık */}
        <div className="p-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ea580c] flex items-center justify-center text-white font-black shadow-lg shadow-orange-600/30">
              <span className="font-mono text-sm">#grid</span>
            </div>
            <div>
              <h2 className="font-extrabold text-base text-white tracking-tight leading-tight">
                CSS Grid Concepts
              </h2>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">
                Layout Studio
              </p>
            </div>
          </div>
        </div>

        {/* Scroll edilebilir Menü Bölümleri */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
          
          {/* 7 Örnek Düzen Menüsü */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-2">
              <span>7 Düzen Şablonu</span>
              <span className="bg-orange-500/20 text-[#ea580c] text-[10px] px-1.5 py-0.2 rounded font-mono font-bold">
                {layoutsList.length} Örnek
              </span>
            </div>
            <nav className="space-y-1">
              {layoutsList.map((layout) => {
                const isActive = currentLayoutId === layout.id;
                return (
                  <button
                    key={layout.id}
                    onClick={() => {
                      onSelectLayout(layout.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left group ${
                      isActive
                        ? 'bg-[#ea580c] text-white shadow-md shadow-orange-600/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{layout.icon}</span>
                      <span className="tracking-wide">{layout.name}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                      isActive ? 'text-white translate-x-0.5' : 'text-slate-500 group-hover:text-slate-300'
                    }`} />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Ekran Görünüm Boyutu (Masaüstü, Tablet, Mobil) */}
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
              Görünüm Cihazı
            </span>
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800/80 text-xs">
              <button
                onClick={() => setDevice('desktop')}
                className={`py-1.5 px-2 rounded font-medium flex flex-col items-center gap-1 transition-all ${
                  device === 'desktop'
                    ? 'bg-[#ea580c] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Masaüstü (100%)"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="text-[10px]">Masaüstü</span>
              </button>
              <button
                onClick={() => setDevice('tablet')}
                className={`py-1.5 px-2 rounded font-medium flex flex-col items-center gap-1 transition-all ${
                  device === 'tablet'
                    ? 'bg-[#ea580c] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tablet (640px)"
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="text-[10px]">Tablet</span>
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={`py-1.5 px-2 rounded font-medium flex flex-col items-center gap-1 transition-all ${
                  device === 'mobile'
                    ? 'bg-[#ea580c] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Mobil (380px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="text-[10px]">Mobil</span>
              </button>
            </div>
          </div>

          {/* Görsel Mod & Izgara Çizgileri */}
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-2.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1">
              Görsel Seçenekler
            </span>

            {/* Renkli Blok vs Zengin UI */}
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setDisplayMode('colored-blocks')}
                className={`flex-1 py-1.5 rounded text-[11px] font-medium flex items-center justify-center gap-1 transition-all ${
                  displayMode === 'colored-blocks'
                    ? 'bg-[#ea580c] text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>Bloklar</span>
              </button>
              <button
                onClick={() => setDisplayMode('rich-ui')}
                className={`flex-1 py-1.5 rounded text-[11px] font-medium flex items-center justify-center gap-1 transition-all ${
                  displayMode === 'rich-ui'
                    ? 'bg-[#ea580c] text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Zengin UI</span>
              </button>
            </div>

            {/* Kılavuz Çizgi Butonu */}
            <button
              onClick={() => setShowGridLines(!showGridLines)}
              className={`w-full py-1.5 px-3 rounded-lg text-xs font-medium border flex items-center justify-between transition-colors ${
                showGridLines
                  ? 'bg-orange-950/40 border-orange-500/50 text-orange-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5" />
                <span>Izgara Kılavuzu</span>
              </span>
              <span className="text-[10px] font-mono px-1 rounded bg-black/30">
                {showGridLines ? 'AÇIK' : 'KAPALI'}
              </span>
            </button>
          </div>

          {/* Blok Renk Referansları */}
          <div className="px-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Blok Renk Paleti
            </span>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center justify-between p-1.5 rounded bg-slate-900/60 border border-slate-800/80">
                <span className="flex items-center gap-2 font-mono">
                  <span className="w-3 h-3 rounded-full bg-[#93c5fd]" />
                  <span>header</span>
                </span>
                <span className="text-[10px] text-slate-400">#93c5fd</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-slate-900/60 border border-slate-800/80">
                <span className="flex items-center gap-2 font-mono">
                  <span className="w-3 h-3 rounded-full bg-[#6ee7b7]" />
                  <span>nav</span>
                </span>
                <span className="text-[10px] text-slate-400">#6ee7b7</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-slate-900/60 border border-slate-800/80">
                <span className="flex items-center gap-2 font-mono">
                  <span className="w-3 h-3 rounded-full bg-[#818cf8]" />
                  <span>main</span>
                </span>
                <span className="text-[10px] text-slate-400">#818cf8</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-slate-900/60 border border-slate-800/80">
                <span className="flex items-center gap-2 font-mono">
                  <span className="w-3 h-3 rounded-full bg-[#fde047]" />
                  <span>aside</span>
                </span>
                <span className="text-[10px] text-slate-400">#fde047</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-slate-900/60 border border-slate-800/80">
                <span className="flex items-center gap-2 font-mono">
                  <span className="w-3 h-3 rounded-full bg-[#f472b6]" />
                  <span>footer</span>
                </span>
                <span className="text-[10px] text-slate-400">#f472b6</span>
              </div>
            </div>
          </div>

        </div>

        {/* Alt Kısım: CSS Kopyala & Durum */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
          <button
            onClick={onCopyCss}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-[#ea580c] hover:bg-orange-600 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>CSS Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Canlı CSS Kopyala</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
