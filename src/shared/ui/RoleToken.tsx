import { Center } from '@chakra-ui/react'

interface RoleTokenProps {
  readonly name: string
  readonly size?: number
}

const DEFAULT_SIZE = 26

// Teal role token (.role-token): rounded tile with the role initial, reading
// the `accent.role.*` tokens. A presentational stand-in for the prototype's
// per-role icon set (no new icon dependency).
export const RoleToken = ({ name, size = DEFAULT_SIZE }: RoleTokenProps) => (
  <Center
    boxSize={`${size}px`}
    borderRadius="8px"
    flexShrink="0"
    color="accent.role.fg"
    bg="accent.role.bg"
    borderWidth="1px"
    borderColor="accent.role.border"
    textStyle="semibold-sm"
    textTransform="uppercase"
  >
    {name.slice(0, 1)}
  </Center>
)
