// EKADO monogramı (D:\repos\Adodesign.ch\public\logo-*.svg ile aynı çizimler).
// Robotun göğsündeki dokuya çizilir: halka ve harfler "ink", vurgular marka rengi.

const A = 'M78 220 L130 92 L182 220 H154 L143 190 H116 L105 220 Z M124 166 H136 L130 148 Z';
const D =
  'M158 100 H208 C255 100 280 121 280 156 C280 191 255 212 208 212 H158 Z ' +
  'M184 124 V188 H206 C237 188 252 177 252 156 C252 135 237 124 206 124 Z';
const RING_BREAK = 'M250 68 A118 118 0 0 1 280 118';

export function drawLogo(ctx: CanvasRenderingContext2D, size: number, ink: string, brand: string, plate: string) {
  ctx.clearRect(0, 0, size, size);
  // yuvarlak rozet zemini
  ctx.fillStyle = plate;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.48, 0, Math.PI * 2);
  ctx.fill();

  // SVG'deki monogram yaklaşık (40..300, 22..278) kutusunda; ortala ve sığdır
  const s = (size * 0.8) / 270;
  ctx.save();
  ctx.translate(size / 2 - 168 * s, size / 2 - 150 * s);
  ctx.scale(s, s);

  ctx.lineCap = 'round';
  ctx.strokeStyle = ink;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(168, 150, 118, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = brand;
  ctx.lineWidth = 12;
  ctx.stroke(new Path2D(RING_BREAK));

  ctx.fillStyle = ink;
  ctx.fill(new Path2D(A), 'evenodd');
  ctx.fill(new Path2D(D), 'evenodd');

  ctx.strokeStyle = brand;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(226, 156, 27, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = brand;
  ctx.beginPath();
  ctx.arc(168, 32, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
