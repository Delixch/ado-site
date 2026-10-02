export type Language = 'de' | 'tr';

export interface ThemeConfig {
  id: string;
  name: {
    de: string;
    tr: string;
  };
  accentColor: string;
  secondaryColor: string;
}

export const THEMES_LIST: ThemeConfig[] = [
  {
    id: 'obsidian-crimson',
    name: {
      de: 'ADO Titan & Flame Orange',
      tr: 'ADO Titanyum & Ateş Turuncusu'
    },
    accentColor: '#ff5a1f',
    secondaryColor: '#00d4ff'
  },
  {
    id: 'noir-gold',
    name: {
      de: 'Cyber Cyan & Electric Blue',
      tr: 'Siber Mavi & Camgöbeği'
    },
    accentColor: '#00d4ff',
    secondaryColor: '#00ff88'
  },
  {
    id: 'cyber-emerald',
    name: {
      de: 'Terminal Emerald Green',
      tr: 'Canlı Zümrüt Yeşili'
    },
    accentColor: '#00ff88',
    secondaryColor: '#00d4ff'
  },
  {
    id: 'solar-orange',
    name: {
      de: 'Amber Gold & Solar',
      tr: 'Metalik Amber & Altın'
    },
    accentColor: '#ffd60a',
    secondaryColor: '#ff5a1f'
  },
  {
    id: 'amethyst-violet',
    name: {
      de: 'Königliches Amethyst & Cyan',
      tr: 'Ametist Moru & Camgöbeği'
    },
    accentColor: '#a855f7',
    secondaryColor: '#00d4ff'
  }
];

