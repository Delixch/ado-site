import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Building2, Camera, ChevronDown, ChevronLeft, ChevronRight, MessageCircleHeart, PenTool, Search } from 'lucide-react';
import { ALL_ITEMS, MENU_SECTIONS, type MenuItemDef } from '../content/menu';
import { buildIndex, searchSite } from '../content/search';
import type { Texts } from '../content/ui';
import { getStoredAvatar, setStoredAvatar } from '../avatar';
import { RAIL_STYLE, RAIL_WIDTH } from '../config';

const railParam = new URLSearchParams(window.location.search).get('rail');
const RAIL = railParam && /^[1-3]$/.test(railParam) ? railParam : RAIL_STYLE;

interface SleekSidebarProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  activeTab: string;
  onSelect: (item: MenuItemDef) => void;
  t: Texts;
  expandedWidth?: number;
  /** Hauptgruppen als Aufklappmenue. */
  collapsible?: boolean;
  /** Anfangs offene Gruppen (Desktop: Portfolio). Die Gruppe der aktiven Seite oeffnet sich immer. */
  openByDefault?: string[];
  /** Zusatz unter dem Menue (mobil: Lichtband-Auswahl). */
  footer?: React.ReactNode;
}

export const SleekSidebar: React.FC<SleekSidebarProps> = ({
  isExpanded,
  setIsExpanded,
  activeTab,
  onSelect,
  t,
  expandedWidth = 275,
  collapsible = false,
  openByDefault = [],
  footer,
}) => {
  const [openGroups, setOpenGroups] = useState<string[]>(openByDefault);
  const activeGroup = MENU_SECTIONS.find((sec) => sec.items.some((it) => it.id === activeTab))?.group;
  useEffect(() => {
    // Seitenwechsel in eine andere Gruppe: nur deren Gruppe bleibt offen (auch Portfolio schliesst).
    if (activeGroup) setOpenGroups([activeGroup]);
  }, [activeGroup]);
  const accordion = collapsible && isExpanded;
  // Immer nur eine Gruppe offen - eingeklappt und ausgeklappt derselbe Zustand.
  const toggleGroup = (g: string) => setOpenGroups((o) => (o.includes(g) ? [] : [g]));
  const [avatarUrl, setAvatarUrl] = useState<string>(getStoredAvatar);
  const [imgLoadFailed, setImgLoadFailed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setStoredAvatar(dataUrl);
        setAvatarUrl(dataUrl);
        setImgLoadFailed(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const query = searchQuery.trim().toLocaleLowerCase();
  const index = useMemo(() => buildIndex(t), [t]);
  const hits = useMemo(() => searchSite(index, searchQuery), [index, searchQuery]);
  const sections = MENU_SECTIONS.map((s) => ({
    ...s,
    items: query ? s.items.filter((i) => t.menu[i.id].toLocaleLowerCase().includes(query)) : s.items,
  })).filter((s) => s.items.length > 0);

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isExpanded ? expandedWidth : RAIL_WIDTH,
        transition: { type: 'spring', stiffness: 350, damping: 30 },
      }}
      className="sb"
      data-expanded={isExpanded}
      data-rail={RAIL}
      aria-label="Navigation"
    >
      <span className="sb-orbit" aria-hidden />
      {/* 1. Üst kontrol başlığı */}
      {isExpanded ? (
        <div className="sb-head">
          <div className="sb-brand">
            <span className="sb-wordmark">
              ADO DESIGN
              <span className="tb-caret" aria-hidden>
                █
              </span>
            </span>
          </div>
          <button type="button" onClick={() => setIsExpanded(false)} title={t.ui.collapse} className="sb-collapse">
            <span>{t.ui.collapse}</span>
            <ChevronLeft className="sb-collapse-icon" />
          </button>
        </div>
      ) : (
        <div className="sb-head is-collapsed">
          <button type="button" onClick={() => setIsExpanded(true)} title={t.ui.expand} aria-label={t.ui.expand} className="sb-expand">
            <ChevronRight />
          </button>
        </div>
      )}

      {/* 2. Profil kartı */}
      <div className="sb-profile">
        <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" hidden />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="sb-avatar"
          title={t.ui.changePhoto}
          aria-label={t.ui.changePhoto}
        >
          {!imgLoadFailed ? (
            <img src={avatarUrl} alt="" onError={() => setImgLoadFailed(true)} />
          ) : (
            <span className="sb-avatar-initials">ADO</span>
          )}
          <span className="sb-avatar-hover">
            <Camera />
          </span>
          <span className="sb-avatar-status" />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="sb-profile-text"
            >
              <div>
                <span className="sb-profile-name">ADOdesign</span>
                <button type="button" className="sb-profile-sub" onClick={() => fileInputRef.current?.click()}>
                  <Camera /> {t.ui.changePhoto}
                </button>
              </div>
              <span className="sb-badge-place">{t.ui.location}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Arama */}
      <div className="sb-search-wrap">
        {isExpanded ? (
          <motion.label initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="sb-search">
            <Search />
            <input
              type="search"
              placeholder={t.ui.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={t.ui.search}
            />
          </motion.label>
        ) : (
          <button type="button" onClick={() => setIsExpanded(true)} className="sb-search-btn" title={t.ui.search} aria-label={t.ui.search}>
            <Search />
          </button>
        )}
      </div>

      {/* 4. Menü: önce portfolyo, altında firma */}
      <nav className="sb-nav">
        {sections.length === 0 && hits.length === 0 && <div className="sb-empty">{t.ui.noResults}</div>}
        {isExpanded && hits.length > 0 && (
          <div className="sb-section sb-hits">
            <div className="sb-section-title">{t.ui.foundOnSite}</div>
            {hits.map((h) => {
              const item = ALL_ITEMS.find((i) => i.id === h.id)!;
              return (
                <button
                  type="button"
                  key={h.id}
                  className="sb-hit"
                  onClick={() => {
                    onSelect(item);
                    setSearchQuery('');
                  }}
                >
                  <span className="sb-hit-title">
                    {t.menu[h.id]}
                    <span className="sb-count">{h.count}</span>
                  </span>
                  <span className="sb-hit-snippet">
                    {h.snippet[0]}
                    <mark>{h.snippet[1]}</mark>
                    {h.snippet[2]}
                  </span>
                </button>
              );
            })}
          </div>
        )}
        {!isExpanded && (
          <RailGroups
            activeTab={activeTab}
            activeGroup={activeGroup}
            openGroups={openGroups}
            toggleGroup={toggleGroup}
            onSelect={onSelect}
            t={t}
          />
        )}
        {isExpanded && sections.map((section) => (
          <div key={section.group} className="sb-section">
            {accordion ? (
              <button
                type="button"
                className="sb-section-title sb-section-toggle"
                aria-expanded={!!query || openGroups.includes(section.group)}
                onClick={() => toggleGroup(section.group)}
              >
                <span>{t.ui.groups[section.group].title}</span>
                <ChevronDown className="sb-section-chevron" />
              </button>
            ) : (
              <div className="sb-section-title">{isExpanded ? t.ui.groups[section.group].title : t.ui.groups[section.group].short}</div>
            )}

            <AnimatePresence initial={false}>
            {(!accordion || !!query || openGroups.includes(section.group)) && (
            <motion.div
              className="sb-items"
              initial={accordion ? { opacity: 0, height: 0 } : false}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const label = t.menu[item.id];

                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      onSelect(item);
                      setSearchQuery('');
                    }}
                    className="sb-item"
                    data-active={isActive}
                    aria-current={isActive ? 'page' : undefined}
                    title={!isExpanded ? label : undefined}
                    aria-label={!isExpanded ? label : undefined}
                  >
                    {isActive && isExpanded && <span className="sb-led" />}

                    <Icon className="sb-icon" />

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -4 }}
                          transition={{ duration: 0.15 }}
                          className="sb-item-body"
                        >
                          <span className="sb-label">{label}</span>
                          {item.badge !== undefined && <span className="sb-count">{item.badge}</span>}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </motion.div>
            )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {footer && isExpanded && <div className="sb-footer">{footer}</div>}

      <div className="sb-glow" />
    </motion.aside>
  );
};

