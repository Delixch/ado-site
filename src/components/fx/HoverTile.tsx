import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

/**
 * Kachel-Effekt aus ADO Design (Favoriten & Inspiration): hinter der Karte unter dem
 * Zeiger erscheint ein weiches Quadrat in Themenfarbe und gleitet von Karte zu Karte.
 * Verwendung: const tile = useHoverTile(); <ul {...tile.list}> ... <li {...tile.item(i)}>
 * <HoverTile {...tile.at(i)} /> <button .../> </li>
 */
export function useHoverTile() {
  const group = useId();
  const [hovered, setHovered] = useState<number | null>(null);
  return {
    list: {
      'data-hover-tile': '',
      onPointerLeave: () => setHovered(null),
    },
    item: (i: number) => ({
      onPointerEnter: (e: React.PointerEvent) => e.pointerType === 'mouse' && setHovered(i),
    }),
    at: (i: number) => ({ show: hovered === i, group }),
  };
}

export function HoverTile({ show, group }: { show: boolean; group: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          className="hover-tile"
          aria-hidden
          layoutId={`hover-tile-${group}`}
          transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.15 } }}
          exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
        />
      )}
    </AnimatePresence>
  );
}
