import { SystemConfig } from '@chakra-ui/react'

// Global shell from the prototype (.design/styles.css body + helpers). Warm
// canvas, Inter with cv05/ss01 features, mono/tnum helpers, custom scrollbar,
// warm ::selection, and the dotgrid radial util. The accessible :focus-visible
// ring is preserved (no global focus-killer).
export const globalCss: SystemConfig['globalCss'] = {
  'html, body, #root': {
    width: '100%',
    minHeight: '100dvh',
    overscrollBehavior: 'none',
  },
  body: {
    fontFamily: 'body',
    fontSize: '14px',
    lineHeight: '1.5',
    color: 'fg.0',
    bg: 'bg.0',
    textRendering: 'optimizeLegibility',
    fontFeatureSettings: "'cv05' 1, 'ss01' 1",
    paddingBottom: 'env(safe-area-inset-bottom)',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
  },
  // Mono / tabular-number helpers (.mono / .tnum in the prototype).
  '.mono': { fontFamily: 'mono', fontVariantLigatures: 'none' },
  '.tnum': { fontVariantNumeric: 'tabular-nums' },
  '::selection': { background: '#f6ddd2' },
  // Warm custom scrollbar (prototype .app__scroll).
  '*::-webkit-scrollbar': { width: '11px', height: '11px' },
  '*::-webkit-scrollbar-thumb': {
    background: '#d8d2c4',
    borderRadius: '8px',
    border: '3px solid',
    borderColor: 'bg.0',
  },
  '*::-webkit-scrollbar-thumb:hover': { background: '#c7c0af' },
  // Dotted radial background used behind the DAG canvas (.dotgrid).
  '.dotgrid': {
    backgroundImage: 'radial-gradient(#d6cfbd 1px, transparent 1px)',
    backgroundSize: '18px 18px',
  },
  // Accessible, theme-driven keyboard focus. Pointer focus stays quiet via
  // :focus-visible; keyboard users get a visible brand ring.
  '*:focus:not(:focus-visible)': {
    outline: 'none',
  },
  '*:focus-visible': {
    outline: '2px solid',
    outlineColor: 'brand.500',
    outlineOffset: '2px',
    borderRadius: '2px',
  },
}
