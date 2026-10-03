# ADO — Yol haritası (güncel: 2026-10-03 akşam)

Site: **ADO Design** (portföy) + **ADO Firma** (işletme yazılımı) + **ADO InstaOto** (Instagram otomasyonu), tek sayfada.
Ayrıntılı günlük: `DURUM.md` · Tasarım kuralları: `MASTER.md` · Öneriler: `ONERILER.md`
Depolar: `Delixch/googleado` (site) · `Delixch/instagramoto` (panel, canlı: instagramoto.vercel.app) · `Delixch/videoedit-ozel` (videolar)

---

## ✅ Yapılanlar

### Site — genel
- Sol menü ve üst bar korundu. Menü: Portföy açık; Firma ve InstaOto açılır grup; aktif sayfanın grubu kendiliğinden açılır; mobilde gruplar kapalı gelir. Menü kaydırmasız, içerik kadar uzar.
- **Site içi arama**: bütün sayfaların metninde arar, sonucu vurgulu alıntıyla gösterir. Arama kutusu kutusuz, ince çizgi + büyüteç.
- Her sayfa bir **dergi sayfası**: № numaralı başlık, header'daki karıştır düğmesi ve küçük planlarla **düzen değiştirme**.
- **5 tema** (Claude açık; Orange/Amber/Cyan/Green koyu). Ölçüler `tokens.css`, renkler `colors/<tema>.css`.
- **Işık sütunu** (tema renginde, sayfanın ortasından en alta): 4 form (düz, çapraz, yılan, halka) × 12 efekt (kapalı + 11). Ziyaretçi sağ alttan seçer (mobilde menünün altından). Açılış: Claude + yılan + ADO-yağmuru.
- Fotoğraflar Unsplash'tan, bölüme uygun, **siyah-beyaz**; her görsel sitede tek bir yerde. Panel görüntüleri ve dikey video s/b, üzerine gelince renkli.
- Videolar kendiliğinden oynamaz.

### ADO Design (8 sayfa)
Start (yarık pencereli kapak videosu), Über mich (tipografik portre, s/b), Projekte (3D deste + 01–15 ışık döngüsü), Skills (parçacıklarla yazılan araçlar), Inspiration (yıldız grafiği + npm terminali), Im Aufbau (düzen planı + masaüstü/tablet/mobil önizleme), Erfahrung (ışıklı adım hattı), Kontakt (mektup + mum mühür).

### ADO Firma (8 sayfa)
Übersicht (modül anahtarları + mini uygulama + **tanıtım videosu**, tema rengine göre), Bestellungen, Einsatzplanung (canlı hasta bildirimi), Buchhaltung (adıma göre değişen örnek), Meldungen (belge destesi + damga + süre takvimi), Homepage (cihaza göre akan mini site), Personal (3 bölmeli dosya), Kontakt.

### ADO InstaOto (6 sayfa)
Übersicht (tema renkli çerçevede dikey video, TR/DE), So funktioniert's (canlı DM denemesi; adımlara tıklayınca telefon oynatır), Funktionen (gerçek panel görüntüleri, TR ve DE), Ablauf, Daten & Sicherheit, Preise & Anfrage (fiyat yok, talep formu).

### instagramoto paneli
- **TR/DE arayüz** (üst barda + giriş sayfasında dil düğmesi), giriş kodu e-postası ve yasal sayfalar iki dilli, şablonlar Almanca da açılır.
- **5 tema** (sitedekilerle aynı); koyu temalar yalnız kendi renginin tonlarında.

### Videolar
- **ADO Firma (DE)**: 8 Flow klibi + duvarda cam paneller + altyazı. Tema renklerine göre render: `videoedit\projects\ado-firma-plattform\render-themes.bat`.
- **InstaOto (DE)**: Almanca ses + yazılar + Almanca panel; fiyat yerine «1× · und es läuft». Render: `videoedit\projects\instagramoto-promo-de\render-de.bat` → sitede.
- Kural: tam render'ı Adnan alır (.bat); Claude hazırlar ve tek kare kontrol eder.

---

## ⏳ Yapılacaklar

### Öncelikli
1. **Canlı adres**: googleado Vercel'e bağlı mı, alan adı (adodesign.ch?) — kontrol.
2. **Türkçe Firma videosu**: yeni Flow klipleri (başka kadın) + `texts.ts` çevirisi → aynı .bat.
3. **Metin kontrolü**: Claude'un yazdığı metinler (InstaOto sayfaları, Meldungen açıklamaları, Personal etiketleri, mektup cümleleri, panelin Almancası) — bir kez oku.
4. **Açılış ayarı kesinleşsin**: form/efekt (şu an yılan + ADO-yağmuru); sağ alttaki seçici kalıcı mı?
5. instagramoto panelinde kimin açtığı belirsiz bir **"Neuer Ablauf · aus"** akışı var — gerekmiyorsa sil.

### Teknik borç
6. Tablet (820 px) genişliği tek tek kontrol edilmedi.
7. Bazı CSS'lerde süre/derece sayıları henüz token değil.
8. Ana JS paketi 500 KB üstü → sayfaları parça parça yükle.
9. `public/video/` ham klipler (21 MB) sitede kullanılmıyor — yayından çıkarılabilir.
10. Header altında yılanın iki parçası arasında hafif ton farkı.
11. instagramoto: devir ve bakım e-postaları hâlâ yalnız Türkçe.
12. instagramoto koyu temaları Orange ve Green'de ekranda tek tek kontrol edilmedi (Amber ve Cyan edildi).
