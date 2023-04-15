import type { FC } from 'react'

import type { RootDataMuseum } from '@/types/Museum.type'

import MuseumItem from './MuseumItem'

export type Props = {
  museums: RootDataMuseum[] | []
}

const MuseumItemList: FC<Props> = ({ museums }) => {
  return (
    <div className="mt-3 flex flex-nowrap items-center justify-between px-6 lg:px-10 2xl:px-20">
      <div className="mx-auto grid grid-cols-1 items-start justify-center gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {museums.length > 0 &&
          museums.map((museumItem: RootDataMuseum) => (
            <MuseumItem
              key={museumItem.nativeId}
              museum={museumItem.data.general}
            />
          ))}
      </div>
    </div>
  )
}
export default MuseumItemList
