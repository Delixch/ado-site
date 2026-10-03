/**
 * Vergleichs-Leiste (voruebergehend): Lichtband-Form und Rand-Effekt durchschalten.
 * Wahl wird gemerkt (localStorage). Nichts davon wird geloescht - alle Varianten bleiben im Code.
 */
const SHAPES = ['1', '2', '3', '4'];
const FX = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
const FX_NAMES = ['aus', 'Licht', 'Partikel', 'Punkte', 'ADO', 'Herzschlag', 'Streifen', 'Funken', 'Schimmer', 'Sonar', 'Datenregen', 'ADO-Regen'];

export function BandPicker({ band, fx, setBand, setFx, inline }: { band: string; fx: string; setBand: (v: string) => void; setFx: (v: string) => void; inline?: boolean }) {
  return (
    <div className="bp-pick" data-inline={inline || undefined} role="group" aria-label="Lichtband">
      <div>
        <span>Form</span>
        {SHAPES.map((v) => (
          <button type="button" key={v} aria-pressed={v === band} onClick={() => setBand(v)}>
            {v}
          </button>
        ))}
      </div>
      <div>
        <span>Effekt</span>
        {FX.map((v, i) => (
          <button type="button" key={v} aria-pressed={v === fx} onClick={() => setFx(v)} title={FX_NAMES[i]}>
            {v}
          </button>
        ))}
      </div>
      <em>{FX_NAMES[Number(fx)]}</em>
    </div>
  );
}