export const TRANSLATIONS = {
  de: {
    menu: 'MENÜ',
    discovery: 'PORTFOLIO',
    general: 'STATUS',
    theme: 'Design',
    language: 'Sprache',
    search: 'PROJEKTE & SKILLS SUCHEN...',
    switchAccount: 'Zürich · CH',
    collapse: 'Einklappen',
    expand: 'Ausklappen',
    availableBadge: 'Frei für Projekte',
    locationBadge: 'Zürich · Schweiz',
    quoteLine: '«Siebenmal fallen, achtmal aufstehen.»',
    heroTitle: 'Ich bin ADO, Web-Entwickler in Zürich.',
    heroSubtitle: 'Ich verwandle Ideen in Websites, die man sich merkt – klar, schnell und auf jedem Gerät. Gestaltung und Code aus einer Hand: von der ersten Skizze über Echtzeit-3D und Motion Design bis zum sauberen Deployment – persönlich betreut und ohne Baukasten.',
    menuItems: {
      home: 'Startseite',
      projekte: 'Projekte',
      skills: 'Skills & Leistungen',
      erfahrung: 'Erfahrung',
      lab: 'Inspiration & 3D Lab'
    },
    home: {
      tag: 'WEB-ENTWICKLER IN ZÜRICH',
      role: 'Websites, Echtzeit-3D & Motion Design',
      stats: {
        experience: '20+ Jahre',
        expLabel: 'Digitale Erfahrung',
        performance: '100/100',
        perfLabel: 'Lighthouse Performance',
        builder: '0% Baukasten',
        builderLabel: 'Echte Schweizer Handarbeit'
      },
      philosophyTitle: 'Philosophie & Arbeitsweise',
      philosophyDesc: 'Keine trägen Templates oder Standard-Themes. Jedes Projekt wird von Grund auf mit modernstem React, TypeScript und feinstem CSS massgeschneidert.',
      quickSkills: ['Three.js & WebGL', 'React 19 & Next.js', 'Tailwind CSS', 'Motion Design', 'AI Integration', 'Vercel Deployment']
    },
    projekte: {
      title: 'Ausgewählte Projekte & Arbeiten',
      subtitle: 'Maßgeschneiderte digitale Lösungen für Unternehmen in Zürich und der ganzen Schweiz.',
      items: [
        {
          id: 'p1',
          name: 'Bäckerei Happy & Citybeck',
          category: 'Gastronomie & Handwerk · Zürich',
          desc: 'Kompletter digitaler Markenauftritt mit modernem Design, tagesaktueller Sortimentsübersicht, Filialfinder und optimierter mobiler Benutzerführung.',
          tags: ['React', 'Tailwind CSS', 'SEO', 'Mobile First'],
          metric: 'Ladezeit < 0.6s'
        },
        {
          id: 'p2',
          name: 'Autowerkstatt Service-Portal',
          category: 'Dienstleistung & Automotive',
          desc: 'Kundenfreundliches Terminbuchungs-Portal mit direkter Fahrzeugidentifikation, digitaler Schadensmeldung und SMS/E-Mail Benachrichtigung.',
          tags: ['Next.js', 'TypeScript', 'API Integration', 'Cloud'],
          metric: '+140% Online-Buchungen'
        },
        {
          id: 'p3',
          name: '3D WebGL & AI Agent Lab',
          category: 'Forschung & Next-Gen Web',
          desc: 'Interaktive 3D-Partikelwelten mit flüssigen 60 FPS im Browser, kombiniert mit intelligenten Chat-Agenten und Echtzeit-Physik.',
          tags: ['Three.js', 'GLSL Shader', 'Gemini AI', 'Canvas'],
          metric: '60 FPS Ultra-Smooth'
        },
        {
          id: 'p4',
          name: 'Private & Corporate Websites',
          category: 'Individuelle Web-Lösungen',
          desc: 'High-End Portfolio-Auftritte für anspruchsvolle Kunden mit Fokus auf subtile Mikro-Interaktionen, Barrierefreiheit und maximale Konversion.',
          tags: ['Framer Motion', 'PWA', 'Edge Network', 'Bespoke UI'],
          metric: '100% Barrierefrei'
        }
      ]
    },
    skills: {
      title: 'Kernkompetenzen & Dienstleistungen',
      subtitle: 'Vier Säulen für herausragende digitale Erlebnisse aus einer Hand.',
      pillars: [
        {
          id: 's1',
          title: 'Echtzeit-3D & Motion',
          badge: 'Kernstärke',
          stat: 'Ein Canvas, volle Szene',
          description: 'Partikelszenen, Shader und scroll-getriebene Kamerafahrten — gebaut für flüssige 60 Bilder pro Sekunde, auch auf dem Smartphone.',
          tech: ['Three.js', 'WebGL', 'GLSL Shader', 'Canvas API']
        },
        {
          id: 's2',
          title: 'Frontend-Handwerk',
          badge: 'Oberfläche',
          stat: 'Mobil zuerst (Mobile First)',
          description: 'Sauber getrennte Bausteine, klare Typografie, bedienbar mit Tastatur und Screenreader — nicht nur hübsch, sondern benutzbar.',
          tech: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
        },
        {
          id: 's3',
          title: 'Daten & Betrieb',
          badge: 'Infrastruktur',
          stat: 'Blitzschnell & Sicher',
          description: 'Moderne Cloud-Architektur, Edge-Netzwerke, automatisierte CI/CD-Pipelines und kompromisslose Performance-Optimierung.',
          tech: ['Next.js', 'Vercel Edge', 'REST & GraphQL', 'Lighthouse 100']
        },
        {
          id: 's4',
          title: 'Künstliche Intelligenz im Alltag',
          badge: 'Zukunftsorientiert',
          stat: 'Intelligente Workflows',
          description: 'Sinnvolle Integration von KI-Agenten, Chat-Assistenten und modernen Sprachmodellen, die reale Geschäftsprozesse vereinfachen.',
          tech: ['Gemini API', 'AI Agents', 'Function Calling', 'Vector Search']
        }
      ]
    },
    erfahrung: {
      title: 'Erfahrung & Werdegang',
      subtitle: 'Ein solider Lebenslauf aus echter Praxis, Führungsverantwortung und Leidenschaft für Code.',
      timeline: [
        {
          period: 'seit 2025',
          role: 'Web-Entwickler',
          company: 'Selbständig · ADO Design · Zürich',
          desc: 'Auftritte für Bäckerei, Autowerkstatt und Privatkunden — von der ersten Skizze bis zum Deployment. Eigene Experimente mit Echtzeit-3D und künstlicher Intelligenz.'
        },
        {
          period: '2014 — 2016',
          role: 'Chauffeur',
          company: 'Zidus GmbH Transport, Zürich',
          desc: 'Belieferte die Verkaufsstellen zuverlässig, kontrollierte die tägliche Ladung und sorgte für Pflege und Unterhalt des zugeteilten Fahrzeugs.'
        },
        {
          period: '2014',
          role: 'Administration & Personalwesen',
          company: 'Citybeck AG, Zürich',
          desc: 'Unterstützte Geschäftsleitung und Personalwesen: Lohnzahlungen, Pensionskassenangelegenheiten, Personalunterlagen sowie Ein- und Austritte.'
        },
        {
          period: '2009 — 2013',
          role: 'Geschäftsführung / Nachtschichtleitung',
          company: 'Bäckerei Happy AG, Zürich',
          desc: 'Verantwortlich für Kassenstock, Abrechnung, Einrichtung und Personalwesen. Kundenorientiertes Handeln, Verkaufsbereitschaft und Warenpräsentation.'
        },
        {
          period: '2002 — 2004',
          role: 'Weiterbildung Web Publisher',
          company: 'EB Wolfbach / Web Publisher Zentrum, Zürich',
          desc: 'Einjähriger Lehrgang plus Aufbaukurse: HTML, CSS und JavaScript, PHP, Datenbanken in phpMyAdmin, ActionScript mit Flash sowie Gestaltung und Präsentation.'
        },
        {
          period: '1990 — 1998',
          role: 'Verkäufer',
          company: 'Migros Genossenschaftszentrum, Zürich',
          desc: 'Warenbestellungen, Warenannahme, Aktionsaufbauten, Regalpflege sowie MHD- und Bestandskontrollen — dazu die persönliche Beratung der Kundschaft.'
        }
      ]
    },
    lab: {
      title: '3D WebGL & AI Experimentierlabor',
      subtitle: 'Live-Experimente mit Shader-Algorithmen, Partikeln und interaktiven 3D-Geometrien.',
      particleCount: 'Partikel-Anzahl',
      speed: 'Rotations-Geschwindigkeit',
      bloom: 'Glow-Intensität',
      toggleAnimation: 'Animation umschalten',
      reset: 'Standard-Werte',
      fps: '60 FPS Stabil'
    }
  },
  tr: {
    menu: 'MENÜ',
    discovery: 'PORTFOLYO',
    general: 'DURUM',
    theme: 'Tema',
    language: 'Dil',
    search: 'PROJE & YETENEK ARA...',
    switchAccount: 'Zürih · İsviçre',
    collapse: 'Daralt',
    expand: 'Genişlet',
    availableBadge: 'Projeler İçin Müsait',
    locationBadge: 'Zürih · İsviçre',
    quoteLine: '«Yedi kez düş, sekiz kez ayağa kalk.»',
    heroTitle: "Ben ADO, Zürih'te Web Geliştiriciyim.",
    heroSubtitle: 'Fikirleri akılda kalan web sitelerine dönüştürüyorum – net, hızlı ve her cihazda. Tasarım ve kod tek elden: ilk taslaktan gerçek zamanlı 3D ve motion tasarıma, oradan temiz bir yayına kadar – birebir ilgiyle ve hazır şablon olmadan.',
    menuItems: {
      home: 'Başlangıç',
      projekte: 'Projeler',
      skills: 'Yetenekler & Hizmetler',
      erfahrung: 'Deneyim',
      lab: 'İlham & 3D Lab'
    },
    home: {
      tag: "ZÜRİH'TE WEB GELİŞTİRİCİ",
      role: 'Web Siteleri, Gerçek Zamanlı 3D & Motion Tasarım',
      stats: {
        experience: '20+ Yıl',
        expLabel: 'Dijital Deneyim',
        performance: '100/100',
        perfLabel: 'Lighthouse Performansı',
        builder: '%0 Şablon',
        builderLabel: 'Özgün İsviçre El İşçiliği'
      },
      philosophyTitle: 'Felsefe & Çalışma Şekli',
      philosophyDesc: 'Hantal hazır temalar yok. Her proje modern React, TypeScript ve hassas CSS mimarisiyle sıfırdan el işçiliğiyle kodlanır.',
      quickSkills: ['Three.js & WebGL', 'React 19 & Next.js', 'Tailwind CSS', 'Motion Design', 'Yapay Zeka Entegrasyonu', 'Vercel Deployment']
    },
    projekte: {
      title: 'Seçilmiş Projeler & Çalışmalar',
      subtitle: "Zürih ve tüm İsviçre'deki işletmeler için özel üretilmiş dijital vitrinler.",
      items: [
        {
          id: 'p1',
          name: 'Bäckerei Happy & Citybeck',
          category: 'Gastronomi & Fırıncılık · Zürih',
          desc: 'Modern tasarımlı kurumsal marka kimliği, günlük güncel ürün vitrini, şube bulucu ve kusursuz mobil kullanıcı deneyimi.',
          tags: ['React', 'Tailwind CSS', 'SEO', 'Mobile First'],
          metric: 'Açılış Süresi < 0.6s'
        },
        {
          id: 'p2',
          name: 'Oto Servis Portalı',
          category: 'Hizmet & Otomotiv',
          desc: 'Doğrudan plaka/araç sorgulamalı online randevu sistemi, dijital hasar kaydı ve SMS/E-posta bilgilendirme motoru.',
          tags: ['Next.js', 'TypeScript', 'API Entegrasyonu', 'Cloud'],
          metric: '+%140 Online Randevu'
        },
        {
          id: 'p3',
          name: '3D WebGL & AI Agent Lab',
          category: 'Ar-Ge & Yeni Nesil Web',
          desc: 'Tarayıcıda akıcı 60 FPS çalışan etkileşimli 3D parçacık evrenleri, yapay zeka asistanları ve anlık fizik simülasyonları.',
          tags: ['Three.js', 'GLSL Shader', 'Gemini AI', 'Canvas'],
          metric: '60 FPS Kesintisiz Akıcı'
        },
        {
          id: 'p4',
          name: 'Özel & Kurumsal Web Siteleri',
          category: 'Birebir Terzi Usulü Çözümler',
          desc: 'Mikro etkileşimler, tam erişilebilirlik ve yüksek dönüşüm odaklı birinci sınıf portfolyo ve şirket web siteleri.',
          tags: ['Framer Motion', 'PWA', 'Edge Network', 'Bespoke UI'],
          metric: '%100 Erişilebilir'
        }
      ]
    },
    skills: {
      title: 'Temel Yetenekler & Hizmetler',
      subtitle: 'Tek elden çıkan benzersiz dijital deneyimler için dört ana uzmanlık sütunu.',
      pillars: [
        {
          id: 's1',
          title: 'Gerçek Zamanlı 3D & Motion',
          badge: 'Çekirdek Güç',
          stat: 'Tek Tuval, Tam Sahne',
          description: 'Parçacık sahneleri, özel gölgelendiriciler ve kaydırmaya bağlı kamera hareketleri — mobilde bile akıcı 60 FPS.',
          tech: ['Three.js', 'WebGL', 'GLSL Shader', 'Canvas API']
        },
        {
          id: 's2',
          title: 'Frontend El İşçiliği',
          badge: 'Arayüz',
          stat: 'Mobil Öncelikli (Mobile First)',
          description: 'Temiz ayrılmış bileşenler, net tipografi, klavye ve ekran okuyucuyla kullanılabilir — sadece güzel değil, işlevsel.',
          tech: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
        },
        {
          id: 's3',
          title: 'Veri & İşletim',
          badge: 'Altyapı',
          stat: 'Işık Hızında & Güvenli',
          description: 'Modern bulut mimarisi, uç nokta (edge) ağları, otomatik dağıtım boru hatları ve ödün vermeyen performans optimizasyonu.',
          tech: ['Next.js', 'Vercel Edge', 'REST & GraphQL', 'Lighthouse 100']
        },
        {
          id: 's4',
          title: 'Günlük Hayatta Yapay Zeka',
          badge: 'Gelecek Odaklı',
          stat: 'Akıllı İş Akışları',
          description: 'Gerçek iş süreçlerini kolaylaştıran yapay zeka ajanları, sohbet asistanları ve amaca yönelik dil modeli entegrasyonları.',
          tech: ['Gemini API', 'AI Agents', 'Function Calling', 'Vector Search']
        }
      ]
    },
    erfahrung: {
      title: 'Deneyim & Kariyer Yolculuğu',
      subtitle: 'Gerçek saha tecrübesi, yöneticilik sorumluluğu ve kod tutkusuyla şekillenen sağlam bir kariyer.',
      timeline: [
        {
          period: "2025'ten beri",
          role: 'Web Geliştirici',
          company: 'Serbest Çalışan · ADO Design · Zürih',
          desc: "Fırın, oto tamirhanesi ve bireysel müşteriler için web projeleri — ilk taslaktan yayına kadar. Gerçek zamanlı 3D ve yapay zekayla deneysel çalışmalar."
        },
        {
          period: '2014 — 2016',
          role: 'Şoför / Lojistik',
          company: 'Zidus GmbH Transport, Zürih',
          desc: 'Satış noktalarına güvenilir sevkiyat, günlük yük kontrolleri ve araç bakım ve yönetiminin titizlikle yürütülmesi.'
        },
        {
          period: '2014',
          role: 'Yönetim & İnsan Kaynakları',
          company: 'Citybeck AG, Zürih',
          desc: 'Yönetim ve İK desteği: Maaş ödemeleri, emeklilik sandığı işlemleri, personel evrakları, işe alım ve çıkış süreçleri.'
        },
        {
          period: '2009 — 2013',
          role: 'İşletme Müdürlüğü / Gece Vardiyası Sorumlusu',
          company: 'Bäckerei Happy AG, Zürih',
          desc: 'Kasa sayımı, muhasebe, şube düzeni ve personel yönetimi. Müşteri odaklı hizmet, ürün sunumu ve satış geliştirme.'
        },
        {
          period: '2002 — 2004',
          role: 'Web Publisher Uzmanlık Eğitimi',
          company: 'EB Wolfbach / Web Publisher Zentrum, Zürih',
          desc: 'Bir yıllık yoğun eğitim ve ileri seviye kurslar: HTML, CSS, JavaScript, PHP, MySQL veritabanları, Flash ActionScript ve tasarım.'
        },
        {
          period: '1990 — 1998',
          role: 'Satış Danışmanı',
          company: 'Migros Kooperatif Merkezi, Zürih',
          desc: 'Siparişler, mal kabul, kampanya reyon kurulumları, stok kontrolleri ve birebir müşteri danışmanlığı.'
        }
      ]
    },
    lab: {
      title: '3D WebGL & Yapay Zeka Laboratuvarı',
      subtitle: 'Shader algoritmaları, parçacık sistemleri ve etkileşimli 3D geometrilerle canlı deney alanı.',
      particleCount: 'Parçacık Sayısı',
      speed: 'Dönüş Hızı',
      bloom: 'Işıma Şiddeti',
      toggleAnimation: 'Animasyonu Aç/Kapa',
      reset: 'Varsayılan Ayarlar',
      fps: '60 FPS Stabil'
    }
  }
};
