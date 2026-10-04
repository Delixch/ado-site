// Quelle: Adodesignfirma/src/lib/translations.ts (unveraendert uebernommen)
/**
 * Alle sichtbaren Texte der Seite, auf Deutsch und Tuerkisch. Struktur
 * folgt data/translations.ts aus gemini-lebenslauf: ein typisches Schema,
 * ein Objekt pro Sprache. Technische Werte (Farben, Links, Tech-Tags,
 * Zahlen) bleiben in den jeweiligen Komponenten/Datendateien, hier steht
 * nur, was auf dem Bildschirm gelesen wird.
 */
type BotTopic = string;

export type Language = 'de' | 'tr';

export interface ProjectText {
  /** Firmenseite: der Titel kommt mit, weil er uebersetzt wird. */
  title: string;
  category: string;
  description: string;
  metrics: { label: string; value: string }[];
}

export interface SkillBlockText {
  title: string;
  badge: string;
  stat: string;
  description: string;
  /** Firmenseite: die Stichworte unter jeder Karte werden uebersetzt. */
  items: string[];
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
    /** Querverweis im Menue zum Portfolio (adodesign.ch). */
    portfolioKicker: string;
    portfolioText: string;
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
    /** Firmenseite: Text auf dem drehenden Ring an der Einfuehrungskarte. */
    ring: string;
    /** Firmenseite: Ablauf-Schema in der Einfuehrungskarte (Team -> App ->
     *  Lieferanten); die Lieferanten selbst kommen aus mock.rows. */
    flow: {
      team: string;
      app: string;
      suppliers: string;
    };
    /** Firmenseite: Bestell-Vorschau in der Bildhaelfte - Bestellung,
     *  E-Mail-Karte und Bestaetigung, uebereinandergelegt. */
    mock: {
      title: string;
      badge: string;
      rows: { supplier: string; item: string; state: string }[];
      mailTitle: string;
      mailMeta: string;
      confirmed: string;
    };
  };
  projects: {
    eyebrow: string;
    line1: string;
    line2: string;
    /** Firmenseite: Hinweis unter dem Kartenstapel. */
    footer: string;
    items: ProjectText[];
    /** Firmenseite: Beispiel-Wochenplan in der Bildhaelfte. Die Art jeder
     *  Zelle (Schicht, frei, Urlaub, krank, Ueberstunden) steht in
     *  ProjectsSection.tsx (planKinds), hier nur die Beschriftungen. */
    mock: {
      title: string;
      badge: string;
      days: string[];
      rows: { name: string; cells: string[] }[];
      /** Legende in der Reihenfolge Schicht, Urlaub, krank, Ueberstunden. */
      legend: string[];
      notice: string;
      footerLabel: string;
      footerValue: string;
    };
    /** Firmenseite: weitere Beispiele in derselben Karte - je eines pro
     *  Karte im Stapel (items 1-5); der Wochenplan oben steht fuer die
     *  Einsatzplanung. Mit den Pfeilen blaettert man durch. `keyValue`
     *  und `keyLabel` stehen im Kreis. Art der Zeilen (erledigt, frei,
     *  freigegeben ...) und Zahlen fuer Balken: ProjectsSection.tsx. */
    examples: {
      prevLabel: string;
      nextLabel: string;
      week: {
        title: string;
        badge: string;
        rows: { day: string; time: string; place: string }[];
        today: string;
        footer: string;
        keyValue: string;
        keyLabel: string;
      };
      tasks: {
        title: string;
        badge: string;
        rows: { text: string; time: string }[];
        footer: string;
        keyValue: string;
        keyLabel: string;
      };
      vacation: {
        title: string;
        badge: string;
        quota: string;
        rows: { name: string; dates: string; state: string }[];
        /** Legende in der Reihenfolge bezogen, geplant, offen. */
        legend: string[];
        keyValue: string;
        keyLabel: string;
      };
      sick: {
        title: string;
        badge: string;
        rows: { time: string; text: string }[];
        footer: string;
        keyValue: string;
        keyLabel: string;
      };
      overtime: {
        title: string;
        badge: string;
        rows: { name: string; value: string }[];
        footer: string;
        keyValue: string;
        keyLabel: string;
      };
    };
  };
  skills: {
    eyebrow: string;
    line1: string;
    line2: string;
    blocks: SkillBlockText[];
    /** Firmenseite: Monatsuebersicht in der Bildhaelfte. `share` ist der
     *  Anteil am Monat in Prozent und bestimmt die Bogenlaenge im Ring. */
    mock: {
      title: string;
      totalLabel: string;
      totalValue: string;
      bars: { label: string; amount: string; share: number }[];
      paidLabel: string;
      paidValue: string;
      openLabel: string;
      openValue: string;
    };
    /** Firmenseite: Buchungsjournal in der Karte des vierten Schritts. */
    ledger: {
      title: string;
      lines: { date: string; text: string; amount: string }[];
      status: string;
    };
  };
  repos: {
    eyebrow: string;
    line1: string;
    line2: string;
    intro: string;
    /** Firmenseite: drei Zusagen unter der Einleitung. */
    promises: string[];
    /** Beschriftung unter der Haeufigkeit im Kreis ("pro Jahr"). */
    perYear: string;
    /** Pflichtmeldungen: Haeufigkeit pro Jahr, Name, Stelle, Stand. */
    reports: { freq: string; name: string; authority: string; status: string }[];
    /** Beispiel-Meldungen in der Bildhaelfte: ein "Autopilot" arbeitet
     *  sie nacheinander ab (fuellen, pruefen, Stempel). Welche Pille rechts
     *  dazugehoert, steht in ReposSection.tsx (DOC_REPORT). `steps` = die
     *  drei Stufen des Fortschrittsbalkens, `sources` = aus welchen
     *  Bereichen der Plattform die Daten stammen. */
    doc: {
      kicker: string;
      stamp: string;
      steps: string[];
      sourcesLabel: string;
      items: {
        year: string;
        title: string;
        recipient: string;
        fields: { label: string; value: string }[];
        sources: string[];
        deadline: string;
        stampDate: string;
      }[];
    };
  };
  construction: {
    eyebrow: string;
    line1: string;
    line2: string;
    kicker: string;
    title: string;
    paragraph: string;
    /** Kreis-Kachel: Wert und Beschriftung ("24/7"). */
    always: { value: string; label: string };
    /** Kacheln in der Reihenfolge Mobil, Angebot, Team, Kontakt. */
    tiles: { title: string; text: string }[];
    cta: string;
    /** Beispiel-Homepage in der Bildhaelfte: Browser und Handy blaettern
     *  selbst durch Start, Angebot, Team, Kontakt; ein Mauszeiger klickt
     *  "Bestellen", oben kommen Anfragen herein (`toasts`, reihum); unten
     *  die Wochenstatistik. `nav` = Angebot, Team, Kontakt. */
    mock: {
      brand: string;
      url: string;
      since: string;
      headline: string;
      button: string;
      nav: string[];
      services: string[];
      /** Preise zu `services`, gleiche Reihenfolge. */
      prices: string[];
      teamLine: string;
      values: string[];
      address: string;
      hours: string;
      call: string;
      route: string;
      toasts: string[];
      stats: {
        title: string;
        days: string[];
        visitors: string;
        requests: string;
        rating: string;
      };
    };
  };
  experience: {
    eyebrow: string;
    line1: string;
    line2: string;
    intro: string;
    /** Register: jede Mappe mit ihren Dokumenten. */
    folders: { tab: string; docs: { name: string; meta: string }[] }[];
    onboardingTitle: string;
    /** Schritte der digitalen Einfuehrung; wie viele erledigt sind, steht
     *  in ExperienceSection.tsx (ONBOARDING_DONE). */
    steps: string[];
    /** Personalakte in der Bildhaelfte. */
    mock: {
      name: string;
      role: string;
      startLabel: string;
      start: string;
      progressLabel: string;
      stepsLabel: string;
      docs: string;
      signed: string;
    };
  };
  contact: {
    eyebrow: string;
    line1: string;
    line2: string;
    intro: string;
    benefits: string[];
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendBtn: string;
    successTitle: string;
    successText: string;
    location: string;
    mailSubjectPrefix: string;
    /** Mitte des Rings in der Bildhaelfte. */
    hub: { center: string; centerSub: string };
  };
  /** Firmenseite: Impressum und Datenschutz, als Dialog aus der Fusszeile.
   *  Platzhalter {name} {person} {street} {zipCity} {country} {email} {uid}
   *  kommen aus src/lib/company.ts - fehlt ein Wert, erscheint er markiert;
   *  eine Zeile mit {uid} entfaellt ganz, wenn keine UID hinterlegt ist. */
  legal: {
    impressum: string;
    privacy: string;
    impressumTitle: string;
    privacyTitle: string;
    close: string;
    builtWith: string;
    country: string;
    /** Hinweis ueber dem Text (TR: massgebend ist Deutsch). Leer = keiner. */
    bindingNote: string;
    placeholders: { name: string; street: string; zipCity: string };
    impressumSections: { heading: string; lines: string[] }[];
    privacyUpdated: string;
    privacySections: { heading: string; lines: string[] }[];
  };
  /** Der Assistent von EKADO Design (keine echte KI, feste Antworten). Die
   *  Stichworte und die Reihenfolge der Themen stehen in lib/botRules.ts,
   *  hier nur die Antworten. `{email}` wird durch COMPANY.email ersetzt.
   *  Die Antworten sagen nur, was auch auf der Seite steht - nichts
   *  versprechen, was die Plattform nicht nachweislich kann. */
  bot: {
    title: string;
    welcome: string;
    fallback: string;
    placeholder: string;
    send: string;
    replies: Record<BotTopic, string>;
  };
  packages: {
    eyebrow: string;
    line1: string;
    line2: string;
    lede: string;
    choose: string;
    back: string;
    customNote: string;
    plans: {
      id: string;
      name: string;
      badge?: string;
      tagline: string;
      modules: string[];
      features: string[];
    }[];
  };
}

