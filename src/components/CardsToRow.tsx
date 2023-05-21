import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import { useRef, useState } from 'react'

import type { Listing } from '@/types/Listing.type'

import EmptyState from './EmptyState'

interface CardsToRowProps {
  listings: Listing[] | undefined
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const CardsToRow: FC<CardsToRowProps> = ({ listings }) => {
  const [isLoading, setLoading] = useState(true)

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
                <div
                  className={`${
                    isLoading && 'animate-pulse'
                  } relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-200`}
                >
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
                        src={media.src || ''}
                        alt={item.title}
                        style={{ transform: 'translate3d(0, 0, 0)' }}
                        className={cn(
                          'group-hover:opacity-75 duration-700 ease-in-out rounded-lg object-cover brightness-90 transition group-hover:brightness-110',
                          isLoading
                            ? 'grayscale blur-2xl scale-110'
                            : 'grayscale-0 blur-0 scale-100'
                        )}
                        onLoadingComplete={() => setLoading(false)}
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
