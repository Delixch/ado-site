// Robotun TV ekranındaki yüz. Her karede bir <canvas>'a çizilir ve
// Three.js bunu ekran dokusu (CanvasTexture) olarak kullanır.

export type Mood = 'idle' | 'happy' | 'talk' | 'sleep' | 'tickle' | 'think';

export type FaceState = {
  time: number;
  lookX: number; // -1..1
  lookY: number; // -1..1
  open: number; // 1 = göz açık, 0 = kapalı (göz kırpma)
  mood: Mood;
  mouth: number; // 0..1 konuşma ses seviyesi
  glitch: number; // 0..1 parazit
  brand: string;
};

export const FACE_W = 512;
export const FACE_H = 352;

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.roundRect(x - w / 2, y - h / 2, w, h, rr);
}

export function drawFace(ctx: CanvasRenderingContext2D, s: FaceState) {
  const { time: t, brand } = s;
  const W = FACE_W;
  const H = FACE_H;

  // Zemin: koyu ekran + ortada hafif marka rengi parıltısı
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#060807';
  ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W / 2, H / 2, 20, W / 2, H / 2, W * 0.6);
  glow.addColorStop(0, hexA(brand, 0.22));
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Düşünürken gözler yukarı-yana kayar ve hafifçe gezinir
  const thinking = s.mood === 'think';
  const ex = thinking ? 30 + Math.sin(t * 1.3) * 10 : s.lookX * 38;
  const ey = thinking ? -24 : s.lookY * 26;
  const cy = 150 + ey;
  const gap = 92;

  ctx.save();
  ctx.fillStyle = brand;
  ctx.strokeStyle = brand;
  ctx.shadowColor = brand;
  ctx.shadowBlur = 28;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Gözler
  for (const side of [-1, 1] as const) {
    const cx = W / 2 + side * gap + ex;
    if (s.mood === 'happy' || (s.mood === 'talk' && s.mouth > 0.55)) {
      // ^ ^ mutlu gözler
      ctx.lineWidth = 17;
      ctx.beginPath();
      ctx.moveTo(cx - 34, cy + 16);
      ctx.quadraticCurveTo(cx, cy - 40, cx + 34, cy + 16);
      ctx.stroke();
    } else if (s.mood === 'sleep') {
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(cx - 32, cy + 12);
      ctx.quadraticCurveTo(cx, cy + 26, cx + 32, cy + 12);
      ctx.stroke();
    } else if (s.mood === 'tickle') {
      // > <
      ctx.lineWidth = 16;
      const d = -side;
      ctx.beginPath();
      ctx.moveTo(cx - 26 * d, cy - 28);
      ctx.lineTo(cx + 26 * d, cy);
      ctx.lineTo(cx - 26 * d, cy + 28);
      ctx.stroke();
    } else {
      const h = Math.max(8, 98 * s.open);
      roundRect(ctx, cx, cy, 68, h, 26);
      ctx.fill();
      if (s.open > 0.5) {
        // parlama noktası
        ctx.save();
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(255,255,255,0.75)';
        roundRect(ctx, cx - 14 + s.lookX * 6, cy - 24 + s.lookY * 6, 16, 22, 7);
        ctx.fill();
        ctx.restore();
      }
    }
  }

  // Ağız
  const mx = W / 2 + ex * 0.6;
  const my = 262 + ey * 0.6;
  if (s.mood === 'talk') {
    const bars = 9;
    const bw = 12;
    const spacing = 18;
    for (let i = 0; i < bars; i++) {
      const center = 1 - Math.abs(i - (bars - 1) / 2) / ((bars - 1) / 2);
      const wob = 0.55 + 0.45 * Math.sin(t * 22 + i * 1.7);
      const h = 8 + s.mouth * 70 * (0.35 + 0.65 * center) * wob;
      roundRect(ctx, mx + (i - (bars - 1) / 2) * spacing, my, bw, h, 6);
      ctx.fill();
    }
  } else if (s.mood === 'sleep') {
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(mx - 14, my);
    ctx.lineTo(mx + 14, my);
    ctx.stroke();
    // z Z
    ctx.shadowBlur = 16;
    ctx.font = '700 34px Orbitron, "Chakra Petch", system-ui, sans-serif';
    const k = (t * 0.6) % 1;
    ctx.globalAlpha = Math.sin(k * Math.PI);
    ctx.fillText('z', W / 2 + 150, 110 - k * 40);
    ctx.font = '700 46px Orbitron, "Chakra Petch", system-ui, sans-serif';
    const k2 = (t * 0.6 + 0.5) % 1;
    ctx.globalAlpha = Math.sin(k2 * Math.PI);
    ctx.fillText('Z', W / 2 + 180, 80 - k2 * 40);
    ctx.globalAlpha = 1;
  } else if (thinking) {
    // "..." sırayla zıplayan üç nokta
    for (let i = 0; i < 3; i++) {
      const hop = Math.max(0, Math.sin(t * 7 - i * 0.9)) * 18;
      ctx.beginPath();
      ctx.arc(mx + (i - 1) * 44, my - hop, 15, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    const wide = s.mood === 'happy' || s.mood === 'tickle';
    ctx.lineWidth = 10;
    ctx.beginPath();
    if (wide) {
      ctx.moveTo(mx - 46, my - 10);
      ctx.quadraticCurveTo(mx, my + 44, mx + 46, my - 10);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.moveTo(mx - 30, my - 4);
      ctx.quadraticCurveTo(mx, my + 18, mx + 30, my - 4);
      ctx.stroke();
    }
  }
  ctx.restore();

  // Parazit: yatay kaymalar + karlanma
  if (s.glitch > 0.02) {
    const n = Math.floor(3 + s.glitch * 10);
    for (let i = 0; i < n; i++) {
      const y = Math.random() * H;
      const h = 4 + Math.random() * 24;
      const dx = (Math.random() - 0.5) * 70 * s.glitch;
      ctx.drawImage(ctx.canvas, 0, y, W, h, dx, y, W, h);
    }
    ctx.fillStyle = `rgba(255,255,255,${0.25 * s.glitch})`;
    for (let i = 0; i < 260 * s.glitch; i++) {
      ctx.fillRect(Math.random() * W, Math.random() * H, 2, 2);
    }
  }

  // Tarama çizgileri + aşağı kayan tazeleme bandı
  ctx.fillStyle = 'rgba(0,0,0,0.22)';
  for (let y = 0; y < H; y += 4) ctx.fillRect(0, y, W, 2);
  const band = ((t * 0.35) % 1.4) * H - 0.2 * H;
  const bg = ctx.createLinearGradient(0, band - 40, 0, band + 40);
  bg.addColorStop(0, 'rgba(255,255,255,0)');
  bg.addColorStop(0.5, 'rgba(255,255,255,0.05)');
  bg.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = bg;
  ctx.fillRect(0, band - 40, W, 80);

  // Kenar kararması (tüplü TV)
  const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, W * 0.62);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, W, H);
}

/** "#RRGGBB" → rgba(...) */
export function hexA(hex: string, a: number) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return `rgba(255,90,31,${a})`;
  const n = parseInt(m[1], 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
