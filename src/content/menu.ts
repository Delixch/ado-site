import {
  Building2,
  Briefcase,
  CalendarDays,
  FolderGit2,
  FolderOpen,
  Globe,
  Hammer,
  Home,
  Landmark,
  LayoutGrid,
  Mail,
  MessageSquare,
  Package,
  Receipt,
  Sparkles,
  User,
  Instagram,
  Workflow,
  ShieldCheck,
  BadgePercent,
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
      { id: 'f-orders', icon: Package },
      { id: 'f-planning', icon: CalendarDays },
      { id: 'f-accounting', icon: Receipt },
      { id: 'f-reports', icon: Landmark },
      { id: 'f-homepage', icon: Globe },
      { id: 'f-personnel', icon: FolderOpen },
      { id: 'f-contact', icon: MessageSquare },
    ],
  },
  {
    group: 'insta',
    items: [
      { id: 'i-start', icon: Instagram },
      { id: 'i-flow', icon: Workflow },
      { id: 'i-security', icon: ShieldCheck },
      { id: 'i-pricing', icon: BadgePercent },
    ],
  },
];

export const ALL_ITEMS = MENU_SECTIONS.flatMap((s) => s.items.map((item) => ({ ...item, group: s.group })));
