import { useEffect, useRef } from 'react';
import { COMPANY } from '../content/company';
import { legalTexts } from '../content/legal-texts';
import { STOCK } from '../content/stock';
import type { Lang } from '../content/ui';

export type LegalDoc = 'impressum' | 'privacy';

type Part = { text: string; missing?: boolean };

/** Ersetzt {name} usw.; fehlt ein Wert, kommt der Musterwert markiert. */
function fill(line: string, lang: Lang): Part[] | null {
  const L = legalTexts[lang];
  if (line.includes('{uid}') && !COMPANY.uid) return null;
  const values: Record<string, Part> = {
    name: COMPANY.name ? { text: COMPANY.name } : { text: L.placeholders.name, missing: true },
    street: COMPANY.street ? { text: COMPANY.street } : { text: L.placeholders.street, missing: true },
    zipCity: COMPANY.zipCity ? { text: COMPANY.zipCity } : { text: L.placeholders.zipCity, missing: true },
    person: { text: COMPANY.person },
    country: { text: L.country },
    email: { text: COMPANY.email },
    uid: { text: COMPANY.uid },
  };
  return line.split(/(\{\w+\})/).map((bit) => {
    const key = bit.match(/^\{(\w+)\}$/)?.[1];
    return key && values[key] ? values[key] : { text: bit };
  });
}

export function LegalDialog({
  doc,
  lang,
  onOpen,
  onClose,
}: {
  doc: LegalDoc | null;
  lang: Lang;
  onOpen: (d: LegalDoc) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const L = legalTexts[lang];

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (doc && !d.open) d.showModal();
    if (!doc && d.open) d.close();
    if (doc) d.querySelector('.legal-body')?.scrollTo({ top: 0 });
  }, [doc]);

  const sections = doc === 'privacy' ? L.privacySections : L.impressumSections;
  const credits = [...new Map(Object.values(STOCK).map((s) => [s.author, s.link])).entries()];

  return (
    <dialog
      ref={ref}
      className="legal"
      aria-labelledby="legal-title"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="legal-card">
        <header className="legal-head">
          <nav className="legal-tabs">
            {(['impressum', 'privacy'] as const).map((k) => (
              <button key={k} type="button" data-on={doc === k} onClick={() => onOpen(k)}>
                {k === 'impressum' ? L.impressum : L.privacy}
              </button>
            ))}
          </nav>
          <button type="button" className="legal-close" onClick={onClose}>
            {L.close} <span aria-hidden>✕</span>
          </button>
        </header>
        <div className="legal-body">
          <h2 id="legal-title">{doc === 'privacy' ? L.privacyTitle : L.impressumTitle}</h2>
          {doc === 'privacy' && <p className="legal-meta">{L.privacyUpdated}</p>}
          {L.bindingNote && <p className="legal-meta">{L.bindingNote}</p>}
          {sections.map((sec) => (
            <section key={sec.heading}>
              <h3>{sec.heading}</h3>
              {sec.lines.map((line, i) => {
                const parts = fill(line, lang);
                if (!parts) return null;
                return (
                  <p key={i}>
                    {parts.map((p, j) =>
                      p.missing ? (
                        <mark key={j} className="legal-missing">
                          {p.text}
                        </mark>
                      ) : (
                        <span key={j}>{p.text}</span>
                      ),
                    )}
                  </p>
                );
              })}
            </section>
          ))}
          {doc === 'impressum' && (
            <section>
              <h3>{L.credits}</h3>
              <p className="legal-credits">
                {credits.map(([author, link], i) => (
                  <span key={author}>
                    {i > 0 && ' · '}
                    <a href={link} target="_blank" rel="noreferrer">
                      {author}
                    </a>
                  </span>
                ))}
              </p>
            </section>
          )}
        </div>
      </div>
    </dialog>
  );
}
