import { Badge, Text, Wrap, WrapItem } from '@chakra-ui/react'

interface TagListProps {
  readonly items: ReadonlyArray<string>
  readonly emptyLabel?: string
}

// Wrapping list of neutral chips for string arrays such as repos[],
// allowed_tools[], triggers[] (.tag in the prototype: inset bg, hairline).
export const TagList = ({ items, emptyLabel = '—' }: TagListProps) => {
  if (items.length === 0) {
    return (
      <Text textStyle="regular-sm" color="fg.3">
        {emptyLabel}
      </Text>
    )
  }

  return (
    <Wrap gap="2">
      {items.map((item) => (
        <WrapItem key={item}>
          <Badge
            className="mono"
            textStyle="regular-xs"
            px="2"
            py="0.5"
            borderRadius="chip"
            borderWidth="1px"
            color="fg.1"
            bg="bg.inset"
            borderColor="border"
            whiteSpace="nowrap"
          >
            {item}
          </Badge>
        </WrapItem>
      ))}
    </Wrap>
  )
}
