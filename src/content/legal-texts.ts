import type { Lang } from './ui';

/** Impressum und Datenschutz der ganzen Seite (Dialog aus der Fusszeile).
 *  Platzhalter {name} {person} {street} {zipCity} {country} {email} {uid}
 *  kommen aus content/company.ts. Nur beschreiben, was diese Seite wirklich tut. */
type Section = { heading: string; lines: string[] };

export type LegalTexts = {
  impressum: string;
  privacy: string;
  impressumTitle: string;
  privacyTitle: string;
  close: string;
  credits: string;
  country: string;
  bindingNote: string;
  placeholders: { name: string; street: string; zipCity: string };
  impressumSections: Section[];
  privacyUpdated: string;
  privacySections: Section[];
};

const de: LegalTexts = {
  impressum: 'Impressum',
  privacy: 'Datenschutz',
  impressumTitle: 'Impressum',
  privacyTitle: 'Datenschutzerklärung',
  close: 'Schliessen',
  credits: 'Bildnachweis',
  country: 'Schweiz',
  bindingNote: '',
  placeholders: { name: 'Musterfirma', street: 'Musterstrasse 1', zipCity: '8000 Zürich' },
  impressumSections: [
    {
      heading: 'Kontaktadresse',
      lines: ['{name}\nVerantwortliche Person: {person}\n{street}\n{zipCity}\n{country}', 'E-Mail: {email}', 'UID: {uid}'],
    },
    {
      heading: 'Haftungsausschluss',
      lines: [
        'Wir prüfen die Inhalte dieser Website sorgfältig. Für Richtigkeit, Aktualität und Vollständigkeit übernehmen wir dennoch keine Gewähr. Haftungsansprüche wegen Schäden, die aus dem Zugriff auf die Inhalte, aus deren Nutzung oder Nichtnutzung oder aus technischen Störungen entstehen, sind ausgeschlossen, soweit das Gesetz dies zulässt.',
        'Alle Angebote sind unverbindlich. Wir können Teile der Seite oder das gesamte Angebot ohne besondere Ankündigung ändern, ergänzen oder entfernen.',
      ],
    },
    {
      heading: 'Haftung für Links',
      lines: ['Links auf Websites Dritter liegen ausserhalb unseres Verantwortungsbereichs. Zugriff und Nutzung erfolgen auf eigene Gefahr.'],
    },
    {
      heading: 'Urheberrechte',
      lines: [
        'Texte, Gestaltung, Videos und Programmcode dieser Website gehören {name} oder den jeweiligen Rechteinhabern. Jede Wiedergabe braucht vorab unsere schriftliche Zustimmung.',
        'Die Fotos stammen von Unsplash und stehen unter der Unsplash-Lizenz. Die Fotografinnen und Fotografen stehen im Bildnachweis unten.',
      ],
    },
    {
      heading: 'Beispieldaten',
      lines: ['Namen, Firmen, Nachrichten, Zahlen und Beträge in den Beispielansichten (ADO Firma, ADO InstaOto) sind frei erfunden und dienen nur der Veranschaulichung. Ähnlichkeiten mit tatsächlichen Personen oder Unternehmen sind zufällig.'],
    },
  ],
  privacyUpdated: 'Stand: Oktober 2026',
  privacySections: [
    {
      heading: 'Verantwortliche Stelle',
      lines: ['Verantwortlich für die Bearbeitung von Personendaten auf dieser Website ist:', '{name}\n{street}\n{zipCity}\n{country}', 'E-Mail: {email}'],
    },
    {
      heading: 'Grundsatz',
      lines: ['Wir bearbeiten Personendaten nach dem schweizerischen Datenschutzgesetz (DSG) und, soweit anwendbar, nach der EU-Datenschutz-Grundverordnung (DSGVO). Diese Website braucht keine Anmeldung und erhebt nur, was für ihren Betrieb technisch nötig ist.'],
    },
    {
      heading: 'Hosting und Server-Protokolle',
      lines: [
        'Diese Website wird bei Vercel Inc. (USA) betrieben. Bei jedem Aufruf werden technisch notwendige Angaben automatisch protokolliert: IP-Adresse, Datum und Uhrzeit, aufgerufene Datei, Browser und Betriebssystem. Diese Daten dienen dem sicheren Betrieb und werden nicht mit anderen Daten zusammengeführt.',
        'Dabei können Daten in die USA übermittelt werden. Die Übermittlung stützt sich auf anerkannte Garantien wie das Swiss-U.S. Data Privacy Framework oder Standardvertragsklauseln.',
      ],
    },
    {
      heading: 'Schriftarten von Google',
      lines: ['Für die Schriften lädt diese Website Dateien von Google Fonts (Google Ireland Limited bzw. Google LLC, USA). Dabei übermittelt Ihr Browser Ihre IP-Adresse an Google. Weitere Informationen: policies.google.com/privacy.'],
    },
    {
      heading: 'Kontakt per E-Mail',
      lines: ['Die Briefe auf den Kontakt- und Anfrageseiten öffnen Ihr eigenes E-Mail-Programm; über diese Website wird dabei nichts übertragen. Erst wenn Sie die E-Mail absenden, erhalten wir Ihren Namen, Ihre Kontaktangaben und Ihre Nachricht. Wir verwenden sie nur für Ihre Anfrage und löschen sie, sobald sie dafür nicht mehr nötig sind und keine Aufbewahrungspflicht besteht.'],
    },
    {
      heading: 'Speicherung im Browser',
      lines: ['Diese Website setzt keine Cookies und keine Besucherstatistik ein. Sprache, Farbthema, zuletzt geöffnete Seite, Lichtband-Einstellung und ein selbst gewähltes Profilfoto werden nur im lokalen Speicher Ihres Browsers (localStorage) abgelegt. Diese Angaben verlassen Ihr Gerät nicht und lassen sich jederzeit über die Browsereinstellungen löschen.'],
    },
    {
      heading: 'Bilder, Videos und Beispiele',
      lines: ['Alle Fotos und Videos liegen auf unserem eigenen Server; Video- oder Bilddienste Dritter werden nicht eingebunden. Die Chat-Vorschau von ADO InstaOto läuft nur in Ihrem Browser; Ihre Eingaben werden weder übertragen noch gespeichert.'],
    },
    {
      heading: 'ADO InstaOto und ADO Firma',
      lines: ['Diese Website stellt die Produkte nur vor. Für Kundinnen und Kunden, die ADO InstaOto oder ADO Firma nutzen, gelten zusätzlich die Datenschutzhinweise im jeweiligen Kundenbereich.'],
    },
    {
      heading: 'Datensicherheit',
      lines: ['Die Verbindung zu dieser Website ist per HTTPS (TLS) verschlüsselt.'],
    },
    {
      heading: 'Ihre Rechte',
      lines: [
        'Sie können jederzeit Auskunft über Ihre Personendaten verlangen, deren Berichtigung, Löschung oder Herausgabe fordern und einer Bearbeitung widersprechen. Schreiben Sie uns dazu an {email}.',
        'Zudem können Sie sich bei der zuständigen Aufsichtsbehörde beschweren – in der Schweiz beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB, www.edoeb.admin.ch).',
      ],
    },
    {
      heading: 'Änderungen',
      lines: ['Wir passen diese Datenschutzerklärung an, wenn sich die Website oder die rechtlichen Grundlagen ändern. Es gilt die hier veröffentlichte Fassung.'],
    },
  ],
};

