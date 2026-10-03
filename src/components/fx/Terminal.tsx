import { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';

export interface TermLine {
  cmd: string;
  out?: string;
}

/** Tippt Befehle Zeichen fuer Zeichen, zeigt die Antwort, beginnt dann von vorn. */
export function Terminal({ lines, title = 'zsh' }: { lines: TermLine[]; title?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [step, setStep] = useState({ line: 0, chars: 0 });

  useEffect(() => {
    if (!inView) return;
    const cur = lines[step.line];
    const typing = step.chars < cur.cmd.length;
    const id = window.setTimeout(
      () => {
        if (typing) setStep((s) => ({ ...s, chars: s.chars + 1 }));
        else setStep((s) => ({ line: (s.line + 1) % lines.length, chars: 0 }));
      },
      typing ? 45 + Math.random() * 60 : step.line === lines.length - 1 ? 3200 : 900,
    );
    return () => window.clearTimeout(id);
  }, [inView, step, lines]);

  const done = lines.slice(0, step.line);
  const cur = lines[step.line];
  return (
    <div ref={ref} className="term">
      <div className="term-bar">
        <i />
        <i />
        <i />
        <span>{title}</span>
      </div>
      <div className="term-body" aria-live="off">
        {done.map((l, i) => (
          <p key={i}>
            <span className="term-p">$</span> {l.cmd}
            {l.out && <span className="term-out">{l.out}</span>}
          </p>
        ))}
        <p>
          <span className="term-p">$</span> {cur.cmd.slice(0, step.chars)}
          <span className="term-caret" />
        </p>
      </div>
    </div>
  );
}
