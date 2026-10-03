import type { Lang } from './ui';

/** Sprichwoerter fuer die Startseite (je Sprache das eigene, echte Sprichwort).
 *  Zwei Zeilen: die zweite steht kursiv. Schweizer Schreibweise (ss statt ß). */
export const PROVERBS: Record<Lang, [string, string]>[] = [
  { de: ['Siebenmal fallen,', 'achtmal aufstehen.'], tr: ['Yedi kez düş,', 'sekiz kez kalk.'] },
  { de: ['Übung macht', 'den Meister.'], tr: ['İşleyen demir', 'ışıldar.'] },
  { de: ['Steter Tropfen', 'höhlt den Stein.'], tr: ['Damlaya damlaya', 'göl olur.'] },
  { de: ['Ohne Fleiss', 'kein Preis.'], tr: ['Emek olmadan', 'yemek olmaz.'] },
  { de: ['Aller Anfang', 'ist schwer.'], tr: ['Her işin başı', 'zordur.'] },
  { de: ['Auch der längste Weg', 'beginnt mit dem ersten Schritt.'], tr: ['Bin kilometrelik yol', 'tek adımla başlar.'] },
  { de: ['Wo ein Wille ist,', 'ist auch ein Weg.'], tr: ['Azmin elinden', 'hiçbir şey kurtulmaz.'] },
  { de: ['Morgenstund', 'hat Gold im Mund.'], tr: ['Erken kalkan', 'yol alır.'] },
  { de: ['Gut Ding', 'will Weile haben.'], tr: ['Sabreden derviş', 'muradına ermiş.'] },
  { de: ['Einigkeit', 'macht stark.'], tr: ['Bir elin nesi var,', 'iki elin sesi var.'] },
  { de: ['Man muss das Eisen schmieden,', 'solange es heiss ist.'], tr: ['Demir', 'tavında dövülür.'] },
  { de: ['Probieren', 'geht über Studieren.'], tr: ['Çok okuyan değil,', 'çok gezen bilir.'] },
  { de: ['Was du heute kannst besorgen,', 'das verschiebe nicht auf morgen.'], tr: ['Bugünün işini', 'yarına bırakma.'] },
  { de: ['Lügen haben', 'kurze Beine.'], tr: ['Yalancının mumu', 'yatsıya kadar yanar.'] },
  { de: ['Wer nicht wagt,', 'der nicht gewinnt.'], tr: ['Korkak bezirgân', 'ne kâr eder ne zarar.'] },
  { de: ['Eile', 'mit Weile.'], tr: ['Acele işe', 'şeytan karışır.'] },
  { de: ['Taten sagen mehr', 'als Worte.'], tr: ['Laf ile peynir gemisi', 'yürümez.'] },
  { de: ['Ein Bild sagt', 'mehr als tausend Worte.'], tr: ['Bir resim', 'bin kelimeye bedeldir.'] },
  { de: ['Wer rastet,', 'der rostet.'], tr: ['Su akarken', 'testiyi doldur.'] },
  { de: ['Wer zuletzt lacht,', 'lacht am besten.'], tr: ['Son gülen', 'iyi güler.'] },
];