// @section:de
export const de: TranslationSchema = {
  nav: {
    about: 'Bestellungen',
    work: 'Einsatzplanung',
    skills: 'Buchhaltung',
    repos: 'Meldungen',
    construction: 'Homepage',
    experience: 'Personal',
    contact: 'Kontakt',
  },
  dock: {
    start: 'Start',
    github: 'GitHub',
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
    portfolioKicker: 'Portfolio',
    portfolioText: 'Websites, Echtzeit-3D und Motion Design – ausgewählte Arbeiten.',
  },
  hero: {
    badgeAvailable: 'Für Unternehmen',
    badgeLocation: 'Zürich · Schweiz',
    lineBuild: 'Alles an einem Ort.',
    lineDigital: 'Alles unter',
    lineExperiences: 'Kontrolle.',
    // Mit ' • ' getrennt: HeroSection setzt die Punkte in der Akzentfarbe.
    roleLine: 'Bestellungen • Personal • Buchhaltung',
    subtitle:
      'Wir bündeln die gesamten digitalen Abläufe Ihres Unternehmens in einer einzigen Plattform. Bestellungen, Einsatzplanung, Überstunden, Personalprozesse, Buchhaltung und staatliche Meldungen – alles läuft automatisiert, strukturiert und fehlerfrei.',
    ctaWork: 'UNSERE LEISTUNGEN ↓',
    ctaEmail: 'E-MAIL ↓',
    quoteLine1: 'Sie konzentrieren sich',
    quoteLine2: 'auf Ihr Kerngeschäft.',
  },
  about: {
    eyebrow: 'Lieferanten & Bestellungen',
    line1: 'Ihre Bestellungen –',
    line2: 'zentral und automatisiert.',
    bioTitle: 'Intelligentes Bestell- & Lieferantenmanagement',
    bioPart1: 'Alle Bestellungen an Ihre Lieferanten laufen über ',
    bioStrong1: 'eine einzige Anwendung',
    bioPart2: '. Sie werden digital erstellt, verwaltet und ',
    bioStrong2: 'automatisch per E-Mail',
    bioPart3: ' an jeden Lieferanten übermittelt. Kommunikationsfehler, Verzögerungen und doppelte Bestellungen gehören der Vergangenheit an.',
    tags: ['Zentrale Steuerung', 'Automatische Übermittlung', 'Fehlerfreie Abläufe'],
    statLabels: ['App für alle Lieferanten', 'doppelte Bestellungen', 'digital dokumentiert', 'jederzeit bestellbar'],
    cta: 'Bestellprozess besprechen',
    ring: 'BESTELLEN • SENDEN • BESTÄTIGEN • ',
    flow: {
      team: 'Ihr Team',
      app: 'EKADO App',
      suppliers: 'Lieferanten',
    },
    mock: {
      title: 'Neue Bestellung',
      badge: '#1042',
      rows: [
        { supplier: 'Frischwaren AG', item: '24 × Gemüsekiste', state: 'gesendet' },
        { supplier: 'Getränke Huber', item: '12 × Mineralwasser', state: 'bestätigt' },
        { supplier: 'Bürobedarf Meier', item: 'Druckerpapier A4', state: 'in Vorbereitung' },
      ],
      mailTitle: 'Automatisch per E-Mail',
      mailMeta: 'an 3 Lieferanten · 09:41',
      confirmed: 'Bestätigt',
    },
  },
  skills: {
    eyebrow: 'Buchhaltung & Zahlungen',
    line1: 'Ihre monatlichen Ausgaben –',
    line2: 'automatisch erfasst und verarbeitet.',
    blocks: [
      {
        title: 'Kosten erfassen',
        badge: 'Schritt 1',
        stat: 'automatisch verbucht',
        description:
          'Monatliche Kosten, Einkäufe und Zusatzaufwände werden automatisch verbucht – ohne Abtippen, ohne Belegstapel.',
        items: ['Einkäufe', 'Zusatzaufwände', 'Fixkosten'],
      },
      {
        title: 'Rechnungen empfangen',
        badge: 'Schritt 2',
        stat: 'direkt in die App',
        description:
          'Lieferanten senden ihre Rechnungen direkt an die Buchhaltungs-App. Jede Rechnung ist sofort zugeordnet und auffindbar.',
        items: ['Lieferantenrechnungen', 'Direkteingang', 'Zuordnung'],
      },
      {
        title: 'Zahlung über die Bank',
        badge: 'Schritt 3',
        stat: 'sauber dokumentiert',
        description:
          'Die App führt die Zahlung über die Bank aus und dokumentiert sie sauber – termingerecht und nachvollziehbar.',
        items: ['Bankzahlung', 'Fälligkeiten', 'Belege'],
      },
      {
        title: 'Volle Übersicht',
        badge: 'Schritt 4',
        stat: 'jederzeit abrufbar',
        description:
          'Alle Transaktionen sind nachvollziehbar, geordnet und jederzeit abrufbar. Ihr Betrieb gewinnt Zeit, Klarheit und volle finanzielle Übersicht.',
        items: ['Finanzübersicht', 'Kostenkontrolle', 'Transparenz'],
      },
    ],
    mock: {
      title: 'Monatsübersicht · September',
      totalLabel: 'Ausgaben gesamt',
      totalValue: "CHF 18'460",
      bars: [
        { label: 'Einkauf', amount: "7'920", share: 43 },
        { label: 'Personal', amount: "5'180", share: 28 },
        { label: 'Miete', amount: "4'800", share: 26 },
        { label: 'Sonstiges', amount: '560', share: 3 },
      ],
      paidLabel: 'Rechnungen bezahlt',
      paidValue: '24',
      openLabel: 'Offen',
      openValue: '0',
    },
    ledger: {
      title: 'Buchungsjournal · September',
      lines: [
        { date: '02.09.', text: 'Frischwaren AG', amount: "1'240.00" },
        { date: '04.09.', text: 'Getränke Huber', amount: '386.40' },
        { date: '05.09.', text: 'Miete Lokal', amount: "4'800.00" },
        { date: '09.09.', text: 'Bürobedarf Meier', amount: '129.90' },
        { date: '12.09.', text: 'Metzgerei Vogel', amount: '912.30' },
        { date: '15.09.', text: 'Strom & Wasser', amount: '318.75' },
        { date: '19.09.', text: 'Druckerei Senn', amount: '265.00' },
        { date: '23.09.', text: 'Reinigung Blitz', amount: '480.00' },
      ],
      status: 'Alle Zahlungen ausgeführt',
    },
  },
  projects: {
    eyebrow: 'Einsatzplanung & Überstunden',
    line1: 'Arbeitszeiten und Einsätze –',
    line2: 'jederzeit klar ersichtlich.',
    footer: 'Karte wählen – die Details öffnen sich · sechs Funktionen, eine App',
    items: [
      {
        title: 'Arbeitstage & Einsatzzeiten',
        category: 'Mitarbeiter-App',
        description:
          'Ihre Mitarbeitenden sehen Arbeitstage und Einsatzzeiten direkt in der App – immer aktuell, auch unterwegs. Änderungen im Plan erscheinen sofort.',
        metrics: [
          { label: 'Ansicht', value: 'Tag · Woche · Monat' },
          { label: 'Zugriff', value: 'App & Web' },
          { label: 'Änderungen', value: 'sofort sichtbar' },
        ],
      },
      {
        title: 'Aufgaben pro Einsatz',
        category: 'Planung',
        description:
          'Zu jedem Einsatz stehen die Aufgaben direkt im Plan. Niemand muss nachfragen, was heute ansteht – die Übergabe ist klar geregelt.',
        metrics: [
          { label: 'Zuordnung', value: 'pro Einsatz' },
          { label: 'Hinweise', value: 'im Plan' },
          { label: 'Rückfragen', value: 'entfallen' },
        ],
      },
      {
        title: 'Jahresurlaub',
        category: 'Abwesenheiten',
        description:
          'Urlaubsanträge werden digital gestellt und freigegeben. Resturlaub und geplante Abwesenheiten sind für alle jederzeit sichtbar.',
        metrics: [
          { label: 'Antrag', value: 'digital' },
          { label: 'Freigabe', value: 'mit einem Klick' },
          { label: 'Resturlaub', value: 'immer aktuell' },
        ],
      },
      {
        title: 'Krankmeldungen',
        category: 'Abwesenheiten',
        description:
          'Krankmeldungen, Abwesenheiten und kurzfristige Änderungen werden digital erfasst und automatisch an den Betrieb übermittelt.',
        metrics: [
          { label: 'Erfassung', value: 'in der App' },
          { label: 'Meldung', value: 'automatisch' },
          { label: 'Plan', value: 'passt sich an' },
        ],
      },
      {
        title: 'Überstunden',
        category: 'Arbeitszeit',
        description:
          'Überstunden werden sauber dokumentiert und stehen der Geschäftsleitung jederzeit zur Verfügung – nachvollziehbar pro Person und Monat.',
        metrics: [
          { label: 'Dokumentation', value: 'lückenlos' },
          { label: 'Auswertung', value: 'pro Person' },
          { label: 'Zugriff', value: 'Geschäftsleitung' },
        ],
      },
      {
        title: 'Einsatzplanung',
        category: 'Betrieb',
        description:
          'Die gesamte Einsatzplanung wird übersichtlich, fehlerfrei und ohne administrativen Aufwand gesteuert – für das ganze Team an einem Ort.',
        metrics: [
          { label: 'Planung', value: 'zentral' },
          { label: 'Fehler', value: 'vermieden' },
          { label: 'Aufwand', value: 'minimal' },
        ],
      },
    ],
    mock: {
      title: 'Einsatzplan · KW 37',
      badge: 'Team',
      days: ['Mo', 'Di', 'Mi', 'Do', 'Fr'],
      rows: [
        { name: 'Anna', cells: ['07–16', '07–16', 'Frei', '07–16', '07–16'] },
        { name: 'Marco', cells: ['12–21', '12–21', '12–21', 'Urlaub', 'Urlaub'] },
        { name: 'Selin', cells: ['07–16', 'Krank', 'Krank', '07–16', '07–16'] },
        { name: 'Luca', cells: ['Frei', '09–18', '09–18', '09–18', '09–20'] },
      ],
      legend: ['Schicht', 'Urlaub', 'Krank', 'Überstunden'],
      notice: 'Selin meldet sich krank – Plan angepasst',
      footerLabel: 'Überstunden diese Woche',
      footerValue: '+ 6,5 h',
    },
    examples: {
      prevLabel: 'Vorheriges Beispiel',
      nextLabel: 'Nächstes Beispiel',
      week: {
        title: 'Meine Woche · Anna',
        badge: 'App',
        rows: [
          { day: 'Mo 07.09.', time: '07–16', place: 'Küche' },
          { day: 'Di 08.09.', time: '07–16', place: 'Küche' },
          { day: 'Mi 09.09.', time: 'Frei', place: '' },
          { day: 'Do 10.09.', time: '07–16', place: 'Service' },
          { day: 'Fr 11.09.', time: '07–16', place: 'Küche' },
        ],
        today: 'heute',
        footer: 'Synchronisiert · vor 1 Min.',
        keyValue: '36 h',
        keyLabel: 'Einsatzzeit diese Woche',
      },
      tasks: {
        title: 'Aufgaben · Fr 11.09.',
        badge: 'Früh',
        rows: [
          { text: 'Warenannahme Frischwaren AG', time: '07:00' },
          { text: 'Kühlraum-Temperatur prüfen', time: '07:30' },
          { text: 'Mise en place Mittag', time: '09:00' },
          { text: 'Getränkelieferung kontrollieren', time: '13:00' },
          { text: 'Übergabe an die Spätschicht', time: '15:45' },
        ],
        footer: 'Anna · Schicht 07–16',
        keyValue: '3/5',
        keyLabel: 'Aufgaben erledigt',
      },
      vacation: {
        title: 'Jahresurlaub · 2026',
        badge: 'Team',
        quota: 'Anna · Anspruch 25 Tage',
        rows: [
          { name: 'Marco', dates: '10.–11.09.', state: 'Freigegeben' },
          { name: 'Anna', dates: '12.–16.10.', state: 'Freigegeben' },
          { name: 'Luca', dates: '21.–31.12.', state: 'Beantragt' },
        ],
        legend: ['bezogen', 'geplant', 'offen'],
        keyValue: '14',
        keyLabel: 'Tage Resturlaub',
      },
      sick: {
        title: 'Krankmeldung · Di 08.09.',
        badge: 'Selin',
        rows: [
          { time: '06:12', text: 'Krankmeldung in der App erfasst' },
          { time: '06:12', text: 'Betrieb automatisch informiert' },
          { time: '06:20', text: 'Plan für Di + Mi angepasst' },
          { time: 'Do', text: 'Arztzeugnis hochgeladen' },
        ],
        footer: 'Abwesend · 2 Tage',
        keyValue: 'Sofort',
        keyLabel: 'an den Betrieb gemeldet',
      },
      overtime: {
        title: 'Überstunden · September',
        badge: 'Monat',
        rows: [
          { name: 'Anna', value: '+ 2,0 h' },
          { name: 'Marco', value: '+ 4,5 h' },
          { name: 'Selin', value: '0,0 h' },
          { name: 'Luca', value: '+ 6,0 h' },
        ],
        footer: 'Für die Lohnabrechnung freigegeben',
        keyValue: '12,5 h',
        keyLabel: 'Überstunden im September',
      },
    },
  },
  repos: {
    eyebrow: 'Staatliche Meldungen',
    line1: 'Pflichtmeldungen und Berichte –',
    line2: 'korrekt, vollständig und fristgerecht.',
    intro:
      'Alle relevanten Daten für staatliche Meldungen werden automatisch vorbereitet. Berichte, Nachweise und Dokumente werden systematisch erstellt und sicher übermittelt – Ihr Betrieb erfüllt alle gesetzlichen Anforderungen ohne zusätzlichen Aufwand und ohne Risiko.',
    promises: ['Automatisch vorbereitet', 'Sicher übermittelt', 'Fristgerecht'],
    perYear: 'pro Jahr',
    reports: [
      { freq: '12×', name: 'Quellensteuer', authority: 'Kantonales Steueramt', status: 'automatisch' },
      { freq: '4×', name: 'MWST-Abrechnung', authority: 'ESTV', status: 'vorbereitet' },
      { freq: '1×', name: 'AHV-Lohnmeldung', authority: 'Ausgleichskasse', status: 'übermittelt' },
      { freq: '1×', name: 'BVG-Lohnmeldung', authority: 'Pensionskasse', status: 'übermittelt' },
      { freq: '1×', name: 'Unfallversicherung (UVG)', authority: 'Versicherer', status: 'vorbereitet' },
      { freq: '1×', name: 'Lohnausweise', authority: 'Mitarbeitende & Steueramt', status: 'übermittelt' },
    ],
    doc: {
      kicker: 'Pflichtmeldung',
      stamp: 'Übermittelt',
      steps: ['Vorbereitet', 'Geprüft', 'Übermittelt'],
      sourcesLabel: 'Daten aus',
      items: [
        {
          year: '2025',
          title: 'AHV-Lohnmeldung',
          recipient: 'an die Ausgleichskasse',
          fields: [
            { label: 'Betrieb', value: 'Muster GmbH' },
            { label: 'Periode', value: 'Jan–Dez 2025' },
            { label: 'Mitarbeitende', value: '12' },
            { label: 'Lohnsumme', value: "CHF 684'200" },
          ],
          sources: ['06 Personal', '03 Buchhaltung'],
          // Geschuetzte Leerzeichen: "2 Tage früher" bricht nie auseinander.
          deadline: 'Frist eingehalten – 2 Tage früher',
          stampDate: '28.01.2026',
        },
        {
          year: 'Q2 2026',
          title: 'MWST-Abrechnung',
          recipient: 'an die ESTV',
          fields: [
            { label: 'Periode', value: 'Apr–Jun 2026' },
            { label: 'Umsatz', value: "CHF 412'600" },
            { label: 'Vorsteuer', value: "CHF 18'940" },
            { label: 'Zahllast', value: "CHF 14'481" },
          ],
          sources: ['03 Buchhaltung', '01 Bestellungen'],
          deadline: 'Frist eingehalten – 4 Tage früher',
          stampDate: '27.08.2026',
        },
        {
          year: 'Aug 2026',
          title: 'Quellensteuer',
          recipient: 'an das kantonale Steueramt',
          fields: [
            { label: 'Periode', value: 'August 2026' },
            { label: 'Quellensteuerpflichtige', value: '3' },
            { label: 'Bruttolohn', value: "CHF 17'850" },
            { label: 'Quellensteuer', value: "CHF 1'642" },
          ],
          sources: ['06 Personal', '02 Einsatzplanung'],
          deadline: 'Frist eingehalten – 20 Tage früher',
          stampDate: '10.09.2026',
        },
      ],
    },
  },
  construction: {
    eyebrow: 'Homepage & Präsenz',
    line1: 'Ihr Unternehmen –',
    line2: 'modern, sichtbar und professionell.',
    kicker: 'Individuelle Homepage',
    title: 'Ein Auftritt, der zu Ihrem Betrieb passt.',
    paragraph:
      'Individuell gestaltete Homepages geben Ihrem Betrieb ein zeitgemässes, vertrauenswürdiges digitales Erscheinungsbild. Ihre Kunden finden Sie leichter, Ihr Unternehmen wirkt moderner und professioneller.',
    always: { value: '24/7', label: 'für Ihre Kunden erreichbar' },
    tiles: [
      {
        title: 'Mobil zuerst',
        text: 'Perfekt lesbar auf Handy, Tablet und Desktop. Die meisten Besuche kommen heute vom Handy – dort planen wir zuerst.',
      },
      {
        title: 'Dienstleistungen & Produkte',
        text: 'Ihr Angebot klar und ansprechend dargestellt – übersichtlich gegliedert, damit Kunden sofort finden, was sie suchen.',
      },
      {
        title: 'Team & Werte',
        text: 'Ihr Team, Ihre Geschichte und Ihre Werte zeigen, wer hinter dem Betrieb steht – Vertrauen auf den ersten Blick.',
      },
      { title: 'Kontakt & Standort', text: 'Adresse, Öffnungszeiten und Karte – sofort gefunden, mit einem Tipp anrufen.' },
    ],
    cta: 'Homepage anfragen',
    mock: {
      brand: 'Bäckerei Keller',
      url: 'baeckerei-keller.ch',
      since: 'Seit 1987',
      headline: 'Frisch gebacken. Jeden Tag.',
      button: 'Jetzt bestellen',
      nav: ['Angebot', 'Team', 'Kontakt'],
      services: ['Brot', 'Torten', 'Catering'],
      prices: ['ab CHF 4.50', 'ab CHF 38', 'auf Anfrage'],
      teamLine: 'Familienbetrieb in dritter Generation',
      values: ['Regional', 'Handgemacht', 'Jeden Tag frisch'],
      address: 'Seestrasse 12, 8002 Zürich',
      hours: 'Mo–Sa 6–18 Uhr',
      call: 'Anrufen',
      route: 'Route',
      toasts: ['Neue Anfrage: Tortenbestellung', 'Neue Anfrage: Catering für 40 Personen', 'Neue Bewertung: ★★★★★'],
      stats: {
        title: 'Diese Woche',
        days: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
        visitors: 'Besuche',
        requests: 'Anfragen',
        rating: 'Google',
      },
    },
  },
  experience: {
    eyebrow: 'Personal & Verwaltung',
    line1: 'Alle Personalunterlagen –',
    line2: 'digital, sicher und griffbereit.',
    intro:
      'Arbeitsverträge, Versicherungsunterlagen, Ein- und Austrittsmeldungen sowie alle relevanten Dokumente werden zentral verwaltet. Keine Papierstapel, keine verlorenen Dokumente – ein professioneller, moderner Personalprozess.',
    folders: [
      {
        tab: 'Verträge',
        docs: [
          { name: 'Arbeitsvertrag · Anna Meier', meta: 'digital unterschrieben' },
          { name: 'Zusatzvereinbarung Homeoffice', meta: 'gültig seit März 2026' },
          { name: 'Arbeitszeitreglement', meta: 'für alle einsehbar' },
        ],
      },
      {
        tab: 'Versicherungen',
        docs: [
          { name: 'AHV-Anmeldung', meta: 'übermittelt' },
          { name: 'Pensionskasse (BVG)', meta: 'angemeldet' },
          { name: 'Unfall- & Krankentaggeld', meta: 'Police hinterlegt' },
        ],
      },
      {
        tab: 'Ein- & Austritte',
        docs: [
          { name: 'Eintritt · Luca Rossi', meta: '01.10.2026' },
          { name: 'Austritt · Marco Weber', meta: '30.09.2026' },
          { name: 'Arbeitszeugnis', meta: 'erstellt' },
        ],
      },
    ],
    onboardingTitle: 'Neue Mitarbeitende – vollständig digital integriert',
    steps: ['Vertrag digital unterschreiben', 'Versicherungen anmelden', 'Zugang zur App', 'Erster Arbeitstag'],
    mock: {
      name: 'Luca Rossi',
      role: 'Service · 100 %',
      startLabel: 'Eintritt',
      start: '01.10.2026',
      progressLabel: 'Onboarding',
      stepsLabel: 'Schritte erledigt',
      docs: '12 Dokumente sicher abgelegt',
      signed: 'Vertrag digital unterschrieben',
    },
  },
  contact: {
    eyebrow: 'Kontakt',
    line1: 'Ihre gesamte Betriebsorganisation –',
    line2: 'digital, klar und automatisiert.',
    intro:
      'Eine digitale Infrastruktur, die Ihre betrieblichen Abläufe entlastet, Ordnung schafft und sämtliche Prozesse intelligent automatisiert. Erzählen Sie uns, wo es heute hakt – wir melden uns persönlich.',
    benefits: [
      'Eine Plattform für alle betrieblichen Abläufe',
      'Struktur, Klarheit und Automatisierung für Ihren Betrieb',
      'Effiziente digitale Infrastruktur für moderne Unternehmen',
    ],
    nameLabel: 'Name',
    namePlaceholder: 'Ihr Name',
    emailLabel: 'E-Mail',
    emailPlaceholder: 'Ihre E-Mail-Adresse',
    messageLabel: 'Nachricht',
    messagePlaceholder: 'Welche Abläufe möchten Sie vereinfachen?',
    sendBtn: 'Anfrage senden',
    successTitle: 'Nachricht angekommen',
    successText:
      'Danke! Ihre Anfrage ist bei uns angekommen, eine Bestätigung ist unterwegs in Ihr Postfach. Wir melden uns so bald wie möglich.',
    location: 'Zürich · Schweiz',
    mailSubjectPrefix: 'Anfrage von',
    hub: { center: 'Eine Plattform', centerSub: 'sechs Bereiche' },
  },
  legal: {
    impressum: 'Impressum',
    privacy: 'Datenschutz',
    impressumTitle: 'Impressum',
    privacyTitle: 'Datenschutzerklärung',
    close: 'Schliessen',
    builtWith: 'Gebaut mit',
    country: 'Schweiz',
    bindingNote: '',
    placeholders: { name: 'Firmenname', street: 'Strasse und Nr.', zipCity: 'PLZ und Ort' },
    impressumSections: [
      {
        heading: 'Kontaktadresse',
        lines: ['{name}\nVerantwortliche Person: {person}\n{street}\n{zipCity}\n{country}', 'E-Mail: {email}', 'UID: {uid}'],
      },
      {
        heading: 'Haftungsausschluss',
        lines: [
          'Wir prüfen die Inhalte dieser Website sorgfältig. Für Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen übernehmen wir dennoch keine Gewähr. Haftungsansprüche wegen Schäden materieller oder immaterieller Art, die aus dem Zugriff auf die veröffentlichten Informationen, aus deren Nutzung oder Nichtnutzung, aus Missbrauch der Verbindung oder aus technischen Störungen entstehen, sind ausgeschlossen, soweit das Gesetz dies zulässt.',
          'Alle Angebote sind unverbindlich. Wir behalten uns vor, Teile der Seite oder das gesamte Angebot ohne besondere Ankündigung zu ändern, zu ergänzen oder zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.',
        ],
      },
      {
        heading: 'Haftung für Links',
        lines: ['Verweise und Links auf Websites Dritter liegen ausserhalb unseres Verantwortungsbereichs. Zugriff und Nutzung solcher Websites erfolgen auf eigene Gefahr.'],
      },
      {
        heading: 'Urheberrechte',
        lines: ['Texte, Bilder, Videos und alle weiteren Inhalte dieser Website gehören {name} oder den jeweiligen Rechteinhabern. Für jede Wiedergabe ist vorab die schriftliche Zustimmung erforderlich.'],
      },
      {
        heading: 'Beispieldaten',
        lines: ['Namen, Firmen, Zahlen und Beträge in den Beispielansichten dieser Website (etwa «Frischwaren AG», «Bäckerei Keller» oder «Luca Rossi») sind frei erfunden und dienen nur der Veranschaulichung. Ähnlichkeiten mit tatsächlichen Personen oder Unternehmen sind zufällig.'],
      },
    ],
    privacyUpdated: 'Stand: September 2026',
    privacySections: [
      {
        heading: 'Verantwortliche Stelle',
        lines: ['Verantwortlich für die Bearbeitung von Personendaten auf dieser Website ist:', '{name}\n{street}\n{zipCity}\n{country}', 'E-Mail: {email}'],
      },
      {
        heading: 'Grundsatz',
        lines: ['Wir bearbeiten Personendaten nach dem schweizerischen Datenschutzgesetz (DSG) und, soweit anwendbar, nach der EU-Datenschutz-Grundverordnung (DSGVO). Wir erheben nur die Daten, die für den Betrieb dieser Website und die Beantwortung Ihrer Anfragen nötig sind.'],
      },
      {
        heading: 'Hosting und Server-Protokolle',
        lines: [
          'Diese Website wird bei Vercel Inc. (USA) betrieben. Bei jedem Aufruf werden technisch notwendige Angaben automatisch protokolliert: IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser und Betriebssystem sowie die zuvor besuchte Seite. Diese Daten dienen dem sicheren und stabilen Betrieb und werden nicht mit anderen Daten zusammengeführt.',
          'Dabei können Daten in die USA übermittelt werden. Die Übermittlung stützt sich auf anerkannte Garantien wie das Swiss-U.S. Data Privacy Framework oder Standardvertragsklauseln.',
        ],
      },
      {
        heading: 'Besucherstatistik',
        lines: ['Wir nutzen Vercel Web Analytics, um zu sehen, wie oft Seiten aufgerufen werden. Der Dienst arbeitet ohne Cookies und erstellt keine Nutzerprofile; Besuche werden nur über einen anonymisierten, täglich wechselnden Wert unterschieden. Ausgewertet werden zusammengefasste Angaben wie Seitenaufrufe, Herkunftsseite, Land und Gerätetyp.'],
      },
      {
        heading: 'Schriftarten von Google',
        lines: ['Für einige Schriften lädt diese Website Dateien von Google Fonts (Google Ireland Limited bzw. Google LLC, USA). Dabei übermittelt Ihr Browser Ihre IP-Adresse an Google. Weitere Informationen: policies.google.com/privacy.'],
      },
      {
        heading: 'Kontakt per E-Mail',
        lines: ['Das Kontaktformular öffnet Ihr eigenes E-Mail-Programm; über diese Website werden dabei keine Daten übertragen. Erst wenn Sie die E-Mail absenden, erhalten wir Ihren Namen, Ihre E-Mail-Adresse und Ihre Nachricht. Wir verwenden diese Angaben nur zur Bearbeitung Ihrer Anfrage und löschen sie, sobald sie dafür nicht mehr nötig sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.'],
      },
      {
        heading: 'Speicherung im Browser',
        lines: ['Diese Website setzt keine Cookies. Ihre gewählte Sprache, das Farbthema und die Toneinstellung werden im lokalen Speicher Ihres Browsers (localStorage) abgelegt, damit sie beim nächsten Besuch erhalten bleiben. Diese Angaben verlassen Ihr Gerät nicht und lassen sich jederzeit über die Browsereinstellungen löschen.'],
      },
      {
        heading: 'Chat-Assistent und Videos',
        lines: ['Der Chat-Assistent unten rechts antwortet anhand fester Regeln direkt in Ihrem Browser; Ihre Eingaben werden weder übertragen noch gespeichert. Zum Vorlesen der Antworten nutzt er die Sprachausgabe Ihres Geräts – je nach Browser kann das ein Online-Dienst des Browserherstellers sein (etwa Google-Stimmen in Chrome), dem dann der vorgelesene Antworttext übermittelt wird. Alle Videos liegen auf unserem eigenen Server; Videodienste Dritter werden nicht eingebunden.'],
      },
      {
        heading: 'Datensicherheit',
        lines: ['Die Verbindung zu dieser Website ist per HTTPS (TLS) verschlüsselt.'],
      },
      {
        heading: 'Ihre Rechte',
        lines: [
          'Sie können jederzeit Auskunft über die Personendaten verlangen, die wir über Sie bearbeiten, deren Berichtigung, Löschung oder Herausgabe fordern und einer Bearbeitung widersprechen. Schreiben Sie uns dazu an {email}.',
          'Zudem können Sie sich bei der zuständigen Aufsichtsbehörde beschweren – in der Schweiz beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB, www.edoeb.admin.ch).',
        ],
      },
      {
        heading: 'Änderungen',
        lines: ['Wir passen diese Datenschutzerklärung an, wenn sich die Website oder die rechtlichen Grundlagen ändern. Es gilt die jeweils hier veröffentlichte Fassung.'],
      },
    ],
  },
  bot: {
    title: 'EKADO Design · Assistent',
    welcome:
      'Grüezi! Ich bin der Assistent von EKADO Design. Wie kann ich Ihnen helfen? Fragen Sie mich zum Beispiel, wie Bestellungen, Einsatzplanung, Buchhaltung, Meldungen, Personal oder Homepage bei uns funktionieren.',
    fallback:
      'Dazu habe ich leider keine fertige Antwort. Ich kenne mich aus mit Bestellungen, Einsatzplanung & Überstunden, Buchhaltung, staatlichen Meldungen, Personal und Homepage – oder Sie schreiben uns direkt: {email}',
    placeholder: 'Ihre Frage…',
    send: 'Senden',
    replies: {
      api:
        'So läuft der Datenaustausch: Bestellungen gehen automatisch per E-Mail an Ihre Lieferanten – dort braucht niemand eine neue Software. Zahlungen führt die Buchhaltungs-App über Ihre Bank aus, Pflichtmeldungen werden sicher übermittelt. Ob und wie wir bestehende Systeme wie Kasse oder Buchhaltungssoftware anbinden, klären wir gern im Gespräch: {email}',
      price:
        'Der Preis richtet sich danach, welche Bereiche Sie nutzen möchten und wie gross Ihr Betrieb ist. Schreiben Sie uns kurz, was Sie brauchen – Sie erhalten eine unverbindliche Offerte: {email}',
      setup:
        'Zuerst schauen wir gemeinsam, welche Abläufe Sie digitalisieren möchten. Danach richten wir die Plattform Schritt für Schritt für Ihren Betrieb ein. Wie lange das dauert, hängt vom Umfang ab – einen konkreten Zeitplan erhalten Sie mit der Offerte.',
      security:
        'Ihre Unterlagen liegen zentral und geschützt an einem Ort statt in Ordnern und Postfächern, Meldungen werden sicher übermittelt. Wo Ihre Daten gespeichert sind und wer Zugriff hat, besprechen wir offen mit Ihnen. Wie diese Website mit Daten umgeht, steht in der Datenschutzerklärung ganz unten.',
      orders:
        'So funktionieren Bestellungen: Sie erstellen eine Bestellung einmal in der App, das System schickt sie automatisch per E-Mail an den richtigen Lieferanten und dokumentiert alles digital. Ihre Lieferanten brauchen nichts Neues. Kommunikationsfehler, Verzögerungen und doppelte Bestellungen fallen weg – mehr dazu im Abschnitt 01.',
      overtime:
        'Überstunden werden lückenlos dokumentiert – pro Person und Monat nachvollziehbar. Die Geschäftsleitung sieht den aktuellen Stand jederzeit, ohne Listen zu führen. Ein Beispiel finden Sie im Abschnitt 02.',
      vacation:
        'Urlaubsanträge stellen Ihre Mitarbeitenden direkt in der App, die Freigabe geht mit einem Klick. Resturlaub und geplante Abwesenheiten sind für alle jederzeit sichtbar – keine Zettel, keine Rückfragen.',
      sick:
        'Krankmeldungen werden in der App erfasst und automatisch an den Betrieb übermittelt. Der Einsatzplan passt sich an, und alle wissen sofort Bescheid – auch bei kurzfristigen Änderungen.',
      planning:
        'Die Einsatzplanung läuft zentral an einem Ort: Schichten planen, Aufgaben pro Einsatz hinterlegen, Änderungen sofort an alle verteilen. Ihre Mitarbeitenden sehen Arbeitstage und Einsatzzeiten direkt in der App. Im Abschnitt 02 blättern Sie durch sechs Beispiele.',
      invoices:
        'Lieferanten senden ihre Rechnungen direkt an die Buchhaltungs-App. Jede Rechnung ist sofort zugeordnet und auffindbar; die App führt die Zahlung termingerecht über Ihre Bank aus und dokumentiert sie sauber.',
      accounting:
        'Monatliche Kosten, Einkäufe, Zusatzaufwände und Lieferantenrechnungen werden automatisch verbucht – ohne Abtippen, ohne Belegstapel. Sie haben jederzeit eine geordnete Finanz- und Kostenübersicht, jede Transaktion ist nachvollziehbar. Mehr im Abschnitt 03.',
      vat:
        'Die MWST-Abrechnung wird aus den erfassten Zahlen automatisch vorbereitet – bei vierteljährlicher Abrechnung also viermal im Jahr für die ESTV. So bleiben Beträge und Fristen im Griff.',
      payroll:
        'Die Lohn- und Sozialversicherungsmeldungen werden automatisch vorbereitet und fristgerecht übermittelt: Quellensteuer monatlich ans kantonale Steueramt, AHV-Lohnmeldung an die Ausgleichskasse, BVG an die Pensionskasse, UVG an den Versicherer und die Lohnausweise an Mitarbeitende und Steueramt.',
      reports:
        'Alle Daten für staatliche Meldungen werden automatisch vorbereitet, Berichte und Nachweise systematisch erstellt und sicher übermittelt – korrekt, vollständig und fristgerecht. Die sechs wichtigsten Pflichtmeldungen sehen Sie im Abschnitt 04.',
      onboarding:
        'Neue Mitarbeitende werden vollständig digital in den Betrieb integriert: Vertrag digital unterschreiben, Versicherungen anmelden, Unterlagen ablegen – Schritt für Schritt bis zum ersten Arbeitstag. Auch Austritte laufen geordnet und ohne Papier.',
      personnel:
        'Arbeitsverträge, Versicherungsunterlagen, Ein- und Austrittsmeldungen und alle weiteren Dokumente liegen zentral und digital an einem Ort. Keine Papierstapel, keine verlorenen Unterlagen – alles jederzeit griffbereit. Mehr im Abschnitt 06.',
      homepage:
        'Wir gestalten individuelle Homepages, die zu Ihrem Betrieb passen: auf dem Handy perfekt lesbar, mit Dienstleistungen, Produkten, Team und Kontakt klar dargestellt. Ihre Kunden finden Sie leichter, Ihr Betrieb wirkt moderner und professioneller. Ein Beispiel sehen Sie im Abschnitt 05.',
      app:
        'Ihre Mitarbeitenden sehen Arbeitstage, Einsatzzeiten, Aufgaben und Urlaub direkt in der App – auch unterwegs auf dem Handy. Änderungen im Plan erscheinen sofort, Krankmeldungen und Urlaubsanträge laufen ebenfalls über die App.',
      overview:
        'EKADO Design bündelt die digitalen Abläufe Ihres Betriebs in einer Plattform: Bestellungen, Einsatzplanung & Überstunden, Buchhaltung & Zahlungen, staatliche Meldungen, Personalprozesse und Ihre Homepage. Alles läuft automatisiert und strukturiert – Sie konzentrieren sich auf Ihr Kerngeschäft.',
      audience:
        'Die Plattform ist für Betriebe gedacht, die Mitarbeitende einplanen, bei Lieferanten bestellen und Pflichtmeldungen erledigen müssen – vom kleinen Team bis zum grösseren KMU. Die Firmen in den Beispielen auf dieser Seite (Frischwaren AG, Bäckerei Keller …) sind übrigens erfunden.',
      demo:
        'Sehr gern zeigen wir Ihnen die Plattform in einem persönlichen Gespräch. Schreiben Sie uns kurz, welche Bereiche Sie interessieren: {email} – oder nutzen Sie das Kontaktformular im Abschnitt 07.',
      location:
        'EKADO Design ist in Zürich, Schweiz, zu Hause. Gespräche führen wir gern persönlich oder online.',
      language:
        'Diese Seite gibt es auf Deutsch und Türkisch – oben rechts können Sie umschalten. Beraten können wir Sie ebenfalls auf Deutsch oder Türkisch.',
      contact:
        'Am schnellsten erreichen Sie uns per E-Mail: {email} – oder über das Kontaktformular ganz unten auf der Seite. Wir melden uns persönlich bei Ihnen.',
      bot:
        'Ehrlich gesagt: Ich bin ein kleiner Assistent mit einer festen Wissensliste – keine echte KI, keine Cloud, und ich speichere nichts von dem, was Sie schreiben. Für alles, was ich nicht weiss, antwortet ein Mensch: {email}',
      howAreYou:
        'Bestens, danke! Bei mir läuft alles automatisiert – genau wie bald bei Ihnen. Womit kann ich helfen?',
      thanks: 'Gern geschehen! Wenn noch etwas offen ist: {email}. Einen schönen Tag!',
      hello:
        'Grüezi! Wie kann ich helfen? Fragen Sie mich zu Bestellungen, Einsatzplanung, Buchhaltung, Meldungen, Personal oder Homepage.',
    },
  },
  packages: {
    eyebrow: 'Pakete & Lösungen',
    line1: 'Klar strukturiert.',
    line2: 'Passend für Ihren Betrieb.',
    lede: 'Wählen Sie das Modell, das Ihren Alltag spürbar entlastet — vom schnellen Start bis zur schlüsselfertigen Gesamtlösung.',
    choose: 'Paket anfragen',
    back: 'Zurück zu den Paketen',
    customNote: 'Alle Pakete monatlich kündbar · Keine Einrichtungsgebühr bei Jahreszahlung · Schweizer Support',
    plans: [
      {
        id: 'start',
        name: 'Start',
        badge: 'Fokus',
        tagline: 'Für Cafés, Take-aways & kleine Teams',
        modules: ['Bestellungen & Tische', 'Einsatz- & Dienstplanung', 'Mobil optimiert (PWA)'],
        features: [
          'Digitale Bestellaufnahme ohne Papierchaos',
          'Wochen-Schichtplan per WhatsApp teilen',
          'Mitarbeiter-Stempeluhr am Handy',
          '100% Swiss Hosted & DSG-konform',
        ],
      },
      {
        id: 'betrieb',
        name: 'Betrieb',
        badge: 'Beliebt',
        tagline: 'Die komplette Betriebszentrale für Restaurants & Handwerk',
        modules: ['Alle Start-Funktionen', 'Tageskasse & Buchhaltung', 'Offizielle Meldungen & Hygiene'],
        features: [
          'Tagesabschluss (Z-Bericht) mit 1 Klick',
          'MWST-Vorbereitung für Ihren Treuhänder',
          'Digitale HACCP- & Reinigungsnachweise',
          'Rollen & Rechte für Schichtleiter & Buchhalter',
          'Prioritäts-Support aus Zürich (DE & TR)',
        ],
      },
      {
        id: 'komplett',
        name: 'Komplett',
        badge: 'Rundum-Sorglos',
        tagline: 'Vollausstattung inklusive eigener Web-Präsenz & Vor-Ort-Setup',
        modules: ['Alle Betrieb-Funktionen', 'Eigene moderne Website', 'Persönliche Vor-Ort-Einrichtung'],
        features: [
          'Massgeschneiderte Homepage mit Reservierung',
          'Google Maps & Local SEO Optimierung',
          'Persönliche Einführung & Schulung in Zürich',
          'Individuelle Schnittstellen zu Ihrer Kasse',
          'Direkter Draht zu Entwickler Adnan (24/7 Notfall)',
        ],
      },
    ],
  },
};

