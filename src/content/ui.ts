import { translations as designTexts } from './design-texts';
import { translations as firmaTexts } from './firma-texts';
import { instaTexts } from './insta-texts';
import type { Group } from './menu';

export type Lang = 'de' | 'tr';

/** Texte der Huelle (Menue, Kopfzeile). Inhalte kommen aus den beiden Sites. */
const shell = {
  de: {
    collapse: 'Einklappen',
    expand: 'Ausklappen',
    search: 'Suchen …',
    noResults: 'Kein Treffer',
    foundOnSite: 'Auf der Seite gefunden',
    changePhoto: 'Foto ändern',
    location: 'ZÜRICH',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schliessen',
    close: 'Schliessen',
    color: 'Farbe',
    shuffleAuto: 'Karten bewegen sich',
    shuffleNow: 'Karten mischen',
    home: 'Zur Startseite',
    soundOn: 'Ton einschalten',
    soundOff: 'Ton ausschalten',
    groups: {
      design: { title: 'EKADO Design · Portfolio', short: 'Design' },
      firma: { title: 'EKADO Firma · Unternehmen', short: 'Firma' },
      insta: { title: 'EKADO InstaOto · Automation', short: 'Insta' },
    } as Record<Group, { title: string; short: string }>,
    start: 'Start',
    overview: 'Übersicht',
    flows: 'Abläufe',
    toTop: 'Nach oben',
    impressum: 'Impressum',
    privacy: 'Datenschutz',
    issue: 'Ausgabe',
    inThisIssue: 'In dieser Ausgabe',
    layout: 'Layout',
    wipe: 'Zeiger über das Glas – es klärt sich',
    split: 'Zeiger bewegen – Foto und Schrift tauschen',
    drag: 'Ziehen, scrollen oder Pfeiltasten',
    choose: 'Auswählen',
    play: 'Video abspielen',
    pause: 'Video anhalten',
    /** Vertrauens-Hinweise auf den Angebotsseiten. Nur sagen, was nachweislich stimmt. */
    trust: {
      insta: [
        '100% Swiss Hosted & DSG-konform',
        'Keine Vertragsbindung (Monatlich kündbar)',
        'Direkter Schweizer Support in Zürich',
      ],
      firma: [
        '100% Swiss Hosted & DSG-konform',
        'Keine Vertragsbindung (Monatlich kündbar)',
        'Direkter Schweizer Support in Zürich (DE & TR)',
        'Auf Ihren Betrieb zugeschnitten & Vor-Ort-Einweisung',
      ],
      swiss: [
        { label: '100% Swiss Hosted', desc: 'Daten bleiben in der Schweiz · DSG-konform' },
        { label: 'Keine Vertragsbindung', desc: 'Monatlich kündbar · Kein Knebelvertrag' },
        { label: 'Direkter Support', desc: 'Persönlich in Zürich · Deutsch & Türkisch' },
      ],
    },
    /** Erstgespraech-Knopf: oeffnet den Brief mit fertigem Betreff (kein Kalenderdienst). */
    intro: {
      cta: 'Kostenloses Erstgespräch · 15 Min.',
      topic: 'Kostenloses Erstgespräch (15 Min.)',
      when: 'Passende Zeiten für mich: ',
    },
    letter: {
      greeting: 'Lieber EKADO,',
      name: 'mein Name ist',
      reach: 'und Sie erreichen mich unter',
      about: 'Es geht um Folgendes:',
      bye: 'Herzliche Grüsse',
      seal: 'Siegeln & senden',
      sealed: 'Versiegelt',
      place: 'Zürich',
      mailTitle: 'Mailprogramm geöffnet',
      mailText: 'Der direkte Versand hat gerade nicht geklappt. Ihre Nachricht ist im Mailprogramm vorbereitet – bitte dort noch abschicken. Oder direkt an info@ekado.ch.',
    },
  },
  tr: {
    collapse: 'Daralt',
    expand: 'Genişlet',
    search: 'Ara …',
    noResults: 'Sonuç yok',
    foundOnSite: 'Sayfalarda bulundu',
    changePhoto: 'Fotoğrafı değiştir',
    location: 'ZÜRİH',
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    close: 'Kapat',
    color: 'Renk',
    shuffleAuto: 'Kartlar hareket ediyor',
    shuffleNow: 'Kartları karıştır',
    home: 'Ana sayfaya dön',
    soundOn: 'Sesi aç',
    soundOff: 'Sesi kapat',
    groups: {
      design: { title: 'EKADO DESIGN · PORTFOLYO', short: 'Design' },
      firma: { title: 'EKADO FIRMA · ŞİRKETLER', short: 'Firma' },
      insta: { title: 'EKADO INSTAOTO · OTOMASYON', short: 'Insta' },
    } as Record<Group, { title: string; short: string }>,
    start: 'Başlangıç',
    overview: 'Genel Bakış',
    flows: 'İş Akışları',
    toTop: 'Yukarı çık',
    impressum: 'Künye',
    privacy: 'Gizlilik',
    issue: 'Sayı',
    inThisIssue: 'Bu sayıda',
    layout: 'Düzen',
    wipe: 'İmleci camda gezdirin – buğu açılır',
    split: 'İmleci gezdirin – fotoğraf ve yazı yer değiştirir',
    drag: 'Sürükleyin, kaydırın veya ok tuşları',
    choose: 'Seçin',
    play: 'Videoyu oynat',
    pause: 'Videoyu durdur',
    trust: {
      insta: [
        '%100 İsviçre Sunuculu & DSG Uyumlu',
        'Sözleşme Bağlayıcılığı Yok (Aylık İptal)',
        'Zürih’te Doğrudan Destek',
      ],
      firma: [
        '%100 İsviçre Sunuculu & DSG Uyumlu',
        'Sözleşme Bağlayıcılığı Yok (Aylık İptal)',
        'Zürih’te Doğrudan Destek (Almanca & Türkçe)',
        'İşletmenize Özel Kurulum & Yerinde Tanıtım',
      ],
      swiss: [
        { label: '%100 İsviçre Sunuculu', desc: 'Veriler İsviçre’de kalır · DSG Uyumlu' },
        { label: 'Taahhüt Yok', desc: 'Aylık Fesih İmkanı · Tam Özgürlük' },
        { label: 'Doğrudan Destek', desc: 'Zürih’te Kişisel Muhatap · Almanca & Türkçe' },
      ],
    },
    intro: {
      cta: 'Ücretsiz ön görüşme · 15 dk.',
      topic: 'Ücretsiz ön görüşme (15 dk.)',
      when: 'Bana uygun zamanlar: ',
    },
    letter: {
      greeting: 'Sevgili EKADO,',
      name: 'benim adım',
      reach: 've bana şu adresten ulaşabilirsiniz:',
      about: 'Konu şu:',
      bye: 'Sevgilerle',
      seal: 'Mühürle & gönder',
      sealed: 'Mühürlendi',
      place: 'Zürih',
      mailTitle: 'Mail programı açıldı',
      mailText: 'Doğrudan gönderim şu an olmadı. Mesajınız mail programında hazır – lütfen oradan gönderin. Ya da doğrudan info@ekado.ch adresine yazın.',
    },
  },
};

export type Shell = (typeof shell)['de'];

export function texts(lang: Lang) {
  const d = designTexts[lang];
  const f = firmaTexts[lang];
  const s = shell[lang];
  const i = instaTexts[lang];
  const menu: Record<string, string> = {
    'd-start': s.start,
    'd-about': d.nav.about,
    'd-work': d.nav.work,
    'd-skills': d.nav.skills,
    'd-repos': d.nav.repos,
    'd-construction': d.nav.construction,
    'd-experience': d.nav.experience,
    'd-contact': d.nav.contact,
    'f-start': s.overview,
    'f-flow': s.flows,
    'f-contact': f.nav.contact,
    'i-start': i.nav.start,
    'i-flow': i.nav.flow,
  };
  return { ui: s, menu, d, f, i, lang };
}

export type Texts = ReturnType<typeof texts>;
