import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Layers, 
  ShieldCheck, 
  Award, 
  ArrowUpRight,
  Sliders,
  RotateCcw,
  Zap,
  Globe2,
  CheckCircle2,
  Box,
  History as HistoryIcon
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface IntegratedPageContentProps {
  pageId: string;
  device: 'desktop' | 'tablet' | 'mobile';
  lang: Language;
}

export const IntegratedPageContent: React.FC<IntegratedPageContentProps> = ({ pageId, lang }) => {
  const t = TRANSLATIONS[lang];

  // 1. STARTSEITE / ÜBER MICH (Home)
  if (pageId === 'home') {
    return (
      <>
        {/* Nav: Fast Stats Bento */}
        <div style={{ gridArea: 'nav' }} className="rounded-2xl bg-[var(--theme-surface)] backdrop-blur-2xl border border-[var(--theme-border)] p-4 flex flex-col justify-between shadow-xl">
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--theme-primary)] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>KEY FACTS</span>
            </div>
            <p className="text-xs text-zinc-300 font-medium">Schweizer Präzision & Tempo</p>
          </div>

          <div className="space-y-3 my-2">
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-[var(--theme-border)]">
              <div className="text-lg font-black text-[var(--theme-secondary)]">{t.home.stats.experience}</div>
              <div className="text-[10px] text-zinc-300 font-medium">{t.home.stats.expLabel}</div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-[var(--theme-border)]">
              <div className="text-lg font-black text-emerald-400">{t.home.stats.performance}</div>
              <div className="text-[10px] text-zinc-300 font-medium">{t.home.stats.perfLabel}</div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-[var(--theme-border)]">
              <div className="text-lg font-black text-[var(--theme-primary)]">{t.home.stats.builder}</div>
              <div className="text-[10px] text-zinc-300 font-medium">{t.home.stats.builderLabel}</div>
            </div>
          </div>

          <div className="text-[10px] text-zinc-300 flex items-center gap-1 font-mono">
            <ShieldCheck className="w-3 h-3 text-[var(--theme-secondary)]" /> 100% Handcrafted
          </div>
        </div>

        {/* Main: Hero Bento Card */}
        <div style={{ gridArea: 'main' }} className="rounded-2xl bg-[var(--theme-surface)] backdrop-blur-2xl border border-[var(--theme-border)] p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="px-2.5 py-0.5 rounded-md bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] text-[10px] font-mono font-bold tracking-wider uppercase border border-[var(--theme-primary)]/30">
                {t.home.tag}
              </span>
              <span className="text-[11px] text-zinc-400 font-mono">· {t.availableBadge}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              {t.heroTitle}
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl font-normal">
              {t.heroSubtitle}
            </p>
          </div>

          <div className="relative z-10 pt-6 border-t border-[var(--theme-border)] flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {t.home.quickSkills.map((sk) => (
                <span key={sk} className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.05] border border-[var(--theme-border)] font-medium text-white">
                  {sk}
                </span>
              ))}
            </div>

            <a
              href="mailto:xdd@hotmail.com"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--theme-primary)] hover:opacity-90 text-white font-bold text-xs tracking-wide shadow-lg shadow-[var(--theme-primary-glow)] transition-all"
            >
              <span>E-MAIL AN ADO</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--theme-primary-glow)] blur-3xl opacity-20 pointer-events-none rounded-full" />
        </div>

        {/* Aside: Philosophy & Quick Tech Info */}
        <div style={{ gridArea: 'aside' }} className="rounded-2xl bg-[var(--theme-surface)] backdrop-blur-2xl border border-[var(--theme-border)] p-4 flex flex-col justify-between shadow-xl">
          <div className="space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--theme-secondary)] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PHILOSOPHIE</span>
            </div>
            <h3 className="text-xs font-bold text-white">{t.home.philosophyTitle}</h3>
            <p className="text-[11px] text-zinc-300 leading-relaxed">
              {t.home.philosophyDesc}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.04] border border-[var(--theme-border)] space-y-2">
            <div className="text-[10px] font-bold text-white flex items-center justify-between">
              <span className="flex items-center gap-1"><Globe2 className="w-3 h-3 text-[var(--theme-secondary)]" /> Zürich HQ</span>
              <span className="text-[10px] font-mono text-emerald-400">Online</span>
            </div>
            <div className="text-[11px] text-zinc-400 font-mono">
              Web · 3D · Motion
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div style={{ gridArea: 'footer' }} className="rounded-2xl bg-[var(--theme-surface)] backdrop-blur-2xl border border-[var(--theme-border)] px-5 py-3 flex items-center justify-between shadow-xl text-xs text-zinc-400">
          <span className="font-medium text-[11px] text-zinc-300">
            ADO Design · Websites, Echtzeit-3D und Motion Design aus einer Hand
          </span>
          <span className="font-mono text-[10px] text-[var(--theme-primary)] font-bold">
            www.adodesign.ch
          </span>
        </div>
      </>
    );
  }

  // 2. PROJEKTE (Projects) - İkinci Header Kaldırıldı
  if (pageId === 'projekte') {
    return (
      <>
        {/* 4 Projects Grid Cards */}
        {t.projekte.items.map((proj, idx) => (
          <div
            key={proj.id}
            style={{ gridArea: `proj${idx + 1}` }}
            className="rounded-2xl bg-[var(--theme-surface)] backdrop-blur-2xl border border-[var(--theme-border)] p-6 flex flex-col justify-between shadow-xl hover:border-[var(--theme-primary)]/50 transition-all duration-300 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--theme-primary)] font-bold">
                  {proj.category}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">
                  {proj.metric}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-[var(--theme-secondary)] transition-colors">
                {proj.name}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {proj.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--theme-border)] flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {proj.tags.map((tg) => (
                  <span key={tg} className="text-[11px] px-2.5 py-0.5 rounded bg-white/[0.05] text-zinc-300 font-medium">
                    {tg}
                  </span>
                ))}
              </div>
              <span className="text-xs text-[var(--theme-primary)] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Live <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </>
    );
  }

  // 3. SKILLS & LEISTUNGEN - İkinci Header Kaldırıldı
  if (pageId === 'skills') {
    return (
      <>
        {/* 4 Core Pillars */}
        {t.skills.pillars.map((pillar, idx) => (
          <div
            key={pillar.id}
            style={{ gridArea: `skill${idx + 1}` }}
            className="rounded-2xl bg-[var(--theme-surface)] backdrop-blur-2xl border border-[var(--theme-border)] p-6 flex flex-col justify-between shadow-xl hover:border-[var(--theme-secondary)]/50 transition-all duration-300"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--theme-primary)]/15 text-[var(--theme-primary)] font-bold uppercase tracking-wider">
                  {pillar.badge}
                </span>
                <span className="text-xs font-mono text-[var(--theme-secondary)] font-bold">
                  {pillar.stat}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-white">
                {pillar.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {pillar.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--theme-border)]">
              <div className="flex flex-wrap gap-1.5">
                {pillar.tech.map((tc) => (
                  <span key={tc} className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/[0.06] text-white font-semibold border border-[var(--theme-border)]">
                    {tc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  // 4. ERFAHRUNG & WERDEGANG - İkinci Header Kaldırıldı
  if (pageId === 'erfahrung') {
    return (
      <>
        {/* Timeline Scrollable Card */}
        <div style={{ gridArea: 'timeline' }} className="rounded-2xl bg-[var(--theme-surface)] backdrop-blur-2xl border border-[var(--theme-border)] p-6 shadow-xl overflow-y-auto max-h-[580px] space-y-4 no-scrollbar">
          {t.erfahrung.timeline.map((item, idx) => (
            <div key={idx} className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <span className="w-3 h-3 rounded-full bg-[var(--theme-primary)] ring-4 ring-[var(--theme-primary-subtle)] shrink-0 group-hover:scale-125 transition-transform" />
                {idx < t.erfahrung.timeline.length - 1 && (
                  <span className="w-[1px] flex-1 bg-[var(--theme-border)] my-1" />
                )}
              </div>
              <div className="flex-1 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-[var(--theme-secondary)]">
                    {item.period}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-medium">
                    · {item.company}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-0.5">
                  {item.role}
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Details & Leadership Values Aside */}
        <div style={{ gridArea: 'details' }} className="rounded-2xl bg-[var(--theme-surface)] backdrop-blur-2xl border border-[var(--theme-border)] p-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--theme-primary)] flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>SCHWEIZER WERTE</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Verlässlichkeit & Qualität
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Jahrelange Führungsverantwortung in Zürcher Betrieben, kombiniert mit kontinuierlicher Weiterbildung im Web Publisher Zentrum Wolbach.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bestehende Kundenbetreuung</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Keine versteckten Agenturkosten</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Direkter Draht zum Entwickler</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.04] border border-[var(--theme-border)]">
            <div className="text-[10px] text-zinc-400 uppercase font-mono">Standort</div>
            <div className="text-xs font-bold text-white">8000 Zürich, Schweiz</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ gridArea: 'footer' }} className="rounded-2xl bg-[var(--theme-surface)] backdrop-blur-2xl border border-[var(--theme-border)] px-5 py-3 flex items-center justify-between shadow-xl text-xs text-zinc-400">
          <span className="text-zinc-300">ADO Design · Kontinuität, Sorgfalt und Handwerksstolz seit über zwei Jahrzehnten.</span>
          <span className="font-mono text-[10px] text-[var(--theme-primary)] font-bold">2002 — 2026</span>
        </div>
      </>
    );
  }

  // 5. 3D WEBGL & AI LAB - İkinci Header Kaldırıldı
  if (pageId === 'lab') {
    return <InteractiveLabSection lang={lang} />;
  }

  return null;
};

// Interaktives 3D WebGL / Canvas Lab (Header Olmadan Tam Boyut)
const InteractiveLabSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [particleCount, setParticleCount] = useState<number>(80);
  const [speed, setSpeed] = useState<number>(1.2);
  const [isRotating, setIsRotating] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 500;
      canvas.height = canvas.parentElement?.clientHeight || 420;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 200 - 100,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      if (isRotating) {
        angle += 0.008 * speed;
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      particles.forEach((p) => {
        p.x += p.vx * speed;
        p.y += p.vy * speed;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      const size = Math.min(canvas.width, canvas.height) * 0.24;
      const vertices = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
      ];

      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ];

      const projected = vertices.map(([x, y, z]) => {
        const cosY = Math.cos(angle);
        const sinY = Math.sin(angle);
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;

        const cosX = Math.cos(angle * 0.7);
        const sinX = Math.sin(angle * 0.7);
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const distance = 3.5;
        const fov = 350 / (distance + z2);
        return {
          x: cx + x1 * size * fov * 0.0035,
          y: cy + y2 * size * fov * 0.0035,
          z: z2
        };
      });

      ctx.lineWidth = 1.8;
      ctx.strokeStyle = 'var(--theme-primary)';
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'var(--theme-primary-glow)';

      edges.forEach(([i, j]) => {
        ctx.beginPath();
        ctx.moveTo(projected[i].x, projected[i].y);
        ctx.lineTo(projected[j].x, projected[j].y);
        ctx.stroke();
      });

      ctx.shadowBlur = 16;
      ctx.fillStyle = 'var(--theme-secondary)';
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [particleCount, speed, isRotating]);

  return (
    <>
      {/* 3D Canvas Box */}
      <div style={{ gridArea: 'canvas' }} className="rounded-2xl bg-[var(--theme-surface)] backdrop-blur-2xl border border-[var(--theme-border)] p-4 flex flex-col justify-between shadow-xl relative overflow-hidden min-h-[420px]">
        <div className="absolute top-4 left-4 z-10 text-[11px] font-mono text-zinc-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--theme-primary)] animate-ping" />
          WebGL Canvas Engine · 60 FPS
        </div>

        <canvas ref={canvasRef} className="w-full h-full absolute inset-0 z-0 cursor-grab" />
      </div>

      {/* Live Controls Aside */}
      <div style={{ gridArea: 'controls' }} className="rounded-2xl bg-[var(--theme-surface)] backdrop-blur-2xl border border-[var(--theme-border)] p-5 flex flex-col justify-between shadow-xl space-y-4">
        <div className="space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--theme-primary)] flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" />
            <span>PARAMETRELER</span>
          </div>
          <h3 className="text-xs font-bold text-white">Echtzeit-Parameter</h3>
        </div>

        <div className="space-y-4 flex-1">
          {/* Particle Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-zinc-300 font-mono">
              <span>{t.lab.particleCount}</span>
              <span className="text-[var(--theme-primary)] font-bold">{particleCount}</span>
            </div>
            <input
              type="range"
              min={20}
              max={160}
              value={particleCount}
              onChange={(e) => setParticleCount(Number(e.target.value))}
              className="w-full accent-[var(--theme-primary)] cursor-pointer h-1.5 bg-white/10 rounded-lg"
            />
          </div>

          {/* Speed Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-zinc-300 font-mono">
              <span>{t.lab.speed}</span>
              <span className="text-[var(--theme-secondary)] font-bold">{speed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min={0.2}
              max={3.0}
              step={0.1}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-[var(--theme-secondary)] cursor-pointer h-1.5 bg-white/10 rounded-lg"
            />
          </div>

          {/* Toggle Rotate Button */}
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="w-full py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-[var(--theme-border)] text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
            <span>{t.lab.toggleAnimation}</span>
          </button>
        </div>

        <div className="pt-3 border-t border-[var(--theme-border)] text-[10px] text-zinc-400 font-mono">
          GLSL Shaders · Three.js Architecture
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridArea: 'footer' }} className="rounded-2xl bg-[var(--theme-surface)] backdrop-blur-2xl border border-[var(--theme-border)] px-5 py-3 flex items-center justify-between shadow-xl text-xs text-zinc-400">
        <span className="text-zinc-300">Experimentelles 3D-Labor für neue UI-Paradigmen und interaktive WebGL-Welten.</span>
        <span className="font-mono text-[10px] text-[var(--theme-secondary)] font-bold">Canvas 2D / WebGL</span>
      </div>
    </>
  );
};
