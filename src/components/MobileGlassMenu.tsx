import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Layers,
  Sparkles,
  History,
  Box,
  ChevronUp,
  Search,
  Camera,
  X
} from 'lucide-react';
import { MENU_SECTIONS } from './SleekSidebar';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { getStoredAvatar, setStoredAvatar } from '../utils/avatar';

interface MobileGlassMenuProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  lang: Language;
}

export const MobileGlassMenu: React.FC<MobileGlassMenuProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  lang
}) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const quickItems = [
    { id: 'home', labelKey: 'home' as const, icon: Home },
    { id: 'projekte', labelKey: 'projekte' as const, icon: Layers, badge: 4 },
    { id: 'skills', labelKey: 'skills' as const, icon: Sparkles },
    { id: 'erfahrung', labelKey: 'erfahrung' as const, icon: History },
    { id: 'lab', labelKey: 'lab' as const, icon: Box },
  ];

  return (
    <>
      {/* 1. Tam Ekran Karartma */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* 2. Sihirli Açılır Glassmorphism Menü (Drawer / Sheet) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%', opacity: 0.5, scale: 0.95 }}
            animate={{ 
              y: 0, 
              opacity: 1, 
              scale: 1,
              transition: { type: 'spring', damping: 28, stiffness: 300 }
            }}
            exit={{ 
              y: '100%', 
              opacity: 0, 
              scale: 0.95,
              transition: { duration: 0.25 }
            }}
            className="fixed bottom-0 inset-x-0 z-50 p-4 max-h-[88vh] flex flex-col justify-end lg:hidden pointer-events-auto"
          >
            <div className="w-full max-w-md mx-auto bg-[var(--theme-surface)] backdrop-blur-2xl border border-[var(--theme-border)] rounded-[32px] p-4 text-[var(--theme-text)] shadow-[0_-15px_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
              
              {/* Başlık */}
              <div className="flex items-center justify-between pb-3 border-b border-[var(--theme-border)]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--theme-primary)] animate-pulse shadow-[0_0_8px_var(--theme-primary)]" />
                  <span className="text-xs font-black tracking-wide text-white">ADOdesign</span>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 text-zinc-300 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* ADOdesign Profil Kartı (12.jpg ve Doğrudan Değiştirme) */}
              <div className="flex items-center justify-between p-2 mt-2 rounded-2xl bg-white/5 border border-white/5">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 shadow-md bg-neutral-900 shrink-0 group">
                    {!imgLoadFailed ? (
                      <img
                        src={avatarUrl}
                        alt="ADOdesign Avatar (12.jpg)"
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
                      <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-white font-bold text-xs">
                        12
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Camera className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[var(--theme-secondary)] shadow-[0_0_6px_var(--theme-secondary)] border border-[var(--theme-bg)] z-10" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-black text-white">ADOdesign</span>
                    <span className="text-[10px] text-zinc-300 flex items-center gap-1">
                      <Camera className="w-2.5 h-2.5" /> {lang === 'de' ? '12.jpg ändern' : '12.jpg Değiştir'}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] bg-[var(--theme-badge-bg)] text-[var(--theme-badge-text)] border border-[var(--theme-badge-border)] px-2 py-0.5 rounded-full font-bold font-mono">
                  ZÜRICH
                </span>
              </div>

              {/* Canlı Arama Inputu */}
              <div className="flex items-center gap-2 px-3 py-2 my-2 rounded-xl bg-white/[0.06] border border-[var(--theme-border)]">
                <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <input
                  type="text"
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-white placeholder-zinc-400 outline-none uppercase font-medium text-[11px]"
                />
              </div>

              {/* Scroll Edilebilir Menü Bölümleri - Basılmış / Gömülmüş Butonlar */}
              <div className="overflow-y-auto max-h-[48vh] pr-1 space-y-4 no-scrollbar py-1">
                {MENU_SECTIONS.map((section) => (
                  <div key={section.titleKey} className="space-y-1">
                    <div className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase px-2">
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
                              setIsOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all relative ${
                              isActive
                                ? 'bg-black/60 shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(0,0,0,0.95),0_1px_0_rgba(255,255,255,0.06)] border border-white/[0.08] border-t-black/90 border-b-white/10 translate-y-[0.5px]'
                                : 'text-zinc-300 hover:text-white hover:bg-white/5 border border-transparent'
                            }`}
                          >
                            {isActive && (
                              <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-full bg-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-primary)]" />
                            )}

                            <div className="flex items-center gap-2.5 ml-1">
                              <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--theme-primary)] drop-shadow-[0_0_6px_var(--theme-primary)]' : 'text-zinc-400'}`} />
                              <span className={`${isActive ? 'font-bold text-white' : 'font-medium text-zinc-300'}`}>{label}</span>
                            </div>

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
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Sihirli Alt Yüzen Cam Dock (Floating Glass Island) */}
      <div className="fixed bottom-4 inset-x-4 z-30 lg:hidden flex justify-center pointer-events-auto">
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="w-full max-w-sm bg-[var(--theme-surface)] backdrop-blur-2xl border border-[var(--theme-border)] rounded-full px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center justify-between gap-1"
        >
          {quickItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const label = t.menuItems[item.labelKey];
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative p-2.5 rounded-full transition-all flex items-center justify-center ${
                  isActive
                    ? 'bg-black/70 border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] text-[var(--theme-primary)] translate-y-[0.5px]'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title={label}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'drop-shadow-[0_0_6px_var(--theme-primary)]' : ''}`} />
                {item.badge !== undefined && !isActive && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-white/20 text-white rounded-full text-[8px] flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="w-[1px] h-6 bg-[var(--theme-border)] mx-1" />

          {/* Menü Genişlet Butonu */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1.5 bg-white text-zinc-950 font-bold px-3 py-1.5 rounded-full text-[11px] shadow-md hover:bg-zinc-100 transition-all cursor-pointer"
          >
            <span>{t.menu}</span>
            <ChevronUp className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </motion.div>
      </div>
    </>
  );
};
