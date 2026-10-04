// Vercel Serverless Function: Kontaktbrief direkt an info@ekado.ch (ueber Resend).
// POST {name, email, message, subject, page, lang, website} → {ok: true} | {error}
//
// RESEND_API_KEY nur aus der Umgebung (Vercel → Environment Variables), nie im Browser.
// Absender ist website@ekado.ch (Domain bei Resend verifiziert), "Antworten" geht an den Besucher.
// "website" ist ein unsichtbares Lockfeld: Bots fuellen es aus, Menschen nicht.
// Danach bekommt der Absender eine kurze Eingangsbestaetigung (DE/TR nach `lang`).
//
// Lokal bedient vite.config.ts denselben Weg ueber `handleContact`.

type Env = Record<string, string | undefined>;

const TO = 'info@ekado.ch';
const FROM = 'EKADO Website <website@ekado.ch>';
const LIMITS = { name: 120, email: 200, subject: 200, message: 5000, page: 60 };

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function handleContact(body: unknown, env: Env): Promise<{ status: number; json: unknown }> {
  const b = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>;
  // Bot: so tun, als waere alles gut, aber nichts senden
  if (str(b.website, 200)) return { status: 200, json: { ok: true } };

  const name = str(b.name, LIMITS.name);
  const email = str(b.email, LIMITS.email);
  const message = str(b.message, LIMITS.message);
  const subject = str(b.subject, LIMITS.subject) || `Anfrage · ${name}`;
  const page = str(b.page, LIMITS.page);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { status: 400, json: { error: 'invalid' } };

  const key = env.RESEND_API_KEY;
  if (!key) return { status: 503, json: { error: 'not_configured' } };

  const lang = b.lang === 'tr' ? 'tr' : 'de';
  const send = (mail: Record<string, unknown>) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(mail),
      signal: AbortSignal.timeout(10_000),
    });

  const text = `${message}\n\n— ${name} · ${email}${page ? `\nSeite: ${page}` : ''}`;
  try {
    const r = await send({ from: FROM, to: [TO], reply_to: `${name} <${email}>`, subject, text });
    if (!r.ok) return { status: 502, json: { error: 'send_failed' } };
  } catch {
    return { status: 502, json: { error: 'send_failed' } };
  }

  // Eingangsbestaetigung an den Absender. Bewusst ohne den Brieftext und ohne Links aus dem
  // Formular, damit niemand ueber das Formular fremde Inhalte an fremde Adressen schicken kann.
  try {
    await send({ from: REPLY_FROM, to: [email], reply_to: TO, ...autoReply(lang, safeName(name)) });
  } catch {
    // Brief ist angekommen; fehlt nur die Bestaetigung, ist das kein Fehler fuer den Besucher
  }
  return { status: 200, json: { ok: true } };
}

const REPLY_FROM = 'EKADO <info@ekado.ch>';

/** Name fuer die Anrede: ohne Adressen/Links, kurz. */
const safeName = (n: string) =>
  n
    .replace(/\S*(https?:|www\.|@|\.[a-z]{2,}\b)\S*/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 60);

function autoReply(lang: 'de' | 'tr', name: string) {
  if (lang === 'tr') {
    return {
      subject: 'Mesajınız bize ulaştı · EKADO',
      text: `${name ? `Merhaba ${name},` : 'Merhaba,'}\n\nmesajınız için teşekkürler. Talebiniz bize ulaştı, en kısa sürede size dönüş yapacağız.\n\nBu e-posta otomatik gönderildi. Eklemek istediğiniz bir şey varsa bu e-postayı yanıtlamanız yeterli.\n\nSevgilerle\nEKADO · Zürih\ninfo@ekado.ch · ekado.ch`,
    };
  }
  return {
    subject: 'Ihre Nachricht ist angekommen · EKADO',
    text: `${name ? `Guten Tag ${name}` : 'Guten Tag'}\n\nvielen Dank für Ihre Nachricht. Ihre Anfrage ist bei uns angekommen, wir melden uns so bald wie möglich bei Ihnen.\n\nDiese E-Mail wurde automatisch versendet. Möchten Sie noch etwas ergänzen, antworten Sie einfach auf diese E-Mail.\n\nHerzliche Grüsse\nEKADO · Zürich\ninfo@ekado.ch · ekado.ch`,
  };
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const { status, json } = await handleContact(req.body, process.env);
  return res.status(status).json(json);
}
