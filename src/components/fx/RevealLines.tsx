import { motion } from 'motion/react';

/** Zeilen steigen aus einer unsichtbaren Kante (Maske) - wie gesetzte Lettern. */
export function RevealLines({ lines, className = '', delay = 0, as: Tag = 'span' }: { lines: string[]; className?: string; delay?: number; as?: 'span' | 'div' }) {
  return (
    <Tag className={`rl ${className}`}>
      {lines.map((line, i) => (
        <span className="rl-line" key={`${i}-${line}`}>
          <motion.span
            className="rl-inner"
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
