import React, { useState } from 'react';
import { GridLayout } from '../types/layout';
import { Copy, Check, Download, FileCode, Sparkles } from 'lucide-react';

interface CodeViewerProps {
  layout: GridLayout;
  gap: string;
  placeItems: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  layout,
  gap,
  placeItems
}) => {
  const [activeLang, setActiveLang] = useState<'css' | 'tailwind' | 'react'>('css');
  const [copied, setCopied] = useState(false);

  // Generate pure CSS
  const areaIndent = layout.areas.join('\n    ');
  const cssCode = `.layout {
  display: grid;
  grid-template-columns: ${layout.cols};
  grid-template-rows: ${layout.rows};
  gap: ${gap};
  place-items: ${placeItems};
  grid-template-areas:
    ${areaIndent};
}

/* Alan Tanımlamaları */
${layout.blocks.map(b => `.item-${b.area} {
  grid-area: ${b.area};
  background-color: ${b.color};
}`).join('\n')}`;

  // Generate Tailwind CSS
  const tailwindCode = `<!-- Tailwind CSS Grid İskeleti -->
<div class="grid ${layout.tailwindCols} ${layout.tailwindRows} gap-[${gap}] ${placeItems === 'center' ? 'place-items-center' : ''} min-h-[360px] w-full">
${layout.blocks.map(b => `  <div class="[grid-area:${b.area}] p-4 rounded-xl" style="background-color: ${b.color}">
    <span class="font-bold text-xs uppercase">${b.area}</span>
  </div>`).join('\n')}
</div>`;

  // Generate React JSX
  const reactCode = `import React from 'react';

export const ${layout.id.charAt(0).toUpperCase() + layout.id.slice(1)}Layout: React.FC = () => {
  return (
    <div 
      className="grid w-full min-h-screen gap-[${gap}] p-4"
      style={{
        gridTemplateColumns: "${layout.cols}",
        gridTemplateRows: "${layout.rows}",
        gridTemplateAreas: \`
          ${layout.areas.join('\n          ')}
        \`
      }}
    >
${layout.blocks.map(b => `      <div style={{ gridArea: '${b.area}', backgroundColor: '${b.color}' }} className="rounded-xl p-4">
        <h3>${b.name}</h3>
      </div>`).join('\n')}
    </div>
  );
};`;

  const getCurrentCode = () => {
    switch (activeLang) {
      case 'css': return cssCode;
      case 'tailwind': return tailwindCode;
      case 'react': return reactCode;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = activeLang === 'css' ? 'css' : activeLang === 'tailwind' ? 'html' : 'tsx';
    const blob = new Blob([getCurrentCode()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${layout.id}-layout.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-[#090d16] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-mono">
      {/* Terminal Pencere Başlığı */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0d1322] border-b border-slate-800/80">
        
        {/* macOS Tarzı 3 Renkli Buton & Sekmeler */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/90 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/90 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/90 inline-block" />
          </div>

          <div className="flex items-center bg-slate-900/90 p-0.5 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveLang('css')}
              className={`px-3 py-1 rounded-md transition-all font-sans font-medium ${
                activeLang === 'css'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              layout.css
            </button>
            <button
              onClick={() => setActiveLang('tailwind')}
              className={`px-3 py-1 rounded-md transition-all font-sans font-medium ${
                activeLang === 'tailwind'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              tailwind.html
            </button>
            <button
              onClick={() => setActiveLang('react')}
              className={`px-3 py-1 rounded-md transition-all font-sans font-medium ${
                activeLang === 'react'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Layout.tsx
            </button>
          </div>
        </div>

        {/* Kod Aksiyonları: Kopyala & İndir */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
            title="Dosyayı İndir"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold flex items-center gap-1.5 transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-orange-400" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Kod İçeriği ve Sözdizimi Vurgulama */}
      <div className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm leading-relaxed text-slate-200 max-h-[380px] scrollbar-thin scrollbar-thumb-slate-800">
        <pre className="whitespace-pre">
          {activeLang === 'css' && (
            <code>
              <span className="text-pink-400 font-bold">.layout</span> {'{\n'}
              {'  '}<span className="text-sky-400">display</span>: <span className="text-amber-300">grid</span>;{'\n'}
              {'  '}<span className="text-sky-400">grid-template-columns</span>: <span className="text-amber-300">{layout.cols}</span>;{'\n'}
              {'  '}<span className="text-sky-400">grid-template-rows</span>: <span className="text-amber-300">{layout.rows}</span>;{'\n'}
              {'  '}<span className="text-sky-400">gap</span>: <span className="text-amber-300">{gap}</span>;{'\n'}
              {'  '}<span className="text-sky-400">place-items</span>: <span className="text-amber-300">{placeItems}</span>;{'\n'}
              {'  '}<span className="text-sky-400">grid-template-areas</span>:{'\n'}
              {'    '}<span className="text-emerald-400">{areaIndent}</span>;{'\n'}
              {'}\n\n'}
              <span className="text-slate-500">/* Alt Eleman Eşlemeleri */</span>{'\n'}
              {layout.blocks.map((b) => (
                <span key={b.area}>
                  <span className="text-pink-400">.item-{b.area}</span> {'{ '}
                  <span className="text-sky-400">grid-area</span>: <span className="text-amber-300">{b.area}</span>;{' '}
                  <span className="text-sky-400">background-color</span>: <span className="text-emerald-400">{b.color}</span>;
                  {' }\n'}
                </span>
              ))}
            </code>
          )}

          {activeLang === 'tailwind' && (
            <code>
              <span className="text-slate-500">&lt;!-- Tailwind CSS 3/4 Grid Yapısı --&gt;</span>{'\n'}
              <span className="text-pink-400">&lt;div</span> <span className="text-sky-400">class</span>=<span className="text-emerald-300">"grid {layout.tailwindCols} {layout.tailwindRows} gap-[{gap}]"</span><span className="text-pink-400">&gt;</span>{'\n'}
              {layout.blocks.map(b => (
                `  <div class="[grid-area:${b.area}] p-4 rounded-xl" style="background-color: ${b.color}">\n    <span>${b.name}</span>\n  </div>\n`
              ))}
              <span className="text-pink-400">&lt;/div&gt;</span>
            </code>
          )}

          {activeLang === 'react' && (
            <code>
              <span className="text-pink-400">import</span> React <span className="text-pink-400">from</span> <span className="text-emerald-300">'react'</span>;{'\n\n'}
              <span className="text-pink-400">export const</span> <span className="text-amber-300">{layout.id.charAt(0).toUpperCase() + layout.id.slice(1)}Layout</span>: React.FC = () =&gt; {'{\n'}
              {'  '}<span className="text-pink-400">return</span> ({'\n'}
              {'    '}<span className="text-pink-400">&lt;div</span>{'\n'}
              {'      '}<span className="text-sky-400">className</span>=<span className="text-emerald-300">"grid w-full min-h-screen gap-[{gap}] p-4"</span>{'\n'}
              {'      '}<span className="text-sky-400">style</span>={'{{'}{'\n'}
              {'        '}<span className="text-purple-300">gridTemplateColumns</span>: <span className="text-emerald-300">"{layout.cols}"</span>,{'\n'}
              {'        '}<span className="text-purple-300">gridTemplateRows</span>: <span className="text-emerald-300">"{layout.rows}"</span>,{'\n'}
              {'        '}<span className="text-purple-300">gridTemplateAreas</span>: \`{'\n'}
              {'          '}{layout.areas.join('\n          ')}{'\n'}
              {'        '}\`{'\n'}
              {'      '}{'}}'}{'\n'}
              {'    '}<span className="text-pink-400">&gt;</span>{'\n'}
              {layout.blocks.map(b => (
                `      <div style={{ gridArea: '${b.area}', backgroundColor: '${b.color}' }} className="rounded-xl p-4">\n        <h3>${b.name}</h3>\n      </div>\n`
              ))}
              {'    '}<span className="text-pink-400">&lt;/div&gt;</span>{'\n'}
              {'  '});{'\n'}
              {'};'}
            </code>
          )}
        </pre>
      </div>
    </div>
  );
};
