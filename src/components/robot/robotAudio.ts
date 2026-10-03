// Robot sesleri: bip-bop efektleri tarayıcıda üretilir (dosya yok),
// konuşmalar public/voice/*.mp3 dosyalarından çalınır. Konuşma bir
// AnalyserNode'dan geçer; ağız animasyonu ses seviyesini buradan okur.

export type VoiceLine = 'ado' | 'merhaba' | 'gidik' | 'uyandim' | 'dusun';
export type Lang = 'tr' | 'de';

// Gemini TTS (ses: Puck) + ffmpeg robot efekti. Dosya henüz yoksa ya da
// yüklenemezse FALLBACK_BEEP çalınır, robot yine de sessiz kalmaz.
const VOICE_FILES: Record<Lang, Record<VoiceLine, string>> = {
  tr: { ado: 'ado', merhaba: 'merhaba-tr', gidik: 'gidik-tr', uyandim: 'uyandim-tr', dusun: 'dusun-tr' },
  de: { ado: 'ado', merhaba: 'hallo-de', gidik: 'kitzel-de', uyandim: 'wach-de', dusun: 'dusun-de' },
};
const FALLBACK_BEEP: Partial<Record<VoiceLine, 'giggle' | 'think'>> = { gidik: 'giggle', dusun: 'think' };

export const VOICE_TEXT: Record<Lang, Record<VoiceLine, string>> = {
  tr: {
    ado: 'ADO Design!',
    merhaba: "Merhaba! Ben ADO Design'ın robotuyum.",
    gidik: 'Hihihi! Gıdıklanıyorum!',
    uyandim: 'Hmm? Uyandım!',
    dusun: 'Hmm, bir düşüneyim…',
  },
  de: {
    ado: 'ADO Design!',
    merhaba: 'Hallo! Willkommen bei ADO Design.',
    gidik: 'Hihihi! Das kitzelt!',
    uyandim: 'Hmm? Ich bin wach!',
    dusun: 'Hmm, lass mich kurz überlegen…',
  },
};

