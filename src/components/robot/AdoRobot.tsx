import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RobotAudio, VOICE_TEXT, type Lang, type VoiceLine } from './robotAudio';
import { drawFace, FACE_H, FACE_W, type FaceState, type Mood } from './robotFace';
import { drawLogo } from './adoLogo';

export type AdoRobotProps = {
  lang?: Lang;
  muted?: boolean;
  /** Ses dosyalarının klasörü (public içinde). */
  voicePath?: string;
  /** Yapay zekâ sohbeti: POST {message, history, lang} → {reply}. false = sohbet kapalı. */
  chatEndpoint?: string | false;
  className?: string;
  style?: CSSProperties;
};

const SLEEP_AFTER_MS = 15000;
const FINGER_HOLD_MS = 2500; // parmak kalktıktan sonra bu süre parmağın son yerine bakar
const CHAT_TIMEOUT_MS = 40000;

const CHAT_TEXT: Record<Lang, { placeholder: string; send: string; close: string; fallback: string }> = {
  tr: {
    placeholder: "ADO'ya bir şey sor…",
    send: 'Gönder',
    close: 'Sohbeti kapat',
    fallback: 'Şu an bağlantım koptu. Bize xdd@hotmail.com adresinden yazabilirsin.',
  },
  de: {
    placeholder: 'Frag ADO etwas…',
    send: 'Senden',
    close: 'Chat schliessen',
    fallback: 'Gerade kein Empfang. Schreib uns an xdd@hotmail.com.',
  },
};

type ChatTurn = { role: 'user' | 'assistant'; content: string };
type RobotControl = {
  setThinking: (on: boolean) => void;
  say: (text: string) => Promise<void>;
  poke: () => void;
};

type Palette = { brand: string; light: boolean };

