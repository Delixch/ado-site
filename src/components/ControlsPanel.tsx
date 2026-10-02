import React from 'react';
import { GridLayout } from '../types/layout';
import { Sliders, RefreshCw, Layout, Maximize, Move } from 'lucide-react';

interface ControlsPanelProps {
  layout: GridLayout;
  gap: string;
  setGap: (gap: string) => void;
  placeItems: 'stretch' | 'center' | 'start' | 'end';
  setPlaceItems: (val: 'stretch' | 'center' | 'start' | 'end') => void;
  onResetLayout: () => void;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  layout,
  gap,
  setGap,
  placeItems,
  setPlaceItems,
  onResetLayout
}) => {
  const gapOptions = ['0px', '8px', '12px', '16px', '20px', '24px'];
  const placeOptions: Array<'stretch' | 'center' | 'start' | 'end'> = ['stretch', 'center', 'start', 'end'];

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-orange-400" />
          <h2 className="text-sm font-bold text-white tracking-wide">
            Özellik & Metrik Kontrol Paneli
          </h2>
        </div>
        <button
          onClick={onResetLayout}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700"
          title="Varsayılan değerlere sıfırla"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Sıfırla</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* grid-template-columns */}
        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            grid-template-columns
          </label>
          <div className="font-mono text-sm font-bold text-orange-400 break-all bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800">
            {layout.cols}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            {layout.cols.split(' ').length} sütunlu yapı
          </span>
        </div>

        {/* gap (Etkileşimli) */}
        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              gap (Boşluk)
            </label>
            <span className="font-mono text-xs font-bold text-amber-400">
              {gap}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            {gapOptions.map((g) => (
              <button
                key={g}
                onClick={() => setGap(g)}
                className={`flex-1 py-1 text-[11px] font-mono rounded transition-all ${
                  gap === g
                    ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
              >
                {g.replace('px', '')}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            Piksel aralık değeri
          </span>
        </div>

        {/* grid-template-rows */}
        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            grid-template-rows
          </label>
          <div className="font-mono text-sm font-bold text-indigo-400 break-all bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800">
            {layout.rows}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            {layout.rows.split(' ').length} satırlı dikey oran
          </span>
        </div>

        {/* place-items (Etkileşimli) */}
        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              place-items
            </label>
            <span className="font-mono text-xs font-bold text-emerald-400">
              {placeItems}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-1">
            {placeOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setPlaceItems(opt)}
                className={`py-1 px-1.5 text-[10px] font-mono rounded transition-all text-center ${
                  placeItems === opt
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            Hizalama ve yayılma kuralı
          </span>
        </div>
      </div>
    </div>
  );
};
