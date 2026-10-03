import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PROVERB_INTERVAL } from '../../config';
import { PROVERBS } from '../../content/proverbs';
import type { Lang } from '../../content/ui';

/** Zuletzt gezeigtes Sprichwort - beim Zurueckkehren auf die Startseite kommt ein anderes. */
let last = -1;

function pickOther() {
  let i = Math.floor(Math.random() * PROVERBS.length);
  if (i === last) i = (i + 1) % PROVERBS.length;
  return i;
}

/** Sprichwort, das alle PROVERB_INTERVAL ms sanft wechselt. */
export function Proverb({ lang }: { lang: Lang }) {
  const [i, setI] = useState(pickOther);

  useEffect(() => {
    last = i;
  }, [i]);

  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % PROVERBS.length), PROVERB_INTERVAL);
    return () => window.clearInterval(id);
  }, []);

  const [a, b] = PROVERBS[i][lang];
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.blockquote
        key={i}
        className="whisper"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {a} <em>{b}</em>
      </motion.blockquote>
    </AnimatePresence>
  );
}
