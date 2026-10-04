import { DEFAULT_COLOR } from './config';
import type { Lang } from './content/ui';

/*
 * src/styles/colors/ içindeki her .css dosyası bir renktir.
 * Dosyalar burada kendiliğinden bulunur; yeni renk = yeni dosya.
 */
import.meta.glob('./styles/colors/*.css', { eager: true });
// Namen kommen aus vite.config.ts (colorNames), nicht als Text im Bundle
import colorList from 'virtual:color-names';

export interface ColorDef {
  id: string;
  name: Record<Lang, string>;
}

export const COLORS: ColorDef[] = (colorList as ColorDef[])
  .slice()
  .sort((a, b) =>
    a.id === DEFAULT_COLOR ? -1 : b.id === DEFAULT_COLOR ? 1 : a.id.localeCompare(b.id),
  );

export const isColor = (id: string | null): id is string => !!id && COLORS.some((c) => c.id === id);
