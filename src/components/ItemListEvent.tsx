import type { FC } from 'react'

import type { RootData } from '@/types/MKRF.type'

import ItemEvent from './ItemEvent'

export type Props = {
  items: RootData[] | []
}

const ItemListEvent: FC<Props> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 items-start justify-center gap-8 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {items.length > 0 &&
        items.map((item: any) => (
          <ItemEvent key={item.nativeId} item={item.data.general} />
        ))}
    </div>
  )
}
export default ItemListEvent
