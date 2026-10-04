/**
 * Videos der Seite nach Vercel Blob hochladen (Store "ekado-media").
 * Die mp4-Dateien liegen nur lokal in public/ (nicht im Git, nicht in jedem Deployment);
 * die Seite laedt sie ueber MEDIA_BASE (src/config.ts) aus dem Blob-Store.
 *
 *   npm run media:upload            alle Videos unten
 *   npm run media:upload -- firma   nur Pfade, die "firma" enthalten
 *
 * Neues Video auf der Seite: Pfad hier eintragen und im Code media('/media/...') benutzen.
 * Braucht BLOB_READ_WRITE_TOKEN in .env.local (`vercel env pull`).
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const FILES = [
  'media/design/schreibtisch.mp4',
  'media/firma/plattform-de-claude.mp4',
  'media/firma/plattform-de-orange.mp4',
  'media/firma/plattform-de-amber.mp4',
  'media/firma/plattform-de-green.mp4',
  'media/firma/plattform-de-cyan.mp4',
  'media/insta/promo-de.mp4',
  'media/insta/promo-tr.mp4',
];

const env = Object.fromEntries(
  fs
    .readFileSync('.env.local', 'utf8')
    .split(/\r?\n/)
    .map((l) => l.match(/^([A-Z_]+)="?(.*?)"?$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2]]),
);
if (!env.BLOB_READ_WRITE_TOKEN) {
  console.error('BLOB_READ_WRITE_TOKEN fehlt in .env.local – erst "vercel env pull" ausfuehren.');
  process.exit(1);
}

const only = process.argv[2];
for (const f of FILES.filter((x) => !only || x.includes(only))) {
  const local = `public/${f}`;
  if (!fs.existsSync(local)) {
    console.log(`fehlt, uebersprungen: ${local}`);
    continue;
  }
  const mb = (fs.statSync(local).size / 1048576).toFixed(1);
  process.stdout.write(`${f} (${mb} MB) … `);
  // Kurzer Cache: ein neu gerendertes Video ist spaetestens nach einer Stunde ueberall
  execFileSync(
    'vercel',
    ['blob', 'put', local, '--pathname', f, '--access', 'public', '--allow-overwrite', 'true', '--cache-control-max-age', '3600'],
    { stdio: ['ignore', 'ignore', 'inherit'], shell: process.platform === 'win32', env: { ...process.env, BLOB_READ_WRITE_TOKEN: env.BLOB_READ_WRITE_TOKEN } },
  );
  console.log('ok');
}