export class RobotAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private levelData: Uint8Array<ArrayBuffer> | null = null;
  private buffers = new Map<string, Promise<AudioBuffer>>();
  private current: AudioBufferSourceNode | null = null;
  private babbleNodes: OscillatorNode[] = [];
  private babbleEnd = 0;
  private lastBeep = 0;
  muted = false;

  constructor(private basePath = '/voice/') {}

  /** Tarayıcılar sesi ancak bir tıklamadan sonra açar; ilk tıklamada çağır. */
  unlock() {
    // iPhone: Sessiz-mod tuşu Web Audio'yu da kısar; 'playback' oturumu bunu aşar (iOS 17+)
    const session = (navigator as Navigator & { audioSession?: { type: string } }).audioSession;
    if (session) session.type = 'playback';
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.9;
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 512;
      this.levelData = new Uint8Array(this.analyser.fftSize);
      this.master.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    // iOS: kilidi ancak bir kaynak gerçekten çalınınca açar - sessiz tek örnek
    const src = this.ctx.createBufferSource();
    src.buffer = this.ctx.createBuffer(1, 1, 22050);
    src.connect(this.ctx.destination);
    src.start();
  }

  get ready() {
    return !!this.ctx && this.ctx.state === 'running' && !this.muted;
  }

  get speaking() {
    return !!this.current || this.babbling;
  }

  private get babbling() {
    return !!this.ctx && this.ctx.currentTime < this.babbleEnd;
  }

  /** 0..1 arası anlık ses seviyesi (ağız için). */
  level(): number {
    if (!this.analyser || !this.levelData || !this.speaking) return 0;
    this.analyser.getByteTimeDomainData(this.levelData);
    let sum = 0;
    for (let i = 0; i < this.levelData.length; i++) {
      const v = (this.levelData[i] - 128) / 128;
      sum += v * v;
    }
    return Math.min(1, Math.sqrt(sum / this.levelData.length) * 4);
  }

  private tone(freqs: number[], opts: { dur: number; type?: OscillatorType; gap?: number; vol?: number }) {
    if (!this.ready || !this.ctx || !this.master) return;
    const { dur, type = 'square', gap = 0, vol = 0.08 } = opts;
    let t = this.ctx.currentTime;
    for (const f of freqs) {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(f, t);
      osc.frequency.exponentialRampToValueAtTime(f * 1.25, t + dur);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(g).connect(this.master);
      osc.start(t);
      osc.stop(t + dur + 0.02);
      t += dur + gap;
    }
  }

  /**
   * Robot dilinde mırıldanma: metnin hecelerine göre kısa, perdesi oynayan
   * bip'ler. Yapay zekâ cevapları okunurken çalar (bedava, dosya gerekmez).
   * Bitince resolve olur; ses kapalıysa hemen döner.
   */
  async babble(text: string): Promise<void> {
    if (!this.ready || !this.ctx || !this.master) return;
    this.stop();
    const ctx = this.ctx;
    const words = text.split(/\s+/).filter(Boolean);
    let t = ctx.currentTime + 0.03;
    const end = t + Math.min(6, 0.6 + text.length * 0.028); // uzun cevapta en fazla 6 sn
    const base = 430 + Math.random() * 40;
    for (const word of words) {
      const syllables = Math.max(1, Math.min(4, Math.round(word.replace(/[^\p{L}]/gu, '').length / 3)));
      for (let s = 0; s < syllables && t < end; s++) {
        const dur = 0.055 + Math.random() * 0.045;
        const f = base * (0.8 + Math.random() * 0.55) * (/[?]$/.test(word) && s === syllables - 1 ? 1.35 : 1);
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = Math.random() < 0.5 ? 'square' : 'triangle';
        osc.frequency.setValueAtTime(f, t);
        osc.frequency.exponentialRampToValueAtTime(f * (0.85 + Math.random() * 0.4), t + dur);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.045, t + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        osc.connect(g).connect(this.master);
        osc.start(t);
        osc.stop(t + dur + 0.02);
        this.babbleNodes.push(osc);
        t += dur + 0.025;
      }
      t += 0.07; // kelime arası
      if (t >= end) break;
    }
    this.babbleEnd = t;
    await new Promise(r => setTimeout(r, Math.max(0, (t - ctx.currentTime) * 1000)));
    this.babbleNodes = [];
  }

  beep(kind: 'hover' | 'click' | 'boot' | 'sleep' | 'giggle' | 'think') {
    const now = performance.now();
    if (kind === 'hover' && now - this.lastBeep < 400) return;
    this.lastBeep = now;
    switch (kind) {
      case 'hover': return this.tone([1046, 1568], { dur: 0.05, gap: 0.02, type: 'sine', vol: 0.06 });
      case 'click': return this.tone([523, 784], { dur: 0.06, gap: 0.01, vol: 0.05 });
      case 'boot': return this.tone([392, 523, 659, 1046], { dur: 0.07, gap: 0.015, type: 'triangle', vol: 0.07 });
      case 'sleep': return this.tone([880, 659, 440], { dur: 0.12, gap: 0.03, type: 'sine', vol: 0.05 });
      case 'giggle': return this.tone([1318, 1174, 1318, 1174, 1568], { dur: 0.06, gap: 0.03, type: 'triangle', vol: 0.07 });
      case 'think': return this.tone([392, 440, 392, 523], { dur: 0.09, gap: 0.06, type: 'sine', vol: 0.05 });
    }
  }

  private load(name: string) {
    let p = this.buffers.get(name);
    if (!p && this.ctx) {
      const ctx = this.ctx;
      p = fetch(`${this.basePath}${name}.mp3`)
        .then(r => {
          if (!r.ok) throw new Error(`${name}.mp3 yok`);
          return r.arrayBuffer();
        })
        .then(b => ctx.decodeAudioData(b));
      this.buffers.set(name, p);
    }
    return p;
  }

  /** Konuşur; bitince resolve olur. Ses kapalıysa hemen döner. */
  async say(line: VoiceLine, lang: Lang): Promise<void> {
    // İlk tıklamada AudioContext henüz 'suspended' olabilir; açılmasını bekle,
    // yoksa ilk "Merhaba" sessizce atlanır.
    if (this.ctx?.state === 'suspended' && !this.muted) await this.ctx.resume().catch(() => {});
    if (!this.ready || !this.ctx || !this.master) return;
    const buf = await this.load(VOICE_FILES[lang][line])?.catch(() => null);
    if (!buf) {
      // Kayıt yok: bip ile idare et
      const fb = FALLBACK_BEEP[line];
      if (fb) {
        this.beep(fb);
        await new Promise(r => setTimeout(r, 600));
      }
      return;
    }
    if (!this.ready) return;
    this.current?.stop();
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.connect(this.master);
    this.current = src;
    await new Promise<void>(resolve => {
      src.onended = () => {
        if (this.current === src) this.current = null;
        resolve();
      };
      src.start();
    });
  }

  stop() {
    this.current?.stop();
    this.current = null;
    for (const o of this.babbleNodes) {
      try {
        o.stop();
      } catch {
        // henüz başlamamış olabilir
      }
    }
    this.babbleNodes = [];
    this.babbleEnd = 0;
  }

  dispose() {
    this.stop();
    void this.ctx?.close();
    this.ctx = null;
  }
}
