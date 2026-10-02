import React, { useState } from 'react';
import { Sliders, Plus, Minus, RefreshCw, Copy, Check } from 'lucide-react';

export const GridBuilderView: React.FC = () => {
  const [colCount, setColCount] = useState<number>(3);
  const [rowCount, setRowCount] = useState<number>(3);
  const [gapVal, setGapVal] = useState<number>(12);
  const [colFractions, setColFractions] = useState<string[]>(['1fr', '2fr', '1fr']);
  const [copied, setCopied] = useState<boolean>(false);

  // Renk dizisi
  const blockColors = [
    { bg: '#93c5fd', text: '#1e3a8a', label: 'header' },
    { bg: '#6ee7b7', text: '#064e3b', label: 'nav' },
    { bg: '#818cf8', text: '#1e1b4b', label: 'main' },
    { bg: '#fde047', text: '#713f12', label: 'aside' },
    { bg: '#f472b6', text: '#831843', label: 'footer' },
    { bg: '#fdba74', text: '#7c2d12', label: 'feature' },
    { bg: '#67e8f9', text: '#164e63', label: 'card-1' },
    { bg: '#c084fc', text: '#3b0764', label: 'card-2' },
    { bg: '#86efac', text: '#14532d', label: 'card-3' },
  ];

  const handleColCountChange = (delta: number) => {
    const next = Math.max(1, Math.min(5, colCount + delta));
    setColCount(next);
    if (next > colFractions.length) {
      setColFractions([...colFractions, '1fr']);
    } else {
      setColFractions(colFractions.slice(0, next));
    }
  };

  const handleRowCountChange = (delta: number) => {
    setRowCount(Math.max(1, Math.min(5, rowCount + delta)));
  };

  const generatedCss = `.custom-grid {
  display: grid;
  grid-template-columns: ${colFractions.slice(0, colCount).join(' ')};
  grid-template-rows: repeat(${rowCount}, 1fr);
  gap: ${gapVal}px;
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-orange-400" />
            Özel Grid Builder (Etkileşimli Düzen Oluşturucu)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Sütun ve satır sayılarını dinamik olarak değiştirin, canlı renkli blokları anında izleyin.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
            copied
              ? 'bg-emerald-600 text-white'
              : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Kopyalandı' : 'Grid Kodunu Kopyala'}</span>
        </button>
      </div>

      {/* Kontrol Parametreleri */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Sütun Sayısı */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <label className="text-xs font-semibold text-slate-300 block mb-2">
            Sütun Sayısı ({colCount})
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleColCountChange(-1)}
              disabled={colCount <= 1}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono text-base font-bold text-orange-400 flex-1 text-center">
              {colCount} Kolon
            </span>
            <button
              onClick={() => handleColCountChange(1)}
              disabled={colCount >= 5}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Satır Sayısı */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <label className="text-xs font-semibold text-slate-300 block mb-2">
            Satır Sayısı ({rowCount})
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleRowCountChange(-1)}
              disabled={rowCount <= 1}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono text-base font-bold text-indigo-400 flex-1 text-center">
              {rowCount} Satır
            </span>
            <button
              onClick={() => handleRowCountChange(1)}
              disabled={rowCount >= 5}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Gap Değeri */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-300">
              Boşluk (Gap)
            </label>
            <span className="font-mono text-xs font-bold text-amber-400">
              {gapVal}px
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="32"
            step="4"
            value={gapVal}
            onChange={(e) => setGapVal(Number(e.target.value))}
            className="w-full accent-orange-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Canlı Görsel Grid */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
          Canlı Oluşturulan Grid Önizlemesi ({colCount} × {rowCount})
        </h4>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: colFractions.slice(0, colCount).join(' '),
            gridTemplateRows: `repeat(${rowCount}, minmax(80px, 1fr))`,
            gap: `${gapVal}px`,
          }}
          className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 min-h-[320px] transition-all"
        >
          {Array.from({ length: colCount * rowCount }).map((_, idx) => {
            const colorInfo = blockColors[idx % blockColors.length];
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: colorInfo.bg,
                  color: colorInfo.text,
                }}
                className="rounded-xl p-3 font-bold text-xs flex flex-col justify-between shadow-sm transition-all hover:scale-[1.02]"
              >
                <div className="flex justify-between items-center">
                  <span className="uppercase text-[11px] font-black">
                    Blok #{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-black/10">
                    hücre
                  </span>
                </div>
                <div className="text-[10px] opacity-75 font-mono">
                  sütun: {(idx % colCount) + 1} / satır: {Math.floor(idx / colCount) + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Canlı CSS Kodu */}
      <div className="bg-[#090d16] p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
        <div className="text-slate-500 mb-1">/* Oluşturulan CSS Kuralı */</div>
        <pre className="text-orange-400 font-bold">{generatedCss}</pre>
      </div>
    </div>
  );
};
