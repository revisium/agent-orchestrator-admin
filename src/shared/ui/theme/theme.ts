import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
import { globalCss } from './globalCss'
import { textStyles } from './textStyles'

// Tokens ported from the claude.ai/design prototype (.design/styles.css `:root`,
// rust brand). One locked brand, forced-light, warm-neutral palette. CSS-var →
// Chakra-token mapping lives in docs/design-tokens.md.
const config = defineConfig({
  globalCss,
  theme: {
    textStyles,
    tokens: {
      colors: {
        // brand: rust scale + role aliases (--brand* in styles.css)
        brand: {
          50: { value: '#fbefe9' }, // --brand-tint
          100: { value: '#f6ddd2' }, // --brand-soft
          200: { value: '#e9b29c' }, // --brand-soft-border
          500: { value: '#b23a17' }, // --brand
          600: { value: '#a03414' }, // --brand-hover
          700: { value: '#882c10' }, // --brand-press
          800: { value: '#832710' }, // --brand-ink
          hover: { value: '#a03414' },
          press: { value: '#882c10' },
          on: { value: '#ffffff' },
          soft: { value: '#f6ddd2' },
          softBorder: { value: '#e9b29c' },
          tint: { value: '#fbefe9' },
          ink: { value: '#832710' },
        },
        // warm neutrals (--bg-*, --border*, --fg-*)
        bg: {
          0: { value: '#f3f1ea' }, // app canvas
          1: { value: '#fcfbf7' }, // card / surface
          2: { value: '#ffffff' }, // raised / popover
          inset: { value: '#efece3' }, // wells, code bg
          sidebar: { value: '#efede4' },
        },
        border: {
          DEFAULT: { value: '#e6e1d4' }, // hairline
          strong: { value: '#d6cfbd' },
          subtle: { value: '#eee9dd' },
        },
        fg: {
          0: { value: '#23201b' }, // ink
          1: { value: '#423d34' },
          2: { value: '#78716a' }, // muted
          3: { value: '#a39c8e' }, // faint
        },
        // legacy aliases kept for existing call sites (neutral.*, text.*)
        neutral: {
          0: { value: '#ffffff' },
          100: { value: '#fcfbf7' },
          200: { value: '#e6e1d4' },
          300: { value: '#d6cfbd' },
          800: { value: '#423d34' },
          900: { value: '#23201b' },
        },
        text: {
          1: { value: '#23201b' },
          2: { value: '#423d34' },
          3: { value: '#78716a' },
          4: { value: '#a39c8e' },
        },
        // status palette (warm-calibrated) — fg/bg/border + solid dot.
        status: {
          running: { fg: { value: '#1f54a6' }, bg: { value: '#e6eefb' }, border: { value: '#bcd0f1' } },
          success: { fg: { value: '#4a7320' }, bg: { value: '#ecf3dd' }, border: { value: '#c8dca5' } },
          failed: { fg: { value: '#ab3c24' }, bg: { value: '#fae3da' }, border: { value: '#ecb6a4' } },
          waiting: { fg: { value: '#966012' }, bg: { value: '#f8ebcd' }, border: { value: '#e7c987' } },
          neutral: { fg: { value: '#6b6459' }, bg: { value: '#efece2' }, border: { value: '#d8d1c1' } },
          muted: { fg: { value: '#8a8478' }, bg: { value: '#f0eee5' }, border: { value: '#ddd6c8' } },
        },
        // solid status dots (--dot-*)
        dot: {
          running: { value: '#2f6fd6' },
          success: { value: '#6a9a2e' },
          failed: { value: '#cf5235' },
          waiting: { value: '#d49a23' },
          neutral: { value: '#a59c8c' },
          muted: { value: '#b3ab9c' },
        },
        // accents: gate = brand-warm, role = teal
        accent: {
          gate: { fg: { value: '#a03414' }, bg: { value: '#f6ddd2' }, border: { value: '#e9b29c' } },
          role: { fg: { value: '#2a6f6a' }, bg: { value: '#ddeee9' }, border: { value: '#a8d2cb' } },
        },
        // syntax / diff (mono code + diff blocks)
        syntax: {
          key: { value: '#1f54a6' },
          string: { value: '#4a7320' },
          number: { value: '#b06314' },
          keyword: { value: '#8a3d6b' },
          comment: { value: '#a39c8e' },
          punct: { value: '#78716a' },
        },
        diff: {
          addBg: { value: '#ecf3dd' },
          addBorder: { value: '#c8dca5' },
          delBg: { value: '#fae3da' },
          delBorder: { value: '#ecb6a4' },
        },
      },
      fonts: {
        heading: { value: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
        body: { value: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
        mono: { value: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace" },
      },
      fontSizes: {
        micro: { value: '11px' },
        caption: { value: '12px' },
        sm: { value: '13px' },
        body: { value: '14px' },
        h3: { value: '14px' },
        h2: { value: '16px' },
        h1: { value: '20px' },
        display: { value: '28px' },
      },
      radii: {
        chip: { value: '6px' },
        btn: { value: '8px' },
        card: { value: '10px' },
        modal: { value: '14px' },
        pill: { value: '999px' },
      },
      shadows: {
        'sh-1': { value: '0 1px 2px rgba(60,46,30,.05), 0 1px 1px rgba(60,46,30,.04)' },
        'sh-2': { value: '0 4px 12px rgba(60,46,30,.08), 0 1px 3px rgba(60,46,30,.06)' },
        'sh-3': { value: '0 16px 40px rgba(45,33,20,.16), 0 2px 8px rgba(45,33,20,.10)' },
        'sh-glow': { value: '0 0 0 4px #f6ddd2' },
      },
      easings: {
        standard: { value: 'cubic-bezier(.2,0,0,1)' },
      },
      durations: {
        fast: { value: '150ms' },
      },
    },
    semanticTokens: {
      colors: {
        // surface aliases used widely; map onto the warm neutrals.
        'bg.canvas': { value: '{colors.bg.0}' },
        'bg.surface': { value: '{colors.bg.1}' },
        'bg.raised': { value: '{colors.bg.2}' },
      },
    },
    breakpoints: {
      base: '0px',
      sm: '360px',
      md: '480px',
      lg: '768px',
      xl: '1200px',
    },
  },
})

export const system = createSystem(defaultConfig, config)
