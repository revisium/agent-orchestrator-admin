import { Box, Button, Center, Flex, HStack, Link as ChakraLink, Span, Stack, Text } from '@chakra-ui/react'
import { Link, Outlet, useLocation } from 'react-router'
import { HOST_STATUS, INBOX_ITEMS } from 'src/shared/fixtures'

interface NavItem {
  readonly label: string
  readonly to: string
  // Prefix used to mark the active section (e.g. /method matches /method/roles).
  readonly match: string
  readonly badge?: number
}

const PENDING_INBOX = INBOX_ITEMS.filter((item) => item.status === 'pending').length

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: 'Dashboard', to: '/', match: '/' },
  { label: 'Runs', to: '/runs', match: '/runs' },
  { label: 'Inbox', to: '/inbox', match: '/inbox', badge: PENDING_INBOX },
  { label: 'Method', to: '/method/roles', match: '/method' },
]

const isActive = (pathname: string, match: string): boolean =>
  match === '/' ? pathname === '/' : pathname === match || pathname.startsWith(`${match}/`)

// Brand mark: rounded rust tile with a stylized "r" (.brand__mark in app.jsx).
const BrandMark = () => (
  <HStack as={Link} gap="2.5" {...{ to: '/' }} _hover={{ textDecoration: 'none' }}>
    <Center boxSize="20px" borderRadius="6px" bg="brand.500" color="brand.on" textStyle="bold-sm">
      r
    </Center>
    <Text textStyle="bold-md" letterSpacing="-0.02em" color="fg.0">
      revo
    </Text>
  </HStack>
)

const NavRail = ({ pathname }: { readonly pathname: string }) => (
  <Stack as="nav" gap="0.5" px="3" py="2">
    {NAV_ITEMS.map((item) => {
      const active = isActive(pathname, item.match)
      return (
        <ChakraLink
          key={item.to}
          asChild
          h="34px"
          px="2.5"
          borderRadius="7px"
          display="flex"
          alignItems="center"
          gap="2.5"
          textStyle={active ? 'semibold-body' : 'medium-body'}
          color={active ? 'brand.ink' : 'fg.1'}
          bg={active ? 'brand.soft' : 'transparent'}
          _hover={active ? {} : { bg: 'blackAlpha.50', color: 'fg.0' }}
        >
          <Link to={item.to}>
            <Span flex="1">{item.label}</Span>
            {item.badge ? (
              <Center
                minW="19px"
                h="19px"
                px="1.5"
                borderRadius="pill"
                bg="brand.500"
                color="white"
                textStyle="semibold-micro"
              >
                {item.badge}
              </Center>
            ) : null}
          </Link>
        </ChakraLink>
      )
    })}
  </Stack>
)

// Host status pill at the sidebar foot (.host-pill): green beacon + daemon line.
const HostPill = () => (
  <HStack mt="auto" m="3" p="2.5" gap="2.5" borderRadius="9px" bg="bg.1" borderWidth="1px" borderColor="border">
    <Box boxSize="2" borderRadius="full" bg="dot.success" flexShrink="0" boxShadow="0 0 0 3px rgba(106,154,46,.16)" />
    <Stack gap="0" minW="0">
      <Text textStyle="medium-xs" color="fg.1">
        local · connected
      </Text>
      <Text className="mono" textStyle="regular-micro" color="fg.3" truncate>
        {HOST_STATUS.playbookVersion}
      </Text>
    </Stack>
  </HStack>
)

const Sidebar = ({ pathname }: { readonly pathname: string }) => (
  <Flex
    as="aside"
    direction="column"
    w="232px"
    flexShrink="0"
    bg="bg.sidebar"
    borderRightWidth="1px"
    borderColor="border"
  >
    <HStack justify="space-between" px="3.5" pt="4" pb="3">
      <BrandMark />
    </HStack>
    <NavRail pathname={pathname} />
    <HostPill />
  </Flex>
)

// ⌘K affordance — a non-functional visual search trigger (prototype).
const CommandAffordance = () => (
  <HStack
    h="34px"
    px="2.5"
    gap="2"
    minW="168px"
    borderWidth="1px"
    borderColor="border.strong"
    bg="bg.1"
    borderRadius="btn"
    color="fg.2"
    textStyle="regular-sm"
  >
    <Span flex="1">Search</Span>
    <Center
      className="mono"
      px="1.5"
      py="0.5"
      borderRadius="5px"
      bg="bg.inset"
      borderWidth="1px"
      borderColor="border"
      textStyle="regular-micro"
    >
      ⌘K
    </Center>
  </HStack>
)

const TopBar = () => (
  <Flex
    as="header"
    h="56px"
    flexShrink="0"
    align="center"
    justify="space-between"
    pl="6"
    pr="7"
    borderBottomWidth="1px"
    borderColor="border"
    bg="bg.1"
    position="sticky"
    top="0"
    zIndex="20"
  >
    <HStack gap="1.5" textStyle="regular-body" color="fg.2">
      <ChakraLink asChild color="fg.2" _hover={{ color: 'fg.0' }}>
        <Link to="/">revo</Link>
      </ChakraLink>
      <Span color="fg.3">/</Span>
      <Text color="fg.0" fontWeight="560">
        Control plane
      </Text>
    </HStack>
    <HStack gap="3">
      <CommandAffordance />
      <Button
        asChild
        size="sm"
        h="34px"
        px="3.5"
        bg="brand.500"
        color="brand.on"
        borderRadius="btn"
        _hover={{ bg: 'brand.hover' }}
      >
        <Link to="/runs/new">+ New run</Link>
      </Button>
      <Box w="1px" h="26px" bg="border" />
      <Center
        boxSize="30px"
        borderRadius="full"
        bgGradient="to-br"
        gradientFrom="brand.500"
        gradientTo="brand.press"
        color="brand.on"
        textStyle="semibold-sm"
      >
        ka
      </Center>
    </HStack>
  </Flex>
)

export const Layout = () => {
  const { pathname } = useLocation()

  return (
    <Flex h="100dvh" overflow="hidden" bg="bg.0">
      <Sidebar pathname={pathname} />
      <Flex direction="column" flex="1" minW="0">
        <TopBar />
        <Box flex="1" overflowY="auto" overflowX="hidden">
          <Box maxW="1180px" mx="auto" px="10" pt="7" pb="24">
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}
