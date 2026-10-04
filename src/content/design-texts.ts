// Quelle: Adodesign.ch/src/lib/translations.ts (unveraendert uebernommen)
/**
 * Alle sichtbaren Texte der Seite, auf Deutsch und Tuerkisch. Struktur
 * folgt data/translations.ts aus gemini-lebenslauf: ein typisches Schema,
 * ein Objekt pro Sprache. Technische Werte (Farben, Links, Tech-Tags,
 * Zahlen) bleiben in den jeweiligen Komponenten/Datendateien, hier steht
 * nur, was auf dem Bildschirm gelesen wird.
 */
export type Language = 'de' | 'tr';

export interface ProjectText {
  category: string;
  description: string;
  metrics: { label: string; value: string }[];
}

export interface ExperienceEntryText {
  year: string;
  title: string;
  organization: string;
  description: string;
  /** Handy: Titel blinkt mit gelbem Licht dahinter (Kundenwunsch). */
  glow?: boolean;
}

export interface SkillBlockText {
  title: string;
  badge: string;
  stat: string;
  description: string;
}

export interface RepoText {
  badge: string;
  description: string;
  details: string;
  commandNotes: string[];
  tags: string[];
}

export interface TranslationSchema {
  nav: {
    about: string;
    work: string;
    skills: string;
    repos: string;
    construction: string;
    experience: string;
    contact: string;
  };
  /** Alt taraftaki yuezen dock: nav'da karsiligi olmayan iki etiket. */
  dock: {
    start: string;
    github: string;
  };
  legal: {
    impressum: string;
    datenschutz: string;
  };
  common: {
    expand: string;
    collapse: string;
  };
  header: {
    menuOpen: string;
    menuClose: string;
    soundOn: string;
    soundOff: string;
    allOpen: string;
    firmaKicker: string;
    firmaText: string;
  };
  hero: {
    badgeAvailable: string;
    badgeLocation: string;
    lineBuild: string;
    lineDigital: string;
    lineExperiences: string;
    roleLine: string;
    subtitle: string;
    ctaWork: string;
    ctaEmail: string;
    quoteLine1: string;
    quoteLine2: string;
  };
  about: {
    eyebrow: string;
    line1: string;
    line2: string;
    bioTitle: string;
    bioPart1: string;
    bioStrong1: string;
    bioPart2: string;
    bioStrong2: string;
    bioPart3: string;
    tags: string[];
    statLabels: string[];
    cta: string;
  };
  projects: {
    eyebrow: string;
    line1: string;
    line2: string;
    footerHover: string;
    footerTap: string;
    footerSuffix: string;
    screenshotAlt: string;
    viewSite: string;
    onRequest: string;
    items: ProjectText[];
  };
  skills: {
    eyebrow: string;
    line1: string;
    line2: string;
    blocks: SkillBlockText[];
    terminal: {
      whoami: string;
      name: string;
      echo: string;
      found: string;
      openFull: string;
      clickMore: string;
    };
  };
  repos: {
    eyebrow: string;
    line1: string;
    line2: string;
    intro: string;
    /** Wie intro, fuer Touch-Geraete (kein "mit der Maus"). */
    introTouch: string;
    githubRepo: string;
    externalLink: string;
    openBtn: string;
    close: string;
    detailsSuffix: string;
    flipBack: string;
    flipHint: string;
    copy: string;
    copied: string;
    prevPage: string;
    nextPage: string;
    githubShort: string;
    openShort: string;
    items: RepoText[];
  };
  construction: {
    eyebrow: string;
    line1: string;
    line2: string;
    paragraph: string;
    statusBadge: string;
    cardTitle: string;
    cardDescription: string;
    imageBadge: string;
  };
  experience: {
    eyebrow: string;
    line1: string;
    line2: string;
    journey: ExperienceEntryText[];
  };
  contact: {
    eyebrow: string;
    line1: string;
    line2: string;
    intro: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendBtn: string;
    successTitle: string;
    successText: string;
    emailLabelFooter: string;
    locationLabelFooter: string;
    location: string;
    mailSubjectPrefix: string;
  };
  /** Der Bot, der so tut, als waere er eine KI. Die Reihenfolge in `rules`
   *  zaehlt: engere Themen stehen vor der breiten Begruessung, sonst faengt
   *  "hallo, was kostet das" die Begruessung statt der Preisfrage ab. Die
   *  Stichworte tragen beide Sprachen, damit ein tuerkisch getippter Satz
   *  auch im deutschen Modus greift. */
  bot: {
    title: string;
    welcome: string;
    fallback: string;
    placeholder: string;
    send: string;
    rules: { keywords: string[]; reply: string }[];
  };
}

