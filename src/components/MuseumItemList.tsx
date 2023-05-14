import type { FC } from 'react'

import type { RootDataMuseum } from '@/types/Museum.type'

import MuseumItem from './MuseumItem'

export type Props = {
  museums: RootDataMuseum[] | []
}

const MuseumItemList: FC<Props> = ({ museums }) => {
  return (
    <div className="grid grid-cols-1 items-start justify-center gap-8 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {museums.length > 0 &&
        museums.map((museumItem: RootDataMuseum) => (
          <MuseumItem
            key={museumItem.nativeId}
            museum={museumItem.data.general}
          />
        ))}
    </div>
  )
}
export default MuseumItemList
