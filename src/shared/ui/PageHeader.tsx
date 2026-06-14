import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface PageHeaderProps {
  readonly title: string
  readonly description?: string
  readonly eyebrow?: ReactNode
  readonly actions?: ReactNode
}

// Page title block from the prototype (.phead): an uppercase brand eyebrow, a
// large display title, an optional subtitle, and right-aligned actions.
export const PageHeader = ({ title, description, eyebrow, actions }: PageHeaderProps) => (
  <Stack gap="3" mb="2">
    {eyebrow ? (
      <HStack
        gap="2"
        textStyle="bold-xs"
        color="brand.500"
        letterSpacing="0.08em"
        textTransform="uppercase"
        align="center"
      >
        {eyebrow}
      </HStack>
    ) : null}
    <HStack justify="space-between" align="start" gap="5">
      <Stack gap="1.5">
        <Heading textStyle="bold-xxl" letterSpacing="-0.025em" color="fg.0" lineHeight="1.12">
          {title}
        </Heading>
        {description ? (
          <Text textStyle="regular-body" color="fg.2" maxW="640px">
            {description}
          </Text>
        ) : null}
      </Stack>
      {actions ? <Box flexShrink="0">{actions}</Box> : null}
    </HStack>
  </Stack>
)