// @section:de
export const de: TranslationSchema = {
  nav: {
    about: 'Über mich',
    work: 'Projekte',
    skills: 'Skills',
    repos: 'Inspiration',
    construction: 'Im Aufbau',
    experience: 'Erfahrung',
    contact: 'Kontakt',
  },
  dock: {
    start: 'Start',
    github: 'GitHub',
  },
  legal: {
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
  },
  common: {
    expand: 'ausklappen',
    collapse: 'einklappen',
  },
  header: {
    menuOpen: 'Menü öffnen',
    menuClose: 'Menü schliessen',
    soundOn: 'Ton einschalten',
    soundOff: 'Ton ausschalten',
    allOpen: 'Alle öffnen',
    firmaKicker: 'Unternehmen',
    firmaText: 'Digital-Dienste für Betriebe – Bestellungen, Einsatzplanung & Buchhaltung.',
  },
  hero: {
    badgeAvailable: 'Frei für Projekte',
    badgeLocation: 'Zürich · Schweiz',
    lineBuild: 'Ich baue',
    lineDigital: 'digitale',
    lineExperiences: 'Erlebnisse',
    roleLine: 'Web-Entwickler',
    subtitle:
      'Ich verwandle Ideen in Websites, die man sich merkt – klar, schnell und auf jedem Gerät. Gestaltung und Code aus einer Hand: von der ersten Skizze über Echtzeit-3D und Motion Design bis zum sauberen Deployment – persönlich betreut und ohne Baukasten.',
    ctaWork: 'MEINE ARBEIT ↗',
    ctaEmail: 'E-MAIL ↓',
    quoteLine1: 'Siebenmal fallen,',
    quoteLine2: 'achtmal aufstehen.',
  },
  about: {
    eyebrow: 'Über mich',
    line1: 'Nicht nur Code.',
    line2: 'Bleibendes.',
    bioTitle: 'Ich bin EKADO, Web-Entwickler in Zürich.',
    bioPart1: 'Angefangen habe ich mit dem Web-Publisher-Lehrgang (HTML, CSS, PHP, DB). Heute entwickle ich moderne High-End-Webseiten mit ',
    bioStrong1: 'Echtzeit-3D',
    bioPart2: ', ',
    bioStrong2: 'Motion Design',
    bioPart3: ' und performantem Code.',
    tags: ['Echtzeit-3D', 'Mobil zuerst', 'Ohne Baukasten'],
    statLabels: ['Jahre Erfahrung', 'Projekte live', 'Sprachen', 'Archiv-Arbeiten'],
    cta: 'Direkt schreiben',
  },
  skills: {
    eyebrow: 'Werkzeuge',
    line1: 'Werkzeuge,',
    line2: 'beherrscht.',
    blocks: [
      {
        title: 'Echtzeit-3D & Motion',
        badge: 'Kernstärke',
        stat: 'Ein Canvas, volle Szene',
        description:
          'Partikelszenen, Shader und scroll-getriebene Kamerafahrten — gebaut für flüssige 60 Bilder pro Sekunde, auch auf dem Handy.',
      },
      {
        title: 'Frontend-Handwerk',
        badge: 'Oberfläche',
        stat: 'Mobil zuerst',
        description:
          'Sauber getrennte Bausteine, klare Typografie, bedienbar mit Tastatur und Screenreader — nicht nur hübsch, sondern benutzbar.',
      },
      {
        title: 'Daten & Betrieb',
        badge: 'Fundament',
        stat: 'Vom Formular bis zur Mail',
        description:
          'Tabellen, Beziehungen und Abfragen von Hand geschrieben. Deployment auf Vercel und Cloudflare Pages, inklusive Formularen und E-Mail-Versand.',
      },
      {
        title: 'Künstliche Intelligenz im Alltag',
        badge: 'Werkstatt',
        stat: 'Täglich im Einsatz',
        description:
          'Ich nutze KI dort, wo sie Zeit spart — und dokumentiere jeden Schritt auf EKADO 3D, damit andere ihn nachvollziehen können.',
      },
    ],
    terminal: {
      whoami: '$ whoami',
      name: 'EKADO',
      echo: '$ echo "gefunden?"',
      found: 'gefunden das versteckte terminal 👀',
      openFull: '$ open --full',
      clickMore: 'klick für mehr',
    },
  },
  projects: {
    eyebrow: 'Projekte',
    line1: 'Fünfzehn Arbeiten,',
    line2: 'eine Handschrift.',
    footerHover: 'Zeiger auf eine Zeile — das Bild folgt · Klick für Details',
    footerTap: 'Zeile antippen',
    footerSuffix: 'fünfzehn Arbeiten',
    screenshotAlt: 'Bildschirmfoto',
    viewSite: 'Seite ansehen ↗',
    onRequest: 'Nur auf Anfrage',
    items: [
      {
        category: 'AUTOWERKSTATT / FIRMENAUFTRITT',
        description:
          'Homepage einer Zürcher Autowerkstatt: Dienstleistungen, Standort und Kontakt auf einen Blick. Schlank gebaut, damit die Seite auch auf dem Handy in Sekunden steht.',
        metrics: [
          { label: 'KUNDE', value: 'SAZCAR GmbH, Zürich' },
          { label: 'UMFANG', value: 'Auftritt & Kontakt' },
          { label: 'STATUS', value: 'Live' },
        ],
      },
      {
        category: 'GASTRONOMIE / FIRMENAUFTRITT',
        description:
          'Webauftritt einer Schweizer Bäckerei: Sortiment, Filialen und Öffnungszeiten in einem schnellen, mobil zuerst gedachten Auftritt. Live im Einsatz und täglich von Kundschaft benutzt.',
        metrics: [
          { label: 'KUNDE', value: 'Bäckerei Happy AG' },
          { label: 'FOKUS', value: 'Mobil zuerst' },
          { label: 'STATUS', value: 'Live' },
        ],
      },
      {
        category: 'PERSÖNLICHES PORTFOLIO',
        description:
          'Eines meiner ersten Projekte, entstanden 2024. Damals hatte ich noch wenig Erfahrung und bin mit der Unterstützung eines türkischen Entwicklers vorangekommen — der Anfang von allem, was danach kam.',
        metrics: [
          { label: 'JAHR', value: '2024' },
          { label: 'ROLLE', value: 'Erste Schritte' },
          { label: 'HILFE', value: 'Mit Mentor gebaut' },
        ],
      },
      {
        category: 'CREATIVE WEB DEVELOPMENT',
        description:
          'Eine 2025 entstandene Webseite, inspiriert von den iPhone-Kurzbefehlen. Interaktive Karten in einem klaren, modernen Layout — das Projekt stiess bei vielen Leuten auf Interesse.',
        metrics: [
          { label: 'JAHR', value: '2025' },
          { label: 'IDEE', value: 'iPhone-Kurzbefehle' },
          { label: 'KERN', value: 'Interaktive Karten' },
        ],
      },
      {
        category: 'BILDUNG / KI-GESTÜTZTES LERNEN',
        description:
          'Webseite für Sekundar- und Primarschüler zum Vokabeltraining: Schüler fotografieren eine Seite aus ihrem Lehrbuch, und mithilfe von KI entstehen daraus Lernkarten. Das Projekt wurde nie ganz fertiggestellt.',
        metrics: [
          { label: 'JAHR', value: '2024' },
          { label: 'FÜR', value: 'Schulkinder' },
          { label: 'STATUS', value: 'Unvollendet' },
        ],
      },
      {
        category: 'PERSÖNLICHES PORTFOLIO',
        description:
          'Meine erste Arbeit nach vielen Jahren zurück im Web: ein eigenes Portfolio, gebaut, um wieder in die aktuelle Front-End-Welt hineinzukommen. Aufbau, Layout und Animationen sind von Hand gesetzt, ohne Baukasten.',
        metrics: [
          { label: 'JAHR', value: '2025' },
          { label: 'ANLASS', value: 'Rückkehr ins Web' },
          { label: 'AUFBAU', value: 'Alles von Hand' },
        ],
      },
      {
        category: 'PERSÖNLICHES PORTFOLIO',
        description:
          'Interaktives Bewerbungsportfolio für meinen Sohn zum Lehrbeginn 2026. Scroll-getriebene Animationen führen durch Person, Schulweg und Projekte — mobil zuerst gedacht, damit es auch auf älteren Geräten schnell lädt.',
        metrics: [
          { label: 'ANLASS', value: 'Lehrbeginn 2026' },
          { label: 'AUFBAU', value: 'Scroll-Erzählung' },
          { label: 'STATUS', value: 'Live' },
        ],
      },
      {
        category: 'KÜNSTLICHE INTELLIGENZ / WISSENSPLATTFORM',
        description:
          'Lern- und Lehrplattform rund um künstliche Intelligenz: Prompts, Serverbefehle und experimentelle Arbeiten sind gesammelt und nachvollziehbar aufbereitet. Bewusst als Werkstatt gebaut — ausprobieren, festhalten, weitergeben.',
        metrics: [
          { label: 'INHALT', value: 'Prompts & Befehle' },
          { label: 'DATEN', value: 'Supabase' },
          { label: 'ZWECK', value: 'Lernen & Lehren' },
        ],
      },
      {
        category: 'ECHTZEIT-3D / WEB-ERLEBNIS',
        description:
          'Mein eigener Auftritt: eine einzige Three.js-Szene trägt Partikeltypografie, eine Sternbild-Navigation durch die Projekte, GLSL-Shader und scroll-getriebene Kamerafahrten. Geometrie entsteht im Web Worker, damit die Seite auch auf dem Handy flüssig bleibt.',
        metrics: [
          { label: 'SZENE', value: 'Ein einziges Canvas' },
          { label: 'PHYSIK', value: 'Verlet-Seil in Echtzeit' },
          { label: 'AUFBAU', value: 'Entity Component System' },
        ],
      },
      {
        category: 'INSTAGRAM / DM-AUTOMATISIERUNG',
        description:
          'Automatische Antworten auf Instagram: Wer unter einem Beitrag, einem Reel oder einer Story ein Stichwort schreibt, bekommt per DM den passenden Link — auf Wunsch erst nach Follow-Prüfung. Regeln lassen sich einzelnen Beiträgen zuordnen, das Panel ist per E-Mail-Code geschützt.',
        metrics: [
          { label: 'PLATTFORM', value: 'Instagram' },
          { label: 'KERN', value: 'Webhook & DM' },
          { label: 'STATUS', value: 'Live' },
        ],
      },
      {
        category: 'KÜNSTLICHE INTELLIGENZ / VORLAGEN-HUB',
        description:
          'Vorlagen-Bibliothek für Claude Code: 1.942 Skills, Agents, Commands, Hooks und MCPs, durchsuchbar und mit einem einzigen npx-Befehl installierbar. Durchgehend zweisprachig — Türkisch und Deutsch lassen sich Seite an Seite vergleichen.',
        metrics: [
          { label: 'KOMPONENTEN', value: '1.942' },
          { label: 'SPRACHEN', value: 'TR & DE' },
          { label: 'STATUS', value: 'Live' },
        ],
      },
      {
        category: 'VIDEO / REELS-EDITOR',
        description:
          'Videostudio im Browser für Reels und TikTok im 9:16-Format: Clips oder Bilder hochladen, Text schreiben, Karaoke-Untertitel, Musik und Effekte auf einer Zeitleiste setzen und in Full HD herunterladen. Dateien werden nach dem Download vom Server gelöscht.',
        metrics: [
          { label: 'FORMAT', value: '9:16 Reels' },
          { label: 'EXPORT', value: 'Full HD' },
          { label: 'DATEN', value: 'Nach Download gelöscht' },
        ],
      },
      {
        category: 'GASTRONOMIE / PERSONAL- & BETRIEBSVERWALTUNG',
        description:
          'Komplette Personal- und Betriebsverwaltung für Gastro- und KMU-Betriebe: Mitarbeitende stempeln bei Arbeitsbeginn am Kiosk ein und aus, Lohnabrechnung, Krankmeldungen, Ferien und Absenzen laufen im selben System — dazu Schichtplan, Personaldossiers, Lieferanten, Rechnungen mit Scan, Buchhaltung und HACCP. Zweisprachig (DE/TR), mit KI-Assistent. Zugang nur auf Anfrage.',
        metrics: [
          { label: 'MODULE', value: '15' },
          { label: 'SPRACHEN', value: 'DE & TR' },
          { label: 'ZUGANG', value: 'Nur auf Anfrage' },
        ],
      },
      {
        category: 'UNTERNEHMEN / DIGITALE BETRIEBSORGANISATION',
        description:
          'Firmenauftritt für die digitale Betriebsorganisation: Bestellungen und Lieferanten, Einsatzplanung und Arbeitszeiten, Ausgaben und Rechnungen, Pflichtmeldungen und Personalunterlagen — jeder Bereich als eigenes Kapitel, das Unternehmen zeigt, wie alles in einer Plattform zusammenläuft.',
        metrics: [
          { label: 'ZIELGRUPPE', value: 'Unternehmen' },
          { label: 'FOKUS', value: 'Automatisierung' },
          { label: 'STATUS', value: 'Live' },
        ],
      },
      {
        category: 'GASTRONOMIE / BETRIEBS- & PERSONALMANAGEMENT',
        description:
          'Zentrales Betriebs- und Personalmanagement für Schweizer Gastrobetriebe nach L-GAV: Mitarbeitende stempeln per PIN am Tablet-Kiosk, dazu Schichtplan, Krankmeldungen mit Attest-Upload und Ferienanträge. Einkauf bei Schweizer Lieferanten, Rechnungs-Scan mit MwSt-Erkennung, Monatsbuchhaltung mit Treuhand-Journal und HACCP-Protokolle nach Lebensmittelrecht — offline-first mit lokalem Backup. Zugang nur auf Anfrage.',
        metrics: [
          { label: 'ARBEITSRECHT', value: 'L-GAV' },
          { label: 'HYGIENE', value: 'HACCP / LMG' },
          { label: 'ZUGANG', value: 'Nur auf Anfrage' },
        ],
      },
    ],
  },
  repos: {
    eyebrow: 'Inspirationsquellen',
    line1: 'Favoriten &',
    line2: 'Inspiration.',
    intro:
      'Eine Auswahl an Open-Source-Tools und Repositories, die meine tägliche Arbeit inspirieren. Fahren Sie mit der Maus über die Karten, um die interaktiven Effekte zu entdecken.',
    introTouch:
      'Eine Auswahl an Open-Source-Tools und Repositories, die meine tägliche Arbeit inspirieren. Tippen Sie auf eine Karte, um sie umzudrehen.',
    githubRepo: 'GitHub Repository',
    externalLink: 'Externer Link',
    openBtn: 'ÖFFNEN ↗',
    close: 'Schliessen',
    detailsSuffix: 'Details anzeigen',
    flipBack: 'Zurückdrehen',
    flipHint: 'Zum Umdrehen antippen',
    copy: 'Kopieren',
    copied: 'Kopiert',
    prevPage: 'Vorherige Seite',
    nextPage: 'Nächste Seite',
    githubShort: 'GitHub ↗',
    openShort: 'Öffnen ↗',
    items: [
      {
        badge: 'UI Framework',
        description: 'Moderne, animierte und immersive Tailwind CSS Komponentensammlung.',
        details:
          'Kein eigenständiges npm-Paket: Komponenten werden per shadcn-CLI direkt in den eigenen Code kopiert. Danach gehört der Code vollständig dir, frei anpassbar mit Tailwind CSS und Framer Motion. Genau dieser Karten-Hover-Effekt hier stammt von dort.',
        commandNotes: ['Installiert genau diesen Karten-Hover-Effekt in dein Projekt.'],
        tags: ['React', 'TailwindCSS', 'Framer Motion'],
      },
      {
        badge: 'AI Agent Engine',
        description: 'Erweitertes KI-Pairing und autonomes Coding-Assistenten-System.',
        details:
          'Eigenständige, agentische Entwicklungsumgebung von Google, kein npm-Paket. Download unter antigravity.google. Statt Shell-Befehlen tippt man Aufgaben in natürlicher Sprache — der Agent plant, schreibt und testet den Code selbstständig. Beispielhafte Prompts:',
        commandNotes: [
          'Beispiel-Prompt — Feature aus dem Nichts bauen lassen.',
          'Beispiel-Prompt — Agent sucht selbst nach der Ursache.',
          'Beispiel-Prompt — Testabdeckung automatisch erzeugen.',
        ],
        tags: ['AI', 'Gemini', 'Agentic Workflow'],
      },
      {
        badge: 'Animation Engine',
        description: 'Produktionsreife 60FPS-Animationsbibliothek für React.',
        details:
          'Deklarative Animationen für React — motion.div, AnimatePresence, geteilte Layout-Übergänge über layoutId. Treibt auf dieser Seite fast jede Bewegung an: Karten-Hover, Sektionen-Aufklappen, Seitenübergänge, auch dieses Detail-Panel.',
        commandNotes: ['Installiert die Bibliothek als Projekt-Abhängigkeit.'],
        tags: ['React', 'TypeScript', 'Physics'],
      },
      {
        badge: 'Audio Engine',
        description: 'Echtzeit-Synthesizer für mechanische und Sci-Fi Soundeffekte.',
        details:
          'Kein externes Paket: eigener Code direkt auf der nativen Web Audio API, in src/lib/sound.ts. Erzeugt Klicks, Chimes und den Herzschlag-Puls der FloatingDock im Browser, ganz ohne Audio-Dateien.',
        commandNotes: [
          'Mechanischer Tastenklick — bei jedem UI-Klick.',
          'Warmer Akkord-Swoosh beim Aufklappen einer Sektion.',
          'Tiefer, dumpfer Thud beim Zuklappen.',
          'Retro-Arpeggio — z. B. beim Wiedereinschalten des Tons.',
          'Der Tintenstrahl-Sample für dieses Ausdruck-Panel.',
          'Digitaler Bitcrush-Stotterer für Sci-Fi-Momente.',
        ],
        tags: ['WebAudio API', 'Synthesizer', 'DSP'],
      },
      {
        badge: '3D Graphics',
        description: 'Hardware-beschleunigte 3D-Partikel- und Shader-Szenen im Browser.',
        details:
          'Die Standardbibliothek für 3D im Browser — Szenen, Kameras, Licht und GLSL-Shader über WebGL. Treibt die Partikel- und Shader-Experimente an, die als Nächstes im Bereich "Im Aufbau" live gehen.',
        commandNotes: ['Installiert die Bibliothek als Projekt-Abhängigkeit.'],
        tags: ['Three.js', 'WebGL', 'GLSL Shaders'],
      },
      {
        badge: 'Open Source Firebase',
        description: 'PostgreSQL-basierte Echtzeit-Datenbank und Authentifizierungsmotor.',
        details:
          'Open-Source-Alternative zu Firebase auf PostgreSQL-Basis — Datenbank, Auth, Realtime-Subscriptions und Storage über eine einzige API.',
        commandNotes: ['Installiert den Client als Projekt-Abhängigkeit.'],
        tags: ['PostgreSQL', 'Realtime', 'Auth'],
      },
      {
        badge: 'MCP-Server-Verzeichnis',
        description: 'Kuratierte Liste von Model-Context-Protocol-Servern für KI-Assistenten.',
        details:
          'Community-gepflegte GitHub-Liste: hunderte MCP-Server (Model Context Protocol) nach Kategorie sortiert — Dateisystem, Datenbanken, Browser-Automatisierung, Sicherheit, Finanzen und mehr. MCP ist das offene Protokoll, mit dem Clients wie Claude Desktop oder Claude Code diese Server ansprechen, um sicher auf Dateien, Datenbanken oder APIs zuzugreifen. Jeder Eintrag verlinkt zur eigenen Installationsanleitung.',
        commandNotes: [
          'Beispiel: Filesystem-Server aus der Liste lokal starten.',
          'Server in Claude Code registrieren — steht danach sofort als Tool bereit.',
        ],
        tags: ['MCP', 'AI Tools', 'Awesome List'],
      },
    ],
  },
  construction: {
    eyebrow: 'Im Aufbau',
    line1: 'Projekte im',
    line2: 'Aufbau.',
    paragraph:
      'Hier entstehen WebGL-3D-Experimente der nächsten Generation, autonome KI-Agenten-Integrationen und experimentelle Interfaces. Live-Demos folgen in Kürze.',
    statusBadge: 'IN AKTIVER ENTWICKLUNG',
    cardTitle: '3D WebGL & AI Agent Lab',
    cardDescription:
      'Interaktive 3D-Simulationen und KI-Agenten-Module, die künftige Web-Erlebnisse prägen werden, erscheinen hier demnächst.',
    imageBadge: '🚧 IM AUFBAU 🚧',
  },
  experience: {
    eyebrow: 'Werdegang',
    line1: 'Werdegang &',
    line2: 'Stationen.',
    journey: [
      {
        year: 'seit 2025',
        title: 'Web-Entwickler',
        organization: 'Selbständig · Zürich',
        description:
          'Auftritte für Bäckerei, Autowerkstatt und Privatkunden — von der ersten Skizze bis zum Deployment. Dazu eigene Experimente mit Echtzeit-3D und künstlicher Intelligenz.',
      },
      {
        year: '08.2014 — 08.2016',
        title: 'Chauffeur',
        glow: true,
        organization: 'Zidus GmbH Transport, Zürich',
        description:
          'Belieferte die Verkaufsstellen zuverlässig, kontrollierte die tägeninge Ladung und sorgte für Pflege und Unterhalt des zugeteilten Fahrzeugs.',
      },
      {
        year: '02.2014 — 07.2014',
        title: 'Administration & Personalwesen',
        organization: 'Citybeck AG, Zürich',
        description:
          'Unterstützte Geschäftsleitung und Personalwesen: Lohnzahlungen, Pensionskassenangelegenheiten, Personalunterlagen sowie Ein- und Austritte.',
      },
      {
        year: '07.2009 — 12.2013',
        title: 'Geschäftsführung / Nachtschichtleitung',
        organization: 'Bäckerei Happy AG, Zürich',
        description:
          'Verantwortlich für Kassenstock, Abrechnung, Einrichtung und Personalwesen. Kundenorientiertes Handeln, Verkaufsbereitschaft, Warenpräsentation und Verkaufsförderung.',
      },
      {
        year: '2002 — 2004',
        title: 'Weiterbildung Web Publisher',
        organization: 'EB Wolbach / Web Publisher Zentrum, Zürich',
        description:
          'Einjähriger Lehrgang plus Aufbaukurse: HTML, CSS und JavaScript, PHP, Datenbanken in phpMyAdmin, ActionScript mit Flash sowie Gestaltung und Präsentation.',
      },
      {
        year: '09.1990 — 11.1998',
        title: 'Verkäufer',
        organization: 'Migros Genossenschaftszentrum, Zürich',
        description:
          'Warenbestellungen, Warenannahme, Aktionsaufbauten, Regalpflege sowie MHD- und Bestandskontrollen — dazu die Beratung der Kundschaft.',
      },
    ],
  },
  contact: {
    eyebrow: 'Kontakt',
    line1: 'Schreiben',
    line2: 'Sie mir.',
    intro:
      'Ein Projekt, eine Website, die nicht mehr passt, oder einfach eine Frage? Schreiben Sie mir — unverbindlich und ohne Fachjargon.',
    nameLabel: 'Name',
    namePlaceholder: 'Ihr Name',
    emailLabel: 'E-Mail',
    emailPlaceholder: 'Ihre E-Mail-Adresse',
    messageLabel: 'Nachricht',
    messagePlaceholder: 'Worum geht es?',
    sendBtn: 'Nachricht senden ↗',
    successTitle: 'Nachricht angekommen',
    successText:
      'Danke! Ihre Nachricht ist bei uns angekommen, eine Bestätigung ist unterwegs in Ihr Postfach. Wir melden uns so bald wie möglich.',
    emailLabelFooter: 'E-Mail:',
    locationLabelFooter: 'Ort:',
    location: 'Zürich · Schweiz',
    mailSubjectPrefix: 'Anfrage von',
  },
  bot: {
    title: 'EKADO Bot',
    welcome: 'Hallo! Ich bin EKADO Bot. Frag mich nach Preis, Dauer, Technik oder Kontakt.',
    fallback:
      'Darauf bin ich nicht vorbereitet — ich kenne nur ein paar Stichworte. Schreib EKADO direkt, der antwortet richtig: info@ekado.ch',
    placeholder: 'Frag etwas…',
    send: 'Los',
    rules: [
      {
        keywords: ['preis', 'kosten', 'kostet', 'wieviel', 'wie viel', 'budget', 'angebot', 'offerte', 'fiyat', 'ücret', 'ne kadar'],
        reply:
          'Kommt auf den Umfang an — eine schlanke Firmenseite ist etwas anderes als ein Echtzeit-3D-Auftritt. Schreib EKADO kurz, was dir vorschwebt, dann bekommst du ein konkretes Angebot: info@ekado.ch',
      },
      {
        keywords: ['wie lange', 'dauer', 'dauert', 'termin', 'deadline', 'frist', 'ne kadar sürer', 'süre', 'teslim'],
        reply:
          'Eine überschaubare Seite steht in ein bis zwei Wochen. Kommt 3D oder viel Animation dazu, sind es eher vier bis sechs. Genauer wird es, sobald der Umfang steht.',
      },
      {
        keywords: ['was machst', 'was macht', 'leistung', 'dienstleistung', 'service', 'anbieten', 'ne yapıyor', 'hizmet', 'neler yap'],
        reply:
          'Websites von Grund auf: Firmenauftritte, Portfolios, Landingpages — dazu Echtzeit-3D im Browser und Motion Design. Alles von Hand gebaut, kein Baukasten.',
      },
      {
        keywords: ['technologie', 'stack', 'womit', 'tools', 'framework', 'react', 'typescript', 'teknoloji', 'hangi dil', 'ne ile'],
        reply:
          'React und TypeScript als Basis, Vite als Build, Tailwind fürs Styling, GSAP und Framer Motion für Bewegung, Three.js und WebGL für 3D. Als Backend meist Supabase.',
      },
      {
        keywords: ['3d', 'webgl', 'three', 'shader', 'glsl', 'motion'],
        reply:
          'Echtzeit-3D im Browser ist EKADOs Spezialgebiet — Partikeltypografie, Shader, scroll-getriebene Kamerafahrten. Schau dir Projekt 09 in der Liste an: eine einzige Three.js-Szene.',
      },
      {
        keywords: ['diese seite', 'diese website', 'wie hast du', 'wie gebaut', 'bu site', 'bu sayfa', 'nasıl yapt', 'nasıl yapıld'],
        reply:
          'Die hier? React 19, Vite, Tailwind 4. Die Bildeffekte laufen über SVG-Filter und Masken, die Zeitleiste im Werdegang hängt an GSAP ScrollTrigger. Die Klickgeräusche sind übrigens synthetisiert, keine Audiodateien.',
      },
      {
        keywords: ['verfügbar', 'verfuegbar', 'frei', 'kapazität', 'auftrag', 'müsait', 'musait', 'boş', 'vakit'],
        reply:
          'Ja, EKADO nimmt gerade Projekte an. Am besten kurz per E-Mail melden, dann klärt sich der Rest schnell.',
      },
      {
        keywords: ['projekt', 'referenz', 'arbeiten', 'portfolio', 'beispiel', 'proje', 'referans', 'örnek', 'ornek', 'çalışma'],
        reply:
          'In der Projektliste stehen fünfzehn Arbeiten — von einer Autowerkstatt in Zürich über eine Bäckerei und ein Three.js-Portfolio bis zu Instagram-Automatisierung, einem Videostudio im Browser und einer Verwaltungssoftware für Gastrobetriebe. Scroll zum Abschnitt Projekte, jede Karte lässt sich umdrehen.',
      },
      {
        keywords: ['lebenslauf', 'cv', 'anstellung', 'job', 'stelle', 'bewerbung', 'einstellen', 'özgeçmiş', 'ozgecmis', 'işe al'],
        reply:
          'Für eine Anstellung oder längere Zusammenarbeit schreib bitte direkt: info@ekado.ch — mit ein paar Zeilen zur Rolle.',
      },
      {
        keywords: ['sprache', 'sprichst', 'sprechen', 'deutsch', 'türkisch', 'tuerkisch', 'englisch', 'dil', 'konuş'],
        reply:
          'Deutsch und Türkisch fliessend, Englisch für alles Technische. Diese Seite kannst du oben rechts umschalten.',
      },
      {
        keywords: ['wo', 'standort', 'sitz', 'zürich', 'zurich', 'schweiz', 'remote', 'nerede', 'nerdesin', 'şehir', 'uzaktan'],
        reply:
          'Zürich, Schweiz. Projekte laufen aber problemlos remote — der halbe Alltag ist ohnehin Bildschirm an Bildschirm.',
      },
      {
        keywords: ['kontakt', 'email', 'e-mail', 'mail', 'telefon', 'erreichen', 'whatsapp', 'instagram', 'iletişim', 'iletisim', 'ulaş', 'numara'],
        reply:
          'Am schnellsten per E-Mail: info@ekado.ch — oder über das Kontaktformular weiter unten. WhatsApp und Instagram stehen in der Fusszeile.',
      },
      {
        keywords: ['bist du echt', 'bist du ein mensch', 'bist du eine ki', 'künstliche', 'kuenstliche', 'chatgpt', 'roboter', 'gerçek mi', 'gercek mi', 'yapay zeka', 'robot musun', 'insan mısın'],
        reply:
          'Ehrlich? Ich bin ein paar Zeilen JavaScript mit einer Stichwortliste. Kein Modell, keine Cloud, kein Abo. Aber ich tippe überzeugend.',
      },
      {
        keywords: ['easter egg', 'geheim', 'versteckt', 'trick', 'überraschung', 'gizli', 'sürpriz', 'surpriz'],
        reply:
          'Es gibt ein paar. Drück mal die Taste ~ . Oder tipp den alten Konami-Code. Mehr sag ich nicht.',
      },
      {
        keywords: ['wie geht', 'wie gehts', 'alles gut', 'nasılsın', 'nasilsin', 'naber'],
        reply:
          'Läuft, danke der Nachfrage. Ich stehe hier zwar nur rum und warte auf Fragen, aber die Aussicht ist gut.',
      },
      {
        keywords: ['danke', 'merci', 'tschüss', 'tschuess', 'ciao', 'bye', 'wiedersehen', 'teşekkür', 'tesekkur', 'sağol', 'görüşürüz'],
        reply:
          'Gern. Wenn doch noch was aufkommt — die Adresse steht unten: info@ekado.ch',
      },
      {
        keywords: ['hallo', 'hi', 'hey', 'servus', 'grüezi', 'gruezi', 'moin', 'guten tag', 'merhaba', 'selam'],
        reply: 'Hallo! Frag mich nach Preis, Dauer, Technik oder Kontakt — oder schau dich einfach um.',
      },
    ],
  },
};

