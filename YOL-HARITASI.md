# ADO — Son durum (2026-10-03, gece)

Site: **ADO Design** (portföy) + **ADO Firma** (işletme yazılımı) + **ADO InstaOto** (Instagram otomasyonu), tek sayfada.
Ayrıntılı günlük: `DURUM.md` · Tasarım kuralları: `MASTER.md` · Öneri ayrıntıları: `ONERILER.md`
Depolar: `Delixch/ado-site` (site) · `Delixch/instagramoto` (panel, canlı: instagramoto.vercel.app) · `Delixch/videoedit-ozel` (videolar)
Son commit: `cb675f9` (her şey push'lu, açık iş yok).

---

## ✅ Yapılanlar

### Site — genel
- **Menü**: buzlu cam, koyu; kenarında yavaş dönen ince ışık çizgisi. Her an tek grup açık (açılışta Portfolio). Daraltınca 3 grup ikonu halka içinde parlar, seçili sayfada sadece ikon renk alır. Wordmark ADO Design ile aynı (robotik yazı).
- **Mobil menü**: grup başlıkları üstte/altta yapışık kalır, tüm panel kayar, hiçbir şey sıkışmaz.
- **Site içi arama**: bütün sayfaların metninde (InstaOto dahil), sonuç menüde vurgulu.
- Her sayfa bir **dergi sayfası**: № başlık, düzen planları + karıştır düğmesi, otomatik düzen değişimi.
- **KI-Roboter** her sayfanın başında (tıklayınca konuşur, soru kutusu). Anahtar yokken kibar yedek cevap.
- **5 tema** (Claude açık; Orange/Amber/Cyan/Green koyu, zemin tam siyah). Ölçüler `tokens.css`, renkler `colors/<tema>.css`.
- **Işık sütunu**: 4 form × 12 efekt, sağ alttan seçilir. Açılış: yılan + ADO-yağmuru. Mobilde 1/8 boy.
- **Yazı düzeni**: başlıklar 30 px, paragraflar 15 px her yerde; gri yazı yok; hizalama kuralları 22 sayfada (grup ortada, değer/düğme sağda, büyük rakam ortada).
- **Kart efekti** (Favoriten & Inspiration gibi üzerine gelince karo ışığı) çoğu kart grubunda.
- **Tablet (820) ve mobil (390)**: bütün sayfalar ölçüldü. Mobilde seçim yapınca detay alttan panel olarak gelir (9 sayfa); Meldungen akordeon.
- **Impressum + Datenschutz** (DE/TR, cam pencere), favicon (ADO işareti), altbilgi siyah.
- **Erstgespräch** düğmesi (mektubu hazır konuyla açar, Calendly yok) + güven işaretleri.
- Kod temizliği: `/code-review` (10 bulgu düzeldi) ve `/simplify` (tekrarlar birleşti) çalıştı.

### ADO Design (8 sayfa)
Start, Über mich, Projekte (3D deste), Skills (parçacık yazı), Inspiration (yıldız grafiği + terminal), Im Aufbau (blueprint + cihaz önizleme), Erfahrung (adım hattı), Kontakt (mektup).

### ADO Firma (8 sayfa)
Übersicht (modül anahtarları + mini uygulama + tanıtım videosu, tema renginde), Bestellungen, Einsatzplanung, Buchhaltung, Meldungen (belge destesi + süre takvimi), Homepage, Personal, Kontakt.

### ADO InstaOto (6 menü → 2)
- **Übersicht**: başlık + metin tek blokta, iPhone story çerçevesinde renkli video (TR/DE), rakamlar, Daten & Sicherheit şeridi.
- **So funktioniert's**: 4 sekme — In 4 Schritten (canlı DM denemesi) · Funktionen · Von der Anfrage bis live · **Preise & Anfrage**.
- **Fiyatlar** (DE/TR aynı, CHF): Start 290.– · Komplett 490.– · Betreuung Basis 39.–/Monat · Plus 79.–/Monat · Einzelaufträge 90.–/h. Paket seç → tek sayfalık açıklama → "Paket anfragen" mektubu açar.

### Videolar
- ADO Firma (DE), tema renklerine göre: `videoedit\projects\ado-firma-plattform\render-themes.bat`.
- InstaOto (DE + TR): sitede.
- Kural: tam render'ı Adnan alır (.bat); Claude hazırlar ve tek kare kontrol eder.

---

## ⏳ Eksikler / yapılacaklar

### Senden (Adnan) beklenen
1. **Canlı adres**: googleado henüz Vercel'e bağlı değil (projede `.vercel` yok). Bağlanınca alan adı (adodesign.ch?) kararı.
2. **Robot anahtarları**: Vercel'de `DAHL_API_KEY` ve/veya `ATRIA_API_KEY`.
3. **Firma bilgileri**: `src/content/company.ts` (şu an Musterfirma) — adres, UID, telefon.
4. **Türkçe Firma videosu**: yeni Flow klipleri gelince `texts.ts` çevirisi → aynı .bat.
5. **Gerçek müşteri alıntıları** (Happy Beck, SAZCAR …) gelince eklenir.
6. **Metinleri bir kez oku** (Claude'un yazdıkları: InstaOto, Meldungen açıklamaları, fiyat sayfası, yasal metinler) — tercihen anadili Almanca biri.

### Karar bekleyen
7. Sağ alttaki ışık seçicisi kalıcı mı, yoksa yayında gizlensin mi?
8. instagramoto panelindeki **"Neuer Ablauf · aus"** akışı gerekli mi?

### Teknik borç
9. Ana JS paketi 500 KB üstü → sayfaları parça parça yükle (öneri 3.2 ile birlikte).
10. `public/video/` ham klipler (21 MB) sitede kullanılmıyor — yayından önce çıkarılmalı.
11. Bazı CSS'lerde süre/derece sayıları henüz token değil.
12. Header altında yılanın iki parçası arasında hafif ton farkı.
13. instagramoto: devir ve bakım e-postaları hâlâ yalnız Türkçe; Orange/Green koyu temaları tek tek bakılmadı.
14. Mobilde otomatik dönen seçimler, alt panel açıkken durmuyor (küçük, istenirse).

---

## 💡 Kalan öneriler (ayrıntı `ONERILER.md`)

| # | Öneri | Emek | Durum |
|---|---|---|---|
| 1.4 | Firma için 3 paket (Start / Betrieb / Komplett) | orta | başlanmadı — **sıradaki** |
| 2.2 | SSS / FAQ (her ürüne 5–6 soru) | küçük | başlanmadı |
| 3.3 | Ölçüm (Vercel Analytics, çerezsiz) | küçük | Vercel bağlanınca |
| 3.1 | Her bölüme kendi adresi (SEO) | orta | başlanmadı |
| 3.2 | Hız (kod bölme, WebM video, srcset) | orta | başlanmadı |
| 2.1 + 6.3 | Vaka hikâyesi + Reels serisi | orta | başlanmadı |
| 1.2 | Gerçek müşteri sesi | küçük | ⏸ alıntı bekliyor |
| 2.3 | Anadil kontrolü | küçük | Adnan |
| 6.1 / 6.2 | Grup rengi/ikonu · "von ADO gebaut" vitrin notu | küçük | başlanmadı |
| 5.1–5.3 | instagramoto ürün özellikleri (panelden mesaj, haftalık özet, kurulum sihirbazı) | büyük | ayrı proje |

Bitenler (ONERILER.md listesinden silindi): 1.1 Erstgespräch düğmesi, 1.3 fiyat çerçevesi (sonra gerçek paketler + fiyatlar oldu), 4.x güven işaretleri.
