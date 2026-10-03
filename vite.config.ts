import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { handleChat } from './api/chat';

/**
 * Lokal: /api/chat wie auf Vercel bedienen, damit der Roboter auch im
 * Dev-Server antwortet. Schluessel kommen aus .env.local (ohne VITE_-Praefix,
 * also nie im Browser-Bundle). Auf Vercel: api/chat.ts als Serverless Function.
 */
function chatApi(): Plugin {
  return {
    name: 'ado-chat-api',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '');
      server.middlewares.use('/api/chat', async (req, res) => {
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
        const { status, json } = await handleChat(body, env, req.socket.remoteAddress ?? 'local');
        send(status, json);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), chatApi()],
});
