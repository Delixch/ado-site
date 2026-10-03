import { useState } from 'react';
import { useView } from '../../ViewFrame';

export type ShotName = 'uebersicht' | 'akislar' | 'editor' | 'simulator' | 'inbox' | 'posts';

/**
 * Bildschirmfoto des echten Panels (instagramoto) in einem Browserfenster.
 * Deutsch: de-<name>.webp, sobald das Panel uebersetzt ist; bis dahin die tuerkische Aufnahme.
 */
export function Shot({ name, url = 'instagramoto.vercel.app/panel' }: { name: ShotName; url?: string }) {
  const { t } = useView();
  const [fallback, setFallback] = useState(false);
  const src = `/media/insta/${t.lang === 'de' && !fallback ? 'de' : 'tr'}-${name}.webp`;
  return (
    <figure className="shot">
      <div className="shot-bar">
        <i />
        <i />
        <i />
        <span>{url}</span>
      </div>
      <img key={src} src={src} alt="" loading="lazy" onError={() => setFallback(true)} />
    </figure>
  );
}
