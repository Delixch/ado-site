# Öneriler — ADO Design · ADO Firma · ADO InstaOto (2026-10-03)

Önem sırasına göre. Her öneride: **ne**, **neden**, **emek** (küçük / orta / büyük).

---

## 1. Satış — ziyaretçiyi müşteriye çevirmek

**1.1 Tek net çağrı: ücretsiz ön görüşme** · emek: küçük
Her ürünün son sayfasında ve Übersicht'te aynı düğme: *"Kostenloses Erstgespräch · 15 Min."* → Calendly'den doğrudan randevu.
*Neden:* Küçük işletme sahibi form doldurmaz, takvimde bir saate tıklar. Calendly hesabın zaten bağlı.

**1.2 Gerçek müşteri sesi** · emek: küçük
Happy Beck, SAZCAR gibi müşterilerden 1–2 cümlelik alıntı + logo + isim. Firma ve InstaOto Übersicht'te birer blok.
*Neden:* "Benim gibi biri kullanıyor mu?" sorusu satın almadan önceki en büyük soru.

**1.3 InstaOto fiyat çerçevesi** · emek: küçük
Rakam yazmasan da *"einmalig · kein Monatsabo · ab CHF …"* gibi bir çerçeve.
*Neden:* "Preis auf Anfrage" tek başına bazılarını kaçırır; "abo yok" senin en güçlü farkın.

**1.4 Paketler** · emek: orta
Firma için 3 net paket (ör. *Start* = Bestellungen + Einsatzplanung, *Betrieb* = + Buchhaltung + Meldungen, *Komplett* = hepsi + Homepage). Fiyatı yazmasan bile içerik karşılaştırması.
*Neden:* Seçmek, "ne istediğini anlatmak"tan kolaydır.

## 2. İçerik

**2.1 Vaka hikâyeleri** · emek: orta
"Sorun → Çözüm → Sonuç (sayıyla)" formatında 1 sayfa: ör. *"Bäckerei: 6 Stunden Bürozeit pro Woche gespart"*, *"Autowerkstatt: 40 Anfragen pro Monat über Instagram, ohne Mehraufwand"*.

**2.2 SSS (FAQ)** · emek: küçük
Her ürünün altında 5–6 soru: Datenschutz, Dauer, was braucht es, Kündigung, Support, Daten-Export.
*Neden:* Satış görüşmesinde hep aynı sorular gelir; Google da sever.

**2.3 Metinlerin anadil kontrolü** · emek: küçük
Almanca metinleri bir kez anadili Almanca (İsviçreli) biri okusun — özellikle yasal sayfalar ve panel.

## 3. Bulunabilirlik ve hız

**3.1 Her bölüme kendi adresi (SEO)** · emek: orta
Şu an tek sayfa; Google tek adres görüyor. `/firma/buchhaltung`, `/insta/so-funktionierts` gibi adresler + her birine başlık, açıklama ve paylaşım görseli (Open Graph).
*Neden:* "Buchhaltung App Gastronomie Zürich" araması doğrudan o sayfaya gelir.

**3.2 Hız** · emek: orta
Sayfa kodunu bölmek (şu an 500 KB+), videoları WebM + küçük kapakla, fotoğraflara `srcset`. Hedef: mobilde ilk açılış < 2 sn.

**3.3 Ölçüm** · emek: küçük
Vercel Analytics (çerezsiz, DSG uyumlu): hangi sayfa, hangi tema, hangi ışık efekti seçiliyor, form/randevu kaç kez açılıyor.
*Neden:* Tasarım kararlarını tahmine değil veriye dayandırırız.

## 4. Güven ve yasal

**4.1 Impressum + Datenschutz** (sitede) · emek: küçük
İsviçre DSG'ye uygun; InstaOto ve Firma müşteri verisi işlediği için şart. instagramoto panelinde var, sitede yok.

**4.2 Güven işaretleri** · emek: küçük
"Daten in der EU (Frankfurt)", "Schweizer Ansprechpartner", "kein Abo" — küçük rozetler halinde fiyat/talep sayfalarında.

## 5. Ürün (instagramoto)

**5.1 Panelden mesaj gönderme** · emek: büyük
Gelen kutusunda şu an "Instagram'da aç" yazıyor; panelden doğrudan cevap, devredilen konuşmalar için büyük kolaylık.

**5.2 Haftalık özet e-postası** · emek: orta
Pazartesi: "Geçen hafta 34 sohbet, 21 link, 3 devredilen". Müşteri değeri her hafta görür → yenileme ve tavsiye.

**5.3 Kendi kendine kurulum sihirbazı** · emek: büyük
Şablon seç → kelime yaz → Instagram'ı bağla → yayında. Kurulum süresi 3 günden 30 dakikaya; ölçeklenebilir satış.

## 6. Marka

**6.1 Üç ürün, bir çatı** · emek: küçük
Menüde her grubun küçük rengi/ikonu (Design = terracotta, Firma = yeşil, InstaOto = mor nokta) — ziyaretçi nerede olduğunu hemen anlar.

**6.2 Site bir vitrin** · emek: küçük
Footer'a *"Diese Seite: React, Motion, WebGL — von ADO gebaut"*; ışık sütunu seçicisinin yanına "Effekte ausprobieren" ipucu. Teknik müşteriye yetenek kanıtı.

**6.3 Video serisi** · emek: orta
Firma ve InstaOto videolarından 15 saniyelik Reels kesimleri (her bölüm bir Reel) + Türkçe sürümler. Instagram'da InstaOto'nun kendisiyle "Detail" yazana link gönder — ürünün canlı demosu olur.

---

## Önerilen sıra (ilk 2 hafta)
1. Impressum/Datenschutz + ön görüşme düğmesi (1.1, 4.1)
2. Müşteri alıntıları + SSS (1.2, 2.2)
3. Ölçüm (3.3)
4. Bölüm adresleri / SEO (3.1)
5. Vaka hikâyesi + Reels serisi (2.1, 6.3)
