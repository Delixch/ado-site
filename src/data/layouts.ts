import { GridLayout } from '../types/layout';

export const standardBlocks = {
  header: {
    area: 'header',
    name: 'header',
    color: '#93c5fd', // Light Blue
    textColor: '#1e3a8a',
    borderColor: '#60a5fa',
    accentBg: '#bfdbfe',
    description: 'Üst Başlık Alanı (Logo, Menü, Profil)',
    iconName: 'LayoutTemplate',
    mockContent: {
      headline: 'Başlık & Marka',
      tag: 'Global Header',
      items: ['Ana Sayfa', 'Katalog', 'Dokümanlar', 'İletişim'],
      stat: 'v2.4 Ready'
    }
  },
  nav: {
    area: 'nav',
    name: 'nav',
    color: '#6ee7b7', // Mint Green
    textColor: '#064e3b',
    borderColor: '#34d399',
    accentBg: '#a7f3d0',
    description: 'Navigasyon / Gezinme Menüsü (Linkler, Filtreler)',
    iconName: 'Compass',
    mockContent: {
      headline: 'Gezinme Menüsü',
      tag: 'Navigation Menu',
      items: ['📊 Panel', '👥 Kullanıcılar', '⚙️ Ayarlar', '🔔 Bildirimler']
    }
  },
  main: {
    area: 'main',
    name: 'main',
    color: '#818cf8', // Indigo
    textColor: '#1e1b4b',
    borderColor: '#6366f1',
    accentBg: '#c7d2fe',
    description: 'Birincil İçerik Alanı (Veri akışı, Kartlar, Gövde)',
    iconName: 'Layers',
    mockContent: {
      headline: 'Ana İçerik Bölgesi',
      tag: 'Primary Main Content',
      items: ['Dinamik veri akışı', 'Etkileşimli görselleştirme', 'Form bileşenleri'],
      stat: '1,420 Aktif Öğe'
    }
  },
  aside: {
    area: 'aside',
    name: 'aside',
    color: '#fde047', // Warm Yellow
    textColor: '#713f12',
    borderColor: '#facc15',
    accentBg: '#fef08a',
    description: 'Kenar Çubuğu / Yan Panel (Widgetlar, İpuçları)',
    iconName: 'PanelRight',
    mockContent: {
      headline: 'Kenar Widget Paneli',
      tag: 'Complementary Aside',
      items: ['Son Aktiviteler', 'Hızlı İpuçları', 'Trend Etiketler'],
      stat: '%98 Başarım'
    }
  },
  footer: {
    area: 'footer',
    name: 'footer',
    color: '#f472b6', // Pink/Rose
    textColor: '#831843',
    borderColor: '#f43f5e',
    accentBg: '#fbcfe8',
    description: 'Alt Bilgi Alanı (Telif Hakları, Linkler, Sosyal)',
    iconName: 'FoldHorizontal',
    mockContent: {
      headline: 'Alt Bilgi (Footer)',
      tag: 'Site Footer',
      items: ['Gizlilik Politikası', 'Kullanım Şartları', 'API Dökümanı', '2026 © Tüm Hakları Saklıdır']
    }
  }
};

export const MENU_ITEMS = [
  { id: 'holyGrail', label: '📖 Holy grail', icon: 'LayoutGrid', badge: '1fr 2fr 1fr' },
  { id: 'sidebar', label: '📑 Sidebar', icon: 'BoxSelect', badge: '1fr 3fr' },
  { id: 'dashboard', label: '📊 Dashboard', icon: 'Sliders', badge: '3-Panel' },
  { id: 'magazine', label: '📰 Magazine', icon: 'BookOpen', badge: 'Çoklu Sütun' },
  { id: 'hero', label: '🚀 Hero', icon: 'Sparkles', badge: 'Landing' },
  { id: 'ecommerce', label: '🛍️ E-Commerce', icon: 'Layers', badge: 'Katalog' },
  { id: 'appShell', label: '⚡ App Shell', icon: 'SlidersHorizontal', badge: 'Tam Ekran' },
];