// @section:tr
export const tr: TranslationSchema = {
  nav: {
    about: 'Siparişler',
    work: 'Vardiya planı',
    skills: 'Muhasebe',
    repos: 'Bildirimler',
    construction: 'Web sitesi',
    experience: 'Personel',
    contact: 'İletişim',
  },
  dock: {
    start: 'Başlangıç',
    github: 'GitHub',
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
    portfolioKicker: 'Portfolyo',
    portfolioText: 'Web siteleri, gerçek zamanlı 3D ve hareket tasarımı – seçilmiş çalışmalar.',
  },
  hero: {
    badgeAvailable: 'Şirketler için',
    badgeLocation: 'Zürih · İsviçre',
    lineBuild: 'Her şey tek yerde.',
    lineDigital: 'Her şey',
    lineExperiences: 'kontrolde.',
    roleLine: 'Siparişler • Personel • Muhasebe',
    subtitle:
      'İşletmenizin tüm dijital süreçlerini tek bir platformda topluyoruz. Siparişler, vardiya planlaması, fazla mesai, personel süreçleri, muhasebe ve resmi bildirimler – hepsi otomatik, düzenli ve hatasız işler.',
    ctaWork: 'HİZMETLERİMİZ ↓',
    ctaEmail: 'E-POSTA ↓',
    quoteLine1: 'Siz asıl işinize',
    quoteLine2: 'odaklanın.',
  },
  about: {
    eyebrow: 'Tedarikçiler & Siparişler',
    line1: 'Siparişleriniz –',
    line2: 'merkezi ve otomatik.',
    bioTitle: 'Akıllı Sipariş ve Tedarikçi Yönetimi',
    bioPart1: 'Tedarikçilerinize verdiğiniz tüm siparişler ',
    bioStrong1: 'tek bir uygulama',
    bioPart2: ' üzerinden yönetilir. Dijital olarak oluşturulur, düzenlenir ve ',
    bioStrong2: 'otomatik olarak e-postayla',
    bioPart3: ' her tedarikçiye iletilir. İletişim hataları, gecikmeler ve mükerrer siparişler geride kalır.',
    tags: ['Merkezi yönetim', 'Otomatik iletim', 'Hatasız süreçler'],
    statLabels: ['uygulama, tüm tedarikçiler', 'mükerrer sipariş', 'dijital belgeli', 'her an sipariş'],
    cta: 'Sipariş sürecini konuşalım',
    ring: 'SİPARİŞ • GÖNDER • ONAY • ',
    flow: {
      team: 'Ekibiniz',
      app: 'EKADO App',
      suppliers: 'Tedarikçiler',
    },
    mock: {
      title: 'Yeni sipariş',
      badge: '#1042',
      rows: [
        { supplier: 'Frischwaren AG', item: '24 × sebze kasası', state: 'gönderildi' },
        { supplier: 'Getränke Huber', item: '12 × maden suyu', state: 'onaylandı' },
        { supplier: 'Bürobedarf Meier', item: 'A4 yazıcı kâğıdı', state: 'hazırlanıyor' },
      ],
      mailTitle: 'Otomatik e-postayla',
      mailMeta: '3 tedarikçiye · 09:41',
      confirmed: 'Onaylandı',
    },
  },
  skills: {
    eyebrow: 'Muhasebe & Ödemeler',
    line1: 'Aylık giderleriniz –',
    line2: 'otomatik kaydedilir ve işlenir.',
    blocks: [
      {
        title: 'Giderleri kaydetme',
        badge: 'Adım 1',
        stat: 'otomatik kayıt',
        description:
          'Aylık giderler, alımlar ve ek masraflar otomatik olarak kaydedilir – elle yazmadan, fiş yığını olmadan.',
        items: ['Alımlar', 'Ek masraflar', 'Sabit giderler'],
      },
      {
        title: 'Faturaları alma',
        badge: 'Adım 2',
        stat: 'doğrudan uygulamaya',
        description:
          'Tedarikçiler faturalarını doğrudan muhasebe uygulamasına gönderir. Her fatura anında eşleştirilir ve kolayca bulunur.',
        items: ['Tedarikçi faturaları', 'Doğrudan giriş', 'Eşleştirme'],
      },
      {
        title: 'Banka üzerinden ödeme',
        badge: 'Adım 3',
        stat: 'düzenli belgelenir',
        description:
          'Uygulama ödemeyi banka üzerinden yapar ve düzenli şekilde belgeler – zamanında ve izlenebilir.',
        items: ['Banka ödemesi', 'Vadeler', 'Belgeler'],
      },
      {
        title: 'Tam genel bakış',
        badge: 'Adım 4',
        stat: 'her an erişilebilir',
        description:
          'Tüm işlemler izlenebilir, düzenli ve her an erişilebilir. İşletmeniz zaman, netlik ve tam finansal genel bakış kazanır.',
        items: ['Finans özeti', 'Maliyet kontrolü', 'Şeffaflık'],
      },
    ],
    mock: {
      title: 'Aylık özet · Eylül',
      totalLabel: 'Toplam gider',
      totalValue: "CHF 18'460",
      bars: [
        { label: 'Alım', amount: "7'920", share: 43 },
        { label: 'Personel', amount: "5'180", share: 28 },
        { label: 'Kira', amount: "4'800", share: 26 },
        { label: 'Diğer', amount: '560', share: 3 },
      ],
      paidLabel: 'fatura ödendi',
      paidValue: '24',
      openLabel: 'Açık',
      openValue: '0',
    },
    ledger: {
      title: 'Kayıt defteri · Eylül',
      lines: [
        { date: '02.09.', text: 'Frischwaren AG', amount: "1'240.00" },
        { date: '04.09.', text: 'Getränke Huber', amount: '386.40' },
        { date: '05.09.', text: 'İşyeri kirası', amount: "4'800.00" },
        { date: '09.09.', text: 'Bürobedarf Meier', amount: '129.90' },
        { date: '12.09.', text: 'Metzgerei Vogel', amount: '912.30' },
        { date: '15.09.', text: 'Elektrik & su', amount: '318.75' },
        { date: '19.09.', text: 'Druckerei Senn', amount: '265.00' },
        { date: '23.09.', text: 'Reinigung Blitz', amount: '480.00' },
      ],
      status: 'Tüm ödemeler yapıldı',
    },
  },
  projects: {
    eyebrow: 'Vardiya Planı & Fazla Mesai',
    line1: 'Çalışma saatleri ve görevler –',
    line2: 'her an net görünür.',
    footer: 'Bir kart seç – detaylar açılır · altı işlev, tek uygulama',
    items: [
      {
        title: 'Çalışma günleri & saatleri',
        category: 'Çalışan uygulaması',
        description:
          'Çalışanlarınız çalışma günlerini ve vardiya saatlerini doğrudan uygulamada görür – her zaman güncel, yolda bile. Plandaki değişiklikler anında görünür.',
        metrics: [
          { label: 'Görünüm', value: 'Gün · Hafta · Ay' },
          { label: 'Erişim', value: 'Uygulama & web' },
          { label: 'Değişiklik', value: 'anında görünür' },
        ],
      },
      {
        title: 'Vardiya başına görevler',
        category: 'Planlama',
        description:
          'Her vardiyanın görevleri doğrudan planda yer alır. Kimse bugün ne yapılacağını sormak zorunda kalmaz – devir teslim net.',
        metrics: [
          { label: 'Atama', value: 'vardiya başına' },
          { label: 'Notlar', value: 'planda' },
          { label: 'Sorular', value: 'gereksiz' },
        ],
      },
      {
        title: 'Yıllık izin',
        category: 'Devamsızlık',
        description:
          'İzin talepleri dijital olarak yapılır ve onaylanır. Kalan izin ve planlanan devamsızlıklar herkes için her an görünür.',
        metrics: [
          { label: 'Talep', value: 'dijital' },
          { label: 'Onay', value: 'tek tıkla' },
          { label: 'Kalan izin', value: 'hep güncel' },
        ],
      },
      {
        title: 'Hastalık bildirimleri',
        category: 'Devamsızlık',
        description:
          'Hastalık bildirimleri, devamsızlıklar ve kısa vadeli değişiklikler dijital olarak kaydedilir ve otomatik olarak işletmeye iletilir.',
        metrics: [
          { label: 'Kayıt', value: 'uygulamada' },
          { label: 'Bildirim', value: 'otomatik' },
          { label: 'Plan', value: 'kendini uyarlar' },
        ],
      },
      {
        title: 'Fazla mesai',
        category: 'Çalışma süresi',
        description:
          'Fazla mesailer düzgünce belgelenir ve yönetimin her an erişimindedir – kişi ve ay bazında izlenebilir.',
        metrics: [
          { label: 'Belgeleme', value: 'eksiksiz' },
          { label: 'Değerlendirme', value: 'kişi bazında' },
          { label: 'Erişim', value: 'yönetim' },
        ],
      },
      {
        title: 'Vardiya planlaması',
        category: 'İşletme',
        description:
          'Tüm vardiya planlaması düzenli, hatasız ve idari yük olmadan yönetilir – tüm ekip için tek yerde.',
        metrics: [
          { label: 'Planlama', value: 'merkezi' },
          { label: 'Hatalar', value: 'önlenir' },
          { label: 'Emek', value: 'minimum' },
        ],
      },
    ],
    mock: {
      title: 'Vardiya planı · 37. hafta',
      badge: 'Ekip',
      days: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum'],
      rows: [
        { name: 'Anna', cells: ['07–16', '07–16', 'Boş', '07–16', '07–16'] },
        { name: 'Marco', cells: ['12–21', '12–21', '12–21', 'İzin', 'İzin'] },
        { name: 'Selin', cells: ['07–16', 'Hasta', 'Hasta', '07–16', '07–16'] },
        { name: 'Luca', cells: ['Boş', '09–18', '09–18', '09–18', '09–20'] },
      ],
      legend: ['Vardiya', 'İzin', 'Hasta', 'Fazla mesai'],
      notice: 'Selin hastalık bildirdi – plan güncellendi',
      footerLabel: 'Bu haftaki fazla mesai',
      footerValue: '+ 6,5 sa',
    },
    examples: {
      prevLabel: 'Önceki örnek',
      nextLabel: 'Sonraki örnek',
      week: {
        title: 'Haftam · Anna',
        badge: 'App',
        rows: [
          { day: 'Pzt 07.09.', time: '07–16', place: 'Mutfak' },
          { day: 'Sal 08.09.', time: '07–16', place: 'Mutfak' },
          { day: 'Çar 09.09.', time: 'Boş', place: '' },
          { day: 'Per 10.09.', time: '07–16', place: 'Servis' },
          { day: 'Cum 11.09.', time: '07–16', place: 'Mutfak' },
        ],
        today: 'bugün',
        footer: 'Senkronize · 1 dk önce',
        keyValue: '36 sa',
        keyLabel: 'Bu haftaki çalışma süresi',
      },
      tasks: {
        title: 'Görevler · Cum 11.09.',
        badge: 'Sabah',
        rows: [
          { text: 'Frischwaren AG mal kabulü', time: '07:00' },
          { text: 'Soğuk oda sıcaklığı kontrolü', time: '07:30' },
          { text: 'Öğle yemeği hazırlığı', time: '09:00' },
          { text: 'İçecek teslimatı kontrolü', time: '13:00' },
          { text: 'Akşam vardiyasına devir', time: '15:45' },
        ],
        footer: 'Anna · Vardiya 07–16',
        keyValue: '3/5',
        keyLabel: 'görev tamamlandı',
      },
      vacation: {
        title: 'Yıllık izin · 2026',
        badge: 'Ekip',
        quota: 'Anna · 25 gün izin hakkı',
        rows: [
          { name: 'Marco', dates: '10.–11.09.', state: 'Onaylandı' },
          { name: 'Anna', dates: '12.–16.10.', state: 'Onaylandı' },
          { name: 'Luca', dates: '21.–31.12.', state: 'Talep edildi' },
        ],
        legend: ['kullanıldı', 'planlandı', 'kalan'],
        keyValue: '14',
        keyLabel: 'gün kalan izin',
      },
      sick: {
        title: 'Hastalık bildirimi · Sal 08.09.',
        badge: 'Selin',
        rows: [
          { time: '06:12', text: 'Bildirim uygulamadan yapıldı' },
          { time: '06:12', text: 'İşletme otomatik bilgilendirildi' },
          { time: '06:20', text: 'Sal + Çar planı güncellendi' },
          { time: 'Per', text: 'Doktor raporu yüklendi' },
        ],
        footer: 'Devamsızlık · 2 gün',
        keyValue: 'Anında',
        keyLabel: 'işletmeye bildirildi',
      },
      overtime: {
        title: 'Fazla mesai · Eylül',
        badge: 'Ay',
        rows: [
          { name: 'Anna', value: '+ 2,0 sa' },
          { name: 'Marco', value: '+ 4,5 sa' },
          { name: 'Selin', value: '0,0 sa' },
          { name: 'Luca', value: '+ 6,0 sa' },
        ],
        footer: 'Bordro için onaylandı',
        keyValue: '12,5 sa',
        keyLabel: 'Eylül fazla mesaisi',
      },
    },
  },
  repos: {
    eyebrow: 'Resmi Bildirimler',
    line1: 'Zorunlu bildirimler ve raporlar –',
    line2: 'doğru, eksiksiz ve zamanında.',
    intro:
      'Resmi bildirimler için gereken tüm veriler otomatik olarak hazırlanır. Raporlar, kanıtlar ve belgeler sistematik olarak oluşturulur ve güvenle iletilir – işletmeniz tüm yasal gereklilikleri ek emek ve risk olmadan karşılar.',
    promises: ['Otomatik hazırlanır', 'Güvenle iletilir', 'Zamanında'],
    perYear: 'yılda',
    reports: [
      { freq: '12×', name: 'Stopaj vergisi (Quellensteuer)', authority: 'Kanton vergi dairesi', status: 'otomatik' },
      { freq: '4×', name: 'KDV beyannamesi (MWST)', authority: 'ESTV', status: 'hazır' },
      { freq: '1×', name: 'AHV maaş bildirimi', authority: 'Ausgleichskasse', status: 'iletildi' },
      { freq: '1×', name: 'BVG maaş bildirimi', authority: 'Emeklilik kasası', status: 'iletildi' },
      { freq: '1×', name: 'Kaza sigortası (UVG)', authority: 'Sigorta şirketi', status: 'hazır' },
      { freq: '1×', name: 'Maaş belgeleri (Lohnausweis)', authority: 'Çalışanlar & vergi dairesi', status: 'iletildi' },
    ],
    doc: {
      kicker: 'Zorunlu bildirim',
      stamp: 'İletildi',
      steps: ['Hazırlandı', 'Kontrol edildi', 'İletildi'],
      sourcesLabel: 'Veri kaynağı',
      items: [
        {
          year: '2025',
          title: 'AHV maaş bildirimi',
          recipient: 'Ausgleichskasse\'ye',
          fields: [
            { label: 'İşletme', value: 'Muster GmbH' },
            { label: 'Dönem', value: 'Oca–Ara 2025' },
            { label: 'Çalışan', value: '12' },
            { label: 'Maaş toplamı', value: "CHF 684'200" },
          ],
          sources: ['06 Personel', '03 Muhasebe'],
          deadline: 'Süre karşılandı – 2 gün erken',
          stampDate: '28.01.2026',
        },
        {
          year: 'Q2 2026',
          title: 'KDV beyannamesi',
          recipient: 'ESTV\'ye',
          fields: [
            { label: 'Dönem', value: 'Nis–Haz 2026' },
            { label: 'Ciro', value: "CHF 412'600" },
            { label: 'İndirilecek KDV', value: "CHF 18'940" },
            { label: 'Ödenecek KDV', value: "CHF 14'481" },
          ],
          sources: ['03 Muhasebe', '01 Siparişler'],
          deadline: 'Süre karşılandı – 4 gün erken',
          stampDate: '27.08.2026',
        },
        {
          year: 'Ağu 2026',
          title: 'Stopaj vergisi',
          recipient: 'kanton vergi dairesine',
          fields: [
            { label: 'Dönem', value: 'Ağustos 2026' },
            { label: 'Stopaja tabi çalışan', value: '3' },
            { label: 'Brüt maaş', value: "CHF 17'850" },
            { label: 'Stopaj vergisi', value: "CHF 1'642" },
          ],
          sources: ['06 Personel', '02 Vardiya planı'],
          deadline: 'Süre karşılandı – 20 gün erken',
          stampDate: '10.09.2026',
        },
      ],
    },
  },
  construction: {
    eyebrow: 'Web Sitesi & Dijital Varlık',
    line1: 'İşletmeniz –',
    line2: 'modern, görünür ve profesyonel.',
    kicker: 'Size özel web sitesi',
    title: 'İşletmenize yakışan bir görünüm.',
    paragraph:
      'Size özel tasarlanan web siteleri işletmenize çağdaş ve güven veren bir dijital görünüm kazandırır. Müşterileriniz sizi daha kolay bulur, işletmeniz daha modern ve profesyonel görünür.',
    always: { value: '7/24', label: 'müşterileriniz için erişilebilir' },
    tiles: [
      {
        title: 'Önce mobil',
        text: 'Telefonda, tablette ve masaüstünde kusursuz okunur. Ziyaretlerin çoğu artık telefondan geliyor – tasarıma oradan başlıyoruz.',
      },
      {
        title: 'Hizmetler & Ürünler',
        text: 'Sunduklarınız net ve çekici biçimde, düzenli bölümlerle yer alır – müşteriler aradığını hemen bulur.',
      },
      {
        title: 'Ekip & Değerler',
        text: 'Ekibiniz, hikâyeniz ve değerleriniz işletmenin arkasında kimin durduğunu gösterir – ilk bakışta güven.',
      },
      { title: 'İletişim & Konum', text: 'Adres, çalışma saatleri ve harita – hemen bulunur, tek dokunuşla arama.' },
    ],
    cta: 'Web sitesi talep et',
    mock: {
      brand: 'Bäckerei Keller',
      url: 'baeckerei-keller.ch',
      since: "1987'den beri",
      headline: 'Taze pişmiş. Her gün.',
      button: 'Sipariş ver',
      nav: ['Ürünler', 'Ekip', 'İletişim'],
      services: ['Ekmek', 'Pasta', 'Catering'],
      prices: ["CHF 4.50'den", "CHF 38'den", 'talep üzerine'],
      teamLine: 'Üçüncü kuşak aile işletmesi',
      values: ['Yöresel', 'El yapımı', 'Her gün taze'],
      address: 'Seestrasse 12, 8002 Zürih',
      hours: 'Pzt–Cmt 6–18',
      call: 'Ara',
      route: 'Yol tarifi',
      toasts: ['Yeni talep: pasta siparişi', 'Yeni talep: 40 kişilik catering', 'Yeni yorum: ★★★★★'],
      stats: {
        title: 'Bu hafta',
        days: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
        visitors: 'Ziyaret',
        requests: 'Talep',
        rating: 'Google',
      },
    },
  },
  experience: {
    eyebrow: 'Personel & Yönetim',
    line1: 'Tüm personel belgeleri –',
    line2: 'dijital, güvenli ve her an elinizde.',
    intro:
      'İş sözleşmeleri, sigorta belgeleri, işe giriş ve çıkış bildirimleri ile ilgili tüm belgeler merkezi olarak yönetilir. Kâğıt yığınları yok, kaybolan belgeler yok – profesyonel ve modern bir personel süreci.',
    folders: [
      {
        tab: 'Sözleşmeler',
        docs: [
          { name: 'İş sözleşmesi · Anna Meier', meta: 'dijital imzalandı' },
          { name: 'Ev ofis ek sözleşmesi', meta: "Mart 2026'dan beri geçerli" },
          { name: 'Çalışma saatleri yönetmeliği', meta: 'herkese açık' },
        ],
      },
      {
        tab: 'Sigortalar',
        docs: [
          { name: 'AHV kaydı', meta: 'iletildi' },
          { name: 'Emeklilik kasası (BVG)', meta: 'kayıtlı' },
          { name: 'Kaza & hastalık sigortası', meta: 'poliçe eklendi' },
        ],
      },
      {
        tab: 'Giriş & Çıkış',
        docs: [
          { name: 'Giriş · Luca Rossi', meta: '01.10.2026' },
          { name: 'Çıkış · Marco Weber', meta: '30.09.2026' },
          { name: 'Çalışma belgesi', meta: 'hazırlandı' },
        ],
      },
    ],
    onboardingTitle: 'Yeni çalışanlar – tamamen dijital olarak işe başlar',
    steps: ['Sözleşmeyi dijital imzala', 'Sigortalara kaydet', 'Uygulamaya erişim', 'İlk iş günü'],
    mock: {
      name: 'Luca Rossi',
      role: 'Servis · %100',
      startLabel: 'İşe giriş',
      start: '01.10.2026',
      progressLabel: 'İşe alışma',
      stepsLabel: 'Tamamlanan adım',
      docs: '12 belge güvenle saklanıyor',
      signed: 'Sözleşme dijital imzalandı',
    },
  },
  contact: {
    eyebrow: 'İletişim',
    line1: 'Tüm işletme organizasyonunuz –',
    line2: 'dijital, net ve otomatik.',
    intro:
      'İşletme süreçlerinizi hafifleten, düzen getiren ve tüm süreçleri akıllıca otomatikleştiren dijital bir altyapı. Bugün nerede aksadığını anlatın – size bizzat dönüş yapalım.',
    benefits: [
      'Tüm işletme süreçleri için tek platform',
      'İşletmeniz için yapı, netlik ve otomasyon',
      'Modern işletmeler için verimli dijital altyapı',
    ],
    nameLabel: 'İsim',
    namePlaceholder: 'Adınız',
    emailLabel: 'E-Posta',
    emailPlaceholder: 'E-posta adresiniz',
    messageLabel: 'Mesaj',
    messagePlaceholder: 'Hangi süreçleri kolaylaştırmak istiyorsunuz?',
    sendBtn: 'Talep gönder',
    successTitle: 'Talebiniz ulaştı',
    successText:
      'Teşekkürler! Talebiniz bize ulaştı, onay e-postası gelen kutunuza gönderildi. En kısa sürede size dönüş yapacağız.',
    location: 'Zürih · İsviçre',
    mailSubjectPrefix: 'Talep gönderen:',
    hub: { center: 'Tek platform', centerSub: 'altı alan' },
  },
  legal: {
    impressum: 'Künye',
    privacy: 'Gizlilik',
    impressumTitle: 'Künye (Impressum)',
    privacyTitle: 'Gizlilik Politikası',
    close: 'Kapat',
    builtWith: 'Altyapı:',
    country: 'İsviçre',
    bindingNote: 'Bu metin bilgi amaçlı bir çeviridir; bağlayıcı olan Almanca metindir.',
    placeholders: { name: 'Firma adı', street: 'Sokak ve numara', zipCity: 'Posta kodu ve şehir' },
    impressumSections: [
      {
        heading: 'İletişim adresi',
        lines: ['{name}\nSorumlu kişi: {person}\n{street}\n{zipCity}\n{country}', 'E-posta: {email}', 'UID: {uid}'],
      },
      {
        heading: 'Sorumluluk reddi',
        lines: [
          'Bu web sitesinin içeriklerini özenle kontrol ediyoruz. Yine de bilgilerin doğruluğu, kesinliği, güncelliği, güvenilirliği ve eksiksizliği için garanti vermiyoruz. Yayımlanan bilgilere erişim, bunların kullanılması veya kullanılmaması, bağlantının kötüye kullanılması ya da teknik aksaklıklar nedeniyle oluşan maddi veya manevi zararlara ilişkin sorumluluk talepleri, yasanın izin verdiği ölçüde hariç tutulur.',
          'Tüm teklifler bağlayıcı değildir. Sayfanın bölümlerini veya tüm içeriği önceden haber vermeksizin değiştirme, genişletme, silme ya da yayını geçici veya kalıcı olarak durdurma hakkımız saklıdır.',
        ],
      },
      {
        heading: 'Bağlantılar için sorumluluk',
        lines: ['Üçüncü tarafların web sitelerine verilen bağlantılar sorumluluk alanımızın dışındadır. Bu sitelere erişim ve bunların kullanımı kullanıcının kendi sorumluluğundadır.'],
      },
      {
        heading: 'Telif hakları',
        lines: ['Bu web sitesindeki metinler, görseller, videolar ve diğer tüm içerikler {name} ya da ilgili hak sahiplerine aittir. Her türlü çoğaltma için önceden yazılı izin gerekir.'],
      },
      {
        heading: 'Örnek veriler',
        lines: ['Bu web sitesindeki örnek görünümlerde yer alan isimler, firmalar, rakamlar ve tutarlar (örneğin «Frischwaren AG», «Bäckerei Keller» ya da «Luca Rossi») tamamen hayal ürünüdür ve yalnızca açıklama amaçlıdır. Gerçek kişi veya firmalarla benzerlikler tesadüfidir.'],
      },
    ],
    privacyUpdated: 'Güncelleme: Eylül 2026',
    privacySections: [
      {
        heading: 'Sorumlu kuruluş',
        lines: ['Bu web sitesinde kişisel verilerin işlenmesinden sorumlu olan:', '{name}\n{street}\n{zipCity}\n{country}', 'E-posta: {email}'],
      },
      {
        heading: 'Genel ilke',
        lines: ['Kişisel verileri İsviçre Veri Koruma Kanunu (DSG) ve uygulanabildiği ölçüde AB Genel Veri Koruma Tüzüğü (GDPR/DSGVO) uyarınca işliyoruz. Yalnızca bu web sitesinin işletilmesi ve taleplerinizin yanıtlanması için gerekli verileri topluyoruz.'],
      },
      {
        heading: 'Barındırma ve sunucu kayıtları',
        lines: [
          'Bu web sitesi Vercel Inc. (ABD) altyapısında çalışır. Her ziyarette teknik olarak gerekli bilgiler otomatik olarak kaydedilir: IP adresi, tarih ve saat, açılan sayfa, tarayıcı ve işletim sistemi ile daha önce ziyaret edilen sayfa. Bu veriler güvenli ve kararlı işletim için kullanılır ve başka verilerle birleştirilmez.',
          "Bu sırada veriler ABD'ye aktarılabilir. Aktarım, İsviçre-ABD Veri Gizliliği Çerçevesi (Swiss-U.S. Data Privacy Framework) veya standart sözleşme maddeleri gibi tanınmış güvencelere dayanır.",
        ],
      },
      {
        heading: 'Ziyaretçi istatistiği',
        lines: ['Sayfaların ne sıklıkla açıldığını görmek için Vercel Web Analytics kullanıyoruz. Hizmet çerez kullanmaz ve kullanıcı profili oluşturmaz; ziyaretler yalnızca anonimleştirilmiş, her gün değişen bir değerle ayırt edilir. Sayfa görüntülemeleri, gelinen sayfa, ülke ve cihaz türü gibi toplu bilgiler değerlendirilir.'],
      },
      {
        heading: 'Google yazı tipleri',
        lines: ["Bazı yazı tipleri için bu web sitesi Google Fonts'tan (Google Ireland Limited veya Google LLC, ABD) dosya yükler. Bu sırada tarayıcınız IP adresinizi Google'a iletir. Daha fazla bilgi: policies.google.com/privacy."],
      },
      {
        heading: 'E-posta ile iletişim',
        lines: ['İletişim formu kendi e-posta programınızı açar; bu sırada web sitesi üzerinden veri aktarılmaz. Adınızı, e-posta adresinizi ve mesajınızı ancak e-postayı gönderdiğinizde alırız. Bu bilgileri yalnızca talebinizi işlemek için kullanır; artık gerekli olmadıklarında ve yasal saklama yükümlülükleri engel olmadığında sileriz.'],
      },
      {
        heading: 'Tarayıcıda saklama',
        lines: ['Bu web sitesi çerez kullanmaz. Seçtiğiniz dil, renk teması ve ses ayarı, bir sonraki ziyarette korunması için tarayıcınızın yerel belleğinde (localStorage) saklanır. Bu bilgiler cihazınızdan çıkmaz ve tarayıcı ayarlarından her zaman silinebilir.'],
      },
      {
        heading: 'Sohbet asistanı ve videolar',
        lines: ["Sağ alttaki sohbet asistanı sabit kurallara göre doğrudan tarayıcınızda yanıt verir; yazdıklarınız aktarılmaz ve saklanmaz. Yanıtları sesli okumak için cihazınızın ses çıkışını kullanır – tarayıcıya bağlı olarak bu, tarayıcı üreticisinin çevrimiçi bir hizmeti olabilir (örneğin Chrome'daki Google sesleri); bu durumda okunan yanıt metni o hizmete iletilir. Tüm videolar kendi sunucumuzda bulunur; üçüncü taraf video hizmetleri kullanılmaz."],
      },
      {
        heading: 'Veri güvenliği',
        lines: ['Bu web sitesine bağlantı HTTPS (TLS) ile şifrelenir.'],
      },
      {
        heading: 'Haklarınız',
        lines: [
          'Hakkınızda işlediğimiz kişisel veriler hakkında her zaman bilgi isteyebilir, bunların düzeltilmesini, silinmesini veya size verilmesini talep edebilir ve işlenmesine itiraz edebilirsiniz. Bunun için {email} adresine yazın.',
          "Ayrıca yetkili denetim makamına şikâyette bulunabilirsiniz – İsviçre'de Federal Veri Koruma ve Kamuya Açıklık Görevlisi'ne (EDÖB, www.edoeb.admin.ch).",
        ],
      },
      {
        heading: 'Değişiklikler',
        lines: ['Web sitesi veya yasal dayanaklar değiştiğinde bu gizlilik politikasını güncelleriz. Burada yayımlanan güncel sürüm geçerlidir.'],
      },
    ],
  },
  bot: {
    title: 'EKADO Design · Asistan',
    welcome:
      'Merhaba! Ben EKADO Design asistanıyım. Size nasıl yardımcı olabilirim? Örneğin siparişlerin, vardiya planının, muhasebenin, resmi bildirimlerin, personel işlerinin ya da ana sayfanın bizde nasıl işlediğini sorabilirsiniz.',
    fallback:
      'Buna hazır bir cevabım yok maalesef. Siparişler, vardiya planı ve fazla mesai, muhasebe, resmi bildirimler, personel ve ana sayfa konularında yardımcı olabilirim – ya da bize doğrudan yazın: {email}',
    placeholder: 'Sorunuz…',
    send: 'Gönder',
    replies: {
      api:
        'Veri alışverişi şöyle işliyor: siparişler tedarikçilerinize otomatik olarak e-postayla gider – onların yeni bir yazılıma ihtiyacı yoktur. Ödemeleri muhasebe uygulaması bankanız üzerinden yapar, zorunlu bildirimler güvenli şekilde iletilir. Kasa veya muhasebe yazılımı gibi mevcut sistemlerin bağlanıp bağlanamayacağını görüşmede birlikte netleştiririz: {email}',
      price:
        'Fiyat, hangi alanları kullanmak istediğinize ve işletmenizin büyüklüğüne göre belirlenir. Neye ihtiyacınız olduğunu kısaca yazın, size bağlayıcı olmayan bir teklif gönderelim: {email}',
      setup:
        'Önce hangi süreçleri dijitale taşımak istediğinize birlikte bakarız. Ardından platformu adım adım işletmenize göre kurarız. Ne kadar süreceği kapsama bağlı – net bir zaman planını teklifle birlikte alırsınız.',
      security:
        'Belgeleriniz klasörlerde ve e-posta kutularında değil, merkezi ve korumalı tek bir yerde durur; bildirimler güvenli şekilde iletilir. Verilerinizin nerede saklandığını ve kimin erişebildiğini sizinle açıkça konuşuruz. Bu web sitesinin verileri nasıl işlediği en alttaki gizlilik politikasında yazıyor.',
      orders:
        'Siparişler şöyle işliyor: siparişi uygulamada bir kez oluşturursunuz, sistem onu otomatik olarak e-postayla doğru tedarikçiye gönderir ve her şeyi dijital olarak kaydeder. Tedarikçilerinizin yeni bir şeye ihtiyacı yoktur. İletişim hataları, gecikmeler ve çift siparişler ortadan kalkar – ayrıntılar 01. bölümde.',
      overtime:
        'Fazla mesailer eksiksiz belgelenir – kişi ve ay bazında izlenebilir. Yönetim, liste tutmadan güncel durumu her an görür. Bir örneği 02. bölümde bulabilirsiniz.',
      vacation:
        'Çalışanlarınız izin taleplerini doğrudan uygulamadan yapar, onay tek tıkla verilir. Kalan izin ve planlanan devamsızlıklar herkes için her an görünür – ne kâğıt ne de soru-cevap.',
      sick:
        'Hastalık bildirimleri uygulamadan yapılır ve otomatik olarak işletmeye iletilir. Vardiya planı kendini uyarlar, kısa vadeli değişikliklerde bile herkes hemen haberdar olur.',
      planning:
        'Vardiya planlaması tek bir yerden yürür: vardiyaları planlayın, her vardiyaya görevleri ekleyin, değişiklikleri anında herkese iletin. Çalışanlarınız çalışma günlerini ve saatlerini doğrudan uygulamada görür. 02. bölümde altı örneğe göz atabilirsiniz.',
      invoices:
        'Tedarikçiler faturalarını doğrudan muhasebe uygulamasına gönderir. Her fatura anında eşleştirilir ve bulunur; uygulama ödemeyi zamanında bankanız üzerinden yapar ve düzgünce kaydeder.',
      accounting:
        'Aylık giderler, alımlar, ek masraflar ve tedarikçi faturaları otomatik olarak işlenir – elle giriş yok, belge yığını yok. Düzenli bir finans ve gider özetine her an sahipsiniz, her işlem izlenebilir. Ayrıntılar 03. bölümde.',
      vat:
        'KDV (MWST) beyannamesi girilen rakamlardan otomatik olarak hazırlanır – üç aylık beyanda yılda dört kez ESTV için. Böylece tutarlar ve süreler kontrol altında kalır.',
      payroll:
        'Maaş ve sosyal sigorta bildirimleri otomatik olarak hazırlanır ve zamanında iletilir: stopaj vergisi (Quellensteuer) her ay kanton vergi dairesine, AHV bildirimi Ausgleichskasse\'ye, BVG emeklilik kasasına, UVG sigortacıya, maaş belgeleri de çalışanlara ve vergi dairesine.',
      reports:
        'Resmi bildirimler için gereken tüm veriler otomatik olarak hazırlanır, raporlar ve belgeler sistemli şekilde oluşturulur ve güvenle iletilir – doğru, eksiksiz ve zamanında. En önemli altı zorunlu bildirimi 04. bölümde görebilirsiniz.',
      onboarding:
        'Yeni çalışanlar işletmeye tamamen dijital olarak dahil edilir: sözleşme dijital imzalanır, sigortalar bildirilir, belgeler dosyalanır – ilk iş gününe kadar adım adım. İşten çıkışlar da düzenli ve kâğıtsız yürür.',
      personnel:
        'İş sözleşmeleri, sigorta belgeleri, işe giriş ve çıkış bildirimleri ve diğer tüm belgeler merkezi ve dijital olarak tek yerde durur. Kâğıt yığını yok, kaybolan belge yok – her şey her an elinizin altında. Ayrıntılar 06. bölümde.',
      homepage:
        'İşletmenize uyan, size özel ana sayfalar tasarlıyoruz: telefonda kusursuz okunur, hizmetler, ürünler, ekip ve iletişim net şekilde yer alır. Müşterileriniz sizi daha kolay bulur, işletmeniz daha modern ve profesyonel görünür. Bir örneği 05. bölümde görebilirsiniz.',
      app:
        'Çalışanlarınız çalışma günlerini, saatlerini, görevlerini ve izinlerini doğrudan uygulamada görür – yolda da, telefondan. Plandaki değişiklikler anında görünür; hastalık bildirimleri ve izin talepleri de uygulama üzerinden yapılır.',
      overview:
        'EKADO Design işletmenizin dijital süreçlerini tek bir platformda toplar: siparişler, vardiya planı ve fazla mesai, muhasebe ve ödemeler, resmi bildirimler, personel süreçleri ve ana sayfanız. Her şey otomatik ve düzenli işler – siz asıl işinize odaklanırsınız.',
      audience:
        'Platform; çalışan planlayan, tedarikçilerden sipariş veren ve zorunlu bildirim yapması gereken işletmeler için düşünüldü – küçük ekiplerden büyük KOBİ\'lere kadar. Bu arada bu sayfadaki örnek firmalar (Frischwaren AG, Bäckerei Keller …) uydurmadır.',
      demo:
        'Platformu size memnuniyetle birebir bir görüşmede gösteririz. Hangi alanlarla ilgilendiğinizi kısaca yazın: {email} – ya da 07. bölümdeki iletişim formunu kullanın.',
      location:
        'EKADO Design İsviçre\'nin Zürih şehrinde. Görüşmeleri yüz yüze ya da online yapabiliriz.',
      language:
        'Bu sayfa Almanca ve Türkçe – sağ üstten değiştirebilirsiniz. Danışmanlığı da Almanca ya da Türkçe verebiliriz.',
      contact:
        'Bize en hızlı e-postayla ulaşırsınız: {email} – ya da sayfanın en altındaki iletişim formuyla. Size bizzat dönüş yaparız.',
      bot:
        'Dürüst olayım: sabit bir bilgi listesi olan küçük bir asistanım – gerçek bir yapay zekâ değilim, bulut yok ve yazdıklarınızın hiçbirini saklamıyorum. Bilmediğim her şeye bir insan cevap verir: {email}',
      howAreYou:
        'Harikayım, teşekkürler! Bende her şey otomatik işliyor – yakında sizde de olacağı gibi. Nasıl yardımcı olabilirim?',
      thanks: 'Rica ederim! Aklınıza takılan bir şey olursa: {email}. İyi günler!',
      hello:
        'Merhaba! Nasıl yardımcı olabilirim? Bana siparişler, vardiya planı, muhasebe, bildirimler, personel ya da ana sayfa hakkında sorabilirsiniz.',
    },
  },
  packages: {
    eyebrow: 'Paketler & Çözümler',
    line1: 'Net ve şeffaf.',
    line2: 'İşletmenize tam uyumlu.',
    lede: 'Günlük işlerinizi gözle görülür şekilde hafifleten modeli seçin — hızlı başlangıçtan anahtar teslim operasyon merkezine.',
    choose: 'Paket Talep Et',
    back: 'Paketlere Dön',
    customNote: 'Tüm paketlerde aylık fesih imkanı · Gizli taahhüt yok · Zürih’ten birebir Türkçe destek',
    plans: [
      {
        id: 'start',
        name: 'Başlangıç (Start)',
        badge: 'Hızlı Giriş',
        tagline: 'Kafeler, paket servisler ve küçük ekipler için',
        modules: ['Sipariş & Masa Takibi', 'Haftalık Vardiya Planı', 'Mobil Uyumlu (PWA)'],
        features: [
          'Kağıtsız, hatasız dijital sipariş akışı',
          'Vardiya çizelgesini WhatsApp ile tek tıkla paylaşma',
          'Telefondan kolay personel giriş/çıkış takibi',
          '%100 İsviçre Sunuculu & DSG Uyumlu',
        ],
      },
      {
        id: 'betrieb',
        name: 'Operasyon (Betrieb)',
        badge: 'En Çok Tercih Edilen',
        tagline: 'Restoranlar ve büyüyen işletmeler için tam kontrol',
        modules: ['Tüm Başlangıç Modülleri', 'Kasa & Günlük Muhasebe', 'Resmi Bildirimler & Hijyen'],
        features: [
          'Tek tıkla otomatik gün sonu Z-raporu dökümü',
          'Mali müşaviriniz (Treuhänder) için hazır KDV listesi',
          'Dijital HACCP, temizlik ve hijyen kayıtları',
          'Müdür ve personel için yetki seviyeleri',
          'Zürih’ten öncelikli destek (Almanca & Türkçe)',
        ],
      },
      {
        id: 'komplett',
        name: 'Tam Paket (Komplett)',
        badge: 'Anahtar Teslim',
        tagline: 'Kendi web siteniz ve yerinde kurulumla eksiksiz altyapı',
        modules: ['Tüm Operasyon Modülleri', 'Özel Modern Web Sitesi', 'Yerinde Birebir Kurulum'],
        features: [
          'Online rezervasyonlu, modern mobil uyumlu web sitesi',
          'Google Haritalar ve yerel SEO optimizasyonu',
          'Zürih içi yerinde kurulum ve personel eğitimi',
          'Mevcut kasanıza özel entegrasyonlar',
          'Doğrudan geliştirici Adnan ile 1-e-1 iletişim',
        ],
      },
    ],
  },
};

export const translations: Record<Language, TranslationSchema> = { de, tr };
