import { Badge } from '@chakra-ui/react'

type AccentKind = 'gate' | 'role'

interface AccentBadgeProps {
  readonly kind: AccentKind
  readonly children: string
}

// Non-status taxonomy chip (.tag--gate / .tag--role): gate = brand-warm, role =
// teal. Reads `accent.*` tokens, kept visually distinct from StatusBadge.
export const AccentBadge = ({ kind, children }: AccentBadgeProps) => (
  <Badge
    textStyle="medium-sm"
    textTransform="capitalize"
    px="2"
    py="0.5"
    borderRadius="chip"
    borderWidth="1px"
    whiteSpace="nowrap"
    color={`accent.${kind}.fg`}
    bg={`accent.${kind}.bg`}
    borderColor={`accent.${kind}.border`}
  >
    {children}
  </Badge>
)
