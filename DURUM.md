# googleado — Durum (2026-10-03)

## Hedef
ADO Design (portföy) + ADO Firma tek sayfada. Sol menü (googleado'nun açılıp kapanan menüsü, değişmeyecek):
önce portföy menüleri, altında firma menüleri. Sağda kartlar sürekli yer değiştirir.
Renkler sadece `src/styles/colors/*.css` içinde (her tema bir dosya). Tablet ve mobilde de menü olacak.
**Kural:** Ölçüler (yazı boyu, boşluk, köşe, font) sadece merkez `src/styles/tokens.css` içinde.
Diğer CSS'lerde sayı/renk kodu yok, sadece `var(--…)`. Yeni tema (ör. kırmızı) = `colors/` içine tek dosya.
Tema isterse kendi dosyasında fontu da ezer (ör. claude.css → `--font-display` serif).

## Kaynaklar (içerik buradan)
- Portföy: `D:\repos\Adodesign.ch` (canlı: adodesign.ch)
- Firma: `D:\repos\Adodesignfirma` (canlı: ado-firma.vercel.app), rehberi `CLAUDE.md`
- Metinler birebir kopyalandı: `src/content/design-texts.ts`, `src/content/firma-texts.ts`
- Videolar ve görseller: `public/media/design`, `public/media/firma`, `public/media/shots`

## Yapılanlar
- Eski Google AI Studio kodu silindi. Paketler: React, Vite, motion, lucide.
- 5 tema: `orange`, `amber`, `cyan`, `green`, `claude` (açılışta claude). Yeni tema = yeni dosya, otomatik görünür.
- Menü korundu (`src/components/SleekSidebar.tsx`, `src/styles/sidebar.css`).
- 16 sayfanın kodu yazıldı (`src/components/views/design/*`, `src/components/views/firma/*`):
  - Portföy: Start, Über mich, Projekte (15 proje), Skills, Inspiration (7 repo), Im Aufbau, Erfahrung (Werdegang), Kontakt
  - Firma: Übersicht, Bestellungen, Einsatzplanung, Buchhaltung, Meldungen, Homepage, Personal, Kontakt
- Kart karıştırma: `src/hooks/useShuffle.ts` (grup içinde yer değiştirme + sağ/sol ayna), yerleşimler `src/styles/grid.css`.

## 2026-10-03 yapılanlar
- `src/styles/tokens.css` (merkez ölçüler) kuruldu; base/layout/sidebar/topbar'daki yazı boyu ve kalınlıklar token'a bağlandı.
- `cards.css`: ortak parçalar (shead, card, badge, pill, num-pill, round-arrow, video, drift) + **Portföy › Start** bitti.
  1440 / 820 / 390 kontrol edildi, tema değişimi (claude → orange) çalışıyor. Üst bar logo/ayırıcı eklendi.

## 2026-10-03 (2) — yön değişti
Kullanıcı: "birebir kopya istemedim, kartlar satır satır/iğrenç, profesyonel tasarımcı gibi davran,
skill'leri kullan; Claude teması açık, diğer temalar siyah cam".
- genjutsu:paint ile tasarım tezi yazıldı → `MASTER.md` (varsayımlar onaysız, gözden geçirilecek).
- orange/amber/cyan/green = koyu cam temalar (tek şablon; `--brand` dışındaki her şey ondan türer).
- Kart malzemesi temadan: `--card-bg/--card-edge/--card-backdrop/--card-shine/--spot`. İmleç ışığı (CardGrid).
- Start (iki site): küçük kartlar görsel (foto, ekran yelpazesi, ikon karoları, büyük sayı), 3'lü sıra.
- Projekte: satır listesi → ekran görüntüsü karoları. Skills: ikon karosu. Kesik çizgili listeler → etiket bulutu.
- Firma Buchhaltung/Meldungen/Homepage/Personal+Kontakt: `pages/firma-*.css` (paralel yazıldı).

Kontrol: 16 sayfa 1440'ta koyu temada, birkaçı Claude temasında ve 390 genişlikte görüldü; `npm run build` geçti.

## 2026-10-03 (3) — kullanıcı geri bildirimi, YARIM KALDI (buradan devam)
Kullanıcı: "hâlâ her yapay zekânın yapacağı şeyler, yaratıcılık/şaşırtma yok, skill'leri kullan".
Firma sayfaları da ado-firma'nın birebir kopyası kalmış; o da baştan tasarlanacak.
- YAPILDI: renk seçicide her örnek artık kendi rengini gösteriyor (`base.css` `.swatch` → `var(--brand)`). Tarayıcıda bakılmadı.
- PLAN (henüz kod yok), her sayfaya kendine özgü bir imza hareketi:
  1. **Start (iki site):** kart yok. Uçtan uca sinematik video sahnesi (referans: adodesign.ch girişi).
     Katmanlar: video (imleçle ters kayar), soldan zemin renginde perde + metin, parçacıklar,
     önde süzülen telefon (Firma'da telefonda mini uygulama). Alttaki küçük kartlar kaldırılacak.
  2. **Projekte:** 15 ekran görüntüsü 3D döner halka (coverflow). Sürükle/tekerlek ile döner, öndeki büyür, yanında detay.
  3. **Skills:** yörünge sistemi. Ortada yuvarlak video, 4 halka = 4 alan, araçlar halkalarda döner; halkaya gelince açıklama.
  4. **Inspiration:** yıldız sayısına göre büyüklükte repo baloncukları + seçilene göre komutları yazan terminal.
  5. Sonra Firma sayfaları kopya düzenden çıkarılacak (aynı yaklaşım: sayfa başına bir imza hareketi).
- Kullanılan skill'ler: genjutsu:paint (MASTER.md), nateherk-design:scroll-craft (katmanlı giriş), genjutsu framer-motion alt skill'i.

## Kullanıcıyla birlikte gözden geçirilecek
- MASTER.md'deki varsayımlar ve tezler (onaysız yazıldı).
- Sayfa sayfa beğenilmeyenler (kullanıcı "hepsi bitince sırayla üstünden geçeriz" dedi).
- Tablet (820) genişliği bu turda ayrıca kontrol edilmedi.

## Eski liste (tarihçe) (sırayla, sessizce; kullanıcı hepsi bitince birlikte üstünden geçecek)
1. ~~Portföy: tüm sayfalar~~ BİTTİ (2026-10-03, 1440'ta kontrol; 390/820 son turda bakılacak). Stiller: `pages/design.css`, ortak: `cards.css`, `forms.css`.
2. Firma: Übersicht → Bestellungen → Einsatzplanung → Buchhaltung → Meldungen → Homepage → Personal → Kontakt
   Kart sınıfları: card-dark, panel, stat-circle, wallet, ex-card, report-pills, hub …
3. sidebar.css / topbar.css içindeki boşluk px değerleri henüz token'a çevrilmedi (görünüm aynı kalacak şekilde).
4. `src/styles/colors/README.md` yeni değişken listesine göre güncellenecek; `npm run build`.

## Not
- Commit/push yapılmadı.
- Çalışma yöntemi: **parça parça**. Önce bir sayfa, kullanıcıya göster, onay al, sonra sıradaki.


## 2026-10-03 (4) — YENİ TASARIM DİLİ (editoryal "spread"), sol menü + header DEĞİŞMEZ
Kullanıcı: kartlar/kopya tasarım iğrenç; Pinterest ilhamları verdi. İlk deneme (dev Anton yazılar, her sayfaya
her efekt) "kaba saba, kaos" bulundu → küçültüldü, sakinleştirildi. KURALLAR (kullanıcıdan):
- Her şey küçük/kibar; sol menünün sakinliğinde. Poster font = Instrument Serif büyük harf (Anton kalktı).
- Sayfa başına TEK, içerikle ilgili fikir. Örnekleri dağınık doldurma.
- Videolar kendiliğinden oynamaz (fx/Media: basınca oynar).
- Header'daki düzen değiştirme her bölümde: `components/spread/Spread.tsx` (LayoutDef = grid-template-areas,
  mini planlar başlıkta, header shuffle = sonraki düzen, otomatik LAYOUT_INTERVAL).
- Kullanıcı beğendi: başlık (№ 06 / Werdegang & Stationen.), Projekte destesi (küçültüldü), Inspiration "fena değil",
  Im Aufbau blueprint fikri (düğmeler + masaüstü/tablet/mobil önizleme eklendi).
- Kendi fotoğrafı yerine bölüme uygun ton fotoğraflar: Unsplash (anahtar videoedit/.env) → public/media/stock/*.webp,
  kaynakça src/content/stock.ts. fx/Plate + fx/LiquidImage (WebGL: siyah-beyazdan renge "develop", imleçte sıvı kırılma).
Yapılan sayfalar (yeni): Design Start, About (tipografik portre), Work (TiltDeck), Skills (şeritler+terminal),
Repos (yıldız grafiği+terminal), Construction (blueprint), Experience (FlowNodes), Contact (mektup masası: common/Letter),
Firma Start (modül anahtarları + mini app), Firma Orders (Team→App→Lieferanten hat), Firma Planning (haftalık plan, canlı krank),
Firma Contact (mektup).
2026-10-03 (5): Firma Accounting (basılan fiş + pay çubuğu), Reports (belge destesi + damga + nokta ritmi),
Homepage (gerçek mini fırın sitesi, cihaz düğmeleriyle yeniden akış, bildirimler), Personnel (sekmeli dosya +
onboarding) BİTTİ. Eski CSS'ler (grid/cards/forms/pages) ve eski bileşenler (CardGrid, useShuffle, SectionHead,
InViewVideo, ParticleField, AnimatedBeam, RingBadge, Stripes, Frost/Halftone/Knockout) silindi. `npm run build` geçti.
16 sayfanın hepsi yeni dilde. 1440 + 390 (koyu tema) bakıldı.
SIRADA: kullanıcının sayfa sayfa geri bildirimi; tablet (820) ayrıca bakılmadı; bazı CSS'lerde süre/derece sayıları
(ör. 30s marquee, 45deg) token'a taşınabilir; commit yapılmadı. Stil dosyaları: styles/{editorial,spread,fx}.css + styles/v/<sayfa>.css.
Test notu: playwright'ta CSS geçişleri donuyor → ekran görüntüsü öncesi `*{transition:none!important}` enjekte et.

## 2026-10-03 (6) — kullanıcı geri bildirimi uygulandı
- Start içindekiler küçük resimleri → stok fotoğraflar (kullanıcının kendi foto/videoları değil).
- Sol menü: profil satırı biraz aşağı (ferahlık); arama artık TÜM SİTE metninde (`content/search.ts`, sonuçlar menüde).
- Über mich: tipografik portre siyah-beyaz + koyu; rakamlar: live 35, Archiv 52, Erfahrung 20+ (kullanıcı "live 20'ye çıkar" da dedi — belirsiz, sorulacak).
- Projekte: 01–15 kutularında sırayla dolaşan tema renkli ışık döngüsü (CSS @property --beam).
- Skills: kayan yazılar kaldırıldı → `fx/ParticleWord` (parçacıklarla araç adları, imleçle dağılır).
- Inspiration: açıklama (details) büyük alanda, npm komutları küçük alanda.
- Buchhaltung: adım seçimi soldaki örneği değiştirir (fiş / gelen faturalar / banka ödemeleri / halka grafik).
- Meldungen: bildirim seçilebilir, Fristenkalender (12 ay) + her bildirim için açıklama (`content/firma-extra.ts`, DE/TR — yeni metin).
- Personal: üç bölmeli dosya gezgini (klasör | belge | belge önizleme, imza).

## 2026-10-03 (7)
- Start: "In dieser Ausgabe" içindekiler KALDIRILDI (menüyü tekrarlıyordu). Yerine yeni stok foto (matbaa harfleri, `stock.type`).
- Sol menü: arama kutusunun altında daha fazla boşluk, bölümler arası boşluk.
- Kural: bir görsel sitede yalnız BİR yerde kullanılır; yeni yer = yeni indirilen görsel (videoedit/.env Unsplash anahtarı, scratchpad/unsplash_fetch.py).

- Sol menü ritmi baştan: başlık | profil | arama | ince ayırıcı | bölümler arası belirgin boşluk; liste altta yumuşak solma (sidebar.css sonundaki "Ruhiger Rhythmus").
- Arama: kutu yok; ince alt çizgi + başta büyüteç + ince yazı ("Suchen …" / "Ara …").
- Menü aralıkları (kullanıcı "daha çok" dedi): arama→başlık ~68px, başlık→Start ~37px, bölümler arası 48px.
- Menü: masaüstünde kaydırma yok, kart içerik kadar uzar (sticky kalktı). Mobilde ana gruplar açılır menü, kapalı gelir (SleekSidebar `collapsible`).

## 2026-10-03 (8) — Firma tanıtım videosu
- videoedit/projects/ado-firma-plattform: 8 Flow klibi (public/video/1-8.mp4 sırası = Giriş, Bestellungen … Kapanış), cam panel + altyazı + müzik, tek render.
- Çıktı: D:\OneDrive\ADO-Videolar\ADO-Firma-Plattform-DE.mp4 (tam), site: public/media/firma/plattform-de.mp4 (Firma Übersicht, film bloğu, sesli, basınca oynar).
- TÜRKÇE sürüm: yeni klipler (başka kadın) + remotion/texts.ts tercümesi + words yeniden transkript; CLIPS zamanları yeni kliplere göre.
- Not: public/video/ (21 MB ham klipler) site yayınına gider; yayından önce silinebilir (kopyası videoedit projesinde).
- Video renkleri temaya göre: theme.ts accent = --props {"theme":"<tema>"}. Kullanıcı kendisi render alır: videoedit/projects/ado-firma-plattform/render-themes.bat (çift tık = 5 tema; tek tema: render-themes.bat orange). Site: plattform-de-<tema>.mp4, yoksa cyan sürümüne düşer.
- TEST (sadece cyan): sayfanın ortasında, en arkada 10ch tema renginde dikey ışık sütunu (spread.css .main::before, renk cyan.css --band; bloklar yarı saydam + blur). Onay bekliyor; onaylanırsa diğer temalara.
- TEST: sütun header üstünden geçiyor (.tb::after), sayfanın geri kalanında en arkada.
- Lichtband formları (config.ts BAND_SHAPE, adres ?band=N): 1 düz · 2 çapraz ("2 numara", onaylı) · 3 yılan · 4 halkalar. Şimdilik sadece cyan teması. Not kodda: "HEADER'I BURADA YOK ETTİK" (spread.css .tb::after).
- Yılan (3) varsayılan; üstte dönüş noktasından başlıyor, header parçası band başından header altına kadar (gölge çizgisi kapandı).
- Yılan kenar efektleri 1–10 (components/fx/BandFx.tsx, ?fx=N, 0=kapalı); header üstünde de görünür (ikinci canvas). Sağ altta geçici seçici (BandPicker): Form 1–4, Efekt 0–10, seçim localStorage. HİÇBİR VARYANT SİLİNMEYECEK (kullanıcı).
- Efektler artık 4 formun hepsinde (BandFx shape prop: düz/çapraz/yılan/halka kenarları). Seçici kullanıcıya açık kalır (masaüstü sağ alt, mobil menünün altında). Açılış formu/efekti henüz seçilmedi (config BAND_SHAPE/BAND_FX).
- Işık sütunu + efekt seçici TÜM temalarda (her temanın kendi colors/*.css dosyasında --band-solid/--band-glow, yarı saydam --paper). Claude: terracotta, krem cam bloklar.
- AÇILIŞ: Claude teması + yılan (3) + 11 ADO-Regen (yeni: sadece A·D·O harfleri şeridin içinde aşağı akar). config.ts BAND_SHAPE/BAND_FX. Kayıtlı seçimi olan tarayıcı kendi seçimini görür.

## 2026-10-03 (9) — YENİ ANA MENÜ: ADO InstaOto (D:epos\instagramoto tanıtımı)
- Menü: Portföy açık, diğer gruplar (Firma, InstaOto) açılır; aktif sayfanın grubu otomatik açılır.
- 6 sayfa (components/views/insta, metin content/insta-texts.ts DE/TR yeni yazıldı): Übersicht (dikey video+panel görüntüsü), So funktioniert’s (etkileşimli DM simülasyonu), Funktionen (gerçek panel görüntüleri), Ablauf (adımlar+müşteriden gerekenler+nasıl iletilir), Daten & Sicherheit, Preise & Anfrage (fiyat YOK, auf Anfrage + mektup formu).
- Panel görüntüleri Türkçe: public/media/insta/tr-*.webp (kişisel veriler bulanık). Almanca panel çevrilince de-*.webp çekilecek (Shot bileşeni otomatik de/tr seçer).
- Video: şimdilik promo-tr.mp4. Almanca sürüm (promo-de.mp4) videoedit/projects/instagramoto-promo ile yapılacak — Almanca seslendirme + yazılar, render kullanıcıda (.bat).
- Canlı panel adresi: instagramoto.vercel.app (adnanwalk değil).
- Fotoğraflar siyah-beyaz (LiquidImage shader + --photo-bw); panel görüntüleri s/b, üzerine gelince renkli. Portföy proje görüntüleri renkli kalır.
- InstaFlow adımları tıklanınca telefonda o adıma kadar oynar (playTo); boşta sırayla nefes alır, çizgide ışık akar. Übersicht videosu tema renginde çerçeveli, s/b (üzerine gelince renkli).
