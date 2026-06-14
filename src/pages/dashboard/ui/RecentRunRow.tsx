import { Box, Link as ChakraLink, Flex, HStack, Span, Text } from '@chakra-ui/react'
import { GitBranch } from 'lucide-react'
import { Link } from 'react-router'
import type { TaskRun } from 'src/shared/fixtures'
import { formatUsd, relTime } from 'src/shared/fixtures'
import { MiniStepper, StatusBadge, toneForStatus } from 'src/shared/ui'

export const RecentRunRow = ({ run }: { readonly run: TaskRun }) => (
  <ChakraLink
    asChild
    display="block"
    position="relative"
    borderBottomWidth="1px"
    borderColor="border.subtle"
    _last={{ borderBottomWidth: '0' }}
    _hover={{ textDecoration: 'none', bg: 'brand.tint' }}
  >
    <Link to={`/runs/${run.id}`}>
      <Flex align="center" gap="3" pr="4" pl="0">
        <Box
          w="3px"
          alignSelf="stretch"
          borderRightRadius="3px"
          flexShrink="0"
          bg={`dot.${toneForStatus(run.status)}`}
        />
        <Box flex="1" minW="0" py="3">
          <Text textStyle="medium-sm" color="fg.0" truncate>
            {run.title}
          </Text>
          <HStack gap="2" mt="1" color="fg.2" textStyle="regular-xs">
            <HStack gap="1" minW="0">
              <Box color="fg.3" display="inline-flex">
                <GitBranch size={13} />
              </Box>
              <Text truncate>{run.repos[0]}</Text>
            </HStack>
            {run.repos.length > 1 ? (
              <Span px="1.5" borderRadius="4px" bg="bg.inset" color="fg.3" textStyle="regular-micro">
                +{run.repos.length - 1}
              </Span>
            ) : null}
            <Span color="fg.3">·</Span>
            <Text className="mono" color="fg.3" textStyle="regular-micro">
              {run.id}
            </Text>
          </HStack>
        </Box>
        <Flex display={{ base: 'none', lg: 'flex' }} w="112px" justify="flex-end" flexShrink="0">
          <MiniStepper done={run.progress.done} total={run.progress.total} status={run.status} />
        </Flex>
        <Flex w={{ base: 'auto', sm: '150px' }} flexShrink="0">
          <StatusBadge status={run.status} size="sm" />
        </Flex>
        <Text className="mono tnum" textStyle="medium-sm" color="fg.1" w="14" textAlign="right" flexShrink="0">
          {formatUsd(run.spend)}
        </Text>
        <Text
          display={{ base: 'none', md: 'block' }}
          textStyle="regular-xs"
          color="fg.3"
          w="16"
          textAlign="right"
          flexShrink="0"
        >
          {relTime(run.createdAt)}
        </Text>
      </Flex>
    </Link>
  </ChakraLink>
)
