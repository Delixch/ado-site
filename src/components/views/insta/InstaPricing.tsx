import { useState } from 'react';
import { Check } from 'lucide-react';
import { IntroCall } from '../../common/IntroCall';
import { LetterDesk } from '../../common/Letter';
import { TrustBadges } from '../../common/TrustBadges';
import { Spread, type Block, type LayoutDef } from '../../spread/Spread';
import { useView } from '../../ViewFrame';

const LAYOUTS: LayoutDef[] = [
  { name: 'Packs', cols: '1fr 1fr 1fr', areas: ['packs packs offer', 'check check terms', 'desk desk desk'], rows: 'auto auto auto' },
  { name: 'Check', cols: '1fr 1fr 1fr', areas: ['offer check check', 'terms packs packs', 'desk desk desk'], rows: 'auto auto auto' },
  { name: 'Letter', cols: '1fr 1fr 1fr', areas: ['desk desk offer', 'packs packs packs', 'check check terms'], rows: 'auto auto auto' },
];

/** Fortschrittsring: wie viel von "Ihre Konten" schon bereit ist. */
function Ring({ done, total }: { done: number; total: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg className="ck-ring" viewBox="0 0 64 64" aria-hidden>
      <circle cx="32" cy="32" r={r} className="ck-ring-bg" />
      <circle cx="32" cy="32" r={r} className="ck-ring-fg" strokeDasharray={c} strokeDashoffset={c * (1 - done / total)} />
      <text x="32" y="36" textAnchor="middle" className="ck-ring-txt">
        {done}/{total}
      </text>
    </svg>
  );
}

export function InstaPricing() {
  const { t } = useView();
  const p = t.i.pricing;
  const own = p.checkGroups[0].items.length;
  const [ready, setReady] = useState<boolean[]>(() => Array(own).fill(false));
  const done = ready.filter(Boolean).length;
  const reco = done === own ? 'Start' : 'Komplett';
  const toggle = (i: number) => setReady((r) => r.map((x, k) => (k === i ? !x : x)));

  const blocks: Block[] = [
    { id: 'desk', tone: 'deep', node: <LetterDesk labels={p.form} to="ADO InstaOto" /> },
    {
      id: 'offer',
      tone: 'brand',
      node: (
        <div className="ex-detail">
          <span className="micro">{p.eyebrow}</span>
          <h3 className="poster">{p.line1} {p.line2}</h3>
          <p className="lede">{p.lede}</p>
          <IntroCall contact="i-pricing" here />
          <TrustBadges product="insta" />
        </div>
      ),
    },
    {
      id: 'packs',
      node: (
        <div className="pk">
          <span className="micro">
            <b>{p.packsTitle}</b>
          </span>
          <div className="pk-row">
            {p.packs.map((x) => (
              <article key={x.name} className="pk-card" data-reco={x.name === reco}>
                <div className="pk-ring">
                  <span className="pk-cur micro">{p.currency}</span>
                  <span className="pk-price poster">{x.price}.–</span>
                  <span className="pk-unit micro">{x.unit}</span>
                </div>
                <div className="pk-body">
                  <h4 className="whisper">
                    {x.name}
                    {x.name === reco && <span className="pk-tag micro">{p.recommended}</span>}
                  </h4>
                  <p className="pk-for">{x.for}</p>
                  <ul className="pk-incl">
                    {x.incl.map((y) => (
                      <li key={y}>{y}</li>
                    ))}
                  </ul>
                  <IntroCall contact="i-pricing" here topic={`InstaOto · ${x.name} (${p.currency} ${x.price}.–)`} className="e-link pk-choose">
                    {p.choose} →
                  </IntroCall>
                </div>
              </article>
            ))}
          </div>
          <div className="pk-care">
            <span className="micro">
              <b>{p.careTitle}</b>
            </span>
            <div className="pk-care-row">
              {p.care.map((c) => (
                <div key={c.name} className="pk-care-item">
                  <span className="pk-dot">
                    <b>{c.price}</b>
                    <i className="micro">{c.unit}</i>
                  </span>
                  <span>
                    <span className="whisper">{c.name}</span>
                    <span className="in-sub">{c.d}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="pk-hourly micro">{p.hourly}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'check',
      tone: 'deep',
      node: (
        <div className="ck">
          <div className="ck-head">
            <span className="micro">
              <b>{p.checkTitle}</b> · {p.checkHint}
            </span>
            <span className="ck-verdict" data-all={done === own}>
              <Ring done={done} total={own} />
              <span className="whisper">{done === own ? p.readyAll : p.readySome}</span>
            </span>
          </div>
          <div className="ck-groups">
            {p.checkGroups.map((g, gi) => (
              <section key={g.t} className="ck-group" data-own={g.own}>
                <h4 className="micro">{g.t}</h4>
                <ol>
                  {g.items.map((it, i) => {
                    const on = g.own && ready[i];
                    const n = p.checkGroups.slice(0, gi).reduce((a, x) => a + x.items.length, 0) + i + 1;
                    const inner = (
                      <>
                        <span className="ck-dot" data-on={on}>
                          {on ? <Check /> : n}
                        </span>
                        <span>
                          <span className="ck-t">{it.t}</span>
                          {it.d && <span className="in-sub">{it.d}</span>}
                        </span>
                      </>
                    );
                    return (
                      <li key={it.t}>
                        {g.own ? (
                          <button type="button" className="ck-item" aria-pressed={on} onClick={() => toggle(i)}>
                            {inner}
                          </button>
                        ) : (
                          <span className="ck-item">{inner}</span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </section>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'terms',
      node: (
        <div className="in-need">
          <ul>
            {p.terms.map((x) => (
              <li key={x.t}>
                <span className="in-check">
                  <Check />
                </span>
                <span>
                  <span className="whisper">{x.t}</span>
                  <span className="in-sub">{x.d}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="in-terms-note micro">{p.hostingNote}</p>
        </div>
      ),
    },
  ];

  return <Spread view="i-pricing" head={{ folio: '05', kicker: p.eyebrow, line1: p.line1, line2: p.line2 }} blocks={blocks} layouts={LAYOUTS} />;
}
