import type { GetStaticProps, NextPage } from 'next'

import ItemSingle from '@/components/ItemSingle'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import type { GeneralData, RootObject } from '@/types/MKRF.type'

export const fetcher = (req: string) =>
  fetch(req, {
    headers: {
      'X-API-KEY': process.env.NEXT_PUBLIC_MINCULT_API_KEY || '',
    },
  }).then((res) => res.json())

interface SinglePageProps {
  data: GeneralData
}

const SinglePage: NextPage<SinglePageProps> = ({ data }) => {
  if (!data) return <div>Loading</div>

  return (
    <Main
      meta={
        <Meta
          title={`${data?.name} -
            ${data?.category.name},
          ${data?.locale.name}`}
          description={data?.name}
        />
      }
    >
      <ItemSingle data={data} />
    </Main>
  )
}
export default SinglePage

export async function getStaticPaths() {
  const paths: object[] = []

  const museums: RootObject = await fetcher(
    'https://opendata.mkrf.ru/v2/museums/$?l=30'
  )

  museums.data.map((item: any) => {
    return paths.push({
      params: { category: 'museums', id: item.nativeId.toString() },
    })
  })

  // const libraries: RootObject = await fetcher(
  //   'https://opendata.mkrf.ru/v2/libraries/$?l=30'
  // )

  // libraries.data.map((item: any) => {
  //   return paths.push({
  //     params: { category: 'libraries', id: item.nativeId.toString() },
  //   })
  // })

  // const parks: RootObject = await fetcher(
  //   'https://opendata.mkrf.ru/v2/parks/$?l=30'
  // )

  // parks.data.map((item: any) => {
  //   return paths.push({
  //     params: { category: 'parks', id: item.nativeId.toString() },
  //   })
  // })

  // const cinema: RootObject = await fetcher(
  //   'https://opendata.mkrf.ru/v2/cinema/$?l=30'
  // )

  // cinema.data.map((item: any) => {
  //   return paths.push({
  //     params: { category: 'cinema', id: item.nativeId.toString() },
  //   })
  // })

  // const theaters: RootObject = await fetcher(
  //   'https://opendata.mkrf.ru/v2/theaters/$?l=30'
  // )

  // theaters.data.map((item: any) => {
  //   return paths.push({
  //     params: { category: 'theaters', id: item.nativeId.toString() },
  //   })
  // })

  // const circuses: RootObject = await fetcher(
  //   'https://opendata.mkrf.ru/v2/circuses/$'
  // )

  // circuses.data.map((item: any) => {
  //   return paths.push({
  //     params: { category: 'circuses', id: item.nativeId.toString() },
  //   })
  // })

  // const philharmonic: RootObject = await fetcher(
  //   'https://opendata.mkrf.ru/v2/philharmonic/$?l=30'
  // )

  // philharmonic.data.map((item: any) => {
  //   return paths.push({
  //     params: { category: 'philharmonic', id: item.nativeId.toString() },
  //   })
  // })

  // const concertHalls: RootObject = await fetcher(
  //   'https://opendata.mkrf.ru/v2/concert_halls/$?l=30'
  // )

  // concertHalls.data.map((item: any) => {
  //   return paths.push({
  //     params: { category: 'concert_halls', id: item.nativeId.toString() },
  //   })
  // })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id || !params?.category) {
    return {
      props: {},
      notFound: true,
    }
  }

  const data: RootObject = await fetcher(
    `https://opendata.mkrf.ru/v2/${
      params.category
    }/$?f={"nativeId":{"$eq":${params?.id?.toString()}}}`
  )

  return {
    props: {
      id: params.id,
      category: params.category,
      data: data.data[0]?.data.general,
    },
  }
}
