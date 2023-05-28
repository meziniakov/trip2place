import type { GetStaticProps, NextPage } from 'next'

import ItemSingleEvent from '@/components/ItemSingleEvent'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import type { GeneralDataEvent, RootObject } from '@/types/MKRF.type'

export const fetcher = (req: string) =>
  fetch(req, {
    headers: {
      'X-API-KEY': process.env.NEXT_PUBLIC_MINCULT_API_KEY || '',
    },
  }).then((res) => res.json())

interface SinglePageProps {
  data: GeneralDataEvent
}

const SinglePage: NextPage<SinglePageProps> = ({ data }) => {
  if (!data || JSON.stringify(data) === '{}') return <div>Loading</div>
  return (
    <Main
      meta={
        <Meta
          title={`${data?.name} -
            ${data?.category.name},
          ${data?.organization.name}`}
          description={data?.name}
        />
      }
    >
      <ItemSingleEvent data={data} />
    </Main>
  )
}
export default SinglePage

export async function getStaticPaths() {
  const paths: object[] = []

  const events: RootObject = await fetcher(
    'https://opendata.mkrf.ru/v2/events/$'
  )

  events.data.map((item: any) => {
    return paths.push({
      params: { category: 'events', id: item.nativeId.toString() },
    })
  })

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
  console.log(params.id)

  const data: RootObject = await fetcher(
    `https://opendata.mkrf.ru/v2/events/$?f={"nativeId":{"$eq":${params?.id?.toString()}}}`
  )

  return {
    props: {
      id: params.id,
      category: params.category,
      data: data.data[0]?.data.general,
    },
  }
}
