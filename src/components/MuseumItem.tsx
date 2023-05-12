import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import type { Museum } from '@/types/Museum.type'

type Props = {
  museum: Museum
}

const MuseumItem: FC<Props> = ({ museum }) => {
  return (
    <Link href={`/museums/${museum.id}`}>
      <div className="relative aspect-square w-full hover:shadow-lg">
        <Image
          fill={true}
          src={museum.image.url || '/'}
          className="h-52 w-full rounded-md object-cover"
          alt={museum.name || ''}
          loading="lazy"
        />
      </div>
      <div className="pt-2">
        <div className="">
          <p className="font-bold text-gray-900">
            {museum.category.name}, {museum.locale.name}
          </p>
        </div>
        <div className="">
          <p className="truncate text-base text-gray-500">{museum.name}</p>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-[16px]">{museum.organization.name}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default MuseumItem
