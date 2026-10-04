// Vercel Serverless Function: Kontaktbrief direkt an info@ekado.ch (ueber Resend).
// POST {name, email, message, subject, page, lang, pkg, website} → {ok: true} | {error}
//
// RESEND_API_KEY nur aus der Umgebung (Vercel → Environment Variables), nie im Browser.
// Absender ist website@ekado.ch (Domain bei Resend verifiziert), "Antworten" geht an den Besucher.
// "website" ist ein unsichtbares Lockfeld: Bots fuellen es aus, Menschen nicht.
// Danach bekommt der Absender eine kurze Eingangsbestaetigung (DE/TR nach `lang`, mit Paketinfo nach `pkg`).
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
    await send({ from: REPLY_FROM, to: [email], reply_to: TO, ...autoReply(lang, safeName(name), str(b.pkg, 40)) });
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

type Lang = 'de' | 'tr';
type Pack = { name: string; lines: string[] };

/**
 * Paketteil der Eingangsbestaetigung. Der Schluessel kommt vom Brief (`pkg`), die Texte
 * stehen nur hier - aus dem Formular landet nichts davon in der Mail.
 * Preise/Dauer wie auf der Seite (src/content/insta-texts.ts, firma-texts.ts).
 */
const PACKS: Record<string, Record<Lang, Pack>> = {
  'firma-start': {
    de: {
      name: 'EKADO Firma · Paket Start',
      lines: [
        'Enthalten: Bestellungen & Tische, Einsatz- und Dienstplanung, Stempeluhr am Handy – alles in der Schweiz gehostet.',
        'Als Nächstes zeigen wir Ihnen die Plattform in einem kurzen Gespräch live.',
        'Hilfreich für uns: wie viele Mitarbeitende Sie haben und wie Sie Bestellungen und Schichten heute organisieren.',
      ],
    },
    tr: {
      name: 'EKADO Firma · Başlangıç (Start) paketi',
      lines: [
        'İçerik: siparişler ve masalar, vardiya planı, telefondan mesai kaydı – hepsi İsviçre’de barındırılır.',
        'Sıradaki adım: kısa bir görüşmede platformu size canlı gösteriyoruz.',
        'Bize yardımcı olur: kaç çalışanınız olduğu ve siparişleri, vardiyaları bugün nasıl düzenlediğiniz.',
      ],
    },
  },
  'firma-betrieb': {
    de: {
      name: 'EKADO Firma · Paket Betrieb',
      lines: [
        'Enthalten: alles aus Start, dazu Tageskasse & Buchhaltung, MWST-Vorbereitung, HACCP- und Reinigungsnachweise sowie Rollen & Rechte.',
        'Als Nächstes zeigen wir Ihnen die Plattform in einem kurzen Gespräch live.',
        'Hilfreich für uns: wie Sie heute Tagesabschluss und Buchhaltung machen und ob Sie mit einem Treuhänder arbeiten.',
      ],
    },
    tr: {
      name: 'EKADO Firma · Operasyon (Betrieb) paketi',
      lines: [
        'İçerik: Başlangıç paketinin tamamı, ayrıca günlük kasa ve muhasebe, KDV hazırlığı, HACCP ve temizlik kayıtları, roller ve yetkiler.',
        'Sıradaki adım: kısa bir görüşmede platformu size canlı gösteriyoruz.',
        'Bize yardımcı olur: gün sonu kapanışını ve muhasebeyi bugün nasıl yaptığınız, bir mali müşavirle çalışıp çalışmadığınız.',
      ],
    },
  },
  'firma-komplett': {
    de: {
      name: 'EKADO Firma · Paket Komplett',
      lines: [
        'Enthalten: alles aus Betrieb, dazu Ihre eigene Website mit Reservierung, Google-Maps-Optimierung und die persönliche Einrichtung vor Ort.',
        'Als Nächstes vereinbaren wir ein Gespräch und schauen uns Ihren Betrieb gemeinsam an.',
        'Hilfreich für uns: Ihre bisherige Website oder Domain, Logo und Fotos sowie welche Kasse Sie verwenden.',
      ],
    },
    tr: {
      name: 'EKADO Firma · Tam Paket (Komplett)',
      lines: [
        'İçerik: Operasyon paketinin tamamı, ayrıca rezervasyonlu kendi web siteniz, Google Haritalar optimizasyonu ve yerinde kişisel kurulum.',
        'Sıradaki adım: bir görüşme ayarlayıp işletmenize birlikte bakıyoruz.',
        'Bize yardımcı olur: mevcut web siteniz ya da domaininiz, logonuz ve fotoğraflarınız, kullandığınız kasa sistemi.',
      ],
    },
  },
  'insta-start': {
    de: {
      name: 'EKADO InstaOto · Paket Start (CHF 290.– einmalig)',
      lines: [
        'Dauer: ca. 3 Arbeitstage, sobald Ihre Meta-Konten bereit sind.',
        'Bitte prüfen Sie vorab: Instagram-Profikonto mit verknüpfter Facebook-Seite, Meta Business-Portfolio mit Zwei-Faktor-Anmeldung, Firma bei Meta verifiziert.',
        'Hilfreich für uns: Ihr Instagram-Name sowie erste Stichwörter, Antworten und Links.',
      ],
    },
    tr: {
      name: 'EKADO InstaOto · Start paketi (CHF 290.– tek sefer)',
      lines: [
        'Süre: Meta hesaplarınız hazır olduğunda yaklaşık 3 iş günü.',
        'Lütfen önceden kontrol edin: Facebook sayfasına bağlı Instagram profesyonel hesap, iki adımlı girişli Meta Business Portfolio, Meta’da doğrulanmış firma.',
        'Bize yardımcı olur: Instagram kullanıcı adınız ve ilk kelimeler, cevaplar, linkler.',
      ],
    },
  },
  'insta-komplett': {
    de: {
      name: 'EKADO InstaOto · Paket Komplett (CHF 490.– einmalig)',
      lines: [
        'Dauer: ca. 1–2 Wochen – auch alles bei Meta erledigen wir für Sie.',
        'Bitte halten Sie bereit: Handelsregisterauszug oder UID sowie die E-Mail-Adressen Ihres Teams.',
        'Hilfreich für uns: Ihr Instagram-Name sowie erste Stichwörter und Antworten.',
      ],
    },
    tr: {
      name: 'EKADO InstaOto · Komplett paketi (CHF 490.– tek sefer)',
      lines: [
        'Süre: yaklaşık 1–2 hafta – Meta tarafındaki her şeyi de biz hallediyoruz.',
        'Lütfen hazır bulundurun: ticaret sicil kaydı ya da UID ve ekibinizin e-posta adresleri.',
        'Bize yardımcı olur: Instagram kullanıcı adınız ve ilk kelimeler, cevaplar.',
      ],
    },
  },
  'insta-basis': {
    de: {
      name: 'EKADO InstaOto · Betreuung Basis (CHF 39.– / Monat)',
      lines: [
        'Enthalten: Antwort innert 48 Stunden, eine kleine Änderung pro Monat und Anpassung an Änderungen von Meta.',
        'Voraussetzung ist ein eingerichtetes InstaOto. Falls noch nicht vorhanden, beginnen wir mit Start oder Komplett.',
      ],
    },
    tr: {
      name: 'EKADO InstaOto · Basis bakım paketi (CHF 39.– / ay)',
      lines: [
        'İçerik: 48 saat içinde cevap, ayda bir küçük değişiklik ve Meta’daki değişikliklere uyarlama.',
        'Ön koşul kurulu bir InstaOto’dur. Henüz yoksa Start ya da Komplett ile başlıyoruz.',
      ],
    },
  },
  'insta-plus': {
    de: {
      name: 'EKADO InstaOto · Betreuung Plus (CHF 79.– / Monat)',
      lines: [
        'Enthalten: alles aus Basis, dazu kleine Änderungen ohne Limit, neue Abläufe und Antwort innert 24 Stunden.',
        'Voraussetzung ist ein eingerichtetes InstaOto. Falls noch nicht vorhanden, beginnen wir mit Start oder Komplett.',
      ],
    },
    tr: {
      name: 'EKADO InstaOto · Plus bakım paketi (CHF 79.– / ay)',
      lines: [
        'İçerik: Basis’in tamamı, ayrıca sınırsız küçük değişiklik, yeni akışlar ve 24 saat içinde cevap.',
        'Ön koşul kurulu bir InstaOto’dur. Henüz yoksa Start ya da Komplett ile başlıyoruz.',
      ],
    },
  },
  intro: {
    de: {
      name: 'Kostenloses Erstgespräch (15 Min.)',
      lines: ['Wir schlagen Ihnen per E-Mail passende Termine vor. Das Gespräch ist kostenlos und unverbindlich.'],
    },
    tr: {
      name: 'Ücretsiz ön görüşme (15 dk.)',
      lines: ['Size e-postayla uygun saatler öneriyoruz. Görüşme ücretsiz ve bağlayıcı değil.'],
    },
  },
};

