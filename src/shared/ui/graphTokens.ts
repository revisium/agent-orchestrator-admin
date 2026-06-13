import { system } from './theme/theme'
import { type StatusTone, toneForStatus } from './statusTone'

// xyflow renders raw SVG/DOM and needs concrete color strings, not Chakra
// props. Resolve them from the same `status.*` / `accent.*` theme tokens so the
// DAGs stay token-driven. Used only inside *.client.tsx graph modules.
export interface NodePalette {
  readonly fg: string
  readonly bg: string
  readonly border: string
}

const toneToken = (tone: StatusTone): NodePalette => ({
  fg: system.token(`colors.status.${tone}.fg`),
  bg: system.token(`colors.status.${tone}.bg`),
  border: system.token(`colors.status.${tone}.border`),
})

export const paletteForStatus = (status: string): NodePalette => toneToken(toneForStatus(status))

export const gatePalette = (): NodePalette => ({
  fg: system.token('colors.accent.gate.fg'),
  bg: system.token('colors.accent.gate.bg'),
  border: system.token('colors.accent.gate.border'),
})

export const neutralPalette = (): NodePalette => toneToken('neutral')

export const edgeColor = system.token('colors.neutral.300')

// xyflow renders raw DOM, so node label font sizes are inline `style` literals.
// Centralize them here (like the color tokens above) so the DAGs stay
// consistent. `label` is the primary node title; `meta` is the secondary line
// (status / "optional" / "alt:" / edge labels).
export const NODE_FONT_SIZE = {
  label: 13,
  meta: 11,
  caption: 10,
} as const
