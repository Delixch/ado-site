import { useEffect, useState } from 'react';

/** localStorage ile hatırlanan değer; depolama kapalıysa sessizce bellekte kalır. */
export function useStored<T extends string>(key: string, initial: T, valid: (v: string | null) => boolean) {
  const [value, setValue] = useState<T>(() => {
    try {
      const v = localStorage.getItem(key);
      return valid(v) ? (v as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* yok say */
    }
  }, [key, value]);
  return [value, setValue] as const;
}
