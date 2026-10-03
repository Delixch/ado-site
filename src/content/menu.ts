import {
  Building2,
  Briefcase,
  FolderGit2,
  Hammer,
  Home,
  LayoutGrid,
  Mail,
  MessageSquare,
  Sparkles,
  User,
  Instagram,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

export type Group = 'design' | 'firma' | 'insta';

export interface MenuItemDef {
  id: string;
  icon: LucideIcon;
  badge?: number | string;
}

/** Menü: önce portfolyo (ADO Design), altında firmanın menüleri (ADO Firma). */
export const MENU_SECTIONS: { group: Group; items: MenuItemDef[] }[] = [
  {
    group: 'design',
    items: [
      { id: 'd-start', icon: Home },
      { id: 'd-about', icon: User },
      { id: 'd-work', icon: Briefcase, badge: 15 },
      { id: 'd-skills', icon: Sparkles },
      { id: 'd-repos', icon: FolderGit2, badge: 7 },
      { id: 'd-construction', icon: Hammer },
      { id: 'd-experience', icon: Building2 },
      { id: 'd-contact', icon: Mail },
    ],
  },
  {
    group: 'firma',
    items: [
      { id: 'f-start', icon: LayoutGrid },
      { id: 'f-flow', icon: Workflow },
      { id: 'f-contact', icon: MessageSquare },
    ],
  },
  {
    group: 'insta',
    items: [
      { id: 'i-start', icon: Instagram },
      { id: 'i-flow', icon: Workflow },
    ],
  },
];

export const ALL_ITEMS = MENU_SECTIONS.flatMap((s) => s.items.map((item) => ({ ...item, group: s.group })));
