import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import { useState } from 'react'

import type { GeneralDataEvent } from '@/types/MKRF.type'

type Props = {
  item: GeneralDataEvent
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const ItemEvent: FC<Props> = ({ item }) => {
  const [isLoading, setLoading] = useState(true)
  return (
    <Link href={`/${item.category.sysName}/${item?.id}`}>
      <div
        className={`${
          isLoading && 'animate-pulse'
        } relative aspect-square w-full overflow-hidden rounded-lg bg-gray-400 hover:shadow-lg`}
      >
        <Image
          fill={true}
          src={item?.image?.url || ''}
          alt={item?.name || ''}
          style={{ transform: 'translate3d(0, 0, 0)' }}
          className={cn(
            'group-hover:opacity-75 duration-700 ease-in-out rounded-lg object-cover brightness-90 transition group-hover:brightness-110',
            isLoading
              ? 'grayscale blur-2xl scale-110'
              : 'grayscale-0 blur-0 scale-100'
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <div className="pt-2">
        <div className="">
          <p className="font-bold text-gray-900">
            {item?.category?.name}, {item?.places[0]?.locale.name}
          </p>
        </div>
        <div className="">
          <p className="truncate text-base text-gray-500">{item?.name}</p>
        </div>
        <div className="flex justify-between">
          <div>
            {item.isFree ? (
              <p className="text-[16px] font-bold">Бесплатно</p>
            ) : (
              <p className="text-[16px] font-bold">₽{item?.price}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
export default ItemEvent
