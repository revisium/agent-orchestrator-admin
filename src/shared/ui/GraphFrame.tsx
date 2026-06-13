import { Box, Center, Spinner } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface GraphFrameProps {
  readonly height: number
  readonly children: ReactNode
}

// Bordered, SSR-safe surface for a client-only xyflow canvas. The server emits
// this box with the spinner placeholder; the real graph mounts into it after
// hydration. Warm surface + dotgrid background to match the prototype DAG frame.
export const GraphFrame = ({ height, children }: GraphFrameProps) => (
  <Box
    className="dotgrid"
    h={`${height}px`}
    w="full"
    borderWidth="1px"
    borderColor="border"
    borderRadius="card"
    bg="bg.1"
  >
    {children}
  </Box>
)

export const GraphPlaceholder = () => (
  <Center h="full" w="full">
    <Spinner color="brand.500" />
  </Center>
)
