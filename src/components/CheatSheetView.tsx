import React, { useState } from 'react';
import { BookOpen, Sparkles, CheckCircle2, Code2, ChevronRight } from 'lucide-react';

export const CheatSheetView: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<number>(0);

  const topics = [
    {
      title: 'FR (Fractional Unit) Mantığı',
      summary: 'Boş alanı orantılı paylaştıran sihirli birim.',
      code: `/* 1fr 2fr 1fr: Orta kolon iki kat yer kaplar */
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}`,
      explanation: 'fr birimi, grid kapsayıcısındaki sabit genişlikler (px, rem) ve gap değerleri çıkarıldıktan sonra kalan serbest alanı orantılı olarak dağıtır. 1fr 2fr 1fr yapısında toplam 4 birim vardır; orta blok serbest alanın %50’sini alır.'
    },
    {
      title: 'grid-template-areas ile Görsel Harita',
      summary: 'CSS içinde web sitesinin doğrudan kuşbakışı krokisini çizin.',
      code: `.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav    main   aside"
    "footer footer footer";
}

.header { grid-area: header; }
.nav    { grid-area: nav; }
.main   { grid-area: main; }
.aside  { grid-area: aside; }
.footer { grid-area: footer; }`,
      explanation: 'Tırnak işaretleri içindeki her satır bir grid satırını, her kelime ise o satırdaki hücrenin ait olduğu alanı belirler. Aynı ismi yan yana tekrarlamak o elemanın sütunlar boyunca birleşmesini (span) sağlar.'
    },
    {
      title: 'repeat() ve minmax() Formülü',
      summary: 'Medya sorguları (media query) yazmadan duyarlı grid üretin.',
      code: `/* Otomatik sığdır ve minimum 250px genişlik ver */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}`,
      explanation: 'auto-fit ile ekrana kaç sütun sığıyorsa otomatik hesaplanır. Ekran küçüldüğünde kartlar 250px altına inemez ve bir alt satıra kayarak esnek bir e-ticaret kart dizilimi oluşturur.'
    },
    {
      title: 'place-items vs place-content',
      summary: 'align-items ve justify-items özelliklerinin pratik birleşimi.',
      code: `/* Hücre içindeki elemanları hem yatay hem dikey ortala */
.center-box {
  display: grid;
  place-items: center;
}`,
      explanation: 'place-items: <align-items> <justify-items> kısayoludur. Tek bir değer verildiğinde (örneğin center veya stretch) hem dikey hem de yatay hizalamayı aynı anda uygular.'
    },
    {
      title: 'gap (Aralık) ve Modern Standart',
      summary: 'Eski grid-gap yerine modern CSS standardı: gap.',
      code: `.grid-system {
  display: grid;
  gap: 16px;             /* Hem satır hem sütun aralığı */
  /* row-gap: 20px; */   /* Sadece satırlar arası */
  /* column-gap: 12px; *//* Sadece sütunlar arası */
}`,
      explanation: 'Artık grid-gap ön eki kullanımdan kalkmıştır. Standart gap özelliği hem CSS Grid hem de CSS Flexbox içinde evrensel olarak desteklenir.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
        <div>
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-orange-400" />
            CSS Grid Konseptleri & Hızlı Kılavuz (Cheat Sheet)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Modern CSS Grid özelliklerini, şablonlarını ve mimari püf noktalarını öğrenin.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sol Konu Listesi */}
        <div className="space-y-2">
          {topics.map((item, index) => {
            const isSelected = selectedTopic === index;
            return (
              <button
                key={index}
                onClick={() => setSelectedTopic(index)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-800 border-orange-500/60 shadow-md text-white'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">{item.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {item.summary}
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-orange-400 translate-x-0.5' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Sağ Detay ve Kod Örneği */}
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h4 className="text-base font-extrabold text-white">
                {topics[selectedTopic].title}
              </h4>
              <span className="text-[11px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                Konsept #{selectedTopic + 1}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {topics[selectedTopic].explanation}
            </p>

            <div className="bg-[#090d16] p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-200">
              <div className="text-slate-500 text-[11px] mb-2 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Örnek Kod Sözdizimi:</span>
              </div>
              <pre className="text-emerald-300 leading-relaxed whitespace-pre overflow-x-auto">
                {topics[selectedTopic].code}
              </pre>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Tüm modern tarayıcılarda (Chrome, Firefox, Safari, Edge) %100 desteklenir.
            </span>
            <span className="font-mono text-orange-400">W3C CSS Grid Standard</span>
          </div>
        </div>
      </div>
    </div>
  );
};
