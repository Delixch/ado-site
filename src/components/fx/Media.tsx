import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useView } from '../ViewFrame';

/**
 * Bild oder Video. Videos stehen still (erstes Bild) und laufen erst auf Knopfdruck;
 * ausser Sicht halten sie wieder an.
 */
/** `subs`: stummes Video mit Untertiteln (VTT je Sprache); kleines Bedienfeld oben: Play + DE/TR. */
/** `fallback`: Ersatzvideo, falls `src` (noch) nicht existiert - z. B. Themenvideo noch nicht gerendert. */
export function Media({ src, className = '', alt = '', sound = false, fallback, poster, subs }: { src: string; className?: string; alt?: string; sound?: boolean; fallback?: string; poster?: string; subs?: { de: string; tr: string } }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  const file = failed && fallback ? fallback : src;
  const isVideo = /\.(mp4|webm)$/i.test(file);
  const [ref, inView] = useInView<HTMLDivElement>('120px');
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const { t } = useView();
  const [subLang, setSubLang] = useState<'de' | 'tr'>(t.lang === 'tr' ? 'tr' : 'de');

  // nur die gewaehlte Untertitelspur zeigen
  useEffect(() => {
    const tracks = video.current?.textTracks;
    if (!tracks) return;
    for (let i = 0; i < tracks.length; i++) tracks[i].mode = tracks[i].language === subLang ? 'showing' : 'disabled';
  }, [subLang, inView, file]);

  useEffect(() => {
    if (!inView && playing) {
      video.current?.pause();
      setPlaying(false);
    }
  }, [inView, playing]);

  // Sekme arka plana geçtiğinde videoyu duraklat ve pil tasarrufu sağla
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && playing) {
        video.current?.pause();
        setPlaying(false);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [playing]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div ref={ref} className={`media ${className}`}>
      {isVideo ? (
        <>
          <video
            ref={video}
            key={file}
            src={inView ? `${file}#t=0.6` : undefined}
            data-src={`${file}#t=0.6`}
            onError={() => setFailed(true)}
            poster={poster}
            muted={!sound || !!subs}
            loop={!sound}
            playsInline
            preload={inView ? 'metadata' : 'none'}
            aria-hidden={!sound}
            onEnded={() => setPlaying(false)}
          >
            {subs && inView && (
              <>
                <track kind="subtitles" srcLang="de" label="Deutsch" src={subs.de} />
                <track kind="subtitles" srcLang="tr" label="Türkçe" src={subs.tr} />
              </>
            )}
          </video>
          {subs ? (
            <div className="media-box">
              <button type="button" className="media-play" onClick={toggle} aria-pressed={playing} aria-label={playing ? t.ui.pause : t.ui.play}>
                {playing ? <Pause /> : <Play />}
              </button>
              <div className="media-lang" role="group" aria-label="Untertitel">
                {(['de', 'tr'] as const).map((l) => (
                  <button key={l} type="button" aria-pressed={subLang === l} onClick={() => setSubLang(l)}>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button type="button" className="media-play" onClick={toggle} aria-pressed={playing} aria-label={playing ? t.ui.pause : t.ui.play}>
              {playing ? <Pause /> : <Play />}
            </button>
          )}
        </>
      ) : (
        <img src={file} alt={alt} loading="lazy" decoding="async" />
      )}
    </div>
  );
}
