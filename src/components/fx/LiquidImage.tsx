import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

const VERT = `
attribute vec2 p;
varying vec2 vUv;
void main() { vUv = p * 0.5 + 0.5; vUv.y = 1.0 - vUv.y; gl_Position = vec4(p, 0.0, 1.0); }`;

/* Dunkelkammer: Bild "entwickelt" sich (grau + Zoom -> Farbe), Zeiger bricht es wie Fluessigkeit. */
const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D tex;
uniform vec2 res;
uniform vec2 img;
uniform vec2 mouse;
uniform float force;
uniform float develop;
uniform float time;

vec2 cover(vec2 uv) {
  float rs = res.x / res.y;
  float ri = img.x / img.y;
  vec2 s = rs > ri ? vec2(1.0, ri / rs) : vec2(rs / ri, 1.0);
  return (uv - 0.5) * s + 0.5;
}

void main() {
  vec2 uv = vUv;
  vec2 asp = vec2(res.x / res.y, 1.0);
  vec2 d = (uv - mouse) * asp;
  float dist = length(d);
  float ring = smoothstep(0.42, 0.0, dist);
  float wave = sin(dist * 26.0 - time * 5.0) * 0.5 + 0.5;
  vec2 dir = dist > 0.0001 ? normalize(d) / asp : vec2(0.0);
  vec2 off = dir * ring * (0.018 + 0.022 * wave) * force;

  float zoom = mix(1.12, 1.0, develop);
  vec2 base = (uv - 0.5) / zoom + 0.5;
  vec2 cuv = cover(base - off);
  float split = 0.006 * force * ring;
  float r = texture2D(tex, cover(base - off * 1.3) + vec2(split, 0.0)).r;
  float g = texture2D(tex, cuv).g;
  float b = texture2D(tex, cover(base - off * 0.7) - vec2(split, 0.0)).b;
  vec3 col = vec3(r, g, b);

  float grey = dot(col, vec3(0.299, 0.587, 0.114));
  // Schwarzweiss (passt zu jedem Farbthema); Entwickeln = Kontrast und Helligkeit kommen
  float bw = (grey - 0.5) * mix(0.7, 1.12, develop) + 0.5;
  vec3 dev = vec3(bw) * mix(0.55, 0.96, smoothstep(0.0, 0.6, develop));
  gl_FragColor = vec4(dev, 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

/**
 * Foto mit WebGL: entwickelt sich beim ersten Sichtkontakt und reagiert fluessig auf den Zeiger.
 * Ohne WebGL oder bei reduzierter Bewegung bleibt es ein normales Bild.
 */
export function LiquidImage({ src, alt = '', className = '' }: { src: string; alt?: string; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const [gl, setGl] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!el || !cv || reduced) {
      setGl(false);
      return;
    }
    const ctx = cv.getContext('webgl', { premultipliedAlpha: false, antialias: false });
    if (!ctx) {
      setGl(false);
      return;
    }
    const g = ctx;
    const prog = g.createProgram()!;
    g.attachShader(prog, compile(g, g.VERTEX_SHADER, VERT));
    g.attachShader(prog, compile(g, g.FRAGMENT_SHADER, FRAG));
    g.linkProgram(prog);
    if (!g.getProgramParameter(prog, g.LINK_STATUS)) {
      setGl(false);
      return;
    }
    g.useProgram(prog);
    const buf = g.createBuffer();
    g.bindBuffer(g.ARRAY_BUFFER, buf);
    g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), g.STATIC_DRAW);
    const loc = g.getAttribLocation(prog, 'p');
    g.enableVertexAttribArray(loc);
    g.vertexAttribPointer(loc, 2, g.FLOAT, false, 0, 0);
    const u = (n: string) => g.getUniformLocation(prog, n);
    const U = { res: u('res'), img: u('img'), mouse: u('mouse'), force: u('force'), develop: u('develop'), time: u('time') };

    const tex = g.createTexture();
    let ready = false;
    let imgW = 1;
    let imgH = 1;
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      imgW = image.naturalWidth;
      imgH = image.naturalHeight;
      g.bindTexture(g.TEXTURE_2D, tex);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
      g.texImage2D(g.TEXTURE_2D, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, image);
      ready = true;
    };
    image.src = src;

    const state = { mx: 0.5, my: 0.5, tx: 0.5, ty: 0.5, force: 0, target: 0, develop: 0, dev: false, visible: false };
    let raf = 0;
    const t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      cv.width = Math.max(1, Math.round(el.clientWidth * dpr));
      cv.height = Math.max(1, Math.round(el.clientHeight * dpr));
      g.viewport(0, 0, cv.width, cv.height);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!ready) return;
      state.mx += (state.tx - state.mx) * 0.12;
      state.my += (state.ty - state.my) * 0.12;
      state.force += (state.target - state.force) * 0.06;
      state.target *= 0.96;
      if (state.dev) state.develop = Math.min(1, state.develop + 0.012);
      g.uniform2f(U.res, cv.width, cv.height);
      g.uniform2f(U.img, imgW, imgH);
      g.uniform2f(U.mouse, state.mx, state.my);
      g.uniform1f(U.force, state.force);
      g.uniform1f(U.develop, state.develop);
      g.uniform1f(U.time, (now - t0) / 1000);
      g.drawArrays(g.TRIANGLE_STRIP, 0, 4);
    };

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const speed = Math.hypot(x - state.tx, y - state.ty);
      state.tx = x;
      state.ty = y;
      state.target = Math.min(1.4, state.target + speed * 9 + 0.05);
    };

    const io = new IntersectionObserver(([en]) => {
      state.visible = en.isIntersecting;
      cancelAnimationFrame(raf);
      if (en.isIntersecting) {
        state.dev = true;
        raf = requestAnimationFrame(frame);
      }
    });

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    io.observe(el);
    el.addEventListener('pointermove', move);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener('pointermove', move);
      g.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [src, reduced]);

  return (
    <div ref={wrap} className={`liquid ${className}`}>
      {gl ? <canvas ref={canvas} role="img" aria-label={alt} /> : <img className="bw" src={src} alt={alt} loading="lazy" />}
    </div>
  );
}
