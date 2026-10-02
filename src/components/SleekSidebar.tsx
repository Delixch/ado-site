import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Layers,
  Sparkles,
  History,
  Box,
  ChevronLeft,
  ChevronRight,
  Search,
  ArrowRightLeft,
  Camera,
  User
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { getStoredAvatar, setStoredAvatar } from '../utils/avatar';

export interface MenuItemDef {
  id: string;
  labelKey: keyof typeof TRANSLATIONS.de.menuItems;
  icon: any;
  badge?: number | string;
}

export const MENU_SECTIONS: {
  titleKey: 'menu' | 'discovery';
  items: MenuItemDef[];
}[] = [
  {
    titleKey: 'menu',
    items: [
      { id: 'home', labelKey: 'home', icon: Home },
      { id: 'projekte', labelKey: 'projekte', icon: Layers, badge: 4 },
      { id: 'skills', labelKey: 'skills', icon: Sparkles }
    ]
  },
  {
    titleKey: 'discovery',
    items: [
      { id: 'erfahrung', labelKey: 'erfahrung', icon: History },
      { id: 'lab', labelKey: 'lab', icon: Box }
    ]
  }
];

interface SleekSidebarProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onMenuItemClick?: (item: MenuItemDef) => void;
  lang: Language;
}

export const SleekSidebar: React.FC<SleekSidebarProps> = ({
  isExpanded,
  setIsExpanded,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onMenuItemClick,
  lang
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string>(getStoredAvatar);
  const [imgLoadFailed, setImgLoadFailed] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleAvatarUpdate = (e: any) => {
      if (e.detail) {
        setAvatarUrl(e.detail);
        setImgLoadFailed(false);
      }
    };
    window.addEventListener('ado-avatar-updated', handleAvatarUpdate);
    return () => window.removeEventListener('ado-avatar-updated', handleAvatarUpdate);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
    }
  };

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isExpanded ? 275 : 74,
        transition: { type: 'spring', stiffness: 350, damping: 30 }
      }}
      className="relative z-20 flex flex-col h-[740px] max-h-[calc(100vh-2.5rem)] rounded-[26px] bg-[var(--theme-surface)] backdrop-blur-2xl border border-[var(--theme-border)] shadow-[0_25px_60px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.12)] p-2.5 pt-1.5 overflow-hidden shrink-0"
    >
      {/* 1. ÜST KONTROL BAŞLIĞI: 46px Sabit Yükseklik */}
      {isExpanded ? (
        <div className="flex items-center justify-between h-[46px] px-2 border-b border-[var(--theme-border)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--theme-primary)] animate-pulse shadow-[0_0_8px_var(--theme-primary)]" />
            <span className="text-xs font-black tracking-wider text-white">ADOdesign</span>
          </div>

          {/* Lüks Cam Kapatma (Einklappen) Butonu */}
          <button
            onClick={() => setIsExpanded(false)}
            title={t.collapse}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] text-white text-[10px] font-bold tracking-tight shadow-sm hover:shadow-[0_0_12px_var(--theme-primary-glow)] transition-all cursor-pointer group"
          >
            <span className="text-zinc-300 group-hover:text-white transition-colors">{t.collapse}</span>
            <ChevronLeft className="w-3.5 h-3.5 text-[var(--theme-primary)] group-hover:-translate-x-0.5 transition-transform" />
          </button>
        </div>
      ) : (
        /* KAPALI MODDA LÜKS CAM AÇMA BUTONU */
        <div className="flex items-center justify-center h-[46px] border-b border-[var(--theme-border)] px-1">
          <button
            onClick={() => setIsExpanded(true)}
            title={t.expand}
            className="w-full h-8 flex items-center justify-center rounded-xl bg-white/[0.08] hover:bg-[var(--theme-primary)]/20 border border-[var(--theme-border)] hover:border-[var(--theme-primary)] text-white shadow-[0_2px_8px_rgba(0,0,0,0.4)] transition-all cursor-pointer group"
          >
            <ChevronRight className="w-4 h-4 text-[var(--theme-secondary)] group-hover:text-[var(--theme-primary)] group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>
      )}

      {/* 2. PROFİL KARTI: 12.jpg ve Doğrudan Fotoğraf Seçme */}
      <div className="mt-2.5 mb-2 px-1">
        <div 
          className="flex items-center gap-3 p-1 rounded-2xl transition-colors hover:bg-white/5 cursor-pointer"
        >
          {/* Gizli Dosya Seçici - Kullanıcı 12.jpg dosyasını tıklayıp doğrudan seçebilir */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          <div 
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="relative shrink-0 w-10 h-10 rounded-full overflow-hidden border border-white/20 shadow-md bg-neutral-900 group cursor-pointer"
            title="12.jpg fotoğrafını yüklemek/seçmek için tıklayın"
          >
            {!imgLoadFailed ? (
              <img
                src={avatarUrl}
                alt="ADOdesign Portrait (12.jpg)"
                className="w-full h-full object-cover object-top scale-105 select-none pointer-events-none"
                onError={() => {
                  if (avatarUrl === '/12.jpg') {
                    setAvatarUrl('12.jpg');
                  } else {
                    setImgLoadFailed(true);
                  }
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 text-white font-bold text-xs">
                <span>12</span>
              </div>
            )}

            {/* Üzerine gelince kamera simgesi */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="w-4 h-4 text-white" />
            </div>

            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[var(--theme-secondary)] shadow-[0_0_8px_var(--theme-secondary)] border-2 border-[var(--theme-bg)] z-10" />
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-1 items-center justify-between overflow-hidden whitespace-nowrap"
              >
                <div className="flex flex-col text-left">
                  <span className="text-xs font-black text-white tracking-wide">
                    ADOdesign
                  </span>
                  <span className="text-[10px] text-zinc-300 flex items-center gap-1 group-hover:text-[var(--theme-secondary)]">
                    <Camera className="w-2.5 h-2.5" /> {lang === 'de' ? '12.jpg Foto ändern' : '12.jpg Değiştir'}
                  </span>
                </div>
                <span className="text-[10px] bg-[var(--theme-badge-bg)] text-[var(--theme-badge-text)] border border-[var(--theme-badge-border)] px-2 py-0.5 rounded-full font-bold font-mono">
                  ZÜRICH
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 3. ARAMA ÇUBUĞU */}
      <div className="px-1 mb-2">
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.06] border border-[var(--theme-border)] focus-within:border-[var(--theme-primary)] transition-all"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-white placeholder-zinc-400 outline-none uppercase font-medium text-[11px]"
            />
          </motion.div>
        ) : (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full flex items-center justify-center p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            title={t.search}
          >
            <Search className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 4. www.adodesign.ch 5 ANA MENÜSÜ - BASILMIŞ / GÖMÜLMÜŞ (RECESSED TACTILE) BUTON DİZAYNI */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-1 space-y-4">
        {MENU_SECTIONS.map((section) => (
          <div key={section.titleKey} className="space-y-1">
            <div
              className={`text-[9px] font-bold text-zinc-400 tracking-wider uppercase px-2 mb-1 transition-all ${
                isExpanded ? 'text-left' : 'text-center'
              }`}
            >
              {t[section.titleKey]}
            </div>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const label = t.menuItems[item.labelKey];

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (onMenuItemClick) onMenuItemClick(item);
                    }}
                    className={`relative w-full flex items-center rounded-xl transition-all duration-150 group cursor-pointer ${
                      isExpanded ? 'px-3 py-2.5' : 'p-2.5 justify-center'
                    } ${
                      isActive
                        ? 'bg-black/60 shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(0,0,0,0.95),0_1px_0_rgba(255,255,255,0.06)] border border-white/[0.08] border-t-black/90 border-b-white/10 translate-y-[0.5px]'
                        : 'text-zinc-300 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/5 active:translate-y-[0.5px]'
                    }`}
                    title={!isExpanded ? label : undefined}
                  >
                    {/* Basılı Durum Sol LED / Çizgi Göstergesi */}
                    {isActive && isExpanded && (
                      <span className="absolute left-1 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-full bg-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-primary)]" />
                    )}

                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive
                          ? 'text-[var(--theme-primary)] drop-shadow-[0_0_8px_var(--theme-primary-glow)] scale-105 stroke-[2.4]'
                          : 'text-zinc-400 group-hover:text-white group-hover:scale-105'
                      } ${isActive && isExpanded ? 'ml-1' : ''}`}
                    />

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -4 }}
                          transition={{ duration: 0.15 }}
                          className="flex flex-1 items-center justify-between ml-2.5 overflow-hidden whitespace-nowrap"
                        >
                          <span className={`text-xs tracking-normal text-left truncate ${
                            isActive ? 'font-bold text-white' : 'font-medium text-zinc-300 group-hover:text-white'
                          }`}>
                            {label}
                          </span>

                          {item.badge !== undefined && (
                            <span
                              className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                                isActive
                                  ? 'bg-black/70 text-[var(--theme-primary)] border border-[var(--theme-primary)]/40 shadow-inner'
                                  : 'bg-white/10 text-zinc-300'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Ambient alt ışıltı */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-16 bg-[var(--theme-primary-glow)] blur-xl pointer-events-none rounded-full" />
    </motion.aside>
  );
};
