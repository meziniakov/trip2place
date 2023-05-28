import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import { useState } from 'react'

import type { GeneralData } from '@/types/MKRF.type'

import { categories } from './navbar/Categories'

type Props = {
  item: GeneralData
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Item: FC<Props> = ({ item }) => {
  const [isLoading, setLoading] = useState(true)
  let categoriesPath: any = []

  categories.map((category) => {
    return categoriesPath.push([category?.path, category?.value])
  })

  if (categoriesPath.length === 0) return null
  categoriesPath = Object.fromEntries(categoriesPath)

  return (
    <Link href={`/${categoriesPath[item?.category?.sysName]}/${item?.id}`}>
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
          <p className="text-sm font-bold text-gray-900">
            {item?.category?.name}, {item?.locale?.name}
          </p>
        </div>
        <div className="">
          <p className=" text-lg">{item?.name}</p>
        </div>
        <div className="flex justify-between">
          {/* <div>
            <p className="text-xs text-gray-700">
              {item?.organization?.name}
            </p>
          </div> */}
        </div>
      </div>
    </Link>
  )
}
export default Item
