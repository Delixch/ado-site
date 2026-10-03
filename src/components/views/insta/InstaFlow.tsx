import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Play, Send } from 'lucide-react';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const LAYOUTS: LayoutDef[] = [
  { name: 'Phone', cols: '1fr 1fr 1fr', areas: ['phone phone steps', 'phone phone hint'] },
  { name: 'Mirror', cols: '1fr 1fr 1fr', areas: ['steps phone phone', 'hint phone phone'] },
  { name: 'Center', cols: '1fr 1.2fr 1fr', areas: ['hint phone steps'] },
];

type Msg = { id: number; from: 'user' | 'bot' | 'sys'; text: string; buttons?: string[]; link?: boolean };

/**
 * Kleiner Nachbau des echten Ablaufs (instagramoto): Stichwort -> Knopf-Nachricht -> Follow-Pruefung -> Link.
 * Rein im Browser, nichts wird gesendet.
 */
function useChat() {
  const { t } = useView();
  const f = t.i.flow;
  const b = f.bot;
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [step, setStep] = useState(-1);
  const [typing, setTyping] = useState(false);
  const id = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((x) => window.clearTimeout(x)), []);

  const push = (m: Omit<Msg, 'id'>) => setMsgs((list) => [...list, { ...m, id: id.current++ }]);
  const later = (ms: number, fn: () => void) => {
    setTyping(true);
    timers.current.push(
      window.setTimeout(() => {
        setTyping(false);
        fn();
      }, ms),
    );
  };

  const norm = (s: string) => s.trim().toLocaleLowerCase();
  const keyword = (s: string) => f.keywords.some((k) => norm(s).includes(norm(k)));

  const comment = (text: string) => {
    if (!text.trim()) return;
    push({ from: 'user', text });
    if (keyword(text)) {
      setStep(0);
      later(900, () => {
        setStep(1);
        push({ from: 'bot', text: b.hello, buttons: b.buttons });
      });
    } else later(700, () => push({ from: 'sys', text: b.unknown }));
  };

  const press = (label: string) => {
    push({ from: 'user', text: label });
    setMsgs((list) => list.map((m) => ({ ...m, buttons: m.buttons && m.text === b.hello ? [] : m.buttons })));
    if (label === b.buttons[0]) {
      later(800, () => {
        setStep(2);
        push({ from: 'bot', text: b.follow, buttons: [b.followBtn] });
      });
    } else if (label === b.buttons[1]) later(700, () => push({ from: 'bot', text: b.no }));
    else if (label === b.buttons[2]) later(700, () => push({ from: 'bot', text: b.human }));
    else if (label === b.followBtn) {
      setMsgs((list) => list.map((m) => ({ ...m, buttons: m.text === b.follow ? [] : m.buttons })));
      later(900, () => {
        setStep(3);
        push({ from: 'bot', text: b.link, link: true });
      });
    }
  };

  const reset = () => {
    timers.current.forEach((x) => window.clearTimeout(x));
    timers.current = [];
    setMsgs([]);
    setStep(-1);
    setTyping(false);
  };

  /** Vorschau: Ablauf von vorn bis zum gewaehlten Schritt abspielen. */
  const playTo = (target: number) => {
    reset();
    const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
    at(250, () => comment(f.keywords[0]));
    if (target >= 2) at(2000, () => press(b.buttons[0]));
    if (target >= 3) at(3800, () => press(b.followBtn));
  };

  return { msgs, step, typing, comment, press, reset, playTo };
}

export function InstaFlow() {
  const { t } = useView();
  const f = t.i.flow;
  const chat = useChat();
  const [text, setText] = useState('');
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' });
  }, [chat.msgs.length, chat.typing]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    chat.comment(text);
    setText('');
  };

  const blocks: Block[] = [
    {
      id: 'phone',
      tone: 'deep',
      node: (
        <div className="ig-stage">
          <div className="ig-phone">
            <div className="ig-top">
              <span className="ig-avatar">A</span>
              <span>
                <b>adodesign</b>
                <span className="micro">Instagram · DM</span>
              </span>
              <button type="button" className="micro ig-reset" onClick={chat.reset}>
                ↺
              </button>
            </div>
            <div ref={scroller} className="ig-feed">
              {chat.msgs.length === 0 && <p className="ig-empty">{f.hint}</p>}
              <AnimatePresence initial={false}>
                {chat.msgs.map((m) => (
                  <motion.div
                    key={m.id}
                    className="ig-msg"
                    data-from={m.from}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                  >
                    {m.from === 'user' && m.id === 0 && <span className="micro ig-who">@{f.user} · {t.lang === 'tr' ? 'yorum' : 'Kommentar'}</span>}
                    <span className="ig-bubble">
                      {m.text}
                      {m.link && <span className="ig-link">adodesign.ch ↗</span>}
                    </span>
                    {!!m.buttons?.length && (
                      <span className="ig-buttons">
                        {m.buttons.map((x) => (
                          <button type="button" key={x} onClick={() => chat.press(x)}>
                            {x}
                          </button>
                        ))}
                      </span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {chat.typing && (
                <div className="ig-msg" data-from="bot">
                  <span className="ig-bubble ig-typing">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              )}
            </div>
            <div className="ig-chips">
              {f.keywords.map((k) => (
                <button type="button" key={k} onClick={() => chat.comment(k)}>
                  {k}
                </button>
              ))}
            </div>
            <form className="ig-input" onSubmit={submit}>
              <input value={text} onChange={(e) => setText(e.target.value)} placeholder={f.placeholder} aria-label={f.placeholder} />
              <button type="submit" aria-label={f.send}>
                <Send />
              </button>
            </form>
          </div>
        </div>
      ),
    },
    {
      id: 'steps',
      node: (
        <div className="ig-steps-wrap">
          <ol className="ig-steps" data-idle={chat.step < 0}>
            {f.steps.map((x, i) => (
              <li key={x} data-on={chat.step >= i} data-now={chat.step === i} style={{ ['--i' as string]: i }}>
                <button type="button" onClick={() => chat.playTo(i)} aria-label={`${i + 1}. ${x}`}>
                  <span className="ig-dot">{chat.step > i || (chat.step === 3 && i === 3) ? <Check /> : i + 1}</span>
                  <span className="whisper">{x}</span>
                  <Play className="ig-play" />
                </button>
              </li>
            ))}
          </ol>
          <span className="micro ig-steps-hint">{f.stepsHint}</span>
        </div>
      ),
    },
    {
      id: 'hint',
      tone: 'brand',
      node: (
        <div className="ex-span">
          <span className="micro">{f.eyebrow}</span>
          <span className="poster">„{f.keywords[0]}“</span>
          <span className="micro">{f.hint}</span>
        </div>
      ),
    },
  ];

  return <Spread view="i-flow" head={{ folio: '01', kicker: f.eyebrow, line1: f.line1, line2: f.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
