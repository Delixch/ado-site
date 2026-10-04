import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// WhatsApp & OpenGraph standard: 1200 x 630 px
const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="terracotta-header" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#CA6543"/>
      <stop offset="50%" stop-color="#C05C3A"/>
      <stop offset="100%" stop-color="#B85433"/>
    </linearGradient>

    <linearGradient id="terracotta-ribbon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C05C3A" stop-opacity="0.85"/>
      <stop offset="40%" stop-color="#D47352" stop-opacity="0.6"/>
      <stop offset="80%" stop-color="#C05C3A" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#B85433" stop-opacity="0.0"/>
    </linearGradient>

    <linearGradient id="paper-card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FBF8F2"/>
      <stop offset="100%" stop-color="#F5EFE6"/>
    </linearGradient>

    <linearGradient id="dark-photo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141416"/>
      <stop offset="60%" stop-color="#0E0E10"/>
      <stop offset="100%" stop-color="#060608"/>
    </linearGradient>

    <filter id="shadow-card" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#211F1C" flood-opacity="0.12"/>
    </filter>

    <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.18"/>
    </filter>
  </defs>

  <!-- ARKA PLAN: Claude Teması Sıcak Kağıt Beji -->
  <rect width="${width}" height="${height}" fill="#F4EFE6"/>

  <!-- ÜST HEADER BARI (TERRACOTTA) -->
  <rect x="0" y="0" width="${width}" height="56" fill="url(#terracotta-header)"/>

  <!-- Üst Bar İçi: Logo, Sekme, Araçlar -->
  <g transform="translate(76, 12)">
    <!-- Sol Logo & Başlık Kapsülü -->
    <rect x="0" y="0" width="180" height="32" rx="16" fill="rgba(255, 255, 255, 0.16)"/>
    <text x="16" y="21" font-family="'JetBrains Mono', sans-serif" font-weight="900" font-size="12" fill="#FFFFFF" letter-spacing="1">EKADO DESIGN</text>
    <rect x="110" y="6" width="58" height="20" rx="4" fill="rgba(0, 0, 0, 0.2)"/>
    <text x="139" y="19.5" font-family="'JetBrains Mono', sans-serif" font-size="9" font-weight="bold" fill="#F4EFE6" text-anchor="middle">DESİGN</text>
    
    <text x="194" y="21" font-family="'JetBrains Mono', sans-serif" font-size="12" fill="rgba(255, 255, 255, 0.6)">|</text>
    <text x="210" y="21" font-family="'Source Serif 4', Georgia, serif" font-size="14" font-weight="600" fill="#FFFFFF">Başlangıç · Portfolyo</text>

    <!-- Sağ Araçlar: Oynat, Karıştır, Claude Seçici, Dil -->
    <g transform="translate(860, 0)">
      <!-- Oynat & Karıştır İkon Çemberleri -->
      <circle cx="-60" cy="16" r="14" fill="rgba(255, 255, 255, 0.16)"/>
      <path d="M -63 11 L -55 16 L -63 21 Z" fill="#FFFFFF"/>
      <circle cx="-24" cy="16" r="14" fill="rgba(255, 255, 255, 0.16)"/>
      <text x="-24" y="20" font-family="'JetBrains Mono', sans-serif" font-size="11" fill="#FFFFFF" text-anchor="middle">⇄</text>

      <!-- Claude Renk Seçici Butonu -->
      <rect x="0" y="2" width="108" height="28" rx="6" fill="#FBF8F2" stroke="rgba(255, 255, 255, 0.3)"/>
      <circle cx="14" cy="16" r="4.5" fill="#C96442"/>
      <text x="24" y="20" font-family="'JetBrains Mono', sans-serif" font-size="11" font-weight="bold" fill="#211F1C">Claude ▾</text>

      <!-- Dil Butonları -->
      <rect x="116" y="2" width="68" height="28" rx="6" fill="rgba(0, 0, 0, 0.22)"/>
      <text x="132" y="20" font-family="'JetBrains Mono', sans-serif" font-size="11" fill="rgba(255, 255, 255, 0.7)">DE</text>
      <text x="162" y="20" font-family="'JetBrains Mono', sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF">TR</text>
    </g>
  </g>

  <!-- SOL İNCE DOCK (COLLAPSED DOCK) -->
  <g transform="translate(0, 56)">
    <rect x="0" y="0" width="60" height="530" fill="#F4EFE6" stroke="#D6C9B5" stroke-width="1"/>
    
    <!-- Üst Genişletme Oku Kapsülü -->
    <rect x="10" y="14" width="40" height="32" rx="8" fill="#FBF8F2" stroke="#E4DACB"/>
    <text x="30" y="34" font-family="'JetBrains Mono', sans-serif" font-size="14" fill="#C96442" text-anchor="middle" font-weight="bold">›</text>

    <!-- Yuvarlak Profil Fotoğrafı / Avatar -->
    <g transform="translate(14, 58)">
      <circle cx="16" cy="16" r="16" fill="#E4DACB"/>
      <!-- Stilize Portre Çizimi -->
      <circle cx="16" cy="12" r="6" fill="#211F1C"/>
      <path d="M 6 28 C 8 20, 24 20, 26 28 Z" fill="#211F1C"/>
      <circle cx="27" cy="27" r="3.5" fill="#C96442"/>
    </g>

    <!-- Navigasyon İkonları Rayı -->
    <g fill="#7A7167" font-family="'JetBrains Mono', sans-serif" font-size="14" text-anchor="middle">
      <text x="30" y="122">⚲</text>
      
      <!-- Seçili Başlangıç İkonu Kapsülü -->
      <circle cx="30" cy="162" r="14" fill="#E8DFD3"/>
      <text x="30" y="167" fill="#C96442">⌂</text>

      <text x="30" y="208">👤</text>
      <text x="30" y="248">💼</text>
      <text x="30" y="288">✨</text>
      <text x="30" y="328">📂</text>
      <text x="30" y="368">🔨</text>
      <text x="30" y="408">🏢</text>
      <text x="30" y="448">✉</text>
    </g>
  </g>

  <!-- 3D IŞIK ŞERİDİ (CLAUDE TERRACOTTA RIBBON) -->
  <path d="M 680 40 Q 640 220 540 360 T 460 630 L 530 630 Q 620 400 700 240 T 750 40 Z" fill="url(#terracotta-ribbon)"/>
  
  <!-- Ribbon Üzerindeki Tipografik Harfler (Screenshot ile birebir) -->
  <g font-family="'Source Serif 4', Georgia, serif" font-size="14" fill="#C96442" opacity="0.8" font-weight="bold">
    <text x="684" y="90">O</text>
    <text x="712" y="90">0</text>
    <text x="670" y="124">A</text>
    <text x="640" y="160">O</text>
    <text x="614" y="196">OA</text>
    <text x="566" y="230">D</text>
  </g>

  <!-- ANA İÇERİK ALANI -->
  <!-- 1. Üst Başlık & Folio -->
  <g transform="translate(80, 80)">
    <text x="0" y="36" font-family="'Source Serif 4', Georgia, serif" font-size="34" font-weight="600" fill="#C96442">00</text>
    <text x="52" y="24" font-family="'JetBrains Mono', sans-serif" font-size="9.5" font-weight="bold" fill="#7A7167" letter-spacing="2">EKADO DESIGN · PORTFOLYO</text>
    <text x="52" y="42" font-family="'Source Serif 4', Georgia, serif" font-size="20" font-weight="400" fill="#211F1C">WEB GELİŞTİRİCİ <tspan font-style="italic" fill="#C96442">Zürih · İsviçre</tspan></text>
  </g>

  <!-- Sağ Üst: Sevimli Beyaz 3D Robot Mascot (Screenshot ile birebir) -->
  <g transform="translate(980, 72)">
    <!-- Robot Gövde -->
    <rect x="0" y="42" width="68" height="54" rx="16" fill="#FDFBF7" stroke="#D6C9B5" stroke-width="2" filter="url(#soft-shadow)"/>
    <rect x="14" y="54" width="40" height="28" rx="8" fill="#F4EFE6" stroke="#E4DACB"/>
    <circle cx="34" cy="68" r="6" fill="#C96442"/>
    <text x="34" y="71" font-family="'JetBrains Mono', sans-serif" font-size="7" font-weight="bold" fill="#FFFFFF" text-anchor="middle">AD</text>

    <!-- Robot Kafa -->
    <rect x="-6" y="-4" width="80" height="46" rx="15" fill="#FFFFFF" stroke="#D6C9B5" stroke-width="2" filter="url(#soft-shadow)"/>
    <rect x="4" y="4" width="60" height="30" rx="8" fill="#211F1C"/>
    <!-- Turuncu Sıcak Gözler (Claude) -->
    <ellipse cx="20" cy="18" rx="8" ry="6" fill="#E87A54"/>
    <ellipse cx="48" cy="18" rx="8" ry="6" fill="#E87A54"/>
    <!-- Anten -->
    <line x1="34" y1="-4" x2="34" y2="-16" stroke="#D6C9B5" stroke-width="3"/>
    <circle cx="34" cy="-18" r="4.5" fill="#C96442"/>

    <!-- Düzen Seçici (DÜZEN 01 · COVER) -->
    <g transform="translate(76, 16)">
      <text x="0" y="10" font-family="'JetBrains Mono', sans-serif" font-size="8.5" font-weight="bold" fill="#7A7167" letter-spacing="1">DÜZEN 01 · COVER</text>
      <rect x="0" y="18" width="34" height="24" rx="3" fill="#FBF8F2" stroke="#C96442" stroke-width="1.5"/>
      <rect x="4" y="22" width="12" height="7" fill="#C96442"/>
      <rect x="40" y="18" width="34" height="24" rx="3" fill="#FBF8F2" stroke="#D6C9B5"/>
      <rect x="80" y="18" width="34" height="24" rx="3" fill="#FBF8F2" stroke="#D6C9B5"/>
    </g>
  </g>

  <!-- SOL PANEL: MANŞET & AÇIKLAMA & BUTONLAR -->
  <g transform="translate(80, 150)">
    <!-- İnce Ayraç Kıl Çizgisi -->
    <line x1="0" y1="0" x2="400" y2="0" stroke="#D6C9B5" stroke-width="1"/>

    <!-- Büyük Tipografik Manşet (Source Serif 4) -->
    <g transform="translate(0, 36)">
      <text x="0" y="24" font-family="'Source Serif 4', Georgia, serif" font-size="32" font-weight="700" fill="#211F1C" letter-spacing="-0.5">İZ BIRAKAN <tspan fill="#C96442">DİJİTAL</tspan></text>
      <text x="0" y="58" font-family="'Source Serif 4', Georgia, serif" font-size="32" font-weight="700" fill="#211F1C" letter-spacing="-0.5">DENEYİMLER İNŞA EDİYORUM</text>
    </g>

    <!-- Durum Rozeti -->
    <g transform="translate(0, 114)">
      <circle cx="5" cy="5" r="4" fill="#C96442"/>
      <text x="16" y="8" font-family="'JetBrains Mono', sans-serif" font-size="9.5" font-weight="bold" fill="#7A7167" letter-spacing="1">PROJELERE AÇIĞIM</text>
    </g>

    <!-- Paragraf ve Büyütülmüş Baş Harf (Drop Cap 'F') -->
    <g transform="translate(0, 142)">
      <text x="0" y="30" font-family="'Source Serif 4', Georgia, serif" font-size="44" font-style="italic" fill="#C96442">F</text>
      <text x="26" y="13" font-family="'Geist', sans-serif" font-size="11.5" fill="#4A4540">ikirleri akılda kalan web sitelerine dönüştürüyorum — net, hızlı ve</text>
      <text x="26" y="29" font-family="'Geist', sans-serif" font-size="11.5" fill="#4A4540">her cihazda. Tasarım ve kod tek elden: ilk taslaktan gerçek</text>
      <text x="0" y="47" font-family="'Geist', sans-serif" font-size="11.5" fill="#4A4540">zamanlı 3D ve motion tasarıma, oradan temiz bir yayına kadar —</text>
      <text x="0" y="63" font-family="'Geist', sans-serif" font-size="11.5" fill="#4A4540">birebir ilgiyle ve hazır şablon olmadan.</text>
    </g>

    <!-- 3 Buton: ÇALIŞMALARIM, E-POSTA, ÜCRETSİZ ÖN GÖRÜŞME -->
    <g transform="translate(0, 230)">
      <!-- 1. Buton: ÇALIŞMALARIM -->
      <rect x="110" y="0" width="116" height="34" rx="4" fill="#211F1C"/>
      <text x="168" y="21" font-family="'JetBrains Mono', sans-serif" font-size="10" font-weight="bold" fill="#F4EFE6" text-anchor="middle">ÇALIŞMALARIM ↗</text>

      <!-- 2. Buton: E-POSTA -->
      <rect x="234" y="0" width="82" height="34" rx="4" fill="#FBF8F2" stroke="#D6C9B5"/>
      <text x="275" y="21" font-family="'JetBrains Mono', sans-serif" font-size="10" font-weight="bold" fill="#211F1C" text-anchor="middle">E-POSTA ↓</text>

      <!-- 3. Buton: ÜCRETSİZ ÖN GÖRÜŞME · 15 DK. -->
      <rect x="96" y="42" width="220" height="34" rx="4" fill="#C96442"/>
      <text x="112" y="63" font-family="'JetBrains Mono', sans-serif" font-size="12" fill="#FFFFFF">☕</text>
      <text x="214" y="63" font-family="'JetBrains Mono', sans-serif" font-size="10" font-weight="bold" fill="#FFFFFF" text-anchor="middle">ÜCRETSİZ ÖN GÖRÜŞME · 15 DK.</text>
    </g>
  </g>

  <!-- ORTA SAĞ EDİTORYAL FOTO & ÇERÇEVE ALANI -->
  <g transform="translate(500, 150)">
    <!-- Arka Siyah Görsel Kartı -->
    <rect x="0" y="0" width="690" height="300" fill="url(#dark-photo-bg)"/>

    <!-- Dikey EKADO Tipografisi -->
    <g font-family="'Source Serif 4', Georgia, serif" font-size="34" fill="#F4EFE6" font-weight="400">
      <text x="24" y="90">A</text>
      <text x="24" y="130">D</text>
      <text x="24" y="170">O</text>
    </g>

    <!-- Oynat Butonu -->
    <circle cx="36" cy="270" r="14" fill="rgba(255, 255, 255, 0.16)" stroke="rgba(255, 255, 255, 0.4)"/>
    <path d="M 33 264 L 42 270 L 33 276 Z" fill="#F4EFE6"/>

    <!-- Ortadaki Şık Fotoğraf Çerçevesi -->
    <g transform="translate(370, 24)">
      <rect x="0" y="0" width="94" height="240" fill="#1C1C20" stroke="#D6C9B5" stroke-width="1.5"/>
      <line x1="47" y1="0" x2="47" y2="240" stroke="#D6C9B5" stroke-dasharray="3 3"/>
      <!-- Portre Çizimi (Fotoğrafın sanatsal tasviri) -->
      <circle cx="47" cy="80" r="24" fill="#3A3834"/>
      <ellipse cx="47" cy="84" rx="14" ry="16" fill="#F4EFE6" opacity="0.8"/>
      <!-- Gözlük -->
      <rect x="36" y="78" width="10" height="6" rx="2" fill="none" stroke="#211F1C" stroke-width="1.5"/>
      <rect x="48" y="78" width="10" height="6" rx="2" fill="none" stroke="#211F1C" stroke-width="1.5"/>
      <line x1="46" y1="81" x2="48" y2="81" stroke="#211F1C" stroke-width="1.5"/>
      <!-- Takım Elbise -->
      <path d="M 23 150 L 47 114 L 71 150 Z" fill="#111114"/>
      <path d="M 47 114 L 47 140" stroke="#FFFFFF" stroke-width="1.5"/>
    </g>

    <!-- Sağ Alt İbare -->
    <text x="660" y="278" font-family="'JetBrains Mono', sans-serif" font-size="9" font-weight="bold" fill="#7A7167" letter-spacing="1" text-anchor="end">WEB GELİŞTİRİCİ — ZÜRİH · İSVİÇRE</text>
    <text x="660" y="24" font-family="'JetBrains Mono', sans-serif" font-size="9" font-weight="bold" fill="#7A7167" letter-spacing="1" text-anchor="end">SAYI 01 · 2026</text>

    <!-- Üstte Yüzen Chat Kutusu Kapsülü (EKADO'ya bir şey sor...) -->
    <g transform="translate(380, -2)" filter="url(#soft-shadow)">
      <rect x="0" y="0" width="220" height="34" rx="17" fill="#FFFFFF" stroke="#E4DACB"/>
      <text x="18" y="21" font-family="'Geist', sans-serif" font-size="11" fill="#7A7167">EKADO'ya bir şey sor...</text>
      <circle cx="180" cy="17" r="10" fill="#E8DFD3"/>
      <text x="180" y="21" font-family="'JetBrains Mono', sans-serif" font-size="11" fill="#C96442" text-anchor="middle" font-weight="bold">→</text>
      <text x="202" y="21" font-family="'JetBrains Mono', sans-serif" font-size="11" fill="#7A7167" text-anchor="middle">✕</text>
    </g>
  </g>

  <!-- ALT BÖLÜM: 3 KART (FOTOĞRAF, EDİTORYAL ALINTI, METRİKLER) -->
  <!-- 1. Sol: Tipografi/Matbaa Fotoğraf Kartı -->
  <g transform="translate(80, 470)">
    <rect x="0" y="0" width="400" height="114" fill="#0C0E11"/>
    <!-- Matbaa harfleri dokusu tasviri -->
    <g font-family="'Source Serif 4', Georgia, serif" font-size="28" fill="#2E343A" font-weight="900" letter-spacing="6">
      <text x="20" y="44">H A R F</text>
      <text x="140" y="74">D O K U</text>
      <text x="40" y="96">T Y P O</text>
    </g>
    <!-- Alt Etiketler -->
    <text x="16" y="104" font-family="'JetBrains Mono', sans-serif" font-size="8.5" font-weight="bold" fill="#F4EFE6" letter-spacing="1">WEB GELİŞTİRİCİ</text>
    <text x="384" y="104" font-family="'JetBrains Mono', sans-serif" font-size="8.5" font-weight="bold" fill="#7A7167" letter-spacing="1" text-anchor="end">PATRICK FORE / UNSPLASH</text>
  </g>

  <!-- 2. Orta: Sıcak Kağıt Üzerine Editoryal Alıntı -->
  <g transform="translate(488, 470)">
    <rect x="0" y="0" width="360" height="114" fill="#EDE4D8" stroke="#D6C9B5" stroke-width="0.5"/>
    <text x="20" y="30" font-family="'Source Serif 4', Georgia, serif" font-size="26" fill="#C96442">“</text>
    <text x="180" y="52" font-family="'Source Serif 4', Georgia, serif" font-size="20" font-style="italic" fill="#211F1C" text-anchor="middle">Çok okuyan değil,</text>
    <text x="180" y="74" font-family="'Source Serif 4', Georgia, serif" font-size="20" font-style="italic" fill="#211F1C" text-anchor="middle">çok gezen bilir.</text>
    <text x="340" y="104" font-family="'JetBrains Mono', sans-serif" font-size="9.5" fill="#7A7167" letter-spacing="1" text-anchor="end">— EKADO · ZÜRİH</text>
  </g>

  <!-- 3. Sağ: 4'lü Metrik Kartları -->
  <g transform="translate(856, 470)">
    <rect x="0" y="0" width="344" height="114" fill="#F5EFE6" stroke="#D6C9B5" stroke-width="0.5"/>
    
    <!-- Dikey & Yatay Ayırıcı Çizgiler -->
    <line x1="114" y1="0" x2="114" y2="114" stroke="#D6C9B5" stroke-width="0.5"/>
    <line x1="228" y1="0" x2="228" y2="114" stroke="#D6C9B5" stroke-width="0.5"/>

    <!-- Metrik 01 -->
    <g transform="translate(14, 18)">
      <text x="0" y="8" font-family="'JetBrains Mono', sans-serif" font-size="9" fill="#7A7167">01</text>
      <text x="0" y="38" font-family="'Source Serif 4', Georgia, serif" font-size="26" font-weight="700" fill="#211F1C">20<tspan font-size="18" fill="#C96442">+</tspan></text>
      <text x="0" y="52" font-family="'JetBrains Mono', sans-serif" font-size="8" font-weight="bold" fill="#7A7167" letter-spacing="1">YIL DENEYİM</text>
    </g>

    <!-- Metrik 02 -->
    <g transform="translate(128, 18)">
      <text x="0" y="8" font-family="'JetBrains Mono', sans-serif" font-size="9" fill="#7A7167">02</text>
      <text x="0" y="38" font-family="'Source Serif 4', Georgia, serif" font-size="26" font-weight="700" fill="#211F1C">35</text>
      <text x="0" y="52" font-family="'JetBrains Mono', sans-serif" font-size="8" font-weight="bold" fill="#7A7167" letter-spacing="1">CANLI PROJE</text>
    </g>

    <!-- Metrik 03 -->
    <g transform="translate(242, 18)">
      <text x="0" y="8" font-family="'JetBrains Mono', sans-serif" font-size="9" fill="#7A7167">03</text>
      <text x="0" y="38" font-family="'Source Serif 4', Georgia, serif" font-size="26" font-weight="700" fill="#211F1C">3</text>
      <text x="0" y="52" font-family="'JetBrains Mono', sans-serif" font-size="8" font-weight="bold" fill="#7A7167" letter-spacing="1">DİL</text>
    </g>
  </g>

  <!-- EN ALT FOOTER BARI (TERRACOTTA) -->
  <g transform="translate(0, 592)">
    <rect x="0" y="0" width="${width}" height="38" fill="url(#terracotta-header)"/>
    <text x="76" y="24" font-family="'JetBrains Mono', sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF">© 2026 EKADO Design · EKADO Firma</text>
    <text x="600" y="24" font-family="'JetBrains Mono', sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Zürih · İsviçre | Künye Gizlilik</text>
    <text x="1176" y="24" font-family="'JetBrains Mono', sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="end">info@ekado.ch</text>
  </g>
</svg>
`;

async function run() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const pngBuffer = await sharp(Buffer.from(svg))
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();

  const ogPath = path.join(publicDir, 'og-image.png');
  fs.writeFileSync(ogPath, pngBuffer);
  console.log(`Successfully generated Claude theme ${ogPath} (${pngBuffer.length} bytes)`);

  const distDir = path.resolve('dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'og-image.png'), pngBuffer);
    console.log(`Copied to dist/og-image.png`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
