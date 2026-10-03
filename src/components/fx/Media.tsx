import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useView } from '../ViewFrame';

/**
 * Bild oder Video. Videos stehen still (erstes Bild) und laufen erst auf Knopfdruck;
 * ausser Sicht halten sie wieder an.
 */
/** `fallback`: Ersatzvideo, falls `src` (noch) nicht existiert - z. B. Themenvideo noch nicht gerendert. */
export function Media({ src, className = '', alt = '', sound = false, fallback, poster }: { src: string; className?: string; alt?: string; sound?: boolean; fallback?: string; poster?: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  const file = failed && fallback ? fallback : src;
  const isVideo = /\.(mp4|webm)$/i.test(file);
  const [ref, inView] = useInView<HTMLDivElement>('120px');
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const { t } = useView();

  useEffect(() => {
    if (!inView && playing) {
      video.current?.pause();
      setPlaying(false);
    }
  }, [inView, playing]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {});
    else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div ref={ref} className={`media ${className}`}>
      {isVideo ? (
        <>
          <video ref={video} key={file} src={`${file}#t=0.6`} onError={() => setFailed(true)} poster={poster} muted={!sound} loop={!sound} playsInline preload="metadata" aria-hidden={!sound} onEnded={() => setPlaying(false)} />
          <button type="button" className="media-play" onClick={toggle} aria-pressed={playing} aria-label={playing ? t.ui.pause : t.ui.play}>
            {playing ? <Pause /> : <Play />}
          </button>
        </>
      ) : (
        <img src={file} alt={alt} loading="lazy" decoding="async" />
      )}
    </div>
  );
}
