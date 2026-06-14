import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import { system } from './theme/theme'

// Hatch stripes for the estimate bar, resolved from brand tokens (not raw hex)
// so the meter stays token-driven, matching graphTokens.ts.
const hatchBorder = system.token('colors.brand.softBorder')
const hatchFill = system.token('colors.brand.soft')
const estimateHatch = `repeating-linear-gradient(45deg, ${hatchBorder}, ${hatchBorder} 4px, ${hatchFill} 4px, ${hatchFill} 8px)`

interface CostMeterProps {
  readonly spent: number
  readonly limit: number
  readonly estimate?: number
}

const PERCENT = 100
const COST_DECIMALS = 2

// Token/cost budget meter (.meter): a filled brand bar for spend, a hatched
// brand-soft bar for the estimate, and a labelled summary row beneath.
export const CostMeter = ({ spent, limit, estimate = 0 }: CostMeterProps) => {
  const spentPct = Math.min(PERCENT, (spent / limit) * PERCENT)
  const estPct = estimate ? Math.min(PERCENT - spentPct, (estimate / limit) * PERCENT) : 0

  return (
    <Stack gap="2">
      <HStack gap="0" h="2" borderRadius="pill" bg="bg.inset" borderWidth="1px" borderColor="border" overflow="hidden">
        <Box h="full" w={`${spentPct}%`} bg="brand.500" />
        {estPct > 0 ? <Box h="full" w={`${estPct}%`} backgroundImage={estimateHatch} /> : null}
      </HStack>
      <HStack gap="4" textStyle="regular-xs" color="fg.2" wrap="wrap">
        <Text className="mono">
          <Text as="span" color="fg.0" fontWeight="650">
            ${spent.toFixed(COST_DECIMALS)}
          </Text>{' '}
          spent
        </Text>
        {estimate ? (
          <Text className="mono" color="brand.ink">
            +${estimate.toFixed(COST_DECIMALS)} est.
          </Text>
        ) : null}
        <Text className="mono" ml="auto">
          ${limit.toFixed(COST_DECIMALS)} budget
        </Text>
      </HStack>
    </Stack>
  )
}
