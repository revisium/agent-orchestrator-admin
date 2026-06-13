import { Badge } from '@chakra-ui/react'

type ModelLevel = 'cheap' | 'standard' | 'deep'

interface ModelChipProps {
  readonly level: ModelLevel
}

// Model-level pill (.model-chip): lowercase, pill radius. cheap = neutral,
// standard = running-blue, deep = gate-warm — mapped onto status/accent tokens.
const LEVEL_TOKEN: Record<ModelLevel, { fg: string; bg: string; border: string }> = {
  cheap: { fg: 'status.neutral.fg', bg: 'status.neutral.bg', border: 'status.neutral.border' },
  standard: { fg: 'status.running.fg', bg: 'status.running.bg', border: 'status.running.border' },
  deep: { fg: 'accent.gate.fg', bg: 'accent.gate.bg', border: 'accent.gate.border' },
}

export const ModelChip = ({ level }: ModelChipProps) => {
  const token = LEVEL_TOKEN[level]
  return (
    <Badge
      textStyle="semibold-micro"
      textTransform="lowercase"
      letterSpacing="0.01em"
      px="2"
      py="0.5"
      borderRadius="pill"
      borderWidth="1px"
      color={token.fg}
      bg={token.bg}
      borderColor={token.border}
    >
      {level}
    </Badge>
  )
}
