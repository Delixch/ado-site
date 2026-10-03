/*
 * Sprachneutrale Daten von adodesign.ch (Adodesign.ch/src/lib/projects.ts,
 * ReposSection.tsx, SkillsSection.tsx, AboutSection.tsx). Texte je Sprache
 * stehen in design-texts.ts, gleiche Reihenfolge.
 */

export const PROJECTS = [
  { number: '01', title: 'SAZCAR GmbH', url: 'https://sazcar.ch', tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'] },
  { number: '02', title: 'Happy Beck', url: 'https://superonline.ch', tech: ['React', 'TypeScript', 'Material UI', 'Responsive Web Design'] },
  { number: '03', title: 'Portfolie', url: 'https://lebenslauf-xi.vercel.app/', tech: ['React', 'Tailwind CSS', 'JavaScript', 'HTML', 'CSS'] },
  { number: '04', title: 'iPhone Shortcuts', url: 'https://superonline.vercel.app/', tech: ['React', 'Tailwind CSS', 'JavaScript', 'Responsive Design'] },
  { number: '05', title: 'Vokabeltrainer', url: 'https://vokabel-hazel.vercel.app/', tech: ['React', 'Tailwind CSS', 'AI Integration', 'Responsive Design'] },
  { number: '06', title: 'Portfolie EAydin', url: 'https://erenworks.vercel.app/', tech: ['HTML', 'SCSS', 'JavaScript', 'Motion Design'] },
  { number: '07', title: 'Eren Aydin Portfolie', url: 'https://erenaydin.ch', tech: ['TypeScript', 'GSAP', 'ScrollTrigger', 'SCSS', 'Vite'] },
  { number: '08', title: 'ADO 3D', url: 'https://adnanwalk.vercel.app/', tech: ['TypeScript', 'Supabase', 'Prompt Engineering', 'Vite'] },
  { number: '09', title: 'ADO — 3D Portfolio', url: 'https://adnanlebenslauf.vercel.app/', tech: ['Three.js', 'WebGL', 'GLSL', 'GSAP', 'Web Workers'] },
  { number: '10', title: 'ADO Insta', url: 'https://adoinsta.ai.studio/', tech: ['React', 'Express', 'Meta Graph API', 'Firestore'] },
  { number: '11', title: 'ADO AI', url: 'https://adodesign.ai.studio/', tech: ['React', 'TypeScript', 'Tailwind CSS', 'CLI (npx)'] },
  { number: '12', title: 'Ado-Vid Studio', url: 'https://reyhan-kz86.onrender.com/', tech: ['React', 'TypeScript', 'Video-Rendering'] },
  { number: '13', title: 'ADO Personal & Betrieb', url: '', tech: ['React', 'TypeScript', 'Tailwind CSS', 'KI-Assistent'] },
  { number: '14', title: 'ADO Firma', url: 'https://ado-firma.vercel.app/', tech: ['React', 'TypeScript', 'Tailwind CSS', 'Motion Design'] },
  { number: '15', title: 'ADO Management', url: '', tech: ['React', 'TypeScript', 'Offline-First', 'OCR'] },
];

export const REPOS = [
  { title: 'Aceternity UI', stars: 14200, link: 'https://ui.aceternity.com', commands: [{ cmd: 'npx shadcn@latest add card-hover-effect' }] },
  {
    title: 'Google Antigravity',
    stars: 28900,
    link: 'https://github.com/google',
    commands: [
      { kind: 'prompt', cmd: 'Erstelle eine responsive Navbar mit Dark Mode' },
      { kind: 'prompt', cmd: 'Finde und behebe den Bug in checkout.ts' },
      { kind: 'prompt', cmd: 'Schreibe Tests für alle Funktionen in utils.ts' },
    ],
  },
  { title: 'Framer Motion', stars: 24500, link: 'https://github.com/framer/motion', commands: [{ cmd: 'npm install framer-motion' }] },
  {
    title: 'WebAudio Sound Engine',
    stars: 8700,
    link: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API',
    commands: ['playClick()', 'playOpen()', 'playClose()', 'playChime()', 'playPrint()', 'playGlitch()'].map((cmd) => ({ cmd })),
  },
  { title: 'Three.js & WebGL', stars: 98000, link: 'https://github.com/mrdoob/three.js', commands: [{ cmd: 'npm install three' }] },
  { title: 'Supabase Backend', stars: 68000, link: 'https://github.com/supabase/supabase', commands: [{ cmd: 'npm install @supabase/supabase-js' }] },
  {
    title: 'Awesome MCP Servers',
    stars: 65000,
    link: 'https://github.com/punkpeye/awesome-mcp-servers',
    commands: [
      { cmd: 'npx -y @modelcontextprotocol/server-filesystem ~/Projekte' },
      { cmd: 'claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem ~/Projekte' },
    ],
  },
] as { title: string; stars: number; link: string; commands: { cmd: string; kind?: 'prompt' }[] }[];

export const SKILL_ITEMS = [
  ['Three.js', 'WebGL', 'GLSL', 'GSAP', 'ScrollTrigger'],
  ['TypeScript', 'React', 'Material UI', 'SCSS', 'Vite'],
  ['Supabase', 'PostgreSQL', 'MySQL / phpMyAdmin', 'PHP'],
  ['Prompt Engineering', 'Bild- & Videogenerierung', 'Serverbefehle', 'Automatisierung'],
];

export const ABOUT_STATS = [
  { value: 20, suffix: '+' },
  { value: 35, suffix: '' },
  { value: 3, suffix: '' },
  { value: 52, suffix: '' },
];

export const LAB_TAGS = ['WebGL', 'Three.js', 'AI Agents', 'GLSL Shaders', 'NextGen UI'];

export const SOCIAL = {
  instagram: 'https://www.instagram.com/adnanaydin53/',
  github: 'https://github.com/Delixch',
};