function autoReply(lang: Lang, name: string, pkg: string) {
  const pack = PACKS[pkg]?.[lang];
  const block = pack ? `\n\n${pack.name}\n${pack.lines.map((l) => `– ${l}`).join('\n')}` : '';
  if (lang === 'tr') {
    return {
      subject: pack ? `Talebiniz: ${pack.name}` : 'Mesajınız bize ulaştı · EKADO',
      text: `${name ? `Merhaba ${name},` : 'Merhaba,'}\n\n${pack ? 'talebiniz için teşekkürler, bize ulaştı.' : 'mesajınız için teşekkürler, bize ulaştı.'}${block}\n\nEn kısa sürede size dönüş yapacağız.\n\nBu e-posta otomatik gönderildi. Eklemek istediğiniz bir şey varsa bu e-postayı yanıtlamanız yeterli.\n\nSevgilerle\nEKADO · Zürih\ninfo@ekado.ch · ekado.ch`,
    };
  }
  return {
    subject: pack ? `Ihre Anfrage: ${pack.name}` : 'Ihre Nachricht ist angekommen · EKADO',
    text: `${name ? `Guten Tag ${name}` : 'Guten Tag'}\n\n${pack ? 'vielen Dank für Ihre Anfrage, sie ist bei uns angekommen.' : 'vielen Dank für Ihre Nachricht, sie ist bei uns angekommen.'}${block}\n\nWir melden uns so bald wie möglich bei Ihnen.\n\nDiese E-Mail wurde automatisch versendet. Möchten Sie noch etwas ergänzen, antworten Sie einfach auf diese E-Mail.\n\nHerzliche Grüsse\nEKADO · Zürich\ninfo@ekado.ch · ekado.ch`,
  };
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const { status, json } = await handleContact(req.body, process.env);
  return res.status(status).json(json);
}
