import type { Lang } from './ui';

/**
 * EKADO Firma "Ablaeufe": je Bereich nur der Ablauf in vier Schritten (keine Beispiel-Firmen).
 * Reihenfolge wie FIRMA_SECTIONS (Bestellungen, Einsatzplanung, Buchhaltung, Meldungen, Homepage, Personal).
 * Die alten Beispielseiten (FirmaOrders usw.) bleiben im Code - spaeter als "Beta".
 */
export interface FlowStep {
  t: string;
  d: string;
  /** Wer den Schritt macht. */
  who: string;
}

export interface FirmaFlowTexts {
  hint: string;
  areas: { lede: string; steps: FlowStep[] }[];
}

export const firmaFlow: Record<Lang, FirmaFlowTexts> = {
  de: {
    hint: 'Schritt anklicken für Details',
    areas: [
      {
        lede: 'Einmal erfassen, automatisch an den richtigen Lieferanten – ohne Telefon und Zettel.',
        steps: [
          { t: 'Bestellung erfassen', d: 'Ihr Team erfasst die Bestellung einmal in der App: Artikel, Menge, Lieferant.', who: 'Team' },
          { t: 'Automatisch versenden', d: 'Die App schickt die Bestellung per E-Mail an den richtigen Lieferanten. Ihre Lieferanten brauchen nichts Neues.', who: 'App' },
          { t: 'Bestätigung', d: 'Der Lieferant bestätigt, der Stand ist für alle sichtbar. Doppelte Bestellungen fallen weg.', who: 'Lieferant' },
          { t: 'Dokumentiert', d: 'Jede Bestellung bleibt digital abgelegt und jederzeit auffindbar.', who: 'App' },
        ],
      },
      {
        lede: 'Schichten, Urlaub, Krankheit und Überstunden an einem Ort – für alle sofort sichtbar.',
        steps: [
          { t: 'Plan erstellen', d: 'Schichten zentral planen und Aufgaben pro Einsatz hinterlegen.', who: 'Leitung' },
          { t: 'An alle verteilen', d: 'Ihre Mitarbeitenden sehen Arbeitstage und Einsatzzeiten sofort in der App, auch unterwegs.', who: 'App' },
          { t: 'Urlaub & Krankheit', d: 'Anträge und Krankmeldungen kommen über die App. Freigabe mit einem Klick, der Plan passt sich an.', who: 'Team' },
          { t: 'Überstunden', d: 'Stunden werden pro Person und Monat lückenlos festgehalten – ohne Listen.', who: 'App' },
        ],
      },
      {
        lede: 'Rechnungen kommen digital an, werden verbucht und termingerecht bezahlt.',
        steps: [
          { t: 'Rechnung kommt an', d: 'Lieferanten senden ihre Rechnungen direkt an die Buchhaltungs-App.', who: 'Lieferant' },
          { t: 'Zuordnen & verbuchen', d: 'Jede Rechnung wird automatisch zugeordnet und verbucht – ohne Abtippen, ohne Belegstapel.', who: 'App' },
          { t: 'Termingerecht zahlen', d: 'Die App führt die Zahlung pünktlich über Ihre Bank aus und dokumentiert sie.', who: 'Bank' },
          { t: 'Übersicht & MWST', d: 'Kosten jederzeit im Blick; die MWST-Abrechnung wird aus den Zahlen vorbereitet.', who: 'App' },
        ],
      },
      {
        lede: 'Pflichtmeldungen werden aus vorhandenen Daten vorbereitet und fristgerecht übermittelt.',
        steps: [
          { t: 'Daten liegen bereit', d: 'Löhne, Stunden und Personaldaten sind bereits in der Plattform erfasst.', who: 'App' },
          { t: 'Meldung vorbereiten', d: 'Quellensteuer, AHV, BVG, UVG und MWST werden automatisch vorbereitet.', who: 'App' },
          { t: 'Kontrolle', d: 'Sie sehen jederzeit, was gemeldet wird und wann die nächste Frist fällig ist.', who: 'Sie' },
          { t: 'Übermitteln', d: 'Die Meldung geht sicher und fristgerecht an die zuständige Stelle; der Nachweis wird abgelegt.', who: 'Amt' },
        ],
      },
      {
        lede: 'Eine Homepage, die zu Ihrem Betrieb passt – zuerst fürs Handy gebaut.',
        steps: [
          { t: 'Gespräch', d: 'Wir klären, was Ihr Betrieb zeigen will: Dienstleistungen, Produkte, Team und Kontakt.', who: 'Sie & wir' },
          { t: 'Entwurf', d: 'Wir gestalten die Seite passend zu Ihrem Auftritt, zuerst für das Handy.', who: 'Wir' },
          { t: 'Inhalte & Feinschliff', d: 'Texte und Bilder einsetzen und gemeinsam abstimmen.', who: 'Sie & wir' },
          { t: 'Live', d: 'Die Seite geht online. Spätere Änderungen übernehmen wir.', who: 'Wir' },
        ],
      },
      {
        lede: 'Vom Vertrag bis zum Austritt: alle Unterlagen digital an einem Ort.',
        steps: [
          { t: 'Vertrag', d: 'Arbeitsvertrag digital erstellen und unterschreiben.', who: 'Sie & Mitarbeitende' },
          { t: 'Anmeldung', d: 'Versicherungen und Eintrittsmeldungen werden angemeldet.', who: 'App' },
          { t: 'Ablage', d: 'Alle Unterlagen liegen zentral und digital im Personaldossier.', who: 'App' },
          { t: 'Austritt', d: 'Auch Austritte laufen geordnet und ohne Papier.', who: 'App' },
        ],
      },
    ],
  },
  tr: {
    hint: 'Ayrıntı için adıma dokunun',
    areas: [
      {
        lede: 'Bir kez girin, otomatik olarak doğru tedarikçiye gitsin – telefon ve kâğıt olmadan.',
        steps: [
          { t: 'Siparişi girin', d: 'Ekibiniz siparişi uygulamaya bir kez girer: ürün, miktar, tedarikçi.', who: 'Ekip' },
          { t: 'Otomatik gönderim', d: 'Uygulama siparişi e-postayla doğru tedarikçiye gönderir. Tedarikçilerinizin yeni bir şeye ihtiyacı yoktur.', who: 'Uygulama' },
          { t: 'Onay', d: 'Tedarikçi onaylar, durum herkes için görünür. Çift siparişler ortadan kalkar.', who: 'Tedarikçi' },
          { t: 'Kayıt altında', d: 'Her sipariş dijital olarak saklanır ve her an bulunur.', who: 'Uygulama' },
        ],
      },
      {
        lede: 'Vardiya, izin, hastalık ve fazla mesai tek yerde – herkes anında görür.',
        steps: [
          { t: 'Planı oluşturun', d: 'Vardiyaları tek yerden planlayın, her vardiyaya görevleri ekleyin.', who: 'Yönetim' },
          { t: 'Herkese iletin', d: 'Çalışanlarınız çalışma günlerini ve saatlerini hemen uygulamada görür, yolda da.', who: 'Uygulama' },
          { t: 'İzin ve hastalık', d: 'Talepler ve hastalık bildirimleri uygulamadan gelir. Tek tıkla onay, plan kendini uyarlar.', who: 'Ekip' },
          { t: 'Fazla mesai', d: 'Saatler kişi ve ay bazında eksiksiz kaydedilir – liste tutmadan.', who: 'Uygulama' },
        ],
      },
      {
        lede: 'Faturalar dijital gelir, işlenir ve zamanında ödenir.',
        steps: [
          { t: 'Fatura gelir', d: 'Tedarikçiler faturalarını doğrudan muhasebe uygulamasına gönderir.', who: 'Tedarikçi' },
          { t: 'Eşleştir ve işle', d: 'Her fatura otomatik olarak eşleştirilir ve işlenir – elle giriş yok, belge yığını yok.', who: 'Uygulama' },
          { t: 'Zamanında ödeme', d: 'Uygulama ödemeyi bankanız üzerinden zamanında yapar ve kaydeder.', who: 'Banka' },
          { t: 'Özet ve KDV', d: 'Giderler her an gözünüzün önünde; KDV (MWST) beyannamesi rakamlardan hazırlanır.', who: 'Uygulama' },
        ],
      },
      {
        lede: 'Zorunlu bildirimler mevcut verilerden hazırlanır ve zamanında iletilir.',
        steps: [
          { t: 'Veriler hazır', d: 'Maaşlar, saatler ve personel bilgileri zaten platformda kayıtlıdır.', who: 'Uygulama' },
          { t: 'Bildirimi hazırla', d: 'Stopaj vergisi, AHV, BVG, UVG ve KDV otomatik olarak hazırlanır.', who: 'Uygulama' },
          { t: 'Kontrol', d: 'Neyin bildirildiğini ve bir sonraki sürenin ne zaman dolduğunu her an görürsünüz.', who: 'Siz' },
          { t: 'İletim', d: 'Bildirim güvenle ve zamanında ilgili kuruma gider; belgesi saklanır.', who: 'Kurum' },
        ],
      },
      {
        lede: 'İşletmenize uyan bir ana sayfa – önce telefon için yapılır.',
        steps: [
          { t: 'Görüşme', d: 'İşletmenizin ne göstermek istediğini konuşuruz: hizmetler, ürünler, ekip ve iletişim.', who: 'Siz ve biz' },
          { t: 'Taslak', d: 'Sayfayı tarzınıza uygun, önce telefon için tasarlarız.', who: 'Biz' },
          { t: 'İçerik ve ince ayar', d: 'Metinleri ve görselleri yerleştirip birlikte netleştiririz.', who: 'Siz ve biz' },
          { t: 'Yayında', d: 'Sayfa yayına girer. Sonraki değişiklikleri biz yaparız.', who: 'Biz' },
        ],
      },
      {
        lede: 'Sözleşmeden işten çıkışa: tüm belgeler dijital ve tek yerde.',
        steps: [
          { t: 'Sözleşme', d: 'İş sözleşmesi dijital olarak hazırlanır ve imzalanır.', who: 'Siz ve çalışan' },
          { t: 'Kayıt', d: 'Sigortalar ve işe giriş bildirimleri yapılır.', who: 'Uygulama' },
          { t: 'Dosyalama', d: 'Tüm belgeler merkezi ve dijital olarak personel dosyasında durur.', who: 'Uygulama' },
          { t: 'Çıkış', d: 'İşten çıkışlar da düzenli ve kâğıtsız yürür.', who: 'Uygulama' },
        ],
      },
    ],
  },
};
