/* eslint-disable array-callback-return */
// eslint-disable-next-line import/no-extraneous-dependencies
import 'stories-react/dist/index.css'

import Link from 'next/link'
import { useRouter } from 'next/router'
// eslint-disable-next-line import/no-extraneous-dependencies
import Stories from 'stories-react'
import useSWR from 'swr'

import type { Listing } from '@/types/Listing.type'

export const fetcher = (req: any) => fetch(req).then((res) => res.json())

interface IListings {
  listings: Listing[]
}

const StoryId = () => {
  const router = useRouter()
  const { data } = useSWR<IListings>(
    router.query.id
      ? `/api/listings?id=${router.query.id}`
      : '/api/listings',
    fetcher
  )

  const result: any[] = []
  data?.listings.map((item) => {
    item.medias?.map((media) => {
      result.push({
        type: media.type,
        url: media.src,
        duration: media.duration * 1000 || '3000',
        seeMore: item.title,
        seeMoreComponent: (
          <div
            // className="box"
            style={{
              paddingTop: '100px',
              padding: '24px',
              backgroundColor: '#fad0c4',
              height: '100%',
            }}
          >
            <h2>{item.title}</h2>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '24px',
              }}
            ></div>
            <p>{item.description}</p>
          </div>
        ),
        header: (
          <div className="flex h-full justify-center">
            <Link href={'/enjoy'}>
              <div className="absolute right-[2px] top-0 z-10 cursor-pointer text-white">
                X
              </div>
            </Link>
          </div>
        ),
      })
    })
  })

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        marginBottom: '16px',
      }}
    >
      <Stories
        stories={result}
        // defaultInterval={1500}
        width={432}
        // onStoryChange={(index: number) =>
        //   console.log('Текущий номер Story: ', index)
        // }
        // onStoriesStart={() => console.log('1 Story отрендерилась')}
        onAllStoriesEnd={() => router.push('/enjoy')}
        height="100%"
      />
    </div>
  )
}

export default StoryId
