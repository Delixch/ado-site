import fs from 'node:fs';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { handleChat } from './api/chat';
import { handleContact } from './api/contact';

/**
 * Lokal: /api/chat und /api/contact wie auf Vercel bedienen, damit Roboter und
 * Kontaktbrief auch im Dev-Server funktionieren. Schluessel kommen aus .env.local
 * (ohne VITE_-Praefix, also nie im Browser-Bundle). Auf Vercel: api/*.ts als Serverless Functions.
 */
function localApi(): Plugin {
  return {
    name: 'ado-local-api',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '');
      const route = (url: string, run: (body: unknown, ip: string) => Promise<{ status: number; json: unknown }>) =>
        server.middlewares.use(url, async (req, res) => {
          const send = (status: number, json: unknown) => {
            res.statusCode = status;
            res.setHeader('content-type', 'application/json; charset=utf-8');
            res.end(JSON.stringify(json));
          };
          if (req.method !== 'POST') return send(405, { error: 'method_not_allowed' });
          let raw = '';
          for await (const chunk of req) {
            raw += chunk;
            if (raw.length > 20_000) return send(413, { error: 'too_large' });
          }
          let body: unknown = null;
          try {
            body = JSON.parse(raw);
          } catch {
            return send(400, { error: 'invalid_json' });
          }
          const { status, json } = await run(body, req.socket.remoteAddress ?? 'local');
          send(status, json);
        });
      route('/api/chat', (body, ip) => handleChat(body, env, ip));
      route('/api/contact', (body) => handleContact(body, env));
    },
  };
}

/**
 * Namen der Farben (@tr / @de im Kopf jeder src/styles/colors/*.css) schon beim Bauen lesen,
 * statt alle Theme-Dateien als Text ins Haupt-Bundle zu packen. Neue Datei = neue Farbe bleibt.
 */
function colorNames(): Plugin {
  const id = 'virtual:color-names';
  const dir = path.resolve(__dirname, 'src/styles/colors');
  const pick = (src: string, tag: string, fallback: string) =>
    src.match(new RegExp(String.raw`@${tag}\s+([^*\n]+)`))?.[1].trim() || fallback;
  const vid = `\0${id}`;
  return {
    name: 'ado-color-names',
    resolveId: (i) => (i === id ? vid : undefined),
    load(i) {
      if (i !== vid) return;
      // Einzelne Dateien beobachten: ein Ordner landet im Dev-Modus als Import im Modulgraph
      const list = fs
        .readdirSync(dir)
        .filter((f) => f.endsWith('.css'))
        .map((f) => {
          this.addWatchFile(path.join(dir, f));
          const src = fs.readFileSync(path.join(dir, f), 'utf8');
          const cid = f.replace(/\.css$/, '');
          return { id: cid, name: { tr: pick(src, 'tr', cid), de: pick(src, 'de', cid) } };
        });
      return `export default ${JSON.stringify(list)};`;
    },
  };
}

export default defineConfig({
  plugins: [react(), localApi(), colorNames()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
