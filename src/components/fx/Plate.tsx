import { STOCK, type StockName } from '../../content/stock';
import { LiquidImage } from './LiquidImage';

/** Fotoplatte mit Bildnachweis wie im Magazin. */
export function Plate({ name, caption }: { name: StockName; caption?: string }) {
  const s = STOCK[name];
  return (
    <figure className="plate">
      <LiquidImage src={s.src} alt={caption ?? ''} />
      <figcaption className="micro">
        {caption && <b>{caption}</b>}
        <a href={s.link} target="_blank" rel="noreferrer">
          {s.author} / Unsplash
        </a>
      </figcaption>
    </figure>
  );
}
