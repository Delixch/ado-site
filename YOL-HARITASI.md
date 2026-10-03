# ADO — Yol haritası (2026-10-03)

Site: **ADO Design** (portföy) + **ADO Firma** (işletme yazılımı) + **ADO InstaOto** (Instagram otomasyonu), tek sayfada.
Ayrıntılı günlük: `DURUM.md` · Tasarım kuralları: `MASTER.md` · Kod: GitHub `Delixch/googleado` (son push 4ca4d31).

---

## ✅ Yapılanlar

### Genel
- Sol menü ve üst bar korundu; menü: Portföy açık, Firma ve InstaOto açılır grup, aktif grup kendiliğinden açılır. Mobilde gruplar kapalı gelir.
- Menüde **site içi arama**: bütün sayfaların metninde arar, vurgulu alıntıyla sonucu gösterir.
- Her sayfa bir **dergi sayfası**: başlıkta numara (№), header'daki karıştır düğmesi ve küçük planlarla **düzen değiştirme**.
- 5 tema (Claude açık, Orange/Amber/Cyan/Green koyu). Ölçüler `tokens.css`, renkler `colors/<tema>.css`.
- **Işık sütunu** tema renginde, sayfanın ortasından aşağı; 4 form (düz, çapraz, yılan, halka) × 11 efekt (ışık, parçacık, nokta, ADO harfleri, kalp atışı, şerit, kıvılcım, parıltı, sonar, veri yağmuru, ADO-yağmuru). Ziyaretçi sağ alttan seçer, mobilde menünün altından. Açılış: Claude + yılan + ADO-yağmuru.
- Fotoğraflar Unsplash'tan, bölüme göre seçildi, **siyah-beyaz**; her görsel sitede tek bir yerde.
- Videolar kendiliğinden oynamaz, düğmeyle başlar.

### ADO Design (8 sayfa)
Start (yarık pencereli kapak videosu), Über mich (tipografik portre), Projekte (3D sunum destesi + ışık döngüsü), Skills (parçacıklarla yazılan araçlar), Inspiration (yıldız grafiği + npm terminali), Im Aufbau (düzen planı + masaüstü/tablet/mobil önizleme), Erfahrung (ışıklı adım hattı), Kontakt (mektup + mum mühür).

### ADO Firma (8 sayfa)
Übersicht (modül anahtarları + mini uygulama + **tanıtım videosu**), Bestellungen (Team→App→Tedarikçi hattı), Einsatzplanung (canlı hasta bildirimi), Buchhaltung (adıma göre değişen örnek: fiş, gelen fatura, banka, halka grafik), Meldungen (belge destesi + damga + süre takvimi), Homepage (cihaza göre akan mini site), Personal (3 bölmeli dosya), Kontakt (mektup).

### ADO InstaOto (6 sayfa, yeni)
Übersicht (çerçeveli dikey video + panel), So funktioniert's (canlı DM denemesi, adımlara tıklayınca oynar), Funktionen (gerçek panel görüntüleri), Ablauf (kurulum adımları + müşteriden gerekenler + nasıl iletilir), Daten & Sicherheit, Preise & Anfrage (fiyat yok, talep formu).

### Video
- **ADO Firma tanıtım videosu (DE)**: 8 Flow klibi + duvardaki cam paneller + altyazı + müzik. Tema rengine göre render: `D:\repos\videoedit\projects\ado-firma-plattform\render-themes.bat`.
- Kural: tam render'ı sen alırsın (.bat), ben hazırlar ve tek kare kontrol ederim.

---

## ⏳ Yapılacaklar

