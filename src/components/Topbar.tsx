import { Menu, Pause, Play, Shuffle } from 'lucide-react';
import type { Group } from '../content/menu';
import type { Lang, Texts } from '../content/ui';
import { ColorPicker } from './ColorPicker';

interface Props {
  t: Texts;
  lang: Lang;
  setLang: (l: Lang) => void;
  color: string;
  setColor: (c: string) => void;
  title: string;
  group: Group;
  auto: boolean;
  setAuto: (v: boolean) => void;
  onShuffle: () => void;
  onMenu?: () => void;
}

const LANGS: Lang[] = ['de', 'tr'];

export function Topbar({ t, lang, setLang, color, setColor, title, group, auto, setAuto, onShuffle, onMenu }: Props) {
  return (
    <header className="tb">
      <div className="tb-left">
        {onMenu && (
          <button type="button" className="tb-icon" onClick={onMenu} aria-label={t.ui.openMenu}>
            <Menu />
          </button>
        )}
        <div className="tb-brand-badge" data-group={group} title={t.ui.groups[group].title}>
          <span className="tb-group-dot" aria-hidden />
          <span className="tb-logo">
            {{ design: 'EKADO DESIGN', firma: 'EKADO FIRMA', insta: 'EKADO INSTAOTO' }[group]}
            <span className="tb-caret" aria-hidden>
              █
            </span>
          </span>
          <span className="tb-group-tag">{t.ui.groups[group].short}</span>
        </div>
        <span className="tb-sep" />
        <span className="tb-title">{title}</span>
      </div>

      <div className="tb-right">
        <button type="button" className="tb-icon tb-auto" onClick={() => setAuto(!auto)} aria-pressed={auto} title={t.ui.shuffleAuto} aria-label={t.ui.shuffleAuto}>
          {auto ? <Pause /> : <Play />}
        </button>
        <button type="button" className="tb-icon" onClick={onShuffle} title={t.ui.shuffleNow} aria-label={t.ui.shuffleNow}>
          <Shuffle />
        </button>
        <ColorPicker value={color} onChange={setColor} lang={lang} label={t.ui.color} />
        <div className="seg" role="group" aria-label="Sprache / Dil">
          {LANGS.map((l) => (
            <button type="button" key={l} aria-pressed={lang === l} onClick={() => setLang(l)} lang={l}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
