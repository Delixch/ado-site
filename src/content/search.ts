import { PROJECTS, REPOS, SKILL_ITEMS } from './design-data';
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
    'f-orders': f.about,
    'f-planning': f.projects,
    'f-accounting': f.skills,
    'f-reports': f.repos,
    'f-homepage': f.construction,
    'f-personnel': f.experience,
    'f-contact': f.contact,
  };
  return Object.entries(src).map(([id, v]) => ({ id, texts: [t.menu[id], ...leaves(v), ...(extra[id] ?? [])] }));
}

const RADIUS = 38;

/** Treffer je Ansicht mit kurzem Ausschnitt um die erste Fundstelle. */
export function searchSite(index: ReturnType<typeof buildIndex>, query: string): SearchHit[] {
  const q = query.trim().toLocaleLowerCase();
  if (q.length < 2) return [];
  const hits: SearchHit[] = [];
  for (const { id, texts } of index) {
    let first: SearchHit['snippet'] | null = null;
    let count = 0;
    for (const text of texts) {
      const at = text.toLocaleLowerCase().indexOf(q);
      if (at < 0) continue;
      count += 1;
      if (!first) {
        const start = Math.max(0, at - RADIUS);
        const end = Math.min(text.length, at + q.length + RADIUS);
        first = [(start > 0 ? '…' : '') + text.slice(start, at), text.slice(at, at + q.length), text.slice(at + q.length, end) + (end < text.length ? '…' : '')];
      }
    }
    if (first) hits.push({ id, snippet: first, count });
  }
  return hits.sort((a, b) => b.count - a.count);
}
