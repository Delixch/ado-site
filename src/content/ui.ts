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
    color: 'Farbe',
    shuffleAuto: 'Karten bewegen sich',
    shuffleNow: 'Karten mischen',
    soundOn: 'Ton einschalten',
    soundOff: 'Ton ausschalten',
    groups: {
      design: { title: 'ADO Design · Portfolio', short: 'Design' },
      firma: { title: 'ADO Firma · Unternehmen', short: 'Firma' },
      insta: { title: 'ADO InstaOto · Automation', short: 'Insta' },
    } as Record<Group, { title: string; short: string }>,
    start: 'Start',
    overview: 'Übersicht',
    issue: 'Ausgabe',
    inThisIssue: 'In dieser Ausgabe',
    layout: 'Layout',
    wipe: 'Zeiger über das Glas – es klärt sich',
    split: 'Zeiger bewegen – Foto und Schrift tauschen',
    drag: 'Ziehen, scrollen oder Pfeiltasten',
    choose: 'Auswählen',
    play: 'Video abspielen',
    pause: 'Video anhalten',
    letter: {
      greeting: 'Lieber ADO,',
      name: 'mein Name ist',
      reach: 'und Sie erreichen mich unter',
      about: 'Es geht um Folgendes:',
      bye: 'Herzliche Grüsse',
      seal: 'Siegeln & senden',
      sealed: 'Versiegelt',
      place: 'Zürich',
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
    color: 'Renk',
    shuffleAuto: 'Kartlar hareket ediyor',
    shuffleNow: 'Kartları karıştır',
    soundOn: 'Sesi aç',
    soundOff: 'Sesi kapat',
    groups: {
      design: { title: 'ADO Design · Portfolyo', short: 'Design' },
      firma: { title: 'ADO Firma · Şirketler', short: 'Firma' },
      insta: { title: 'ADO InstaOto · Otomasyon', short: 'Insta' },
    } as Record<Group, { title: string; short: string }>,
    start: 'Başlangıç',
    overview: 'Genel Bakış',
    issue: 'Sayı',
    inThisIssue: 'Bu sayıda',
    layout: 'Düzen',
    wipe: 'İmleci camda gezdirin – buğu açılır',
    split: 'İmleci gezdirin – fotoğraf ve yazı yer değiştirir',
    drag: 'Sürükleyin, kaydırın veya ok tuşları',
    choose: 'Seçin',
    play: 'Videoyu oynat',
    pause: 'Videoyu durdur',
    letter: {
      greeting: 'Sevgili ADO,',
      name: 'benim adım',
      reach: 've bana şu adresten ulaşabilirsiniz:',
      about: 'Konu şu:',
      bye: 'Sevgilerle',
      seal: 'Mühürle & gönder',
      sealed: 'Mühürlendi',
      place: 'Zürih',
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
    'f-orders': f.nav.about,
    'f-planning': f.nav.work,
    'f-accounting': f.nav.skills,
    'f-reports': f.nav.repos,
    'f-homepage': f.nav.construction,
    'f-personnel': f.nav.experience,
    'f-contact': f.nav.contact,
    'i-start': i.nav.start,
    'i-flow': i.nav.flow,
    'i-features': i.nav.features,
    'i-process': i.nav.process,
    'i-security': i.nav.security,
    'i-pricing': i.nav.pricing,
  };
  return { ui: s, menu, d, f, i, lang };
}

export type Texts = ReturnType<typeof texts>;
