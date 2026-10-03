# MASTER — ADO Design · ADO Firma tasarım sistemi

Tek kaynak. Ölçüler `src/styles/tokens.css`, renkler `src/styles/colors/<tema>.css`.
Bileşen CSS'lerinde sayı veya renk kodu yok.

## Varsayımlar (kullanıcı bilgisayar başında değildi, onaysız yazıldı — gözden geçirilecek)
- Ürün: kişisel portföy (web geliştirici, Zürih) + KOBİ'ler için işletme yazılımı tanıtımı (gastronomi, fırın, oto servis).
- Kitle: İsviçre'deki küçük işletme sahipleri, potansiyel müşteriler.
- His: premium, sakin, kendinden emin, modern. "Eski reklam" değil.
- Referans: Apple / Linear bento ızgaraları, Vercel koyu cam.
- Kaynak siteler sadece **içerik** kaynağı, görünüm kopyalanmaz.

## Görsel tez
Bento-ızgara editoryal pano. **Claude teması** krem kâğıt + terracotta + serif başlık (tek açık tema).
**Diğer bütün temalar** neredeyse siyah zemin üzerinde buzlu **koyu cam** kartlar: yarı saydam yüzey,
ince açık kenar çizgisi, üstte iç parlama, tek vurgu rengi ve onun yumuşak ışıması.
Tip kontrastı: büyük başlık ve büyük sayılar ↔ küçük mono etiketler, gövde sans.
Kart içi ferah (8px tabanlı), kartlar arası sıkı. Büyük köşe (28px), dolu yüzey.
**Her kart tek bir fikri görsel anlatır** (büyük sayı, grafik, görsel, küçük arayüz maketi) —
satır satır metin listesi yok, kesik çizgili liste yok.

## Etkileşim tezi
Orta-hızlı: mikro 120ms, geçiş 200–300ms, giriş 400–500ms; `--ease` (expo-out).
Hover: kart 3px yükselir, kenar parlar; koyu temada imleci izleyen ışık (spotlight).
Basış: 0.98 ölçek. Giriş: bir kez, kademeli fade-up (Y 20 → 0).
Kart karıştırma: mevcut layout spring.
**Yasak:** bounce/elastic, metin kartlarında sonsuz sallanma, 600ms üstü UI geçişi,
width/height/padding animasyonu, her şeyi döndürmek.

## Temalar
| Tema | Zemin | Kart | Vurgu |
|---|---|---|---|
| claude | krem kâğıt | krem yüzey, yumuşak gölge | terracotta |
| orange / amber / cyan / green | siyaha yakın + vurgu ışığı | koyu cam (blur), ince açık kenar | temanın rengi |

Yeni tema = `colors/` içine tek dosya (koyu cam için `orange.css` kopyala, rengi değiştir).

## Malzeme değişkenleri (tema dosyasında)
`--card-bg`, `--card-edge`, `--card-backdrop` (claude: none, koyu: blur), `--card-shine` (iç parlama),
`--spot` (spotlight rengi), `--ambient-1/2` (zemin ışıkları).