const GROUP_ICONS = { design: PenTool, firma: Building2, insta: MessageCircleHeart } as const;

/** Eingeklapptes Menue: jede Gruppe ist ein Symbol. Nur die offene Gruppe zeigt
 *  darunter ihre Seiten; ein Klick auf ein anderes Gruppensymbol schliesst sie. */
function RailGroups({
  activeTab,
  activeGroup,
  openGroups,
  toggleGroup,
  onSelect,
  t,
}: {
  activeTab: string;
  activeGroup?: string;
  openGroups: string[];
  toggleGroup: (g: string) => void;
  onSelect: (item: MenuItemDef) => void;
  t: Texts;
}) {
  return (
    <div className="sb-rail">
      {MENU_SECTIONS.map((sec) => {
        const GroupIcon = GROUP_ICONS[sec.group];
        const label = t.ui.groups[sec.group].title;
        const isOpen = openGroups.includes(sec.group);
        return (
          <div key={sec.group} className="sb-rail-group" data-open={isOpen}>
            <button
              type="button"
              className="sb-item sb-rail-btn"
              data-open={isOpen}
              data-current={sec.group === activeGroup}
              title={label}
              aria-label={label}
              aria-expanded={isOpen}
              onClick={() => toggleGroup(sec.group)}
            >
              <GroupIcon className="sb-icon" />
              <span className="sb-rail-letter" aria-hidden>
                {t.ui.groups[sec.group].short.charAt(0)}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="sb-rail-items"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  {sec.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    const itemLabel = t.menu[item.id];
                    return (
                      <button
                        type="button"
                        key={item.id}
                        className="sb-item"
                        data-active={isActive}
                        aria-current={isActive ? 'page' : undefined}
                        title={itemLabel}
                        aria-label={itemLabel}
                        onClick={() => onSelect(item)}
                      >
                        <Icon className="sb-icon" />
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
