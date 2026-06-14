import { Box, Center, Flex, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { BookOpen, GitBranch, Layers, Terminal, type LucideIcon } from 'lucide-react'
import { HOST_STATUS } from 'src/shared/fixtures'

interface HostStat {
  readonly key: string
  readonly value: string
  readonly icon: LucideIcon
  readonly mono?: boolean
}

const STATS: ReadonlyArray<HostStat> = [
  { key: 'daemon', value: 'up', icon: Terminal },
  { key: 'DBOS', value: 'connected', icon: Layers },
  { key: 'control-plane', value: HOST_STATUS.controlPlane, icon: GitBranch, mono: true },
  { key: 'playbook', value: HOST_STATUS.playbookVersion, icon: BookOpen, mono: true },
]

export const HostStatusCard = () => (
  <Box bg="bg.1" borderWidth="1px" borderColor="border" borderRadius="card" boxShadow="sh-1" overflow="hidden">
    <Flex
      align="center"
      justify="space-between"
      gap="4"
      px="5"
      py="4"
      borderBottomWidth="1px"
      borderColor="border"
      bgGradient="to-b"
      gradientFrom="brand.tint"
      gradientTo="transparent"
    >
      <HStack gap="3" minW="0">
        <Center
          boxSize="30px"
          borderRadius="9px"
          bg="status.success.bg"
          borderWidth="1px"
          borderColor="status.success.border"
        >
          <Box boxSize="2.5" borderRadius="full" bg="dot.success" boxShadow="0 0 0 3px rgba(106,154,46,.22)" />
        </Center>
        <Box minW="0">
          <Text textStyle="semibold-body" color="fg.0">
            Host online
          </Text>
          <Text className="mono" textStyle="regular-xs" color="fg.2" truncate>
            {HOST_STATUS.host}
          </Text>
        </Box>
      </HStack>
      <Stack gap="0" textAlign="right" flexShrink="0">
        <Text textStyle="regular-micro" color="fg.3" textTransform="uppercase" letterSpacing="0.05em">
          uptime
        </Text>
        <Text className="mono" textStyle="semibold-body" color="fg.0" whiteSpace="nowrap">
          {HOST_STATUS.uptime}
        </Text>
      </Stack>
    </Flex>

    <SimpleGrid columns={{ base: 2, md: 4 }}>
      {STATS.map((stat) => {
        const Icon = stat.icon
        return (
          <Stack
            key={stat.key}
            gap="1.5"
            px="5"
            py="3.5"
            minW="0"
            borderRightWidth="1px"
            borderBottomWidth="1px"
            borderColor="border.subtle"
          >
            <HStack gap="1.5" color="fg.2" textStyle="regular-xs" whiteSpace="nowrap">
              <Box color="fg.3" display="inline-flex">
                <Icon size={14} />
              </Box>
              <Text>{stat.key}</Text>
            </HStack>
            {stat.mono ? (
              <Text className="mono" textStyle="regular-xs" color="fg.0" lineHeight="1.4" overflowWrap="anywhere">
                {stat.value}
              </Text>
            ) : (
              <HStack gap="2" color="fg.0" textStyle="medium-body">
                <Box boxSize="1.5" borderRadius="full" bg="dot.success" flexShrink="0" />
                <Text>{stat.value}</Text>
              </HStack>
            )}
          </Stack>
        )
      })}
    </SimpleGrid>
  </Box>
)