// @section:tr
export const tr: TranslationSchema = {
  nav: {
    about: 'Hakkımda',
    work: 'Projeler',
    skills: 'Beceriler',
    repos: 'İlham',
    construction: 'Yapım Aşamasında',
    experience: 'Deneyim',
    contact: 'İletişim',
  },
  dock: {
    start: 'Başlangıç',
    github: 'GitHub',
  },
  legal: {
    impressum: 'Künye',
    datenschutz: 'Gizlilik',
  },
  common: {
    expand: 'genişlet',
    collapse: 'daralt',
  },
  header: {
    menuOpen: 'Menüyü aç',
    menuClose: 'Menüyü kapat',
    soundOn: 'Sesi aç',
    soundOff: 'Sesi kapat',
    allOpen: 'Tümünü aç',
    firmaKicker: 'Şirket Platformu',
    firmaText: 'İşletmeler için dijital süreçler – Siparişler, vardiya planı & muhasebe.',
  },
  hero: {
    badgeAvailable: 'Projelere açığım',
    badgeLocation: 'Zürih · İsviçre',
    lineBuild: 'İz bırakan',
    lineDigital: 'dijital',
    lineExperiences: 'deneyimler inşa ediyorum',
    roleLine: 'Web Geliştirici',
    subtitle:
      'Fikirleri akılda kalan web sitelerine dönüştürüyorum – net, hızlı ve her cihazda. Tasarım ve kod tek elden: ilk taslaktan gerçek zamanlı 3D ve motion tasarıma, oradan temiz bir yayına kadar – birebir ilgiyle ve hazır şablon olmadan.',
    ctaWork: 'ÇALIŞMALARIM ↗',
    ctaEmail: 'E-POSTA ↓',
    quoteLine1: 'Yedi kez düş,',
    quoteLine2: 'sekiz kez kalk.',
  },
  about: {
    eyebrow: 'Hakkımda',
    line1: 'Sadece kod değil.',
    line2: 'Kalıcılık.',
    bioTitle: 'Ben EKADO, Zürih\'te web geliştiriciyim.',
    bioPart1: 'Web Publisher eğitimiyle başladım (HTML, CSS, PHP, veritabanı). Bugün modern, üst düzey web siteleri geliştiriyorum — ',
    bioStrong1: 'gerçek zamanlı 3D',
    bioPart2: ', ',
    bioStrong2: 'motion design',
    bioPart3: ' ve performanslı kodla.',
    tags: ['Gerçek Zamanlı 3D', 'Mobil Öncelikli', 'Şablon Kullanmadan'],
    statLabels: ['Yıl Deneyim', 'Canlı Proje', 'Dil', 'Arşiv Çalışması'],
    cta: 'Direkt yaz',
  },
  skills: {
    eyebrow: 'Araçlar',
    line1: 'Araçlarım,',
    line2: 'hakimim.',
    blocks: [
      {
        title: 'Gerçek Zamanlı 3D & Motion',
        badge: 'Güçlü Yanım',
        stat: 'Tek canvas, tam sahne',
        description:
          'Parçacık sahneleri, shader\'lar ve scroll ile tetiklenen kamera hareketleri — mobilde bile akıcı 60 kare/saniye için inşa edildi.',
      },
      {
        title: 'Frontend El İşçiliği',
        badge: 'Arayüz',
        stat: 'Mobil öncelikli',
        description:
          'Temiz ayrılmış bileşenler, net tipografi, klavye ve ekran okuyucuyla kullanılabilir — sadece güzel değil, kullanılabilir.',
      },
      {
        title: 'Veri & İşletim',
        badge: 'Temel',
        stat: 'Formdan e-postaya',
        description:
          'Tablolar, ilişkiler ve sorgular elle yazıldı. Vercel ve Cloudflare Pages üzerinde yayın, form ve e-posta gönderimi dahil.',
      },
      {
        title: 'Günlük Hayatta Yapay Zeka',
        badge: 'Atölye',
        stat: 'Her gün kullanımda',
        description:
          'Yapay zekayı zaman kazandırdığı yerde kullanıyorum — ve her adımı EKADO 3D üzerinde belgeliyorum, başkaları da takip edebilsin diye.',
      },
    ],
    terminal: {
      whoami: '$ whoami',
      name: 'EKADO',
      echo: '$ echo "bulundu mu?"',
      found: 'gizli terminal bulundu 👀',
      openFull: '$ open --full',
      clickMore: 'devamı için tıkla',
    },
  },
  projects: {
    eyebrow: 'Projeler',
    line1: 'On beş çalışma,',
    line2: 'tek bir imza.',
    footerHover: 'İmleci bir satıra getir — görsel takip eder · Ayrıntılar için tıkla',
    footerTap: 'Satıra dokun',
    footerSuffix: 'on beş çalışma',
    screenshotAlt: 'Ekran görüntüsü',
    viewSite: 'Siteyi görüntüle ↗',
    onRequest: 'Sadece talep üzerine',
    items: [
      {
        category: 'OTO SERVİS / KURUMSAL SİTE',
        description:
          'Zürih\'te bir oto servisin ana sayfası: hizmetler, konum ve iletişim tek bakışta. Sade inşa edildi, mobilde de saniyeler içinde açılsın diye.',
        metrics: [
          { label: 'MÜŞTERİ', value: 'SAZCAR GmbH, Zürih' },
          { label: 'KAPSAM', value: 'Site & İletişim' },
          { label: 'DURUM', value: 'Yayında' },
        ],
      },
      {
        category: 'GASTRONOMİ / KURUMSAL SİTE',
        description:
          'İsviçreli bir fırının web sitesi: ürün yelpazesi, şubeler ve açılış saatleri, hızlı ve mobil öncelikli tasarlanmış bir sitede. Yayında ve müşteriler tarafından her gün kullanılıyor.',
        metrics: [
          { label: 'MÜŞTERİ', value: 'Bäckerei Happy AG' },
          { label: 'ODAK', value: 'Mobil öncelikli' },
          { label: 'DURUM', value: 'Yayında' },
        ],
      },
      {
        category: 'KİŞİSEL PORTFÖY',
        description:
          '2024\'te ortaya çıkan ilk projelerimden biri. O zamanlar henüz az deneyimim vardı ve Türk bir geliştiricinin desteğiyle ilerledim — sonrasında gelen her şeyin başlangıcı.',
        metrics: [
          { label: 'YIL', value: '2024' },
          { label: 'ROL', value: 'İlk adımlar' },
          { label: 'DESTEK', value: 'Mentörle yapıldı' },
        ],
      },
      {
        category: 'YARATICI WEB GELİŞTİRME',
        description:
          'iPhone kısayollarından ilham alan, 2025\'te ortaya çıkan bir web sitesi. Net, modern bir düzende etkileşimli kartlar — proje birçok kişinin ilgisini çekti.',
        metrics: [
          { label: 'YIL', value: '2025' },
          { label: 'FİKİR', value: 'iPhone kısayolları' },
          { label: 'ÇEKİRDEK', value: 'Etkileşimli kartlar' },
        ],
      },
      {
        category: 'EĞİTİM / YAPAY ZEKA DESTEKLİ ÖĞRENME',
        description:
          'Ortaokul ve ilkokul öğrencileri için kelime çalışması sitesi: öğrenciler ders kitaplarından bir sayfa fotoğraflıyor, yapay zeka bundan çalışma kartları oluşturuyor. Proje hiç tam bitirilemedi.',
        metrics: [
          { label: 'YIL', value: '2024' },
          { label: 'HEDEF KİTLE', value: 'Okul çocukları' },
          { label: 'DURUM', value: 'Tamamlanmadı' },
        ],
      },
      {
        category: 'KİŞİSEL PORTFÖY',
        description:
          'Uzun yıllar sonra web\'e dönüşteki ilk çalışmam: güncel frontend dünyasına yeniden girmek için inşa edilmiş kendi portföyüm. Yapı, düzen ve animasyonlar şablonsuz, elle kuruldu.',
        metrics: [
          { label: 'YIL', value: '2025' },
          { label: 'VESİLE', value: 'Web\'e dönüş' },
          { label: 'YAPIM', value: 'Tamamen elle' },
        ],
      },
      {
        category: 'KİŞİSEL PORTFÖY',
        description:
          'Oğlum için 2026 çıraklık başlangıcına yönelik etkileşimli başvuru portföyü. Scroll ile tetiklenen animasyonlar kişiliği, okul yolunu ve projeleri anlatıyor — eski cihazlarda da hızlı açılsın diye mobil öncelikli düşünüldü.',
        metrics: [
          { label: 'VESİLE', value: 'Çıraklık 2026' },
          { label: 'YAPIM', value: 'Scroll anlatımı' },
          { label: 'DURUM', value: 'Yayında' },
        ],
      },
      {
        category: 'YAPAY ZEKA / BİLGİ PLATFORMU',
        description:
          'Yapay zeka etrafında öğrenme ve öğretme platformu: promptlar, sunucu komutları ve deneysel çalışmalar toplanıp izlenebilir şekilde sunuluyor. Bilinçli olarak bir atölye olarak kuruldu — dene, kaydet, paylaş.',
        metrics: [
          { label: 'İÇERİK', value: 'Promptlar & komutlar' },
          { label: 'VERİ', value: 'Supabase' },
          { label: 'AMAÇ', value: 'Öğrenmek & öğretmek' },
        ],
      },
      {
        category: 'GERÇEK ZAMANLI 3D / WEB DENEYİMİ',
        description:
          'Kendi sitem: tek bir Three.js sahnesi parçacık tipografisini, projeler arasında bir takımyıldızı navigasyonunu, GLSL shader\'ları ve scroll ile tetiklenen kamera hareketlerini taşıyor. Geometri bir Web Worker içinde oluşuyor, böylece site mobilde de akıcı kalıyor.',
        metrics: [
          { label: 'SAHNE', value: 'Tek bir canvas' },
          { label: 'FİZİK', value: 'Gerçek zamanlı Verlet ip' },
          { label: 'YAPIM', value: 'Entity Component System' },
        ],
      },
      {
        category: 'INSTAGRAM / DM OTOMASYONU',
        description:
          'Instagram için otomatik yanıt: Bir gönderinin, Reels\'in ya da story\'nin altına anahtar kelimeyi yazan kişiye DM ile ilgili link gider — istenirse önce takip kontrolü yapılır. Kurallar tek tek paylaşımlara bağlanabiliyor, panel e-posta koduyla korunuyor.',
        metrics: [
          { label: 'PLATFORM', value: 'Instagram' },
          { label: 'ÇEKİRDEK', value: 'Webhook & DM' },
          { label: 'DURUM', value: 'Yayında' },
        ],
      },
      {
        category: 'YAPAY ZEKA / ŞABLON MERKEZİ',
        description:
          'Claude Code için şablon kütüphanesi: 1.942 skill, agent, komut, hook ve MCP; aranabilir ve tek bir npx komutuyla kurulabilir. Baştan sona iki dilli — Türkçe ve Almanca yan yana karşılaştırılabiliyor.',
        metrics: [
          { label: 'BİLEŞEN', value: '1.942' },
          { label: 'DİLLER', value: 'TR & DE' },
          { label: 'DURUM', value: 'Yayında' },
        ],
      },
      {
        category: 'VİDEO / REELS EDİTÖRÜ',
        description:
          'Tarayıcıda çalışan, 9:16 Reels ve TikTok için video stüdyosu: video ya da görsel yükle, metnini yaz; karaoke altyazı, müzik ve efektleri zaman çizelgesinde ayarla, Full HD indir. Dosyalar indirildikten sonra sunucudan silinir.',
        metrics: [
          { label: 'FORMAT', value: '9:16 Reels' },
          { label: 'ÇIKTI', value: 'Full HD' },
          { label: 'VERİ', value: 'İndirince silinir' },
        ],
      },
      {
        category: 'GASTRONOMİ / PERSONEL & İŞLETME YÖNETİMİ',
        description:
          'Gastronomi ve KOBİ işletmeleri için eksiksiz personel ve işletme yönetimi: çalışanlar işe başlarken kioskta giriş-çıkış yapıyor; maaş hesaplama, hastalık bildirimleri, izinler ve devamsızlıklar aynı sistemde — ayrıca vardiya planı, personel dosyaları, tedarikçiler, fatura tarama, muhasebe ve HACCP. İki dilli (DE/TR), yapay zeka asistanlı. Erişim sadece talep üzerine.',
        metrics: [
          { label: 'MODÜL', value: '15' },
          { label: 'DİLLER', value: 'DE & TR' },
          { label: 'ERİŞİM', value: 'Talep üzerine' },
        ],
      },
      {
        category: 'ŞİRKETLER / DİJİTAL İŞLETME ORGANİZASYONU',
        description:
          'Dijital işletme organizasyonu için kurumsal site: siparişler ve tedarikçiler, vardiya planı ve çalışma saatleri, giderler ve faturalar, zorunlu bildirimler ve personel dosyaları — her alan kendi bölümünde; işletmelere her şeyin tek bir platformda nasıl birleştiğini gösteriyor.',
        metrics: [
          { label: 'HEDEF KİTLE', value: 'Şirketler' },
          { label: 'ODAK', value: 'Otomasyon' },
          { label: 'DURUM', value: 'Yayında' },
        ],
      },
      {
        category: 'GASTRONOMİ / İŞLETME & PERSONEL YÖNETİMİ',
        description:
          'İsviçre gastronomi işletmeleri için L-GAV\'a uygun merkezi işletme ve personel yönetimi: çalışanlar tablet kioskta PIN ile giriş-çıkış yapıyor; vardiya planı, raporlu hastalık bildirimleri ve izin talepleri de burada. İsviçreli tedarikçilerden alım, KDV tanıyan fatura tarama, mali müşavir defterli aylık muhasebe ve gıda mevzuatına uygun HACCP kayıtları — çevrimdışı da çalışır, yerel yedek alır. Erişim sadece talep üzerine.',
        metrics: [
          { label: 'İŞ HUKUKU', value: 'L-GAV' },
          { label: 'HİJYEN', value: 'HACCP / LMG' },
          { label: 'ERİŞİM', value: 'Talep üzerine' },
        ],
      },
    ],
  },
  repos: {
    eyebrow: 'İlham Kaynakları',
    line1: 'Favoriler &',
    line2: 'İlham.',
    intro:
      'Günlük çalışmama ilham veren açık kaynak araç ve repo seçkisi. Etkileşimli efektleri görmek için fare imlecini kartların üzerine getirin.',
    introTouch:
      'Günlük çalışmama ilham veren açık kaynak araç ve repo seçkisi. Çevirmek için bir karta dokunun.',
    githubRepo: 'GitHub Deposu',
    externalLink: 'Harici Bağlantı',
    openBtn: 'AÇ ↗',
    close: 'Kapat',
    detailsSuffix: 'detayları göster',
    flipBack: 'Geri çevir',
    flipHint: 'Çevirmek için dokunun',
    copy: 'Kopyala',
    copied: 'Kopyalandı',
    prevPage: 'Önceki sayfa',
    nextPage: 'Sonraki sayfa',
    githubShort: 'GitHub ↗',
    openShort: 'Aç ↗',
    items: [
      {
        badge: 'UI Framework',
        description: 'Modern, animasyonlu ve etkileyici Tailwind CSS bileşen koleksiyonu.',
        details:
          'Bağımsız bir npm paketi değil: bileşenler shadcn CLI ile doğrudan kendi koduna kopyalanır. Sonrasında kod tamamen sana ait, Tailwind CSS ve Framer Motion ile serbestçe özelleştirilebilir. Buradaki kart hover efektinin tam olarak kendisi de oradan geliyor.',
        commandNotes: ['Tam olarak bu kart hover efektini projene kurar.'],
        tags: ['React', 'TailwindCSS', 'Framer Motion'],
      },
      {
        badge: 'AI Agent Engine',
        description: 'Gelişmiş yapay zeka eşleştirme ve otonom kodlama asistanı sistemi.',
        details:
          'Google\'ın bağımsız, ajan tabanlı geliştirme ortamı — npm paketi değil. antigravity.google adresinden indirilir. Shell komutları yerine görevler doğal dilde yazılır — ajan kodu kendi başına planlar, yazar ve test eder. Örnek promptlar:',
        commandNotes: [
          'Örnek prompt — sıfırdan bir özellik inşa ettirir.',
          'Örnek prompt — ajan hatanın kaynağını kendi bulur.',
          'Örnek prompt — test kapsamını otomatik oluşturur.',
        ],
        tags: ['AI', 'Gemini', 'Agentic Workflow'],
      },
      {
        badge: 'Animation Engine',
        description: 'React için production\'a hazır 60FPS animasyon kütüphanesi.',
        details:
          'React için bildirimsel animasyonlar — motion.div, AnimatePresence, layoutId üzerinden paylaşılan layout geçişleri. Bu sitedeki hemen her hareketi o çalıştırıyor: kart hover\'ları, bölüm açılışları, sayfa geçişleri, hatta bu detay paneli.',
        commandNotes: ['Kütüphaneyi proje bağımlılığı olarak kurar.'],
        tags: ['React', 'TypeScript', 'Physics'],
      },
      {
        badge: 'Audio Engine',
        description: 'Mekanik ve bilim-kurgu ses efektleri için gerçek zamanlı sentezleyici.',
        details:
          'Harici paket yok: doğrudan native Web Audio API üzerine yazılmış kendi kodum, src/lib/sound.ts içinde. Tarayıcıda ses dosyası hiç kullanmadan tıklama, çan sesi ve FloatingDock\'un kalp atışı nabzını üretir.',
        commandNotes: [
          'Mekanik tuş tıklaması — her arayüz tıklamasında.',
          'Bir bölüm açılırken sıcak akor sesi.',
          'Kapanırken derin, boğuk bir gümbürtü.',
          'Retro arpej — örneğin sesi tekrar açarken.',
          'Bu çıktı paneli için mürekkep püskürtme sesi örneği.',
          'Bilim-kurgu anları için dijital bitcrush kekemeliği.',
        ],
        tags: ['WebAudio API', 'Synthesizer', 'DSP'],
      },
      {
        badge: '3D Graphics',
        description: 'Tarayıcıda donanım hızlandırmalı 3D parçacık ve shader sahneleri.',
        details:
          'Tarayıcıda 3D için standart kütüphane — WebGL üzerinden sahneler, kameralar, ışık ve GLSL shader\'lar. "Yapım Aşamasında" bölümünde yakında yayına girecek parçacık ve shader denemelerini o çalıştırıyor.',
        commandNotes: ['Kütüphaneyi proje bağımlılığı olarak kurar.'],
        tags: ['Three.js', 'WebGL', 'GLSL Shaders'],
      },
      {
        badge: 'Open Source Firebase',
        description: 'PostgreSQL tabanlı gerçek zamanlı veritabanı ve kimlik doğrulama motoru.',
        details:
          'PostgreSQL tabanlı, Firebase\'e açık kaynak alternatif — veritabanı, kimlik doğrulama, gerçek zamanlı abonelikler ve depolama tek bir API üzerinden.',
        commandNotes: ['İstemciyi proje bağımlılığı olarak kurar.'],
        tags: ['PostgreSQL', 'Realtime', 'Auth'],
      },
      {
        badge: 'MCP Sunucu Dizini',
        description: 'Yapay zeka asistanları için derlenmiş Model Context Protocol sunucu listesi.',
        details:
          'Topluluk tarafından yönetilen GitHub listesi: yüzlerce MCP sunucusu (Model Context Protocol) kategoriye göre sıralanmış — dosya sistemi, veritabanları, tarayıcı otomasyonu, güvenlik, finans ve daha fazlası. MCP, Claude Desktop veya Claude Code gibi istemcilerin dosyalara, veritabanlarına veya API\'lere güvenle erişmek için bu sunucularla konuştuğu açık protokoldür. Her giriş kendi kurulum talimatına bağlantı veriyor.',
        commandNotes: [
          'Örnek: listeden filesystem sunucusunu yerelde başlatır.',
          'Sunucuyu Claude Code\'a kaydeder — sonrasında hemen araç olarak hazır olur.',
        ],
        tags: ['MCP', 'AI Tools', 'Awesome List'],
      },
    ],
  },
  construction: {
    eyebrow: 'Yapım Aşamasında',
    line1: 'Yapım aşamasındaki',
    line2: 'projeler.',
    paragraph:
      'Burada yeni nesil WebGL 3D denemeleri, otonom yapay zeka ajan entegrasyonları ve deneysel arayüzler ortaya çıkıyor. Canlı demolar yakında geliyor.',
    statusBadge: 'AKTİF GELİŞTİRMEDE',
    cardTitle: '3D WebGL & AI Agent Lab',
    cardDescription:
      'Gelecekteki web deneyimlerini şekillendirecek etkileşimli 3D simülasyonlar ve yapay zeka ajan modülleri yakında burada.',
    imageBadge: '🚧 YAPIM AŞAMASINDA 🚧',
  },
  experience: {
    eyebrow: 'Deneyim',
    line1: 'Kariyer &',
    line2: 'Duraklar.',
    journey: [
      {
        year: '2025\'ten beri',
        title: 'Web Geliştirici',
        organization: 'Serbest · Zürih',
        description:
          'Fırın, oto servis ve özel müşteriler için siteler — ilk taslaktan yayına kadar. Buna ek olarak gerçek zamanlı 3D ve yapay zeka üzerine kendi denemelerim.',
      },
      {
        year: '08.2014 — 08.2016',
        title: 'Şoför',
        glow: true,
        organization: 'Zidus GmbH Transport, Zürih',
        description:
          'Satış noktalarına güvenilir teslimat yaptım, günlük yükü kontrol ettim ve zimmetimdeki aracın bakım ve düzenini sağladım.',
      },
      {
        year: '02.2014 — 07.2014',
        title: 'Yönetim & İnsan Kaynakları',
        organization: 'Citybeck AG, Zürih',
        description:
          'Genel müdürlüğe ve insan kaynaklarına destek verdim: maaş ödemeleri, emeklilik sandığı işleri, personel dosyaları ile işe giriş ve çıkışlar.',
      },
      {
        year: '07.2009 — 12.2013',
        title: 'İşletme Müdürlüğü / Gece Vardiyası Sorumlusu',
        organization: 'Bäckerei Happy AG, Zürih',
        description:
          'Kasa, muhasebe, düzen ve personel işlerinden sorumluydum. Müşteri odaklı davranış, satışa hazır olma, ürün sergileme ve satış geliştirme.',
      },
      {
        year: '2002 — 2004',
        title: 'Web Publisher Eğitimi',
        organization: 'EB Wolbach / Web Publisher Zentrum, Zürih',
        description:
          'Bir yıllık eğitim ve ek kurslar: HTML, CSS ve JavaScript, PHP, phpMyAdmin ile veritabanları, Flash ile ActionScript, ayrıca tasarım ve sunum.',
      },
      {
        year: '09.1990 — 11.1998',
        title: 'Satış Elemanı',
        organization: 'Migros Genossenschaftszentrum, Zürih',
        description:
          'Ürün siparişleri, mal kabulü, kampanya kurulumları, raf düzeni ile son kullanma tarihi ve stok kontrolleri — buna ek olarak müşteri danışmanlığı.',
      },
    ],
  },
  contact: {
    eyebrow: 'İletişim',
    line1: 'Bana',
    line2: 'yazın.',
    intro:
      'Bir proje, artık uymayan bir web sitesi, ya da sadece bir soru mu var? Bana yazın — hiçbir taahhüt ve teknik jargon olmadan.',
    nameLabel: 'İsim',
    namePlaceholder: 'Adınız',
    emailLabel: 'E-Posta',
    emailPlaceholder: 'E-posta adresiniz',
    messageLabel: 'Mesaj',
    messagePlaceholder: 'Konu nedir?',
    sendBtn: 'Mesajı gönder ↗',
    successTitle: 'Mesajınız ulaştı',
    successText:
      'Teşekkürler! Mesajınız bize ulaştı, onay e-postası gelen kutunuza gönderildi. En kısa sürede size dönüş yapacağız.',
    emailLabelFooter: 'E-Posta:',
    locationLabelFooter: 'Konum:',
    location: 'Zürih · İsviçre',
    mailSubjectPrefix: 'Talep gönderen:',
  },
  bot: {
    title: 'EKADO Bot',
    welcome: 'Merhaba! Ben EKADO Bot\'um. Bana fiyat, süre, teknoloji ya da iletişim sorabilirsin.',
    fallback:
      'Buna hazırlıklı değilim — sadece birkaç anahtar kelime biliyorum. EKADO\'ya doğrudan yaz, o düzgün cevap verir: info@ekado.ch',
    placeholder: 'Bir şey sor…',
    send: 'Gönder',
    rules: [
      {
        keywords: ['fiyat', 'ücret', 'ne kadar', 'maliyet', 'bütçe', 'teklif', 'preis', 'kosten', 'kostet'],
        reply:
          'Kapsama göre değişiyor — sade bir firma sitesiyle gerçek zamanlı 3D bir çalışma aynı şey değil. Aklındakini kısaca yaz, EKADO sana net bir teklif versin: info@ekado.ch',
      },
      {
        keywords: ['ne kadar sürer', 'süre', 'zaman', 'teslim', 'ne zaman biter', 'wie lange', 'dauer'],
        reply:
          'Orta ölçekli bir site bir iki haftada ayağa kalkıyor. 3D ve bol animasyon işin içine girince dört altı haftayı buluyor. Kapsam netleşince tarih de netleşir.',
      },
      {
        keywords: ['ne yapıyor', 'hizmet', 'neler yap', 'ne iş', 'was machst', 'dienstleistung'],
        reply:
          'Sıfırdan web siteleri: firma sayfaları, portfolyolar, tanıtım sayfaları — üstüne tarayıcıda gerçek zamanlı 3D ve motion design. Hepsi elle yazılıyor, hazır şablon yok.',
      },
      {
        keywords: ['teknoloji', 'hangi dil', 'ne ile', 'stack', 'araç', 'react', 'typescript', 'framework'],
        reply:
          'Temelde React ve TypeScript, build için Vite, stil için Tailwind, hareket için GSAP ve Framer Motion, 3D için Three.js ve WebGL. Arka uç genelde Supabase.',
      },
      {
        keywords: ['3d', 'webgl', 'three', 'shader', 'glsl', 'motion'],
        reply:
          'Tarayıcıda gerçek zamanlı 3D EKADO\'nun asıl alanı — parçacık tipografisi, shader\'lar, scroll\'a bağlı kamera hareketleri. Projeler listesindeki 09 numaraya bak: tek bir Three.js sahnesi.',
      },
      {
        keywords: ['bu site', 'bu sayfa', 'nasıl yapt', 'nasıl yapıld', 'diese seite', 'wie gebaut'],
        reply:
          'Bu mu? React 19, Vite, Tailwind 4. Fotoğraf efektleri SVG filtreleri ve maskelerle, Deneyim bölümündeki zaman çizelgesi GSAP ScrollTrigger ile çalışıyor. Bu arada tıklama sesleri sentezleniyor, ses dosyası değil.',
      },
      {
        keywords: ['müsait', 'musait', 'boş', 'vakit', 'iş al', 'kapasite', 'verfügbar', 'frei'],
        reply:
          'Evet, EKADO şu an proje alıyor. Kısa bir e-posta at, gerisi hızlı ilerler.',
      },
      {
        keywords: ['proje', 'referans', 'örnek', 'ornek', 'çalışma', 'portfolyo', 'portfolio'],
        reply:
          'Projeler listesinde on beş iş var — Zürih\'te bir oto tamirhanesinden bir fırına, Three.js ile yapılmış bir portfolyodan Instagram otomasyonuna, tarayıcıda çalışan bir video stüdyosuna ve gastronomi işletmeleri için bir yönetim yazılımına. Projeler bölümüne in, kartların hepsi çevriliyor.',
      },
      {
        keywords: ['özgeçmiş', 'ozgecmis', 'cv', 'işe al', 'kadro', 'iş ilan', 'başvuru', 'lebenslauf', 'job'],
        reply:
          'Kadrolu çalışma ya da uzun soluklu iş birliği için doğrudan yaz: info@ekado.ch — pozisyona dair birkaç satırla birlikte.',
      },
      {
        keywords: ['dil', 'konuş', 'hangi diller', 'almanca', 'türkçe', 'İngilizce', 'ingilizce', 'sprache'],
        reply:
          'Almanca ve Türkçe akıcı, teknik her şey için İngilizce. Bu sayfanın dilini de sağ üstten değiştirebilirsin.',
      },
      {
        keywords: ['nerede', 'nerdesin', 'şehir', 'konum', 'uzaktan', 'zürih', 'zurich', 'isviçre', 'standort'],
        reply:
          'Zürih, İsviçre. Ama projeler uzaktan sorunsuz yürüyor — günün yarısı zaten ekran karşısında geçiyor.',
      },
      {
        keywords: ['iletişim', 'iletisim', 'ulaş', 'numara', 'telefon', 'mail', 'e-posta', 'eposta', 'whatsapp', 'instagram', 'kontakt'],
        reply:
          'En hızlısı e-posta: info@ekado.ch — ya da aşağıdaki iletişim formu. WhatsApp ve Instagram sayfanın en altında.',
      },
      {
        keywords: ['gerçek mi', 'gercek mi', 'yapay zeka', 'robot musun', 'insan mısın', 'chatgpt', 'yapay zekâ', 'bist du echt'],
        reply:
          'Dürüst olayım: birkaç satır JavaScript ve bir anahtar kelime listesiyim. Model yok, bulut yok, abonelik yok. Ama yazışım inandırıcı.',
      },
      {
        keywords: ['gizli', 'sürpriz', 'surpriz', 'easter egg', 'oyun', 'püf', 'saklı'],
        reply:
          'Birkaç tane var. ~ tuşuna bir bas. Ya da eski Konami kodunu dene. Fazlasını söylemem.',
      },
      {
        keywords: ['nasılsın', 'nasilsin', 'naber', 'ne haber', 'wie geht'],
        reply:
          'İyiyim, sorduğun için sağ ol. Burada öylece durup soru bekliyorum ama manzara güzel.',
      },
      {
        keywords: ['teşekkür', 'tesekkur', 'sağol', 'sagol', 'görüşürüz', 'gorusuruz', 'hoşça', 'hoşca kal', 'danke'],
        reply:
          'Rica ederim. Sonradan bir şey takılırsa e-posta aşağıda: info@ekado.ch',
      },
      {
        keywords: ['merhaba', 'selam', 'hey', 'hi', 'hallo', 'günaydın', 'iyi günler'],
        reply: 'Merhaba! Bana fiyat, süre, teknoloji ya da iletişim sor — ya da öylece dolaş.',
      },
    ],
  },
};

export const translations: Record<Language, TranslationSchema> = { de, tr };
