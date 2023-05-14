import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import { useRef } from 'react'

import type { Listing } from '@/types/Listing.type'

import EmptyState from './EmptyState'

interface CardsToRowProps {
  listings: Listing[] | undefined
}

const CardsToRow: FC<CardsToRowProps> = ({ listings }) => {
  const videoRef = useRef(null)

  const onFocus = (e: any) => {
    e.target.play()
  }

  const onLeave = (e: any) => {
    e.target.pause()
  }

  if (listings?.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-[2520px] flex-nowrap gap-4 overflow-auto px-4 pt-6 sm:px-2 md:px-10 xl:px-20">
      {listings?.map((item) => (
        <div key={item.id} className="">
          <Link href={`/stories/${item.id}`}>
            <div className="group h-full w-40 cursor-pointer">
              <div className="flex h-full w-full flex-col gap-1">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                  {item.medias?.map((media) =>
                    media.type === 'video' ? (
                      <video
                        key={media.id}
                        onMouseOver={onFocus}
                        onMouseLeave={onLeave}
                        ref={videoRef}
                        tabIndex={-1}
                        src={media.src}
                      />
                    ) : (
                      <Image
                        key={media.id}
                        fill
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        src={media.src}
                        alt="Listing"
                      />
                    )
                  )}
                  <div className="absolute right-3 top-3"></div>
                </div>
                <div className="font-light text-neutral-500">
                  {item.locationValue}
                </div>
                <div className=" text-base font-semibold">
                  {item.title}
                </div>
                <div className="flex flex-row items-center gap-1">
                  <div className="font-semibold"></div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
export default CardsToRow