### Öncelikli
1. **Vercel**: googleado deposu Vercel'e bağlı mı, canlı adres ve alan adı (adodesign.ch?) — kontrol et.
2. ~~instagramoto paneli Almanca~~ ✅ (TR/DE + 5 tema, canlıda; Almanca ekran görüntüleri sitede).
3. **InstaOto Almanca tanıtım videosu**: hazır, render sende → `D:eposideoedit\projects\instagramoto-promo-deender-de.bat` (çift tık). Fiyat yerine «1× eingerichtet».
4. **Türkçe Firma videosu**: yeni Flow klipleri (başka kadın) + `texts.ts` çevirisi.
5. **Yeni metinlerin kontrolü**: InstaOto sayfaları, Meldungen açıklamaları, Personal etiketleri, mektup cümleleri bana ait — sen oku.

### Teknik borç
6. Tablet (820 px) genişliği tek tek kontrol edilmedi.
7. Bazı CSS'lerde süre/derece sayıları (ör. animasyon saniyeleri) henüz token değil.
8. Vite uyarısı: ana JS paketi 500 KB üstü → sayfaları parça parça yükle (code-split).
9. `public/video/` ham klipler (21 MB) sitede kullanılmıyor — yayından çıkarılabilir.
10. Işık sütunu seçicisi (sağ alt) kalıcı mı, sonra karar.
11. Karar bekleyen: header altında yılanın iki parçası arasında hafif ton farkı.

---

## 💡 Profesyonel önerilerim

**Satış ve güven**
- **Her ürün sayfasına tek bir net çağrı**: "Kostenloses Erstgespräch (15 Min.)" + Calendly bağlantısı. Calendly hesabın bağlı; takvimden doğrudan randevu almak formdan çok daha fazla dönüşüm getirir.
- **Referans / müşteri sesi**: Happy Beck, SAZCAR gibi gerçek müşterilerden 1–2 cümlelik alıntı + logo. Küçük işletmeler en çok "benim gibi biri kullanıyor mu?" sorusuna bakar.
- **Fiyat şeffaflığı (InstaOto)**: tam fiyat yazmasan da "ab CHF …" ya da "einmalig, kein Abo" çerçevesi güven verir; "auf Anfrage" tek başına bazı ziyaretçiyi kaçırır.

**İçerik**
- **Kısa vaka hikâyeleri**: Firma ve InstaOto için "Sorun → Çözüm → Sonuç (sayı)" formatında birer sayfa (ör. "Bäckerei: 6 Stunden Bürozeit pro Woche gespart").
- **SSS (FAQ)** bölümü: Datenschutz, kurulum süresi, ne gerekiyor, iptal. Arama motorları da sever.
- Türkçe ve Almanca metinlerin bir kez **ana dili Almanca olan biri** tarafından okunması.

**Teknik / görünürlük**
- **SEO**: tek sayfa uygulama olduğu için her bölüme kendi adresi (`/firma/buchhaltung` gibi), başlık ve açıklama; Google'da tek tek bulunur. Paylaşım görselleri (Open Graph).
- **Hız**: videolar için WebM + küçük kapak, sayfa kodunu bölme, fotoğraflara `srcset`. Mobilde ilk açılış 2 saniyenin altına inmeli.
- **Ölçüm**: Vercel Analytics (çerez yok) ile hangi sayfanın, hangi efektin, hangi temanın sevildiğini gör; tasarım kararlarını veriye bağla.
- **Erişilebilirlik**: "hareketi azalt" ayarı açık olanlarda efektler zaten kapanıyor; renk kontrastını ve klavye ile gezinmeyi bir kez topluca kontrol edelim.
- **Yasal**: Impressum + Datenschutz sayfaları (İsviçre DSG), özellikle InstaOto müşteri verisi işlediği için.

**Marka**
- Üç ürün tek çatı altında: menüde her grubun kendi küçük ikonu/rengi olabilir (ör. Firma = yeşil nokta, InstaOto = mor nokta) — ziyaretçi nerede olduğunu hemen anlar.
- Sitenin kendisi de bir vitrin: footer'a küçük "Diese Seite: React, Motion, WebGL — von ADO" notu; teknik müşteriye yetenek kanıtı.
