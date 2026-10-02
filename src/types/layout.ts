export interface GridBlock {
  area: string;
  name: string;
  color: string;
  textColor: string;
  borderColor: string;
  accentBg: string;
  description: string;
  iconName: string;
}

export interface GridLayout {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  cols: string;
  rows: string;
  gap: string;
  placeItems: 'stretch' | 'center' | 'start' | 'end';
  areas: string[];
  tailwindCols: string;
  tailwindRows: string;
  blocks: any[];
}

export type DisplayMode = 'colored-blocks' | 'rich-ui' | 'blocks' | 'rich';
export type ViewTab = 'canvas' | 'wireframe' | 'builder' | 'cheatsheet' | 'export';

export interface LayoutBlockConfig {
  area: string;
  name: string;
  cardStyle: string;
  badgeColor?: string;
}

export interface WebPageSection {
  id: string;
  title: string;
  categoryBadge: string;
  cols: string;
  rows: string;
  areas: string[];
}

export const APP_PAGES: Record<string, WebPageSection> = {
  home: {
    id: 'home',
    title: 'Startseite · Über mich',
    categoryBadge: 'Zürich · Web-Entwickler',
    cols: '1.2fr 3.2fr 1.6fr',
    rows: '1fr 60px',
    areas: [
      '"nav    main   aside"',
      '"footer footer footer"'
    ]
  },
  projekte: {
    id: 'projekte',
    title: 'Projekte · Arbeiten',
    categoryBadge: 'Portfolio',
    cols: '1fr 1fr',
    rows: '1fr 1fr',
    areas: [
      '"proj1 proj2"',
      '"proj3 proj4"'
    ]
  },
  skills: {
    id: 'skills',
    title: 'Skills & Leistungen',
    categoryBadge: 'Kernkompetenzen',
    cols: '1fr 1fr',
    rows: '1fr 1fr',
    areas: [
      '"skill1 skill2"',
      '"skill3 skill4"'
    ]
  },
  erfahrung: {
    id: 'erfahrung',
    title: 'Erfahrung & Werdegang',
    categoryBadge: 'Timeline',
    cols: '2.5fr 1.5fr',
    rows: '1fr 60px',
    areas: [
      '"timeline details"',
      '"footer   footer"'
    ]
  },
  lab: {
    id: 'lab',
    title: '3D WebGL & AI Lab',
    categoryBadge: 'Inspiration',
    cols: '2.8fr 1.2fr',
    rows: '1fr 60px',
    areas: [
      '"canvas controls"',
      '"footer footer"'
    ]
  }
};