export const LAYOUT_PRESETS: Record<string, GridLayout> = {
  holyGrail: {
    id: 'holyGrail',
    name: 'Holy grail',
    icon: '📖',
    category: 'classic',
    description: 'Web tasarımının en ikonik 3 sütunlu başlık-içerik-altbilgi düzeni.',
    cols: '1fr 2fr 1fr',
    rows: '1fr 3fr 1fr',
    gap: '12px',
    placeItems: 'stretch',
    areas: [
      '"header header header"',
      '"nav    main   aside"',
      '"footer footer footer"'
    ],
    tailwindCols: 'grid-cols-[1fr_2fr_1fr]',
    tailwindRows: 'grid-rows-[1fr_3fr_1fr]',
    blocks: [
      standardBlocks.header,
      standardBlocks.nav,
      standardBlocks.main,
      standardBlocks.aside,
      standardBlocks.footer
    ]
  },
  sidebar: {
    id: 'sidebar',
    name: 'Sidebar',
    icon: '📑',
    category: 'classic',
    description: 'Sol navigasyon ve geniş çalışma alanına sahip modern SaaS düzeni.',
    cols: '1fr 3fr',
    rows: '1fr 4fr 1fr',
    gap: '12px',
    placeItems: 'stretch',
    areas: [
      '"header header"',
      '"nav    main"',
      '"footer footer"'
    ],
    tailwindCols: 'grid-cols-[1fr_3fr]',
    tailwindRows: 'grid-rows-[1fr_4fr_1fr]',
    blocks: [
      standardBlocks.header,
      standardBlocks.nav,
      standardBlocks.main,
      standardBlocks.footer
    ]
  },
  dashboard: {
    id: 'dashboard',
    name: 'Dashboard',
    icon: '📊',
    category: 'dashboard',
    description: 'Analitik metrikler, KPI özetleri ve sağ aksiyon panelli kurumsal panel.',
    cols: '1fr 2fr 1fr',
    rows: '1fr 2fr 1fr',
    gap: '12px',
    placeItems: 'stretch',
    areas: [
      '"header header aside"',
      '"nav    main   aside"',
      '"footer footer footer"'
    ],
    tailwindCols: 'grid-cols-[1fr_2fr_1fr]',
    tailwindRows: 'grid-rows-[1fr_2fr_1fr]',
    blocks: [
      standardBlocks.header,
      standardBlocks.nav,
      standardBlocks.main,
      standardBlocks.aside,
      standardBlocks.footer
    ]
  },
  magazine: {
    id: 'magazine',
    name: 'Magazine',
    icon: '📰',
    category: 'editorial',
    description: 'Asimetrik haber ve dergi tarzı çoklu sütunlu görsel yayın şablonu.',
    cols: '2fr 1fr 1fr',
    rows: '1fr 2fr 1fr',
    gap: '12px',
    placeItems: 'stretch',
    areas: [
      '"header header header"',
      '"main   main   aside"',
      '"footer nav    aside"'
    ],
    tailwindCols: 'grid-cols-[2fr_1fr_1fr]',
    tailwindRows: 'grid-rows-[1fr_2fr_1fr]',
    blocks: [
      standardBlocks.header,
      standardBlocks.main,
      standardBlocks.aside,
      standardBlocks.nav,
      standardBlocks.footer
    ]
  },
  hero: {
    id: 'hero',
    name: 'Hero',
    icon: '🚀',
    category: 'classic',
    description: 'Landing page karşılama bloğu, aksiyon ve tanıtım kartları düzeni.',
    cols: '1fr 1fr',
    rows: '1fr 3fr 1fr',
    gap: '12px',
    placeItems: 'stretch',
    areas: [
      '"header header"',
      '"main   aside"',
      '"footer nav"'
    ],
    tailwindCols: 'grid-cols-[1fr_1fr]',
    tailwindRows: 'grid-rows-[1fr_3fr_1fr]',
    blocks: [
      standardBlocks.header,
      standardBlocks.main,
      standardBlocks.aside,
      standardBlocks.footer,
      standardBlocks.nav
    ]
  },
  ecommerce: {
    id: 'ecommerce',
    name: 'E-Commerce',
    icon: '🛍️',
    category: 'commerce',
    description: 'Sol filtre sütunu, merkez ürün vitrini ve sağ sepet/özet sütunu.',
    cols: '1fr 3fr 1fr',
    rows: '1fr 4fr 1fr',
    gap: '12px',
    placeItems: 'stretch',
    areas: [
      '"header header header"',
      '"nav    main   aside"',
      '"footer footer footer"'
    ],
    tailwindCols: 'grid-cols-[1fr_3fr_1fr]',
    tailwindRows: 'grid-rows-[1fr_4fr_1fr]',
    blocks: [
      standardBlocks.header,
      { ...standardBlocks.nav, name: 'Filtreler (nav)' },
      { ...standardBlocks.main, name: 'Ürün Vitrini (main)' },
      { ...standardBlocks.aside, name: 'Sepet & Özet (aside)' },
      standardBlocks.footer
    ]
  },
  appShell: {
    id: 'appShell',
    name: 'App Shell',
    icon: '⚡',
    category: 'app',
    description: 'Dikey sol araç çubuğu, üst başlık, geniş çalışma alanı ve bildirim konsolu.',
    cols: '1fr 3fr 1fr',
    rows: '1fr 3fr 1fr',
    gap: '12px',
    placeItems: 'stretch',
    areas: [
      '"nav header aside"',
      '"nav main   aside"',
      '"nav footer footer"'
    ],
    tailwindCols: 'grid-cols-[1fr_3fr_1fr]',
    tailwindRows: 'grid-rows-[1fr_3fr_1fr]',
    blocks: [
      { ...standardBlocks.nav, name: 'Sol Toolbar (nav)' },
      standardBlocks.header,
      standardBlocks.main,
      standardBlocks.aside,
      standardBlocks.footer
    ]
  }
};
