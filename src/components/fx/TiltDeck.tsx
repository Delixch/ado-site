import { useRef, type KeyboardEvent, type PointerEvent } from 'react';
import { motion } from 'motion/react';

const spring = { type: 'spring', stiffness: 120, damping: 20, mass: 0.9 } as const;

/**
 * Stapel schraeg liegender Folien (Pitch-Deck). Die aktive Folie hebt sich ab,
 * gelesene gleiten nach oben weg. Klick, Ziehen oder Pfeiltasten blaettern.
 */
export function TiltDeck({
  images,
  active,
  onChange,
  label,
}: {
  images: string[];
  active: number;
  onChange: (i: number) => void;
  label: string;
}) {
  const drag = useRef<{ x: number; y: number } | null>(null);
  const moved = useRef(false);
  const n = images.length;
  const go = (i: number) => onChange((i + n) % n);

  const down = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = { x: e.clientX, y: e.clientY };
    moved.current = false;
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    const delta = Math.abs(dx) > Math.abs(dy) ? dx : dy;
    if (Math.abs(delta) > 48) {
      go(active + (delta < 0 ? 1 : -1));
      drag.current = { x: e.clientX, y: e.clientY };
      moved.current = true;
    }
  };
  const key = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') go(active + 1);
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') go(active - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div
      className="deck"
      tabIndex={0}
      role="listbox"
      aria-label={label}
      onKeyDown={key}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={() => (drag.current = null)}
      onPointerLeave={() => (drag.current = null)}
    >
      <div className="deck-stage">
        {images.map((src, i) => {
          const d = i - active;
          if (d < -2 || d > 6) return null;
          return (
            <motion.button
              type="button"
              key={src}
              className="deck-slide"
              role="option"
              aria-selected={d === 0}
              tabIndex={-1}
              data-active={d === 0}
              onClick={() => !moved.current && d !== 0 && go(i)}
              initial={{ opacity: 0, y: 260, z: -120 }}
              animate={{
                opacity: d < 0 ? 0 : 1 - d * 0.1,
                x: d * 34,
                y: d < 0 ? -320 : d * 74,
                z: d === 0 ? 90 : -d * 36,
              }}
              exit={{ opacity: 0 }}
              transition={spring}
              style={{ zIndex: 50 - Math.abs(d) }}
            >
              <img src={src} alt="" loading={Math.abs(d) < 3 ? 'eager' : 'lazy'} draggable={false} />
              <span className="deck-no micro">{String(i + 1).padStart(2, '0')}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
