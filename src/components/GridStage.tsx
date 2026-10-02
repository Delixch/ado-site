import React, { useState } from 'react';
import { GridLayout, DisplayMode, GridBlock } from '../types/layout';
import { 
  Maximize2, 
  Sparkles, 
  Search, 
  Bell, 
  Menu, 
  ExternalLink, 
  CheckCircle2, 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  Compass, 
  FolderGit2, 
  Share2, 
  Info 
} from 'lucide-react';

interface GridStageProps {
  layout: GridLayout;
  displayMode: DisplayMode;
  showGridLines: boolean;
  selectedBlockArea: string | null;
  onSelectBlock: (area: string) => void;
  customGap?: string;
  customPlaceItems?: string;
}

export const GridStage: React.FC<GridStageProps> = ({
  layout,
  displayMode,
  showGridLines,
  selectedBlockArea,
  onSelectBlock,
  customGap,
  customPlaceItems
}) => {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  // CSS Grid style definition based on current layout state
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: layout.cols,
    gridTemplateRows: layout.rows,
    gridTemplateAreas: layout.areas.join(' '),
    gap: customGap || layout.gap,
    placeItems: (customPlaceItems as any) || layout.placeItems,
    width: '100%',
    minHeight: '340px',
    height: '100%',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  // Render Rich UI mock elements inside the block
  const renderRichUIContent = (block: GridBlock) => {
    switch (block.area) {
      case 'header':
        return (
          <div className="flex flex-col justify-between h-full w-full">
            <div className="flex items-center justify-between border-b border-black/10 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-blue-700/80 text-white flex items-center justify-center text-[10px] font-bold">
                  G
                </div>
                <span className="font-bold text-xs text-blue-950 uppercase tracking-wider">
                  Brand Header
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-blue-900/80 font-medium">
                <div className="hidden sm:flex items-center gap-3">
                  <span className="hover:underline cursor-pointer">Ana Sayfa</span>
                  <span className="hover:underline cursor-pointer">Katalog</span>
                  <span className="hover:underline cursor-pointer">Dokümantasyon</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-blue-400/40 flex items-center justify-center">
                  <Bell className="w-3 h-3 text-blue-950" />
                </div>
              </div>
            </div>
            <div className="text-[10px] text-blue-900/70 flex items-center justify-between pt-1">
              <span>grid-area: header</span>
              <span className="font-mono bg-blue-300/40 px-1.5 py-0.5 rounded">100% genişlik</span>
            </div>
          </div>
        );

      case 'nav':
        return (
          <div className="flex flex-col justify-between h-full w-full text-emerald-950">
            <div>
              <div className="flex items-center gap-1.5 mb-2 font-bold text-xs uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-emerald-800" />
                <span>Navigasyon</span>
              </div>
              <ul className="space-y-1 text-[11px] font-medium">
                <li className="p-1 rounded bg-emerald-300/40 flex items-center justify-between">
                  <span>📌 Panel</span>
                  <span className="text-[9px] bg-emerald-600 text-white px-1 rounded">Aktif</span>
                </li>
                <li className="p-1 rounded hover:bg-emerald-200/50 flex items-center gap-1">
                  <span>📂 Projeler</span>
                </li>
                <li className="p-1 rounded hover:bg-emerald-200/50 flex items-center gap-1">
                  <span>⚙️ Ayarlar</span>
                </li>
              </ul>
            </div>
            <div className="text-[10px] text-emerald-800/80 pt-2 border-t border-emerald-600/20 font-mono">
              area: nav
            </div>
          </div>
        );

      case 'main':
        return (
          <div className="flex flex-col justify-between h-full w-full text-indigo-950">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight">
                  Ana İçerik Bölümü (Main)
                </span>
                <span className="text-[10px] font-semibold bg-indigo-200 text-indigo-900 px-2 py-0.5 rounded">
                  Birincil Bölge
                </span>
              </div>
              <p className="text-xs text-indigo-900/80 mb-3 leading-relaxed">
                Bu alanda dinamik içerik kartları, analitik grafikler veya yazı gövdesi yer alır.
              </p>
              
              {/* Mini içerik kartları */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-indigo-200/50 p-2 rounded-lg border border-indigo-300/40">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold">Trafik</span>
                    <TrendingUp className="w-3 h-3 text-indigo-700" />
                  </div>
                  <div className="text-base font-black mt-1">24.5k</div>
                  <div className="text-[9px] text-indigo-700/80">+14% bu hafta</div>
                </div>
                <div className="bg-indigo-200/50 p-2 rounded-lg border border-indigo-300/40">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold">Verim</span>
                    <BarChart3 className="w-3 h-3 text-indigo-700" />
                  </div>
                  <div className="text-base font-black mt-1">99.8%</div>
                  <div className="text-[9px] text-indigo-700/80">Tam performans</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-indigo-300/30 text-[10px] text-indigo-800">
              <span className="font-mono">grid-area: main</span>
              <span className="font-medium">Esnek 1fr-3fr alan</span>
            </div>
          </div>
        );

      case 'aside':
        return (
          <div className="flex flex-col justify-between h-full w-full text-amber-950">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs uppercase tracking-wider">Kenar Panel (Aside)</span>
                <Info className="w-3 h-3 text-amber-800" />
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="bg-amber-200/60 p-1.5 rounded text-[10px] font-medium leading-tight">
                  💡 <b>İpucu:</b> CSS Grid alan isimleri ile kodunuzu temiz tutun.
                </div>
                <div className="bg-amber-200/40 p-1.5 rounded text-[10px] leading-tight">
                  ⚡ Yan sütun eklentileri & bildirimler
                </div>
              </div>
            </div>
            <div className="text-[10px] text-amber-800/80 pt-2 border-t border-amber-600/20 font-mono">
              area: aside
            </div>
          </div>
        );

      case 'footer':
        return (
          <div className="flex items-center justify-between h-full w-full text-pink-950 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-pink-800" />
              <span className="font-bold">Alt Bilgi (Footer)</span>
              <span className="hidden sm:inline text-[11px] text-pink-900/80">
                · © 2026 CSS Grid Concepts
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-pink-900">
              <span>grid-area: footer</span>
              <span className="bg-pink-300/50 px-1.5 py-0.5 rounded font-bold">Tam En</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col justify-between h-full w-full">
            <div className="font-bold text-xs">{block.name}</div>
            <div className="text-[10px] font-mono opacity-80">area: {block.area}</div>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {/* Sahne Çerçevesi */}
      <div 
        className={`relative w-full rounded-2xl p-4 sm:p-6 transition-all duration-300 shadow-xl ${
          showGridLines 
            ? 'bg-slate-900 border-2 border-dashed border-orange-500/50' 
            : 'bg-slate-900/90 border border-slate-800 shadow-slate-950/50'
        }`}
      >
        {/* Sahne Üst Bilgi Barı */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-slate-200">
              {layout.icon} {layout.name} Sahnesi
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 font-mono text-[11px]">
              cols: {layout.cols} · rows: {layout.rows}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="hidden md:inline">
              Aktif Mod: <strong className="text-orange-400">{displayMode === 'colored-blocks' ? 'Renkli Bloklar' : 'Zengin UI'}</strong>
            </span>
            {selectedBlockArea && (
              <span className="bg-orange-500/10 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded font-mono">
                Seçili: {selectedBlockArea}
              </span>
            )}
          </div>
        </div>

        {/* Gerçek CSS Grid Sahnesi */}
        <div className="relative min-h-[340px] sm:min-h-[380px] flex items-center justify-center p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 overflow-hidden">
          
          {/* İsteğe bağlı ızgara arka plan deseni */}
          {showGridLines && (
            <div 
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: 'radial-gradient(#f97316 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}
            />
          )}

          <div style={gridStyle} className="transition-all duration-500 ease-out">
            {layout.blocks.map((block) => {
              const isSelected = selectedBlockArea === block.area;
              const isHovered = hoveredArea === block.area;

              return (
                <div
                  key={block.area}
                  onClick={() => onSelectBlock(block.area)}
                  onMouseEnter={() => setHoveredArea(block.area)}
                  onMouseLeave={() => setHoveredArea(null)}
                  style={{
                    backgroundColor: block.color,
                    gridArea: block.area,
                    borderColor: block.borderColor,
                    color: block.textColor,
                  }}
                  className={`rounded-xl p-3 sm:p-4 font-bold text-xs cursor-pointer select-none transition-all duration-300 relative flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-lg ${
                    isSelected
                      ? 'ring-4 ring-orange-500 ring-offset-2 ring-offset-slate-950 scale-[1.01] z-20 shadow-2xl'
                      : 'hover:brightness-105 hover:scale-[1.005]'
                  }`}
                >
                  {/* Blok İçi İçerik: Moduna göre */}
                  {displayMode === 'colored-blocks' ? (
                    <div className="flex flex-col justify-between h-full min-h-[50px] w-full">
                      {/* Üst Başlık & İsim */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-black tracking-wide uppercase drop-shadow-sm">
                          {block.area}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/10 text-current">
                          .{block.area}
                        </span>
                      </div>

                      {/* Orta Açıklama */}
                      <div className="text-[11px] font-medium opacity-85 leading-snug my-1 line-clamp-2">
                        {block.description}
                      </div>

                      {/* Alt Grid Alanı Bilgisi */}
                      <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-black/10">
                        <span>grid-area: {block.area}</span>
                        <span className="opacity-70 text-[9px]">Tıkla & İncele</span>
                      </div>
                    </div>
                  ) : (
                    renderRichUIContent(block)
                  )}

                  {/* Vurgu Işıltısı */}
                  {(isSelected || isHovered) && (
                    <div className="absolute inset-0 bg-white/10 pointer-events-none rounded-xl transition-opacity" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sahne Alt Bilgi Notu */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
          <span>💡 Bloklara tıklayarak grid-area ve boyut özelliklerini inceleyebilirsiniz.</span>
          <span className="font-mono">CSS Grid v2 (Modern Standard)</span>
        </div>
      </div>
    </div>
  );
};
