# test_processing_report_v2

## Scope
- stay_rooms_01
- stay_rooms_02
- infrastructure_01
- infrastructure_02
- pool_sport_01
- pool_sport_02

## Applied preset ranges (soft v2)
- exposure: +0.09..+0.11
- contrast: +3%..+5%
- saturation: +0%..+2%
- highlights: -10%..-14%
- shadows: +6%..+8%
- warmth: +0..+0.5% channel shift
- whites: +4% (gentle selective)
- blacks: -2% (gentle selective)
- sharpness: +1%..+2%
- vignette: off
- dehaze: off

## Per-file results
- **stay_rooms_01** (stay) — **keep original**
  - params: exposure +0.09, contrast +3%, saturation +0%, highlights -14%, shadows +8%, warmth +0.005, whites +4%, blacks -2%, sharpness +1%
  - metrics: clip_hi 0.0151 → 0.0282, clip_lo 0.0037 → 0.0034, sat 0.2870 → 0.2941, luma_std 0.1829 → 0.1574
  - note: рост клиппинга светов
- **stay_rooms_02** (stay) — **ready for site**
  - params: exposure +0.09, contrast +3%, saturation +0%, highlights -14%, shadows +8%, warmth +0.005, whites +4%, blacks -2%, sharpness +1%
  - metrics: clip_hi 0.0080 → 0.0041, clip_lo 0.0050 → 0.0017, sat 0.2966 → 0.2903, luma_std 0.1907 → 0.1687
  - note: меньше/не больше клиппинга, мягче тон
- **infrastructure_01** (infrastructure) — **ready for site**
  - params: exposure +0.10, contrast +4%, saturation +1%, highlights -12%, shadows +7%, warmth +0.003, whites +4%, blacks -2%, sharpness +1%
  - metrics: clip_hi 0.0344 → 0.0219, clip_lo 0.0379 → 0.0009, sat 0.2995 → 0.2735, luma_std 0.2671 → 0.2605
  - note: меньше/не больше клиппинга, мягче тон
- **infrastructure_02** (infrastructure) — **keep original**
  - params: exposure +0.10, contrast +4%, saturation +1%, highlights -12%, shadows +7%, warmth +0.003, whites +4%, blacks -2%, sharpness +1%
  - metrics: clip_hi 0.0025 → 0.0016, clip_lo 0.0643 → 0.0000, sat 0.2523 → 0.1822, luma_std 0.3217 → 0.3138
  - note: слишком заметный сдвиг насыщенности
- **pool_sport_01** (pool) — **keep original**
  - params: exposure +0.11, contrast +5%, saturation +2%, highlights -10%, shadows +6%, warmth +0.000, whites +4%, blacks -2%, sharpness +2%
  - metrics: clip_hi 0.0095 → 0.0251, clip_lo 0.0231 → 0.0060, sat 0.3901 → 0.3924, luma_std 0.2285 → 0.2369
  - note: рост клиппинга светов
- **pool_sport_02** (pool) — **keep original**
  - params: exposure +0.11, contrast +5%, saturation +2%, highlights -10%, shadows +6%, warmth +0.000, whites +4%, blacks -2%, sharpness +2%
  - metrics: clip_hi 0.0025 → 0.0433, clip_lo 0.0399 → 0.0044, sat 0.5268 → 0.5135, luma_std 0.2475 → 0.2600
  - note: рост клиппинга светов

## Summary
- ready for site: 2
  - stay_rooms_02, infrastructure_01
- keep original: 4
  - stay_rooms_01, infrastructure_02, pool_sport_01, pool_sport_02