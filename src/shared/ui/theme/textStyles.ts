import { defineTextStyles } from '@chakra-ui/react'

// Sizes recalibrated to the prototype type ramp (.design/styles.css):
// micro 11 → display 28. Existing call-site keys (xs/sm/md/lg/xl/xxl) are
// remapped onto that ramp so screens render at the warm prototype scale.
const SIZES: Record<string, { fontSize: string; lineHeight: string }> = {
  micro: { fontSize: '11px', lineHeight: '15px' },
  xs: { fontSize: '12px', lineHeight: '16px' }, // caption
  sm: { fontSize: '13px', lineHeight: '18px' },
  body: { fontSize: '14px', lineHeight: '21px' },
  md: { fontSize: '16px', lineHeight: '22px' }, // h2
  lg: { fontSize: '20px', lineHeight: '26px' }, // h1
  xl: { fontSize: '20px', lineHeight: '26px' }, // h1 (alias)
  xxl: { fontSize: '28px', lineHeight: '31px' }, // display
  display: { fontSize: '28px', lineHeight: '31px' },
}

const WEIGHTS: Record<string, string> = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '680',
}

const entries = Object.entries(WEIGHTS).flatMap(([weight, fontWeight]) =>
  Object.entries(SIZES).map(([size, { fontSize, lineHeight }]) => [
    `${weight}-${size}`,
    { value: { fontSize, lineHeight, fontWeight } },
  ]),
)

export const textStyles = defineTextStyles(Object.fromEntries(entries))
