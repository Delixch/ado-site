import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// WhatsApp ve OpenGraph için en ideal format: 1200 x 630 piksel
const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#02080D"/>
      <stop offset="50%" stop-color="#050E15"/>
      <stop offset="100%" stop-color="#010407"/>
    </linearGradient>

    <linearGradient id="cyan-glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00F0FF" stop-opacity="0.95"/>
      <stop offset="50%" stop-color="#00C8E6" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#0080A0" stop-opacity="0.6"/>
    </linearGradient>

    <linearGradient id="ribbon-glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00F0FF" stop-opacity="0.75"/>
      <stop offset="35%" stop-color="#00D2F0" stop-opacity="0.5"/>
      <stop offset="70%" stop-color="#0088AA" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#004455" stop-opacity="0.0"/>
    </linearGradient>

    <linearGradient id="card-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0C1A24" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#071018" stop-opacity="0.92"/>
    </linearGradient>

    <linearGradient id="cyan-bar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00E5FF"/>
      <stop offset="100%" stop-color="#00B4D8"/>
    </linearGradient>

    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <filter id="soft-glow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Arka Plan -->
  <rect width="${width}" height="${height}" fill="url(#bg-grad)"/>

  <!-- Izgara Çizgileri (Teknik & Mimari Izgara Deseni) -->
  <g stroke="#00F0FF" stroke-opacity="0.04" stroke-width="1">
    <line x1="280" y1="0" x2="280" y2="600"/>
    <line x1="720" y1="0" x2="720" y2="600"/>
    <line x1="940" y1="0" x2="940" y2="600"/>
    <line x1="0" y1="64" x2="1200" y2="64"/>
    <line x1="280" y1="380" x2="1200" y2="380"/>
  </g>

  <!-- Çapraz Işık Şeridi (3D Glowing Cyan Ribbon) -->
  <path d="M 680 -40 Q 640 180 540 320 T 420 640 L 490 640 Q 600 360 700 200 T 750 -40 Z" fill="url(#ribbon-glow)" filter="url(#glow)"/>
  
  <!-- Ribbon Üzerindeki Tipografik Detaylar -->
  <g font-family="monospace" font-size="12" fill="#00F0FF" opacity="0.6" font-weight="bold">
    <text x="690" y="80">A</text>
    <text x="660" y="125">A D</text>
    <text x="635" y="160">A D O</text>
    <text x="590" y="240">Z U E R I C H</text>
  </g>

  <!-- SOL KENAR ÇUBUĞU (SIDEBAR) -->
  <rect x="0" y="0" width="280" height="600" fill="#030A10" fill-opacity="0.95"/>
  <line x1="280" y1="0" x2="280" y2="600" stroke="#00F0FF" stroke-opacity="0.15" stroke-width="1"/>

  <!-- Logo Bölümü -->
  <g transform="translate(24, 22)">
    <rect x="0" y="0" width="18" height="18" fill="#00F0FF" rx="3"/>
    <text x="26" y="15" font-family="'JetBrains Mono', 'Geist', sans-serif" font-weight="900" font-size="15" fill="#FFFFFF" letter-spacing="1.5">ADO DESIGN</text>
    <rect x="180" y="3" width="56" height="16" rx="8" fill="#061A26" stroke="#00F0FF" stroke-opacity="0.3"/>
    <text x="208" y="14" font-family="'JetBrains Mono', sans-serif" font-size="8" fill="#00F0FF" text-anchor="middle" font-weight="bold">ZÜRIH</text>
  </g>

  <!-- Sidebar Navigasyon Öğeleri (3 Ana Bölüm) -->
  <g transform="translate(18, 70)">
    <!-- 1. BÖLÜM: ADO DESIGN -->
    <rect x="0" y="0" width="244" height="150" rx="8" fill="#061824" stroke="#00F0FF" stroke-opacity="0.3"/>
    <circle cx="14" cy="18" r="4" fill="#00F0FF"/>
    <text x="26" y="22" font-family="'JetBrains Mono', sans-serif" font-size="10" font-weight="bold" fill="#00F0FF" letter-spacing="1">1. ADO DESIGN · PORTFOLYO</text>
    <text x="14" y="44" font-family="'Geist', sans-serif" font-size="11" fill="#FFFFFF" font-weight="bold">Web Geliştirici &amp; Modern UI/UX</text>
    <text x="14" y="62" font-family="'Geist', sans-serif" font-size="10" fill="#8BA4B4">• Özel Tasarım Web Siteleri</text>
    <text x="14" y="78" font-family="'Geist', sans-serif" font-size="10" fill="#8BA4B4">• 3D &amp; Motion Deneyimleri</text>
    <text x="14" y="94" font-family="'Geist', sans-serif" font-size="10" fill="#8BA4B4">• 15+ Canlı Proje &amp; GitHub Vitrini</text>
    <text x="14" y="110" font-family="'Geist', sans-serif" font-size="10" fill="#8BA4B4">• İsviçre Standartlarında Temiz Kod</text>
    <rect x="14" y="122" width="216" height="18" rx="4" fill="#00F0FF" fill-opacity="0.15"/>
    <text x="122" y="134" font-family="'JetBrains Mono', sans-serif" font-size="8.5" fill="#00F0FF" text-anchor="middle" font-weight="bold">PORTFOLYO VE PROJELERİ İNCELE →</text>

    <!-- 2. BÖLÜM: ADO FIRMA -->
    <rect x="0" y="162" width="244" height="154" rx="8" fill="#04121C" stroke="#00F0FF" stroke-opacity="0.2"/>
    <circle cx="14" cy="180" r="4" fill="#00E5FF"/>
    <text x="26" y="184" font-family="'JetBrains Mono', sans-serif" font-size="10" font-weight="bold" fill="#00E5FF" letter-spacing="1">2. ADO FIRMA · ŞİRKETLER</text>
    <text x="14" y="206" font-family="'Geist', sans-serif" font-size="11" fill="#FFFFFF" font-weight="bold">Dijital Şirket Operasyon Merkezi</text>
    <text x="14" y="224" font-family="'Geist', sans-serif" font-size="10" fill="#8BA4B4">• Kafe &amp; Restoran Masa/Sipariş Takibi</text>
    <text x="14" y="240" font-family="'Geist', sans-serif" font-size="10" fill="#8BA4B4">• Personel Vardiya &amp; Çalışma Çizelgesi</text>
    <text x="14" y="256" font-family="'Geist', sans-serif" font-size="10" fill="#8BA4B4">• Kasa, Z-Raporu &amp; Ön Muhasebe</text>
    <text x="14" y="272" font-family="'Geist', sans-serif" font-size="10" fill="#8BA4B4">• Start · Betrieb · Komplett Paketleri</text>
    <rect x="14" y="286" width="216" height="18" rx="4" fill="#00F0FF" fill-opacity="0.15"/>
    <text x="122" y="298" font-family="'JetBrains Mono', sans-serif" font-size="8.5" fill="#00F0FF" text-anchor="middle" font-weight="bold">İŞLETME ÇÖZÜMLERİNİ KEŞFET →</text>

    <!-- 3. BÖLÜM: ADO INSTAOTO -->
    <rect x="0" y="328" width="244" height="154" rx="8" fill="#04121C" stroke="#00F0FF" stroke-opacity="0.2"/>
    <circle cx="14" cy="346" r="4" fill="#00E5FF"/>
    <text x="26" y="350" font-family="'JetBrains Mono', sans-serif" font-size="10" font-weight="bold" fill="#00E5FF" letter-spacing="1">3. ADO INSTAOTO · OTOMASYON</text>
    <text x="14" y="372" font-family="'Geist', sans-serif" font-size="11" fill="#FFFFFF" font-weight="bold">Akıllı Instagram Mesaj &amp; Müşteri</text>
    <text x="14" y="390" font-family="'Geist', sans-serif" font-size="10" fill="#8BA4B4">• 7/24 Otomatik DM &amp; Yorum Yanıtları</text>
    <text x="14" y="406" font-family="'Geist', sans-serif" font-size="10" fill="#8BA4B4">• Hikaye Tetikleyicileri &amp; Link İletimi</text>
    <text x="14" y="422" font-family="'Geist', sans-serif" font-size="10" fill="#8BA4B4">• Müşteri Randevu &amp; Teklif Toplama</text>
    <text x="14" y="438" font-family="'Geist', sans-serif" font-size="10" fill="#8BA4B4">• %100 Resmi Meta API Güvencesi</text>
    <rect x="14" y="452" width="216" height="18" rx="4" fill="#00F0FF" fill-opacity="0.15"/>
    <text x="122" y="464" font-family="'JetBrains Mono', sans-serif" font-size="8.5" fill="#00F0FF" text-anchor="middle" font-weight="bold">INSTAGRAM OTOMASYONUNU GÖR →</text>
  </g>

  <!-- ÜST BAR (TOPBAR) -->
  <g transform="translate(304, 14)">
    <rect x="0" y="0" width="872" height="42" rx="12" fill="#051420" fill-opacity="0.9" stroke="#00F0FF" stroke-opacity="0.25"/>
    <circle cx="20" cy="21" r="4" fill="#00F0FF"/>
    <text x="32" y="25" font-family="'JetBrains Mono', sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF" letter-spacing="0.5">ADO DESIGN</text>
    <text x="120" y="25" font-family="'JetBrains Mono', sans-serif" font-size="11" fill="#8BA4B4">|</text>
    <text x="136" y="25" font-family="'Geist', sans-serif" font-size="12" fill="#00F0FF" font-weight="600">Başlangıç · Portfolyo</text>

    <!-- Sağ Araçlar -->
    <rect x="660" y="8" width="108" height="26" rx="6" fill="#0B2332" stroke="#00F0FF" stroke-opacity="0.3"/>
    <circle cx="674" cy="21" r="4" fill="#00F0FF"/>
    <text x="686" y="25" font-family="'JetBrains Mono', sans-serif" font-size="10" fill="#FFFFFF">Camgöbeği ▾</text>

    <rect x="780" y="8" width="76" height="26" rx="6" fill="#0B2332" stroke="#00F0FF" stroke-opacity="0.3"/>
    <text x="798" y="25" font-family="'JetBrains Mono', sans-serif" font-size="10" fill="#8BA4B4">DE</text>
    <text x="822" y="25" font-family="'JetBrains Mono', sans-serif" font-size="10" fill="#00F0FF" font-weight="bold">TR</text>
  </g>

  <!-- ANA İÇERİK ALANI (HERO) -->
  <g transform="translate(304, 76)">
    <!-- Folio & Kicker -->
    <text x="0" y="24" font-family="'JetBrains Mono', sans-serif" font-size="28" font-weight="900" fill="#00F0FF">00</text>
    <text x="50" y="16" font-family="'JetBrains Mono', sans-serif" font-size="10" font-weight="bold" fill="#8BA4B4" letter-spacing="1.5">ADO DESIGN · PORTFOLYO</text>
    <text x="50" y="32" font-family="'Source Serif 4', Georgia, serif" font-size="18" font-style="italic" fill="#FFFFFF">Web Geliştirici <tspan fill="#00F0FF">Zürih · İsviçre</tspan></text>

    <!-- Büyük Manşet -->
    <text x="0" y="90" font-family="'Anton', 'Geist', sans-serif" font-size="44" font-weight="900" fill="#FFFFFF" letter-spacing="1">İZ BIRAKAN <tspan fill="#00F0FF" filter="url(#soft-glow)">DİJİTAL</tspan></text>
    <text x="0" y="136" font-family="'Anton', 'Geist', sans-serif" font-size="44" font-weight="900" fill="#FFFFFF" letter-spacing="1">DENEYİMLER İNŞA EDİYORUM</text>

    <!-- Alt Açıklama -->
    <text x="0" y="176" font-family="'Geist', sans-serif" font-size="13" fill="#D0E2EC" font-weight="400">Fikirleri akılda kalan web sitelerine dönüştürüyorum — net, hızlı ve her cihazda.</text>
    <text x="0" y="196" font-family="'Geist', sans-serif" font-size="13" fill="#9CB2C0">Tasarım ve kod tek elden: 3D vitrinlerden işletme otomasyonuna anahtar teslim çözümler.</text>

    <!-- Aksiyon Butonları -->
    <g transform="translate(0, 222)">
      <rect x="0" y="0" width="140" height="38" rx="6" fill="#FFFFFF"/>
      <text x="70" y="23" font-family="'JetBrains Mono', sans-serif" font-size="11" font-weight="bold" fill="#02080D" text-anchor="middle">ÇALIŞMALARIM ↗</text>

      <rect x="150" y="0" width="110" height="38" rx="6" fill="#071824" stroke="#00F0FF" stroke-opacity="0.4"/>
      <text x="205" y="23" font-family="'JetBrains Mono', sans-serif" font-size="11" font-weight="bold" fill="#00F0FF" text-anchor="middle">E-POSTA ↓</text>

      <rect x="270" y="0" width="220" height="38" rx="6" fill="#00F0FF"/>
      <text x="380" y="23" font-family="'JetBrains Mono', sans-serif" font-size="11" font-weight="bold" fill="#02080D" text-anchor="middle">ÜCRETSİZ ÖN GÖRÜŞME · 15 DK.</text>
    </g>
  </g>

  <!-- SAĞ ÜST MASKOT & ROBOT KARTI -->
  <g transform="translate(860, 76)">
    <rect x="0" y="0" width="316" height="200" rx="12" fill="url(#card-grad)" stroke="#00F0FF" stroke-opacity="0.3"/>
    
    <!-- Sevimli 3D Robot Görsel Çizimi -->
    <g transform="translate(210, 40)">
      <!-- Robot Gövde -->
      <rect x="0" y="32" width="60" height="50" rx="14" fill="#0D2230" stroke="#00F0FF" stroke-width="2"/>
      <rect x="12" y="44" width="36" height="24" rx="6" fill="#020C12" stroke="#00F0FF" stroke-width="1"/>
      <circle cx="30" cy="56" r="5" fill="#00F0FF" filter="url(#glow)"/>
      <!-- Robot Kafa -->
      <rect x="-6" y="-12" width="72" height="42" rx="14" fill="#0F283A" stroke="#00F0FF" stroke-width="2.5"/>
      <rect x="2" y="-4" width="56" height="26" rx="8" fill="#010A10"/>
      <!-- Gözler -->
      <ellipse cx="18" cy="8" rx="8" ry="7" fill="#00F0FF" filter="url(#glow)"/>
      <ellipse cx="42" cy="8" rx="8" ry="7" fill="#00F0FF" filter="url(#glow)"/>
      <!-- Kulaklar/Anten -->
      <line x1="30" y1="-12" x2="30" y2="-22" stroke="#00F0FF" stroke-width="3"/>
      <circle cx="30" cy="-24" r="4" fill="#00F0FF" filter="url(#glow)"/>
    </g>

    <g transform="translate(18, 24)">
      <rect x="0" y="0" width="70" height="18" rx="4" fill="#00F0FF" fill-opacity="0.15"/>
      <text x="35" y="13" font-family="'JetBrains Mono', sans-serif" font-size="9" fill="#00F0FF" font-weight="bold" text-anchor="middle">AI ASİSTAN</text>
      <text x="0" y="46" font-family="'Geist', sans-serif" font-size="15" font-weight="bold" fill="#FFFFFF">ADO Robot</text>
      <text x="0" y="66" font-family="'Geist', sans-serif" font-size="11" fill="#8BA4B4">Sayfada konuşabilen,</text>
      <text x="0" y="82" font-family="'Geist', sans-serif" font-size="11" fill="#8BA4B4">soruları yanıtlayan</text>
      <text x="0" y="98" font-family="'Geist', sans-serif" font-size="11" fill="#8BA4B4">akıllı asistanınız.</text>

      <rect x="0" y="116" width="160" height="24" rx="4" fill="#08202F" stroke="#00F0FF" stroke-opacity="0.3"/>
      <text x="80" y="132" font-family="'JetBrains Mono', sans-serif" font-size="9.5" fill="#00F0FF" text-anchor="middle" font-weight="bold">SESLİ &amp; YAZILI YANIT</text>
    </g>
  </g>

  <!-- SAĞ İKİNCİ KART: EDİTORYAL ALINTI -->
  <g transform="translate(860, 290)">
    <rect x="0" y="0" width="316" height="88" rx="10" fill="#04121C" stroke="#00F0FF" stroke-opacity="0.2"/>
    <text x="18" y="32" font-family="'Source Serif 4', Georgia, serif" font-size="17" font-style="italic" fill="#00F0FF">“Damlaya damlaya göl olur.”</text>
    <text x="18" y="58" font-family="'JetBrains Mono', sans-serif" font-size="10.5" fill="#8BA4B4" letter-spacing="1">— ADO · ZÜRİH, İSVİÇRE</text>
  </g>

  <!-- ALT 4'LÜ METRİK & GÜVEN KARTLARI -->
  <g transform="translate(304, 396)">
    <!-- Kart 1 -->
    <rect x="0" y="0" width="206" height="106" rx="8" fill="url(#card-grad)" stroke="#00F0FF" stroke-opacity="0.2"/>
    <text x="16" y="24" font-family="'JetBrains Mono', sans-serif" font-size="11" fill="#8BA4B4" font-weight="bold">01</text>
    <text x="16" y="64" font-family="'Anton', sans-serif" font-size="34" fill="#FFFFFF">20<tspan fill="#00F0FF" font-size="26">+</tspan></text>
    <text x="16" y="88" font-family="'JetBrains Mono', sans-serif" font-size="9.5" fill="#8BA4B4" font-weight="bold" letter-spacing="1">YIL DENEYİM</text>

    <!-- Kart 2 -->
    <rect x="222" y="0" width="206" height="106" rx="8" fill="url(#card-grad)" stroke="#00F0FF" stroke-opacity="0.2"/>
    <text x="238" y="24" font-family="'JetBrains Mono', sans-serif" font-size="11" fill="#8BA4B4" font-weight="bold">02</text>
    <text x="238" y="64" font-family="'Anton', sans-serif" font-size="34" fill="#FFFFFF">35<tspan fill="#00F0FF" font-size="26">+</tspan></text>
    <text x="238" y="88" font-family="'JetBrains Mono', sans-serif" font-size="9.5" fill="#8BA4B4" font-weight="bold" letter-spacing="1">CANLI PROJE</text>

    <!-- Kart 3 -->
    <rect x="444" y="0" width="206" height="106" rx="8" fill="url(#card-grad)" stroke="#00F0FF" stroke-opacity="0.2"/>
    <text x="460" y="24" font-family="'JetBrains Mono', sans-serif" font-size="11" fill="#8BA4B4" font-weight="bold">03</text>
    <text x="460" y="64" font-family="'Anton', sans-serif" font-size="34" fill="#FFFFFF">3</text>
    <text x="460" y="88" font-family="'JetBrains Mono', sans-serif" font-size="9.5" fill="#8BA4B4" font-weight="bold" letter-spacing="1">DİL (DE · TR · EN)</text>

    <!-- Kart 4 -->
    <rect x="666" y="0" width="206" height="106" rx="8" fill="url(#card-grad)" stroke="#00F0FF" stroke-opacity="0.2"/>
    <text x="682" y="24" font-family="'JetBrains Mono', sans-serif" font-size="11" fill="#8BA4B4" font-weight="bold">04</text>
    <text x="682" y="64" font-family="'Anton', sans-serif" font-size="34" fill="#FFFFFF">52</text>
    <text x="682" y="88" font-family="'JetBrains Mono', sans-serif" font-size="9.5" fill="#8BA4B4" font-weight="bold" letter-spacing="1">ARŞİV ÇALIŞMASI</text>
  </g>

  <!-- EN ALT DURUM ÇUBUĞU (FOOTER BAR) -->
  <g transform="translate(0, 584)">
    <rect x="0" y="0" width="1200" height="46" fill="url(#cyan-bar)"/>
    <text x="24" y="28" font-family="'JetBrains Mono', sans-serif" font-size="11.5" font-weight="bold" fill="#010A10">© 2026 ADO Design · ADO Firma</text>
    <text x="560" y="28" font-family="'JetBrains Mono', sans-serif" font-size="11.5" font-weight="bold" fill="#010A10" text-anchor="middle">Zürih · İsviçre | 3 Bölüm: Design · Firma · InstaOto</text>
    <text x="1176" y="28" font-family="'JetBrains Mono', sans-serif" font-size="11.5" font-weight="bold" fill="#010A10" text-anchor="end">xdd@hotmail.com</text>
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
  console.log(`Successfully generated ${ogPath} (${pngBuffer.length} bytes)`);

  // Ayrıca dist klasörüne de kopyala (varsa)
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
