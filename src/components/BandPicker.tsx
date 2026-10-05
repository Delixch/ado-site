/**
 * Vergleichs-Leiste (voruebergehend): Lichtband-Form und Rand-Effekt durchschalten.
 * Wahl wird gemerkt (localStorage). Nichts davon wird geloescht - alle Varianten bleiben im Code.
 */
/* Vom Kunden gestrichen (2026-10-06): 4 Ringe, 5 Faden, 6 schraeger Faden, 7 duenne Schlange, 9 drei Linien,
   11 Zickzack, 12 Punktlinie, 13 vier Linien, 14/15 schraege Linien, 16 drei Schlangen.
   Bleiben nur per Adresse ?band=N erreichbar; Nummern der uebrigen aendern sich nicht. */
const SHAPES = ['1', '2', '3', '8', '10', '17'];
const SHAPE_NAMES: Record<string, string> = {
  '1': 'gerade',
  '2': 'schraeg',
  '3': 'Schlange',
  '4': 'Ringe',
  '5': 'Faden',
  '6': 'schraeger Faden',
  '7': 'duenne Schlange',
  '8': 'Doppelschlange (4 Straenge)',
  '9': 'drei Linien',
  '10': 'Schraffur',
  '11': 'Zickzack',
  '12': 'Punktlinie',
  '13': 'vier Linien',
  '14': 'drei schraege Linien',
  '15': 'vier schraege Linien',
  '16': 'drei Schlangen',
  '17': 'vier Schlangen',
};
/* Vom Kunden gestrichen (2026-10-06): 0 aus, 4 EKADO-Buchstaben, 5 Herzschlag, 6 Streifen, 7 Funken, 8 Schimmer,
   10 Datenregen. Bleiben nur per Adresse ?fx=N erreichbar. */
const FX = ['1', '2', '3', '9', '11'];
const FX_NAMES = ['aus', 'Licht', 'Partikel', 'Punkte', 'EKADO', 'Herzschlag', 'Streifen', 'Funken', 'Schimmer', 'Sonar', 'Datenregen', 'EKADO-Regen'];

export function BandPicker({
  band,
  fx,
  setBand,
  setFx,
  inline,
  dock,
  strip,
}: {
  band: string;
  fx: string;
  setBand: (v: string) => void;
  setFx: (v: string) => void;
  inline?: boolean;
  /** Unten in der Menue-Spalte, so breit wie das Menue, mit umlaufender Lichtlinie. */
  dock?: boolean;
  /** Senkrechter Streifen unter dem eingeklappten Symbol-Band, gleich schmal, gleiche Glasoptik + Lichtlinie (Desktop). */
  strip?: boolean;
}) {
  return (
    <div className="bp-pick" data-inline={inline || undefined} data-dock={dock || undefined} data-strip={strip || undefined} role="group" aria-label="Lichtband">
      {(dock || strip) && <span className="sb-orbit" aria-hidden />}
      <div>
        <span>Form</span>
        <div className="bp-btns">
          {SHAPES.map((v) => (
            <button type="button" key={v} aria-pressed={v === band} onClick={() => setBand(v)} title={SHAPE_NAMES[v]}>
              {v}
            </button>
          ))}
        </div>
      </div>
      <div>
        <span>Effekt</span>
        <div className="bp-btns">
          {FX.map((v, i) => (
            <button type="button" key={v} aria-pressed={v === fx} onClick={() => setFx(v)} title={FX_NAMES[i]}>
              {v}
            </button>
          ))}
        </div>
      </div>
      <em>{FX_NAMES[Number(fx)]}</em>
    </div>
  );
}
