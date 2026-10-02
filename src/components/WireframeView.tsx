import React, { useState } from 'react';
import { GridLayout } from '../types/layout';
import { Smartphone, Tablet, Monitor, CheckCircle, MoveRight } from 'lucide-react';

interface WireframeViewProps {
  layout: GridLayout;
  gap: string;
}

export const WireframeView: React.FC<WireframeViewProps> = ({ layout, gap }) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const getContainerWidth = () => {
    switch (device) {
      case 'mobile': return 'max-w-[340px]';
      case 'tablet': return 'max-w-[620px]';
      case 'desktop': return 'max-w-full';
    }
  };

  return (
    <div className="space-y-6">
      {/* Cihaz Simülasyonu Seçici */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div>
          <h3 className="font-bold text-sm text-white">
            İskelet & Telçerçeve (Wireframe Skeleton)
          </h3>
          <p className="text-xs text-slate-400">
            Farklı ekran genişliklerinde grid mimarisinin tepkisini ve iskelet yapısını test edin.
          </p>
        </div>

        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setDevice('desktop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              device === 'desktop'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Masaüstü</span>
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              device === 'tablet'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              device === 'mobile'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobil</span>
          </button>
        </div>
      </div>

      {/* Telçerçeve Görsel Sahnesi */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col items-center">
        <div className={`w-full ${getContainerWidth()} transition-all duration-300`}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: device === 'mobile' ? '1fr' : layout.cols,
              gridTemplateRows: device === 'mobile' ? 'auto' : layout.rows,
              gridTemplateAreas: device === 'mobile' 
                ? '"header" "nav" "main" "aside" "footer"' 
                : layout.areas.join(' '),
              gap: gap,
              minHeight: '380px',
            }}
            className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 transition-all duration-300"
          >
            {layout.blocks.map((block) => (
              <div
                key={block.area}
                style={{
                  gridArea: block.area,
                  borderColor: block.borderColor,
                }}
                className="border-2 border-dashed bg-slate-900/60 p-4 rounded-xl flex flex-col justify-between text-slate-300 relative group overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-orange-400 uppercase">
                    .{block.area}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {block.name}
                  </span>
                </div>

                {/* Telçerçeve yer tutucu çizgileri */}
                <div className="my-3 space-y-1.5 opacity-40">
                  <div className="h-2 w-3/4 bg-slate-500 rounded" />
                  <div className="h-2 w-1/2 bg-slate-600 rounded" />
                </div>

                <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-800 flex justify-between">
                  <span>grid-area: {block.area}</span>
                  <span className="text-slate-500">wireframe</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* İskelet Özellikleri Tablosu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs font-semibold text-slate-400 mb-1">Grid Yapısı</div>
          <div className="text-base font-bold text-white font-mono">{layout.cols}</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Sütunlar arasındaki fr (fractional unit) oran dağılımı
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs font-semibold text-slate-400 mb-1">Satır Yüksekliği</div>
          <div className="text-base font-bold text-white font-mono">{layout.rows}</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Dikey ritim ve içerik yayılımı
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs font-semibold text-slate-400 mb-1">Hücre Boşluğu (Gap)</div>
          <div className="text-base font-bold text-orange-400 font-mono">{gap}</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Tüm kolon ve satır aralarındaki eşit nefes alma payı
          </p>
        </div>
      </div>
    </div>
  );
};
