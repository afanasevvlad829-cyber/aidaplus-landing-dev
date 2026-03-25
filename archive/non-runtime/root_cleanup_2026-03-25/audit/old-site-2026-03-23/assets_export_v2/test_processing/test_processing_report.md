# Test processing report — AiDaCamp

- Обработано: **10 / 10**
- Формат экспорта: **WebP (quality=84)**
- Ширина: **hero=1920**, остальные **1200** (без апскейла)

## Выбранные фото и применённые пресеты
### hero_atmosphere_01
- source: `img_0108_4LZft2eDW4Y.jpg`
- category: `hero`
- preset: `Preset 1 — HERO / atmosphere`
- source_size: `1680x1393` -> output_size: `1680x1393`
- processed: `processed/hero_atmosphere_01.webp`
- comparison: `comparison/hero_atmosphere_01__compare.webp`
- quality_flag: `ok`
- used_params: exposure=0.25, contrast=10, saturation=3, warmth=4, highlights=-18, shadows=12, whites=4, clarity=4, dehaze=2, vignette=0.08

### hero_atmosphere_02
- source: `img_0026_2-5_.jpg`
- category: `hero`
- preset: `Preset 1 — HERO / atmosphere`
- source_size: `1680x1260` -> output_size: `1680x1260`
- processed: `processed/hero_atmosphere_02.webp`
- comparison: `comparison/hero_atmosphere_02__compare.webp`
- quality_flag: `ok`
- used_params: exposure=0.25, contrast=10, saturation=3, warmth=4, highlights=-18, shadows=12, whites=4, clarity=4, dehaze=2, vignette=0.08

### children_real_01
- source: `img_0009_photo_2025-06-14_08-.jpg`
- category: `children`
- preset: `Preset 2 — CHILDREN / real life`
- source_size: `960x1280` -> output_size: `960x1280`
- processed: `processed/children_real_01.webp`
- comparison: `comparison/children_real_01__compare.webp`
- quality_flag: `ok`
- used_params: exposure=0.15, contrast=8, saturation=4, warmth=1, highlights=-10, shadows=8, whites=4, clarity=3, dehaze=1, vignette=0.0

### children_real_02
- source: `img_0086_IMG_1517.JPG`
- category: `children`
- preset: `Preset 2 — CHILDREN / real life`
- source_size: `1280x960` -> output_size: `1200x900`
- processed: `processed/children_real_02.webp`
- comparison: `comparison/children_real_02__compare.webp`
- quality_flag: `ok`
- used_params: exposure=0.15, contrast=8, saturation=4, warmth=1, highlights=-10, shadows=8, whites=4, clarity=3, dehaze=1, vignette=0.0

### pool_sport_01
- source: `img_0118_IGOR1166_1.jpg`
- category: `pool_sport`
- preset: `Preset 3 — POOL / SPORT`
- source_size: `1680x1120` -> output_size: `1200x800`
- processed: `processed/pool_sport_01.webp`
- comparison: `comparison/pool_sport_01__compare.webp`
- quality_flag: `ok`
- used_params: exposure=0.2, contrast=12, saturation=2, warmth=-3, highlights=-12, shadows=7, whites=10, clarity=8, dehaze=3, vignette=0.0

### pool_sport_02
- source: `img_0018_photo_2024-07-21_20-.jpg`
- category: `pool_sport`
- preset: `Preset 3 — POOL / SPORT`
- source_size: `960x1280` -> output_size: `960x1280`
- processed: `processed/pool_sport_02.webp`
- comparison: `comparison/pool_sport_02__compare.webp`
- quality_flag: `ok`
- used_params: exposure=0.2, contrast=12, saturation=2, warmth=-3, highlights=-12, shadows=7, whites=10, clarity=8, dehaze=3, vignette=0.0

### stay_rooms_01
- source: `img_0062_EGOR1174_1.jpg`
- category: `stay_rooms`
- preset: `Preset 4 — STAY / ROOMS`
- source_size: `1680x1120` -> output_size: `1200x800`
- processed: `processed/stay_rooms_01.webp`
- comparison: `comparison/stay_rooms_01__compare.webp`
- quality_flag: `ok`
- used_params: exposure=0.25, contrast=6, saturation=-2, warmth=-2, highlights=-8, shadows=10, whites=10, clarity=3, dehaze=2, vignette=0.0

### stay_rooms_02
- source: `img_0083_EGOR1152-Edit_1.jpg`
- category: `stay_rooms`
- preset: `Preset 4 — STAY / ROOMS`
- source_size: `1680x1120` -> output_size: `1200x800`
- processed: `processed/stay_rooms_02.webp`
- comparison: `comparison/stay_rooms_02__compare.webp`
- quality_flag: `ok`
- used_params: exposure=0.25, contrast=6, saturation=-2, warmth=-2, highlights=-8, shadows=10, whites=10, clarity=3, dehaze=2, vignette=0.0

### infrastructure_01
- source: `img_0078_IMG_2211_1.jpg`
- category: `infrastructure`
- preset: `Preset 5 — INFRASTRUCTURE`
- source_size: `1680x1260` -> output_size: `1200x900`
- processed: `processed/infrastructure_01.webp`
- comparison: `comparison/infrastructure_01__compare.webp`
- quality_flag: `ok`
- used_params: exposure=0.2, contrast=8, saturation=1, warmth=0, highlights=-10, shadows=8, whites=6, clarity=4, dehaze=4, vignette=0.0

### infrastructure_02
- source: `img_0113_dc48894a7f3817021a23.jpg`
- category: `infrastructure`
- preset: `Preset 5 — INFRASTRUCTURE`
- source_size: `809x540` -> output_size: `809x540`
- processed: `processed/infrastructure_02.webp`
- comparison: `comparison/infrastructure_02__compare.webp`
- quality_flag: `weak`
- used_params: exposure=0.2, contrast=8, saturation=1, warmth=0, highlights=-10, shadows=8, whites=6, clarity=4, dehaze=4, vignette=0.0

## Самые сильные результаты (предварительно)
- `hero_atmosphere_01` — визуально чистый контраст/свет, без агрессивной перенасыщенности.
- `pool_sport_01` — визуально чистый контраст/свет, без агрессивной перенасыщенности.
- `stay_rooms_01` — визуально чистый контраст/свет, без агрессивной перенасыщенности.

## Кандидаты на корректировку перед массовой обработкой
- `infrastructure_02` — можно чуть снизить clarity при массовом прогоне, если появится лишняя микрорезкость.
- `children_real_02` — при ночных/теневых кадрах возможно потребуется ещё мягче работать с highlights.