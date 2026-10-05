import { PROJECTS, REPOS, SKILL_ITEMS } from './design-data';
import { firmaFlow } from './firma-flow';
import type { Texts } from './ui';

/** Alle lesbaren Texte einer Ansicht (Blaetter eines Textobjekts). */
const leaves = (v: unknown, out: string[] = []): string[] => {
  if (typeof v === 'string') out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => leaves(x, out));
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => leaves(x, out));
  return out;
};

export interface SearchHit {
  id: string;
  snippet: [string, string, string];
  count: number;
}

/** Suchindex: jede Ansicht mit allen Texten, die auf ihr stehen. */
export function buildIndex(t: Texts) {
  const d = t.d;
  const f = t.f;
  const extra = {
    'd-work': PROJECTS.map((p) => `${p.title} ${p.tech.join(' ')}`),
    'd-skills': SKILL_ITEMS.flat(),
    'd-repos': REPOS.map((r) => r.title),
  } as Record<string, string[]>;
  const src: Record<string, unknown> = {
    'd-start': d.hero,
    'd-about': d.about,
    'd-work': d.projects,
    'd-skills': d.skills,
    'd-repos': d.repos,
    'd-construction': d.construction,
    'd-experience': d.experience,
    'd-contact': d.contact,
    'f-start': f.hero,
    'f-flow': [f.nav, firmaFlow[t.lang].areas],
    'f-contact': f.contact,
    'i-start': [t.i.start, t.i.security],
    'i-flow': [t.i.flow, t.i.features, t.i.process, t.i.pricing],
  };
  return Object.entries(src).map(([id, v]) => ({ id, texts: [t.menu[id], ...leaves(v), ...(extra[id] ?? [])] }));
}

const RADIUS = 38;

/**
 * Ein Zeichen auf seine Grundform bringen, Laenge bleibt 1:1 (Positionen im Original bleiben gueltig):
 * Gross -> klein, Akzente weg (ü->u, ş->s, İ/ı->i), Bindestrich -> Leerzeichen. So findet "zurich" auch "Zürich",
 * "iletisim" auch "İletişim" und "web app" auch "Web-App".
 */
const foldChar = (c: string): string => {
  if (c === 'İ' || c === 'ı') return 'i';
  if (c === 'ß') return 's';
  if (c === '-' || c === '–' || c === '/') return ' ';
  const base = c.normalize('NFD').replace(/[̀-ͯ]/g, '');
  return (base.length === 1 ? base : c).toLocaleLowerCase('en');
};
const fold = (s: string): string => Array.from(s, foldChar).join('');

const isWordChar = (c: string | undefined) => !!c && /[\p{L}\p{N}]/u.test(c);

/**
 * Treffer je Ansicht mit kurzem Ausschnitt um die erste Fundstelle.
 * Mehrere Suchwoerter: alle muessen im selben Text vorkommen. Treffer am Wortanfang zaehlen doppelt,
 * damit "ai" zuerst die KI-Seiten bringt und nicht "mail"/"detail".
 */
export function searchSite(index: ReturnType<typeof buildIndex>, query: string): SearchHit[] {
  const words = fold(query).trim().split(/\s+/).filter((w) => w.length >= 2);
  if (words.length === 0) return [];
  const [first, ...rest] = words;
  const hits: (SearchHit & { score: number })[] = [];
  for (const { id, texts } of index) {
    let snippet: SearchHit['snippet'] | null = null;
    let count = 0;
    let score = 0;
    for (const text of texts) {
      if (text.length !== fold(text).length) continue;
      const f = fold(text);
      const at = f.indexOf(first);
      if (at < 0 || !rest.every((w) => f.includes(w))) continue;
      count += 1;
      score += isWordChar(f[at - 1]) ? 1 : 2;
      if (!snippet) {
        const start = Math.max(0, at - RADIUS);
        const end = Math.min(text.length, at + first.length + RADIUS);
        snippet = [
          (start > 0 ? '…' : '') + text.slice(start, at),
          text.slice(at, at + first.length),
          text.slice(at + first.length, end) + (end < text.length ? '…' : ''),
        ];
      }
    }
    if (snippet) hits.push({ id, snippet, count, score });
  }
  return hits.sort((a, b) => b.score - a.score || b.count - a.count).map(({ id, snippet, count }) => ({ id, snippet, count }));
}
