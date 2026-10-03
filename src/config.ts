import type { Lang } from './content/ui';

/** Açılışta seçili renk: src/styles/colors/<ad>.css dosyasının adı. */
export const DEFAULT_COLOR = 'claude';
export const DEFAULT_LANG: Lang = 'de';
export const CONTACT_MAIL = 'xdd@hotmail.com';

/** Doppelseiten wechseln ihren Satzspiegel von selbst (ms). */
export const LAYOUT_INTERVAL = 9000;

/**
 * Lichtband-Form (nur Themen mit --band, z. B. cyan). Zum Vergleichen: Adresse ?band=1 ... ?band=4
 * 1 = gerade senkrecht (Kopfzeile wird abgedeckt)
 * 2 = schraeg ("2 numara", Kundenfreigabe 2026-10-03)
 * 3 = Schlange (S-Kurven)
 * 4 = Ringe und Punkte
 */
export const BAND_SHAPE = '3';

/**
 * Effekt am Rand der Schlange (nur Form 3). Zum Vergleichen: Adresse ?fx=1 ... ?fx=10, ?fx=0 = aus
 * 1 Licht · 2 Partikel · 3 Punkte · 4 ADO-Buchstaben · 5 Herzschlag · 6 Streifen innen
 * 7 Funken · 8 Schimmer · 9 Sonar · 10 Datenregen · 11 ADO-Regen
 * Eroeffnung (2026-10-03): Claude-Thema, Schlange, ADO-Regen.
 */
export const BAND_FX = '11';