function readPalette(): Palette {
  const root = document.documentElement;
  const brand = getComputedStyle(root).getPropertyValue('--brand').trim() || '#FF5A1F';
  return { brand, light: root.dataset.color === 'claude' };
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const damp = (cur: number, tgt: number, k: number, dt: number) => cur + (tgt - cur) * (1 - Math.exp(-k * dt));

/**
 * ADO Design'ın TV kafalı robotu. Fareyi (telefonda eğimi) takip eder,
 * tıklayınca konuşur, 3 hızlı tıklamada gıdıklanır, 15 sn hareketsizlikte uyur.
 * Renkleri sayfadaki --brand ve data-color="claude" değerlerinden alır.
 */
export function AdoRobot({
  lang = 'tr',
  muted = false,
  voicePath = '/voice/',
  chatEndpoint = '/api/chat',
  className,
  style,
}: AdoRobotProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const langRef = useRef(lang);
  const audioRef = useRef<RobotAudio | null>(null);
  const ctrlRef = useRef<RobotControl | null>(null);
  const openChatRef = useRef<() => void>(() => {});
  const historyRef = useRef<ChatTurn[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);

  langRef.current = lang;
  openChatRef.current = () => {
    if (!chatEndpoint) return;
    setChatOpen(true);
    // Telefonda klavye robotun üstünü kapatmasın diye otomatik odak yok
    if (!matchMedia('(pointer: coarse)').matches) window.setTimeout(() => inputRef.current?.focus(), 60);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
      if (muted) audioRef.current.stop();
    }
  }, [muted]);

  const txt = CHAT_TEXT[lang];

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const question = draft.trim();
    const ctrl = ctrlRef.current;
    if (!question || pending || !chatEndpoint || !ctrl) return;
    setDraft('');
    setPending(true);
    audioRef.current?.unlock();
    ctrl.setThinking(true);

    let reply = txt.fallback;
    try {
      const res = await fetch(chatEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, history: historyRef.current, lang }),
        signal: AbortSignal.timeout(CHAT_TIMEOUT_MS),
      });
      const data = (await res.json().catch(() => ({}))) as { reply?: unknown };
      if (typeof data.reply === 'string' && data.reply.trim()) reply = data.reply.trim();
      if (res.ok) {
        historyRef.current = [
          ...historyRef.current,
          { role: 'user' as const, content: question },
          { role: 'assistant' as const, content: reply },
        ].slice(-6);
      }
    } catch {
      // zaman aşımı / bağlantı yok → reply = fallback
    }
    setPending(false);
    window.setTimeout(() => inputRef.current?.focus(), 0);
    await ctrl.say(reply);
  };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const audio = new RobotAudio(voicePath);
    audio.muted = muted;
    audioRef.current = audio;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- Sahne ----------
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Shader-Fehlerpruefung nur lokal: sie wartet synchron auf jeden Shader und blockiert die Seite
    renderer.debug.checkShaderErrors = import.meta.env.DEV;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:manipulation;';
    host.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    // Umgebungslicht kommt asynchron (siehe compileAsync unten): fromScene uebersetzt sonst
    // seine Blur-/GGX-Shader synchron und blockiert das Handy ueber eine Sekunde
    let envTex: THREE.Texture | null = null;

    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
    camera.position.set(0, 0.1, 7.4);
    camera.lookAt(0, -0.14, 0);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x4a3a30, 0.9);
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(-3, 4, 5);
    const rim = new THREE.DirectionalLight(0xffffff, 2.2);
    rim.position.set(3, 2, -4);
    const screenGlow = new THREE.PointLight(0xffffff, 1.2, 3, 2);
    scene.add(hemi, key, rim);

    // ---------- Malzemeler ----------
    const shellMat = new THREE.MeshStandardMaterial({ roughness: 0.42, metalness: 0.05, envMapIntensity: 0.7 });
    const trimMat = new THREE.MeshStandardMaterial({ roughness: 0.55, metalness: 0.1, envMapIntensity: 0.5 });
    const bezelMat = new THREE.MeshStandardMaterial({ color: 0x0b0b0d, roughness: 0.35, metalness: 0.2 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xd9d9de, roughness: 0.18, metalness: 1 });
    const glowMat = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.3, emissiveIntensity: 2.2 });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, roughness: 0.04, metalness: 0, transparent: true, opacity: 0.08, clearcoat: 1, envMapIntensity: 1.4,
    });

    const faceCanvas = document.createElement('canvas');
    faceCanvas.width = FACE_W;
    faceCanvas.height = FACE_H;
    const faceCtx = faceCanvas.getContext('2d')!;
    const faceTex = new THREE.CanvasTexture(faceCanvas);
    faceTex.colorSpace = THREE.SRGBColorSpace;
    faceTex.anisotropy = 4;
    const screenMat = new THREE.MeshBasicMaterial({ map: faceTex, toneMapped: false });

    const logoCanvas = document.createElement('canvas');
    logoCanvas.width = logoCanvas.height = 256;
    const logoCtx = logoCanvas.getContext('2d')!;
    const logoTex = new THREE.CanvasTexture(logoCanvas);
    logoTex.colorSpace = THREE.SRGBColorSpace;
    const logoMat = new THREE.MeshStandardMaterial({ map: logoTex, transparent: true, roughness: 0.4 });

    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = shadowCanvas.height = 128;
    const sctx = shadowCanvas.getContext('2d')!;
    const sg = sctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    sg.addColorStop(0, 'rgba(0,0,0,0.45)');
    sg.addColorStop(1, 'rgba(0,0,0,0)');
    sctx.fillStyle = sg;
    sctx.fillRect(0, 0, 128, 128);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false });

    // ---------- Robot ----------
    const robot = new THREE.Group();
    scene.add(robot);
    const hitTargets: THREE.Object3D[] = [];
    const add = <T extends THREE.Object3D>(parent: THREE.Object3D, obj: T, hit = true) => {
      parent.add(obj);
      if (hit) hitTargets.push(obj);
      return obj;
    };

    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.1), shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -1.62;
    scene.add(shadow);

    const bodyGroup = add(robot, new THREE.Group(), false);
    const body = add(bodyGroup, new THREE.Mesh(new RoundedBoxGeometry(1.25, 0.95, 0.85, 5, 0.3), shellMat));
    body.position.y = -1.1;
    const logo = add(bodyGroup, new THREE.Mesh(new THREE.CircleGeometry(0.25, 48), logoMat));
    logo.position.set(0, -1.06, 0.431);

    // Kollar: omuzdan dönen gruplar
    const arms: THREE.Group[] = [];
    for (const side of [-1, 1]) {
      const pivot = add(bodyGroup, new THREE.Group(), false);
      pivot.position.set(side * 0.66, -0.8, 0);
      const arm = add(pivot, new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.38, 6, 12), trimMat));
      arm.position.y = -0.3;
      const hand = add(pivot, new THREE.Mesh(new THREE.SphereGeometry(0.13, 20, 16), shellMat));
      hand.position.y = -0.58;
      pivot.rotation.z = side * 0.18;
      arms.push(pivot);
    }

    // Boyun + yay
    const neck = add(bodyGroup, new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.32, 20), chromeMat));
    neck.position.y = -0.5;
    const helix = new THREE.CatmullRomCurve3(
      Array.from({ length: 80 }, (_, i) => {
        const a = (i / 79) * Math.PI * 2 * 5;
        return new THREE.Vector3(Math.cos(a) * 0.16, -0.64 + (i / 79) * 0.28, Math.sin(a) * 0.16);
      }),
    );
    add(bodyGroup, new THREE.Mesh(new THREE.TubeGeometry(helix, 240, 0.022, 6), trimMat));

    // Kafa (TV)
    const headPivot = add(robot, new THREE.Group(), false);
    headPivot.position.y = -0.36;
    const head = add(headPivot, new THREE.Group(), false);
    const shell = add(head, new THREE.Mesh(new RoundedBoxGeometry(1.6, 1.18, 1.05, 6, 0.2), shellMat));
    shell.position.y = 0.62;
    const bezel = add(head, new THREE.Mesh(new RoundedBoxGeometry(1.38, 0.99, 0.1, 4, 0.08), bezelMat));
    bezel.position.set(0, 0.62, 0.49);

    // Hafif bombeli CRT ekran
    const screenGeo = new THREE.PlaneGeometry(1.24, 0.86, 24, 16);
    const pos = screenGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i) / 0.62;
      const y = pos.getY(i) / 0.43;
      pos.setZ(i, 0.05 * (1 - x * x * 0.8) * (1 - y * y * 0.8));
    }
    screenGeo.computeVertexNormals();
    const screen = add(head, new THREE.Mesh(screenGeo, screenMat));
    screen.position.set(0, 0.62, 0.542);
    const glass = add(head, new THREE.Mesh(screenGeo, glassMat), false);
    glass.position.set(0, 0.62, 0.552);
    screenGlow.position.set(0, 0.62, 1.1);
    head.add(screenGlow);

    // Yan düğmeler
    for (const y of [0.86, 0.56]) {
      const knob = add(head, new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.07, 24), chromeMat));
      knob.rotation.z = Math.PI / 2;
      knob.position.set(0.82, y, 0.12);
    }
    // Arkada havalandırma çizgileri
    for (let i = 0; i < 4; i++) {
      const slot = add(head, new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.035, 0.02), bezelMat), false);
      slot.position.set(0, 0.42 + i * 0.13, -0.53);
    }

    // Antenler (yaylı)
    const antennaBase = add(head, new THREE.Mesh(new THREE.SphereGeometry(0.13, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), trimMat));
    antennaBase.position.y = 1.2;
    const antennas: { pivot: THREE.Group; base: number; x: number; v: number }[] = [];
    for (const side of [-1, 1]) {
      const pivot = add(head, new THREE.Group(), false);
      pivot.position.y = 1.24;
      const rod = add(pivot, new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.024, 0.46, 10), chromeMat));
      rod.position.y = 0.23;
      const tip = add(pivot, new THREE.Mesh(new THREE.SphereGeometry(0.065, 20, 16), glowMat));
      tip.position.y = 0.48;
      const base = side * 0.38;
      pivot.rotation.z = base;
      antennas.push({ pivot, base, x: 0, v: 0 });
    }

    // ---------- Tema ----------
    let palette = readPalette();
    const applyPalette = () => {
      palette = readPalette();
      const brand = new THREE.Color(palette.brand);
      shellMat.color.set(palette.light ? '#EDE4D6' : '#1c1c20');
      trimMat.color.set(palette.light ? '#211F1C' : '#2d2d33');
      glowMat.emissive.copy(brand);
      screenGlow.color.copy(brand);
      rim.color.copy(brand).lerp(new THREE.Color(0xffffff), 0.35);
      hemi.intensity = palette.light ? 1.1 : 0.8;
      drawLogo(logoCtx, 256, palette.light ? '#211F1C' : '#F2EEE8', palette.brand, palette.light ? '#F7F1E7' : '#111114');
      logoTex.needsUpdate = true;
    };
    applyPalette();
    const themeObserver = new MutationObserver(() => {
      applyPalette();
      glitch = 1;
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-color', 'style', 'class'] });

    // ---------- Durum ----------
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, has: false };
    const look = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0, active: false };
    let lastInput = performance.now();
    let hovered = false;
    let sleeping = false;
    let mood: Mood = 'idle';
    let glitch = 1; // açılışta kısa parazit
    let open = 1;
    let nextBlink = performance.now() + 1500;
    let blinkStart = -1;
    let mouth = 0;
    let talkBlend = 0;
    let bounceY = 0;
    let bounceV = 0;
    let tickleUntil = 0;
    let clicks: number[] = [];
    let greeted = false;
    let busy = false;
    let thinking = false; // yapay zekâ cevabı bekleniyor
    let answering = false; // cevap balonda, robot mırıldanıyor
    let visible = true;
    let prevYaw = 0;
    let bubbleTimer = 0;

    const showBubble = (text: string) => {
      const el = bubbleRef.current;
      if (!el) return;
      el.textContent = text;
      el.dataset.show = 'true';
      window.clearTimeout(bubbleTimer);
      bubbleTimer = window.setTimeout(() => {
        el.dataset.show = 'false';
      }, Math.max(1800, text.length * 70));
    };
    const hideBubble = () => {
      window.clearTimeout(bubbleTimer);
      if (bubbleRef.current) bubbleRef.current.dataset.show = 'false';
    };

    const speak = async (line: VoiceLine) => {
      busy = true;
      showBubble(VOICE_TEXT[langRef.current][line]);
      await audio.say(line, langRef.current);
      if (!audio.ready) await new Promise(r => setTimeout(r, 1400)); // sessizken de ağız bir süre oynasın
      busy = false;
    };

    // ---------- Etkileşim ----------
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const hitTest = (cx: number, cy: number) => {
      const r = renderer.domElement.getBoundingClientRect();
      if (cx < r.left || cx > r.right || cy < r.top || cy > r.bottom) return false;
      ndc.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      return raycaster.intersectObjects(hitTargets, false).length > 0;
    };

    const wake = () => {
      lastInput = performance.now();
      if (sleeping) {
        sleeping = false;
        glitch = 0.8;
        audio.beep('boot');
        return true;
      }
      return false;
    };

    // Sohbet kutusu robotu bu fonksiyonlarla yönetir
    ctrlRef.current = {
      poke: () => void wake(),
      setThinking: on => {
        wake();
        if (on) {
          audio.stop();
          hideBubble();
          glitch = Math.max(glitch, 0.35);
          // "Hmm, bir düşüneyim…" (Puck sesi); bitince düşünme yüzü
          busy = true;
          showBubble(VOICE_TEXT[langRef.current].dusun);
          void audio.say('dusun', langRef.current).then(() => {
            if (answering) return; // cevap çoktan geldi, onun akışına karışma
            busy = false;
            if (thinking) hideBubble();
          });
        }
        thinking = on;
      },
      say: async text => {
        thinking = false;
        answering = true;
        wake();
        audio.stop();
        busy = true;
        glitch = Math.max(glitch, 0.3);
        showBubble(text);
        // Cevap yazıyla balonda; robot kendi bip-bop diliyle mırıldanır
        if (audio.ready) await audio.babble(text);
        else await new Promise(r => setTimeout(r, Math.min(6000, 1200 + text.length * 30)));
        answering = false;
        busy = false;
        lastInput = performance.now();
      },
    };

    // Parmak: dokunulunca bir süre eğimden önce gelir
    let fingerAt = -Infinity;
    const onTouch = (e: TouchEvent) => {
      const tp = e.touches[0];
      if (!tp) return;
      pointer.x = tp.clientX;
      pointer.y = tp.clientY;
      pointer.has = true;
      fingerAt = performance.now();
      wake();
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.has = true;
      if (e.pointerType === 'mouse') tilt.active = false;
      else fingerAt = performance.now();
      wake();
      const onChat = !!(e.target as Element | null)?.closest?.('.ado-robot-chat');
      const h = e.pointerType === 'mouse' && !onChat && hitTest(e.clientX, e.clientY);
      if (h !== hovered) {
        hovered = h;
        host.style.cursor = h ? 'pointer' : '';
        if (h) audio.beep('hover');
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      audio.unlock(); // sayfada herhangi bir tıklama sesi açsın (hover bip'i için)
      if ((e.target as Element | null)?.closest?.('.ado-robot-chat')) return; // soru kutusu robot sayılmasın
      if (!hitTest(e.clientX, e.clientY)) return;
      requestTiltPermission();
      const wasAsleep = wake();
      bounceV = reduced ? 1.2 : 3.2;
      glitch = Math.max(glitch, 0.45);
      const now = performance.now();
      clicks = [...clicks.filter(t => now - t < 1300), now];
      if (thinking) return; // cevap beklenirken tıklama konuşmayı bozmasın
      if (wasAsleep) {
        void speak('uyandim');
      } else if (clicks.length >= 3) {
        clicks = [];
        tickleUntil = now + 1400;
        audio.stop();
        void speak('gidik');
      } else if (!busy) {
        audio.beep('click');
        void speak(greeted ? 'ado' : 'merhaba');
        greeted = true;
      }
      openChatRef.current();
    };

    // Telefon: eğim sensörü (iOS'ta izin ilk dokunuşta istenir)
    let tiltAsked = false;
    const requestTiltPermission = () => {
      if (tiltAsked) return;
      tiltAsked = true;
      const DOE = window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
      if (typeof DOE?.requestPermission === 'function') void DOE.requestPermission().catch(() => {});
    };
    // Cihazın tutuluş açısı yavaşça "düz" kabul edilir; masada, dik ya da yatay fark etmez
    const neutral = { x: 0, y: 0, set: false, at: 0 };
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      if (pointer.has && !matchMedia('(pointer: coarse)').matches) return;
      // Yatay ekranda eksenler yer değiştirir
      const angle = window.screen.orientation?.angle ?? 0;
      const rx = angle === 90 ? e.beta : angle === 270 || angle === -90 ? -e.beta : e.gamma;
      const ry = angle === 90 ? -e.gamma : angle === 270 || angle === -90 ? e.gamma : e.beta;
      const now = performance.now();
      if (!neutral.set) {
        neutral.x = rx;
        neutral.y = ry;
        neutral.set = true;
      } else {
        const k = 1 - Math.exp(-Math.min(now - neutral.at, 200) / 4000);
        neutral.x += (rx - neutral.x) * k;
        neutral.y += (ry - neutral.y) * k;
      }
      neutral.at = now;
      tilt.active = true;
      tilt.x = clamp((rx - neutral.x) / 20, -1, 1);
      tilt.y = clamp((ry - neutral.y) / 20, -1, 1);
      if (Math.abs(tilt.x) > 0.15) wake();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown);
    // iOS Safari sesi pointerdown'da değil, ancak dokunuş bitince (touchend/click) açar
    const unlockAudio = () => audio.unlock();
    window.addEventListener('touchend', unlockAudio);
    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', onTouch, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('deviceorientation', onOrientation);

    // ---------- Boyut / görünürlük ----------
    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // dar kutularda robot kesilmesin
      camera.fov = w / h < 0.8 ? 28 / Math.max(0.55, w / h / 0.8) : 28;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();
    // Shader im Hintergrund uebersetzen (KHR_parallel_shader_compile), erst dann zeichnen -
    // sonst blockiert das erste Bild den Hauptthread fuer Sekunden
    let compiled = false;
    let alive = true;
    const warmEnv = async () => {
      // PMREM-Materialien anlegen (interne Felder) und mit dem Raum zusammen im Hintergrund uebersetzen,
      // im selben Zustand wie fromScene: Ziel = Render-Target, ohne Tone-Mapping
      const gen = pmrem as unknown as {
        _setSize(n: number): void;
        _allocateTargets(): THREE.WebGLRenderTarget;
        _blurMaterial: THREE.Material;
        _ggxMaterial: THREE.Material;
        _lodMeshes: THREE.Mesh[];
      };
      gen._setSize(256);
      const rt = gen._allocateTargets();
      // dieselbe Geometrie wie PMREM (Attribute gehoeren zum Programm-Schluessel), sonst wird doch neu uebersetzt
      const geo = gen._lodMeshes[1]?.geometry ?? gen._lodMeshes[0].geometry;
      const warm = new THREE.Scene();
      for (const m of [gen._blurMaterial, gen._ggxMaterial]) if (m) warm.add(new THREE.Mesh(geo, m));
      const prevTone = renderer.toneMapping;
      const prevTarget = renderer.getRenderTarget();
      renderer.toneMapping = THREE.NoToneMapping;
      renderer.setRenderTarget(rt);
      const flat = new THREE.OrthographicCamera();
      const cube = new THREE.PerspectiveCamera(90, 1, 0.1, 100);
      const jobs = [renderer.compileAsync(warm, flat), renderer.compileAsync(room, cube)];
      renderer.toneMapping = prevTone;
      renderer.setRenderTarget(prevTarget);
      await Promise.all(jobs);
      rt.dispose();
    };
    warmEnv()
      .catch(() => {})
      .then(() => {
        if (!alive) return;
        envTex = pmrem.fromScene(room, 0.04).texture;
        scene.environment = envTex;
        return renderer.compileAsync(scene, camera);
      })
      .catch(() => {})
      .then(() => {
        if (!alive) return;
        compiled = true;
        startLoop();
      });
    const startLoop = () => {
      if (compiled && !raf && visible && !document.hidden) {
        timer.update();
        raf = requestAnimationFrame(frame);
      }
    };
    const stopLoop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) startLoop();
      else stopLoop();
    });
    io.observe(host);

    const onVisibility = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        lastInput = performance.now();
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    // ---------- Döngü ----------
    const timer = new THREE.Timer();
    let t = 0;
    let raf = 0;
    // Handy: hoechstens 30 Bilder/s - sieht gleich aus, halbiert die Rechenlast
    const minGap = window.matchMedia('(max-width: 719.98px)').matches ? 1000 / 30 - 2 : 0;
    let lastDraw = 0;
    const frame = (ts?: number) => {
      if (!visible || document.hidden) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
      const stamp = ts ?? performance.now();
      if (minGap && stamp - lastDraw < minGap) return;
      lastDraw = stamp;
      timer.update(ts);
      const dt = Math.min(timer.getDelta(), 0.05);
      t += dt;
      const now = performance.now();

      // Uyku
      if (!sleeping && now - lastInput > SLEEP_AFTER_MS && !busy && !thinking) {
        sleeping = true;
        audio.beep('sleep');
      }

      // Nereye bakıyor?
      let tx = 0;
      let ty = 0;
      if (sleeping) {
        tx = Math.sin(t * 0.3) * 0.1;
        ty = 0.55;
      } else if (tilt.active && now - fingerAt > FINGER_HOLD_MS) {
        tx = tilt.x;
        ty = tilt.y;
      } else if (pointer.has) {
        const r = host.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height * 0.4;
        tx = clamp((pointer.x - cx) / (window.innerWidth * 0.45), -1, 1);
        ty = clamp((pointer.y - cy) / (window.innerHeight * 0.45), -1, 1);
      }
      look.x = damp(look.x, tx, 7, dt);
      look.y = damp(look.y, ty, 7, dt);

      // Kafa ve gövde dönüşü
      const yaw = look.x * 0.62;
      headPivot.rotation.y = damp(headPivot.rotation.y, yaw, 6, dt);
      headPivot.rotation.x = damp(headPivot.rotation.x, look.y * 0.32, 6, dt);
      bodyGroup.rotation.y = damp(bodyGroup.rotation.y, yaw * 0.28, 4, dt);
      const tickling = now < tickleUntil;
      const shake = tickling && !reduced ? Math.sin(t * 38) * 0.09 : 0;
      headPivot.rotation.z = damp(headPivot.rotation.z, -look.x * 0.08 + shake, 10, dt);

      // Nefes + zıplama (yay)
      bounceV += (-60 * bounceY - 7 * bounceV) * dt;
      bounceY += bounceV * dt;
      const bob = sleeping ? Math.sin(t * 0.9) * 0.02 : Math.sin(t * 1.7) * (reduced ? 0.01 : 0.03);
      robot.position.y = bob + bounceY * 0.12;
      shadow.scale.setScalar(1 - (bob + bounceY * 0.12) * 0.6);

      // Antenler kafa dönüşüne göre sallanır
      const yawVel = (headPivot.rotation.y - prevYaw) / Math.max(dt, 1e-3);
      prevYaw = headPivot.rotation.y;
      for (const a of antennas) {
        const force = -70 * a.x - 5 * a.v - yawVel * 0.9 - bounceV * 0.15 * Math.sign(a.base);
        a.v += force * dt;
        a.x = clamp(a.x + a.v * dt, -0.6, 0.6);
        a.pivot.rotation.z = a.base + a.x + (tickling ? Math.sin(t * 30 + a.base * 9) * 0.2 : 0);
      }
      glowMat.emissiveIntensity = 1.6 + Math.sin(t * 3) * 0.4 + mouth * 2.5;

      // Konuşma
      const speaking = audio.speaking || busy;
      const level = audio.speaking ? audio.level() : busy ? 0.35 + 0.35 * Math.abs(Math.sin(t * 9)) : 0;
      mouth = damp(mouth, level, 18, dt);
      talkBlend = damp(talkBlend, speaking ? 1 : 0, 5, dt);
      const wave = Math.sin(t * 9) * 0.35;
      arms[1].rotation.z = 0.18 + talkBlend * (2.2 + wave);
      arms[0].rotation.z = -0.18 - (tickling ? 0.5 + Math.sin(t * 25) * 0.3 : 0);

      // Göz kırpma
      if (!sleeping && now > nextBlink && blinkStart < 0) blinkStart = now;
      if (blinkStart >= 0) {
        const p = (now - blinkStart) / 150;
        open = p >= 1 ? 1 : 1 - Math.sin(p * Math.PI);
        if (p >= 1) {
          blinkStart = -1;
          nextBlink = now + 1800 + Math.random() * 3500;
        }
      }

      mood = sleeping ? 'sleep' : tickling ? 'tickle' : thinking && !busy ? 'think' : speaking ? 'talk' : hovered ? 'happy' : 'idle';
      glitch = Math.max(0, glitch - dt * 1.6);

      const face: FaceState = {
        time: t,
        lookX: look.x,
        lookY: look.y,
        open,
        mood,
        mouth,
        glitch: glitch + (Math.random() < 0.004 ? 0.4 : 0),
        brand: palette.brand,
      };
      drawFace(faceCtx, face);
      faceTex.needsUpdate = true;
      screenGlow.intensity = sleeping ? 0.3 : 1 + mouth;

      renderer.render(scene, camera);
    };
    // erstes Bild kommt ueber startLoop, sobald die Shader fertig sind (compileAsync oben)

    return () => {
      stopLoop();
      document.removeEventListener('visibilitychange', onVisibility);
      window.clearTimeout(bubbleTimer);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('touchend', unlockAudio);
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('deviceorientation', onOrientation);
      themeObserver.disconnect();
      alive = false;
      ro.disconnect();
      io.disconnect();
      audio.dispose();
      audioRef.current = null;
      ctrlRef.current = null;
      scene.traverse(o => {
        if (o instanceof THREE.Mesh) o.geometry.dispose();
      });
      for (const m of [shellMat, trimMat, bezelMat, chromeMat, glowMat, glassMat, screenMat, logoMat, shadowMat]) m.dispose();
      for (const tex of [faceTex, logoTex, shadowTex]) tex.dispose();
      envTex?.dispose();
      room.dispose();
      timer.dispose();
      pmrem.dispose();
      renderer.dispose();
      // Kontext sofort freigeben: der Roboter wird bei jedem Seitenwechsel neu aufgebaut
      renderer.forceContextLoss();
      renderer.domElement.remove();
      host.style.cursor = '';
    };
    // Ses/dil değişince sahne yeniden kurulmasın; onlar ref ile okunuyor.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voicePath]);

  return (
    <div ref={hostRef} className={className} style={{ position: 'relative', ...style }}>
      <div ref={bubbleRef} className="ado-robot-bubble" data-show="false" aria-live="polite" />
      {chatEndpoint && chatOpen && (
        <form className="ado-robot-chat" onSubmit={submit} data-pending={pending}>
          <input
            ref={inputRef}
            value={draft}
            onChange={e => {
              setDraft(e.target.value);
              ctrlRef.current?.poke();
            }}
            placeholder={txt.placeholder}
            aria-label={txt.placeholder}
            maxLength={300}
            disabled={pending}
            enterKeyHint="send"
            autoComplete="off"
          />
          <button type="submit" className="ado-robot-chat-send" disabled={pending || !draft.trim()} aria-label={txt.send}>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M4 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="ado-robot-chat-close" onClick={() => setChatOpen(false)} aria-label={txt.close}>
            ×
          </button>
        </form>
      )}
    </div>
  );
}
