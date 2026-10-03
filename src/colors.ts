import { DEFAULT_COLOR } from './config';
import type { Lang } from './content/ui';

/*
 * src/styles/colors/ içindeki her .css dosyası bir renktir.
 * Dosyalar burada kendiliğinden bulunur; yeni renk = yeni dosya.
 */
import.meta.glob('./styles/colors/*.css', { eager: true });
const sources = import.meta.glob('./styles/colors/*.css', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

export interface ColorDef {
  id: string;
  name: Record<Lang, string>;
}

const pick = (src: string, tag: string, fallback: string) =>
  src.match(new RegExp(String.raw`@${tag}\s+([^*\n]+)`))?.[1].trim() || fallback;

export const COLORS: ColorDef[] = Object.entries(sources)
  .map(([path, src]) => {
    const id = path.split('/').pop()!.replace(/\.css$/, '');
    return { id, name: { tr: pick(src, 'tr', id), de: pick(src, 'de', id) } };
  })
  .sort((a, b) =>
    a.id === DEFAULT_COLOR ? -1 : b.id === DEFAULT_COLOR ? 1 : a.id.localeCompare(b.id),
  );

export const isColor = (id: string | null): id is string => !!id && COLORS.some((c) => c.id === id);
