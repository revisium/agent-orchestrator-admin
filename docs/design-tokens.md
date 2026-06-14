# Design tokens — CSS-var → Chakra-token map

The Chakra design system (`src/shared/ui/theme/`) is ported from the
claude.ai/design prototype. The token source is the prototype `:root` with the
**rust** brand locked (one brand, forced-light, warm neutrals — no brand
switcher). This table maps each prototype CSS variable to its Chakra token.

## Brand (rust)

| CSS var               | value     | Chakra token                                  |
| --------------------- | --------- | --------------------------------------------- |
| `--brand`             | `#b23a17` | `colors.brand.500`, `colors.accent.gate.*` fg |
| `--brand-hover`       | `#a03414` | `colors.brand.600`, `colors.brand.hover`      |
| `--brand-press`       | `#882c10` | `colors.brand.700`, `colors.brand.press`      |
| `--brand-on`          | `#ffffff` | `colors.brand.on`                             |
| `--brand-soft`        | `#f6ddd2` | `colors.brand.100`, `colors.brand.soft`       |
| `--brand-soft-border` | `#e9b29c` | `colors.brand.200`, `colors.brand.softBorder` |
| `--brand-tint`        | `#fbefe9` | `colors.brand.50`, `colors.brand.tint`        |
| `--brand-ink`         | `#832710` | `colors.brand.800`, `colors.brand.ink`        |

## Neutrals (warm)

| CSS var           | value     | Chakra token                                         |
| ----------------- | --------- | ---------------------------------------------------- |
| `--bg-0`          | `#f3f1ea` | `colors.bg.0` (canvas)                               |
| `--bg-1`          | `#fcfbf7` | `colors.bg.1` (surface), `colors.neutral.100`        |
| `--bg-2`          | `#ffffff` | `colors.bg.2` (raised), `colors.neutral.0`           |
| `--bg-inset`      | `#efece3` | `colors.bg.inset`                                    |
| `--bg-sidebar`    | `#efede4` | `colors.bg.sidebar`                                  |
| `--border`        | `#e6e1d4` | `colors.border`, `colors.neutral.200`                |
| `--border-strong` | `#d6cfbd` | `colors.border.strong`, `colors.neutral.300`         |
| `--border-subtle` | `#eee9dd` | `colors.border.subtle`                               |
| `--fg-0`          | `#23201b` | `colors.fg.0`, `colors.text.1`, `colors.neutral.900` |
| `--fg-1`          | `#423d34` | `colors.fg.1`, `colors.text.2`, `colors.neutral.800` |
| `--fg-2`          | `#78716a` | `colors.fg.2`, `colors.text.3`                       |
| `--fg-3`          | `#a39c8e` | `colors.fg.3`, `colors.text.4`                       |

`neutral.*` / `text.*` are legacy aliases kept so existing call sites resolve to
the warm palette without a sweep.

## Status (warm-calibrated) + solid dots

| CSS var (fg/bg/bd) | Chakra token              | dot var         | dot token            |
| ------------------ | ------------------------- | --------------- | -------------------- |
| `--st-running-*`   | `colors.status.running.*` | `--dot-running` | `colors.dot.running` |
| `--st-success-*`   | `colors.status.success.*` | `--dot-success` | `colors.dot.success` |
| `--st-failed-*`    | `colors.status.failed.*`  | `--dot-failed`  | `colors.dot.failed`  |
| `--st-waiting-*`   | `colors.status.waiting.*` | `--dot-waiting` | `colors.dot.waiting` |
| `--st-neutral-*`   | `colors.status.neutral.*` | `--dot-neutral` | `colors.dot.neutral` |
| `--st-muted-*`     | `colors.status.muted.*`   | `--dot-muted`   | `colors.dot.muted`   |

Each `status.<tone>` exposes `fg` / `bg` / `border`.

## Accents

| CSS var (fg/bg/bd) | meaning    | Chakra token           |
| ------------------ | ---------- | ---------------------- |
| `--gate-*`         | brand-warm | `colors.accent.gate.*` |
| `--role-*`         | teal       | `colors.accent.role.*` |

## Syntax / diff (mono code + diff blocks)

| CSS var         | Chakra token            | CSS var         | Chakra token            |
| --------------- | ----------------------- | --------------- | ----------------------- |
| `--syn-key`     | `colors.syntax.key`     | `--diff-add-bg` | `colors.diff.addBg`     |
| `--syn-string`  | `colors.syntax.string`  | `--diff-add-bd` | `colors.diff.addBorder` |
| `--syn-number`  | `colors.syntax.number`  | `--diff-del-bg` | `colors.diff.delBg`     |
| `--syn-keyword` | `colors.syntax.keyword` | `--diff-del-bd` | `colors.diff.delBorder` |
| `--syn-comment` | `colors.syntax.comment` |                 |                         |
| `--syn-punct`   | `colors.syntax.punct`   |                 |                         |

## Fonts

| CSS var       | Chakra token                          |
| ------------- | ------------------------------------- |
| `--font-ui`   | `fonts.body`, `fonts.heading` (Inter) |
| `--font-mono` | `fonts.mono` (JetBrains Mono)         |

JetBrains Mono is loaded with Inter from the Google Fonts `<link>` in
`src/root.tsx`. The `.mono` / `.tnum` helpers live in `globalCss`.

## Font sizes / radii / shadows / motion

| CSS var ramp                      | Chakra token group                                       |
| --------------------------------- | -------------------------------------------------------- |
| `--fs-micro 11 … --fs-display 28` | `fontSizes.*` (`micro/caption/sm/body/h3/h2/h1/display`) |
| `--r-chip/btn/card/modal/pill`    | `radii.chip/btn/card/modal/pill`                         |
| `--sh-1/2/3`, `--sh-glow`         | `shadows.sh-1/sh-2/sh-3/sh-glow`                         |
| `--ease`                          | `easings.standard`                                       |
| `--dur`                           | `durations.fast`                                         |

`textStyles` (`{weight}-{size}`) are recalibrated onto this ramp; existing
size keys (`xs/sm/md/lg/xl/xxl`) remap to the warm prototype scale.

## globalCss

`body` bg/fg + `font-feature-settings:'cv05' 1,'ss01' 1`; `.mono` / `.tnum`
helpers; warm custom scrollbar; warm `::selection`; the `.dotgrid` radial util
(`--border-strong` dots). The accessible `:focus-visible` brand ring is
preserved.
