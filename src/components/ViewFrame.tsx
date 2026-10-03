import { createContext, useContext } from 'react';
import type { Texts } from '../content/ui';

export interface ViewCtx {
  t: Texts;
  color: string;
  auto: boolean;
  nonce: number;
  go: (id: string) => void;
}

export const ViewContext = createContext<ViewCtx | null>(null);

export const useView = () => {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error('ViewContext fehlt');
  return ctx;
};
