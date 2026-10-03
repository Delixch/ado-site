# Renkler

Her renk (tema) bu klasörde **tek bir CSS dosyasıdır**. Sitenin geri kalanında
hiçbir renk kodu yoktur; bileşenler ve diğer CSS dosyaları sadece buradaki
değişkenleri (`var(--accent)` gibi) kullanır.

## Yeni renk eklemek (ör. "beyaz")

1. `krem.css` dosyasını kopyala, adını `beyaz.css` yap.
2. İlk iki satırdaki isimleri değiştir (`@tr` Türkçe, `@de` Almanca ad).
3. Seçiciyi dosya adıyla aynı yap: `[data-color="beyaz"]`.
4. Değerleri değiştir. Bitti — renk seçicide kendiliğinden görünür,
   başka hiçbir dosyaya dokunmaya gerek yok.

Varsayılan renk `src/config.ts` içindeki `DEFAULT_COLOR` ile seçilir.

## Değişkenler

| Değişken | Ne için |
|---|---|
| `--canvas` | Sayfa zemini |
| `--surface` | Kartlar, paneller |
| `--surface-glass` | Yarı saydam menü / üst bar zemini |
| `--sunken` | İç kutular |
| `--line`, `--line-strong` | Kenarlıklar (normal / hover) |
| `--ink`, `--ink-2`, `--muted`, `--faint` | Yazı: ana / ikincil / açıklama / sadece placeholder |
| `--accent`, `--accent-strong`, `--accent-soft` | Vurgu: ana / vurgu yazısı / vurgu zemini |
| `--on-accent` | Vurgu zemini üstündeki yazı |
| `--ok`, `--warn`, `--bad`, `--info` | Durum renkleri |
| `--night`, `--night-ink` | Koyu kutu ve yazısı |
| `--pressed-*` | Menüde seçili (basılı) düğme |
| `--highlight` | Cam kenarındaki ince parlama |
| `--shadow-sm/md/lg` | Gölgeler |
| `--overlay` | Mobil menü arkasındaki perde |
| `--ambient-1/2` | Arka plan ışıkları (`transparent` = kapalı) |

`color-scheme` açık tema için `light`, koyu tema için `dark` olmalı.
