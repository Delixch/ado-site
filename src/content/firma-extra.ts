import type { Lang } from './ui';

/**
 * Zusaetzliche Erklaerungen fuer die Firmenseite (nicht aus ado-firma uebernommen).
 * Gleiche Reihenfolge wie firma-texts `repos.reports`.
 */
const REPORT_INFO: Record<Lang, string[]> = {
  de: [
    'Für quellensteuerpflichtige Mitarbeitende wird die Steuer direkt vom Lohn abgezogen und jeden Monat mit dem kantonalen Steueramt abgerechnet. Die Zahlen kommen aus Lohn und Personaldossier.',
    'Umsatz und Vorsteuer aus der Buchhaltung werden pro Quartal zusammengestellt, geprüft und als MWST-Abrechnung an die Eidgenössische Steuerverwaltung übermittelt.',
    'Einmal im Jahr meldet der Betrieb die Lohnsummen aller Mitarbeitenden an die Ausgleichskasse – die Grundlage für AHV, IV und EO.',
    'Die versicherten Löhne gehen jährlich an die Pensionskasse; Ein- und Austritte werden laufend nachgeführt.',
    'Der Unfallversicherer erhält die jährliche Lohndeklaration – aus denselben Lohndaten, ohne doppelte Erfassung.',
    'Zum Jahresende erhält jede Person ihren Lohnausweis für die Steuererklärung; je nach Kanton geht eine Kopie direkt ans Steueramt.',
  ],
  tr: [
    'Stopaj vergisine tabi çalışanlarda vergi doğrudan maaştan kesilir ve her ay kanton vergi dairesiyle hesaplaşılır. Rakamlar bordro ve personel dosyasından gelir.',
    'Muhasebedeki ciro ve indirilecek KDV her çeyrekte derlenir, kontrol edilir ve KDV beyannamesi olarak Federal Vergi İdaresine (ESTV) gönderilir.',
    'İşletme yılda bir kez tüm çalışanların maaş toplamlarını Denkleştirme Kasasına bildirir – AHV, IV ve EO için temel budur.',
    'Sigortalı maaşlar her yıl emeklilik kasasına gider; işe girişler ve çıkışlar sürekli güncellenir.',
    'Kaza sigortacısı yıllık maaş beyanını alır – aynı maaş verilerinden, iki kez girmeden.',
    'Yıl sonunda her çalışan vergi beyannamesi için maaş belgesini alır; kantona göre bir kopyası doğrudan vergi dairesine gider.',
  ],
};

/** Faellige Monate (1-12) je Meldung: monatlich, quartalsweise, jaehrlich zum Jahresbeginn. */
const MONTHS_BY_FREQ: Record<string, number[]> = {
  '12×': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  '4×': [3, 6, 9, 12],
  '1×': [1],
};

const CAL_LABEL: Record<Lang, { title: string; hint: string }> = {
  de: { title: 'Fristenkalender', hint: 'Meldung wählen – die Monate leuchten auf' },
  tr: { title: 'Süre takvimi', hint: 'Bir bildirim seçin – ayları yanar' },
};

export const reportInfo = (lang: Lang) => REPORT_INFO[lang];
export const reportMonths = (freq: string) => MONTHS_BY_FREQ[freq.trim()] ?? [];
export const calLabel = (lang: Lang) => CAL_LABEL[lang];

const DOSSIER: Record<Lang, { dossier: string; person: string; role: string; status: string; folder: string; signed: string; file: string }> = {
  de: { dossier: 'Personaldossier', person: 'Person', role: 'Funktion', status: 'Status', folder: 'Abgelegt in', signed: 'digital signiert', file: 'PDF · sicher abgelegt' },
  tr: { dossier: 'Personel dosyası', person: 'Kişi', role: 'Görev', status: 'Durum', folder: 'Klasör', signed: 'dijital imzalı', file: 'PDF · güvenle saklanıyor' },
};

export const dossierLabel = (lang: Lang) => DOSSIER[lang];
