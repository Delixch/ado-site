import { useEffect, useRef } from 'react';
import { Pause, Play } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useView } from '../ViewFrame';

export type FilmLang = 'de' | 'tr';

/**
 * Stummes Film-Video mit Untertiteln (DE/TR) und separater deutscher Tonspur.
 * Alles laeuft nur auf Knopfdruck; Bedienung sitzt woanders (FilmControls), Zustand kommt von aussen.
 */
export function FilmMedia({ src, audio, subs, playing, lang, onPlaying }: { src: string; audio: string; subs: Record<FilmLang, string>; playing: boolean; lang: FilmLang; onPlaying: (p: boolean) => void }) {
  const [ref, inView] = useInView<HTMLDivElement>('120px');
  const video = useRef<HTMLVideoElement>(null);
  const snd = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (playing) {
      if (!snd.current) snd.current = new Audio(audio);
      snd.current.currentTime = v.currentTime;
      snd.current.play().catch(() => {});
      v.play().catch(() => onPlaying(false));
    } else {
      v.pause();
      snd.current?.pause();
    }
  }, [playing, audio, onPlaying]);

  // ausser Sicht oder Tab im Hintergrund: anhalten
  useEffect(() => {
    if (!inView && playing) onPlaying(false);
  }, [inView, playing, onPlaying]);
  useEffect(() => {
    const onVisibility = () => document.hidden && onPlaying(false);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [onPlaying]);

  // nur die gewaehlte Untertitelspur zeigen
  useEffect(() => {
    const tracks = video.current?.textTracks;
    if (!tracks) return;
    for (let i = 0; i < tracks.length; i++) tracks[i].mode = tracks[i].language === lang ? 'showing' : 'disabled';
  }, [lang, inView]);

  return (
    <div ref={ref} className="media">
      <video
        ref={video}
        src={inView ? `${src}#t=0.6` : undefined}
        muted
        playsInline
        preload={inView ? 'metadata' : 'none'}
        aria-hidden
        onEnded={() => onPlaying(false)}
      >
        {inView && (
          <>
            <track kind="subtitles" srcLang="de" label="Deutsch" src={subs.de} />
            <track kind="subtitles" srcLang="tr" label="Türkçe" src={subs.tr} />
          </>
        )}
      </video>
    </div>
  );
}

/** Kleine Bedienung: Play/Pause + Untertitelsprache. */
export function FilmControls({ playing, lang, onToggle, onLang }: { playing: boolean; lang: FilmLang; onToggle: () => void; onLang: (l: FilmLang) => void }) {
  const { t } = useView();
  return (
    <div className="film-controls">
      <button type="button" className="media-play" onClick={onToggle} aria-pressed={playing} aria-label={playing ? t.ui.pause : t.ui.play}>
        {playing ? <Pause /> : <Play />}
      </button>
      <div className="film-lang" role="group" aria-label="Untertitel">
        {(['de', 'tr'] as const).map((l) => (
          <button key={l} type="button" aria-pressed={lang === l} onClick={() => onLang(l)}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