const tr: LegalTexts = {
  impressum: 'Künye',
  privacy: 'Gizlilik',
  impressumTitle: 'Künye (Impressum)',
  privacyTitle: 'Gizlilik Politikası',
  close: 'Kapat',
  credits: 'Görsel kaynakçası',
  country: 'İsviçre',
  bindingNote: 'Bu çeviri bilgi amaçlıdır; hukuken Almanca metin geçerlidir.',
  placeholders: { name: 'Örnek Firma', street: 'Örnek Cadde 1', zipCity: '8000 Zürih' },
  impressumSections: [
    {
      heading: 'İletişim adresi',
      lines: ['{name}\nSorumlu kişi: {person}\n{street}\n{zipCity}\n{country}', 'E-posta: {email}', 'UID: {uid}'],
    },
    {
      heading: 'Sorumluluk reddi',
      lines: [
        'Bu sitenin içeriklerini özenle kontrol ediyoruz; yine de doğruluk, güncellik ve eksiksizlik için garanti vermiyoruz. İçeriklere erişimden, bunların kullanılmasından ya da kullanılmamasından veya teknik arızalardan doğan zararlar için, yasanın izin verdiği ölçüde sorumluluk kabul edilmez.',
        'Tüm teklifler bağlayıcı değildir. Sitenin bir kısmını ya da tamamını önceden haber vermeden değiştirebilir, genişletebilir veya kaldırabiliriz.',
      ],
    },
    {
      heading: 'Bağlantılar',
      lines: ['Üçüncü tarafların sitelerine verilen bağlantılar sorumluluk alanımızın dışındadır. Bu sitelere erişim ve kullanım kişinin kendi sorumluluğundadır.'],
    },
    {
      heading: 'Telif hakları',
      lines: [
        'Bu sitedeki metinler, tasarım, videolar ve program kodu {name} ya da ilgili hak sahiplerine aittir. Her türlü çoğaltma için önceden yazılı izin gerekir.',
        'Fotoğraflar Unsplash’tan alınmıştır ve Unsplash lisansına tabidir. Fotoğrafçıların adları aşağıdaki görsel kaynakçasındadır.',
      ],
    },
    {
      heading: 'Örnek veriler',
      lines: ['Örnek görünümlerdeki (ADO Firma, ADO InstaOto) isimler, firmalar, mesajlar, sayılar ve tutarlar uydurmadır ve yalnızca tanıtım amaçlıdır. Gerçek kişi veya şirketlerle benzerlikler tesadüfidir.'],
    },
  ],
  privacyUpdated: 'Güncelleme: Ekim 2026',
  privacySections: [
    {
      heading: 'Sorumlu taraf',
      lines: ['Bu sitede kişisel verilerin işlenmesinden sorumlu olan:', '{name}\n{street}\n{zipCity}\n{country}', 'E-posta: {email}'],
    },
    {
      heading: 'İlke',
      lines: ['Kişisel verileri İsviçre Veri Koruma Kanunu (DSG) ve uygulanabildiği ölçüde AB Genel Veri Koruma Tüzüğü (GDPR) uyarınca işliyoruz. Bu site üyelik gerektirmez ve yalnızca çalışması için teknik olarak gerekli olanı toplar.'],
    },
    {
      heading: 'Barındırma ve sunucu kayıtları',
      lines: [
        'Bu site Vercel Inc. (ABD) üzerinde çalışır. Her ziyarette teknik olarak gerekli bilgiler otomatik kaydedilir: IP adresi, tarih ve saat, istenen dosya, tarayıcı ve işletim sistemi. Bu veriler güvenli işletim içindir ve başka verilerle birleştirilmez.',
        'Bu sırada veriler ABD’ye aktarılabilir. Aktarım, Swiss-U.S. Data Privacy Framework veya standart sözleşme maddeleri gibi tanınmış güvencelere dayanır.',
      ],
    },
    {
      heading: 'Google yazı tipleri',
      lines: ['Yazı tipleri için bu site Google Fonts’tan (Google Ireland Limited / Google LLC, ABD) dosya yükler. Bu sırada tarayıcınız IP adresinizi Google’a iletir. Ayrıntılar: policies.google.com/privacy.'],
    },
    {
      heading: 'E-posta ile iletişim',
      lines: ['İletişim ve talep sayfalarındaki mektuplar kendi e-posta programınızı açar; bu sırada site üzerinden hiçbir şey gönderilmez. E-postayı siz gönderdiğinizde adınızı, iletişim bilgilerinizi ve mesajınızı alırız. Bunları yalnızca talebiniz için kullanır, artık gerekmediğinde ve saklama yükümlülüğü yoksa sileriz.'],
    },
    {
      heading: 'Tarayıcıda saklama',
      lines: ['Bu site çerez ve ziyaretçi istatistiği kullanmaz. Dil, renk teması, son açılan sayfa, ışık sütunu ayarı ve kendi seçtiğiniz profil fotoğrafı yalnızca tarayıcınızın yerel belleğinde (localStorage) tutulur. Bu bilgiler cihazınızdan çıkmaz ve tarayıcı ayarlarından her an silinebilir.'],
    },
    {
      heading: 'Görseller, videolar ve örnekler',
      lines: ['Tüm fotoğraf ve videolar kendi sunucumuzdadır; üçüncü tarafların video veya görsel hizmetleri kullanılmaz. ADO InstaOto sohbet önizlemesi yalnızca tarayıcınızda çalışır; yazdıklarınız gönderilmez ve saklanmaz.'],
    },
    {
      heading: 'ADO InstaOto ve ADO Firma',
      lines: ['Bu site ürünleri yalnızca tanıtır. ADO InstaOto veya ADO Firma kullanan müşteriler için ayrıca ilgili müşteri panelindeki gizlilik bilgileri geçerlidir.'],
    },
    {
      heading: 'Veri güvenliği',
      lines: ['Bu siteye bağlantı HTTPS (TLS) ile şifrelenir.'],
    },
    {
      heading: 'Haklarınız',
      lines: [
        'Hakkınızda işlediğimiz kişisel veriler hakkında her zaman bilgi isteyebilir, düzeltilmesini, silinmesini veya size verilmesini talep edebilir ve işlenmesine itiraz edebilirsiniz. Bunun için {email} adresine yazın.',
        'Ayrıca yetkili denetim makamına şikâyette bulunabilirsiniz – İsviçre’de Federal Veri Koruma ve Kamuoyu Bilgilendirme Görevlisi (EDÖB, www.edoeb.admin.ch).',
      ],
    },
    {
      heading: 'Değişiklikler',
      lines: ['Site veya yasal dayanaklar değiştiğinde bu metni güncelleriz. Burada yayımlanan sürüm geçerlidir.'],
    },
  ],
};

export const legalTexts: Record<Lang, LegalTexts> = { de, tr };
