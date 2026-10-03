import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';
import { CONTACT_MAIL } from '../../config';
import { useView } from '../ViewFrame';
import { onIntroCall, takeIntroCall } from './IntroCall';

export interface LetterLabels {
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  successTitle: string;
  successText: string;
  mailSubjectPrefix: string;
}

/**
 * Kein Formular, sondern ein Brief: man schreibt direkt in die Luecken auf dem Papier.
 * Das Wachssiegel ist der Senden-Knopf; danach faltet sich der Brief und wird versiegelt.
 */
export function LetterDesk({ labels, to = 'ADO' }: { labels: LetterLabels; to?: string }) {
  const { t } = useView();
  const L = t.ui.letter;
  const lang = t.lang;
  const I = t.ui.intro;
  const [wish] = useState(takeIntroCall);
  const [topic, setTopic] = useState<string | null>(wish ? (wish.topic ?? I.topic) : null);
  const [v, setV] = useState(() => ({ name: '', email: '', message: topic ? `${topic}
${I.when}` : '' }));
  const [sealed, setSealed] = useState(false);
  const area = useRef<HTMLTextAreaElement>(null);

  // Erstgespraech- oder Paket-Knopf auf derselben Seite: Brief oeffnen und vorfuellen
  useEffect(
    () =>
      onIntroCall((w) => {
        const next = w.topic ?? I.topic;
        setSealed(false);
        setTopic(next);
        setV((cur) => ({ ...cur, message: `${next}
${I.when}` }));
        window.setTimeout(() => area.current?.focus(), 500);
      }),
    [I.topic, I.when],
  );

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(topic ? `${topic} · ${v.name}`.trim() : `${labels.mailSubjectPrefix} ${v.name}`.trim());
    const body = encodeURIComponent(`${L.greeting}\n\n${v.message}\n\n${L.bye}\n${v.name} · ${v.email}`);
    setSealed(true);
    window.setTimeout(() => {
      window.location.href = `mailto:${CONTACT_MAIL}?subject=${subject}&body=${body}`;
    }, 1400);
  };

  const date = new Date().toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'de-CH', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="desk">
      <AnimatePresence mode="wait">
        {!sealed ? (
          <motion.form
            key="paper"
            className="paper"
            onSubmit={submit}
            initial={{ opacity: 0, y: 24, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -0.6 }}
            exit={{ scaleY: 0.08, y: 40, opacity: 0, transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] } }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="paper-date micro">
              {L.place}, {date}
            </p>
            <p className="paper-greet whisper">{L.greeting.replace('ADO', to)}</p>
            <p className="paper-line">
              {L.name}{' '}
              <input
                className="ink-field"
                name="name"
                required
                autoComplete="name"
                placeholder={labels.namePlaceholder}
                value={v.name}
                size={Math.max(12, v.name.length + 1)}
                onChange={(e) => setV({ ...v, name: e.target.value })}
              />{' '}
              {L.reach}{' '}
              <input
                className="ink-field"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={labels.emailPlaceholder}
                value={v.email}
                size={Math.max(18, v.email.length + 1)}
                onChange={(e) => setV({ ...v, email: e.target.value })}
              />
              .
            </p>
            <p className="paper-line">{L.about}</p>
            <textarea
              ref={area}
              className="ink-area"
              name="message"
              required
              rows={4}
              placeholder={labels.messagePlaceholder}
              value={v.message}
              onChange={(e) => setV({ ...v, message: e.target.value })}
            />
            <div className="paper-foot">
              <p className="paper-sign">
                <span className="micro">{L.bye}</span>
                <span className="whisper">{v.name || '…'}</span>
              </p>
              <button type="submit" className="seal" aria-label={L.seal}>
                <span className="seal-wax">
                  <span className="seal-mark">A</span>
                </span>
                <span className="micro">{L.seal}</span>
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="envelope"
            className="envelope"
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="envelope-flap" aria-hidden />
            <motion.span
              className="seal-wax seal-stamp"
              initial={{ scale: 2.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.55, type: 'spring', stiffness: 260, damping: 18 }}
            >
              <span className="seal-mark">A</span>
            </motion.span>
            <div className="envelope-text">
              <span className="micro live">
                <Check /> {L.sealed}
              </span>
              <p className="whisper">{labels.successTitle}</p>
              <p className="lede">{labels.successText}</p>
              <button type="button" className="e-link" onClick={() => setSealed(false)}>
                ← {L.greeting.replace(',', '')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
