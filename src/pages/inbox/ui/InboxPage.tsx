import { useState } from 'react'
import { Button, HStack, Stack } from '@chakra-ui/react'
import { PageHeader } from 'src/shared/ui'
import { INBOX_ITEMS } from 'src/shared/fixtures'
import { InboxList } from 'src/widgets/InboxList'

type Filter = 'pending' | 'all'

export const InboxPage = () => {
  const [filter, setFilter] = useState<Filter>('pending')
  const items = filter === 'pending' ? INBOX_ITEMS.filter((item) => item.status === 'pending') : INBOX_ITEMS

  return (
    <Stack gap="6" maxW="800px">
      <PageHeader
        eyebrow="Decisions"
        title="Inbox"
        description="The single human queue: approvals, questions, and alerts."
      />
      <HStack gap="2">
        <Button
          size="xs"
          borderRadius="btn"
          variant={filter === 'pending' ? 'solid' : 'outline'}
          bg={filter === 'pending' ? 'brand.500' : 'bg.1'}
          color={filter === 'pending' ? 'brand.on' : 'fg.1'}
          borderColor="border.strong"
          onClick={() => setFilter('pending')}
        >
          Pending
        </Button>
        <Button
          size="xs"
          borderRadius="btn"
          variant={filter === 'all' ? 'solid' : 'outline'}
          bg={filter === 'all' ? 'brand.500' : 'bg.1'}
          color={filter === 'all' ? 'brand.on' : 'fg.1'}
          borderColor="border.strong"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
      </HStack>
      <InboxList items={items} />
    </Stack>
  )
}
