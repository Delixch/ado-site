import type { Lang } from './content/ui';

/** Açılışta seçili renk: src/styles/colors/<ad>.css dosyasının adı. */
export const DEFAULT_COLOR = 'amber';
export const DEFAULT_LANG: Lang = 'de';
export const CONTACT_MAIL = 'info@ekado.ch';

/**
 * Videos liegen im Vercel-Blob-Store "ekado-media", nicht in jedem Deployment (Speichergrenze).
 * Lokal bleiben sie in public/ fuer die Render-Skripte; hochladen mit `npm run media:upload`.
 */
export const MEDIA_BASE = 'https://tu5g0pd0iphapwij.public.blob.vercel-storage.com';
export const media = (path: string) => `${MEDIA_BASE}${path}`;

/**
 * Mit welchem Layout jede Seite oeffnet (0 = erstes, 1 = zweites, 2 = drittes Mini-Plan im Seitenkopf).
 * Fehlt eine Seite, gilt 0. Die Karten wechseln erst, wenn Play in der Kopfzeile gedrueckt wird.
 */
export const START_LAYOUT: Record<string, number> = {
  'd-start': 0, // Cover
  'd-about': 2, // Mirror
  'd-work': 1, // Pitch
  'd-skills': 1, // Column
  'd-repos': 1, // Spread
  'd-construction': 0, // Blueprint
  'd-experience': 1, // Route
  'd-contact': 0, // Letter
  'f-start': 0, // Control
  'f-flow': 2, // Mirror
  'f-contact': 0, // Letter
  'i-start': 1, // Story
  'i-flow': 1, // Mirror
  'i-features': 1, // Mirror
  'i-process': 1, // Wide
  'i-pricing': 1, // Open
};

/** Doppelseiten wechseln ihren Satzspiegel von selbst (ms), sobald Play laeuft. */
export const LAYOUT_INTERVAL = 9000;

/**
 * Lichtband-Form (nur Themen mit --band, z. B. cyan). Zum Vergleichen: Adresse ?band=1 ... ?band=4
 * 1 = gerade senkrecht (Kopfzeile wird abgedeckt)
 * 2 = schraeg ("2 numara", Kundenfreigabe 2026-10-03)
 * 3 = Schlange (S-Kurven)
 * 4 = Ringe und Punkte
 * duenne Formen (2026-10-06): 5 Faden · 6 schraeger Faden · 7 duenne Schlange · 8 Doppelschlange
 * · 9 drei Linien · 10 Schraffur · 11 Zickzack · 12 Punktlinie
 */
export const BAND_SHAPE = '3';

/**
 * Effekt am Rand der Schlange (nur Form 3). Zum Vergleichen: Adresse ?fx=1 ... ?fx=10, ?fx=0 = aus
 * 1 Licht · 2 Partikel · 3 Punkte · 4 EKADO-Buchstaben · 5 Herzschlag · 6 Streifen innen
 * 7 Funken · 8 Schimmer · 9 Sonar · 10 Datenregen · 11 EKADO-Regen
 * Eroeffnung (2026-10-03): Claude-Thema, Schlange, EKADO-Regen.
 */
export const BAND_FX = '11';

/**
 * Eingeklapptes Menue: wie die Gruppen von den Seiten unterschieden werden.
 * Zum Vergleichen: Adresse ?rail=1 ... ?rail=3
 * 1 = feiner Ring um das Gruppensymbol · 2 = Baumlinie zu den Seiten · 3 = Trennlinie mit Buchstabe
 */
export const RAIL_STYLE = '1';

/**
 * Menue-Art: 'full' = Vollbild-Menue mit grossen Zeilen (Test 2026-10-05, Vorlage "Bizuba"),
 * 'sidebar' = bisheriges ausklappbares Seitenmenue. Das schmale Symbol-Band links bleibt in beiden.
 */
export const MENU_STYLE: 'full' | 'sidebar' = 'full';

/**
 * Menue merkt sich den zuletzt gewaehlten Bereich so lange (ms): wer innerhalb dieser Zeit wieder
 * aufmacht, findet seinen Bereich offen; danach sind beim Oeffnen wieder alle Bereiche zu.
 */
export const MENU_MEMORY_MS = 10_000;

/** Breite des eingeklappten Menues in px (gleich wie --sb-rail-w in tokens.css). */
export const RAIL_WIDTH = 52;

/** Sprichwort auf der Startseite wechselt alle ... ms (20 Sprichwoerter, content/proverbs.ts). */
export const PROVERB_INTERVAL = 9000;
