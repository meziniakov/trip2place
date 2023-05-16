import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import type { GeneralData } from '@/types/MKRF.type'

type Props = {
  item: GeneralData
  category?: string
}

const Item: FC<Props> = ({ item, category }) => {
  return (
    <Link href={`/${category}/${item.id}`}>
      <div className="relative aspect-square w-full hover:shadow-lg">
        <Image
          fill={true}
          src={item.image.url || '/'}
          className="h-52 w-full rounded-md object-cover"
          alt={item.name || ''}
          loading="lazy"
        />
      </div>
      <div className="pt-2">
        <div className="">
          <p className="font-bold text-gray-900">
            {item.category.name}, {item.locale.name}
          </p>
        </div>
        <div className="">
          <p className="truncate text-base text-gray-500">{item.name}</p>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-[16px]">{item.organization.name}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default Item
