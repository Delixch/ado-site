/**
 * Vergleichs-Leiste (voruebergehend): Lichtband-Form und Rand-Effekt durchschalten.
 * Wahl wird gemerkt (localStorage). Nichts davon wird geloescht - alle Varianten bleiben im Code.
 */
const SHAPES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const SHAPE_NAMES = ['gerade', 'schraeg', 'Schlange', 'Ringe', 'Faden', 'schraeger Faden', 'duenne Schlange', 'Doppelschlange', 'drei Linien', 'Schraffur', 'Zickzack', 'Punktlinie'];
const FX = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
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
          {SHAPES.map((v, i) => (
            <button type="button" key={v} aria-pressed={v === band} onClick={() => setBand(v)} title={SHAPE_NAMES[i]}>
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
