import { createContext, useContext } from 'react';
import type { Texts } from '../content/ui';

export interface ViewCtx {
  t: Texts;
  color: string;
  auto: boolean;
  nonce: number;
  go: (id: string) => void;
  /** Handy: alle Seiten stehen untereinander (eine lange Seite). */
  stacked: boolean;
}

export const ViewContext = createContext<ViewCtx | null>(null);

/** Id der Seite, in der ein Baustein steht (fuer Ereignisse, die nur diese Seite betreffen). */
export const PageContext = createContext('');
export const usePage = () => useContext(PageContext);

export const useView = () => {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error('ViewContext fehlt');
  return ctx;
};
