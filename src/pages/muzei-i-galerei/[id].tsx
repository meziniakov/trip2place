import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

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

export const getStaticPaths: GetStaticPaths = async () => {
  // const museums: RootObject = await getAllMuseums('1')
  const museums: RootObject = await fetcher(
    'https://opendata.mkrf.ru/v2/museums/$'
  )

  const paths = museums.data.map((museum) => ({
    params: { id: museum.nativeId.toString() },
  }))
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id) {
    return {
      props: {},
      notFound: true,
    }
  }

  const museum: RootObject = await fetcher(
    `https://opendata.mkrf.ru/v2/museums/$?f={"nativeId":{"$eq":${params?.id?.toString()}}}`
  )

  return {
    props: {
      id: params?.id,
      data: museum.data[0]?.data.general,
    },
  }
}

interface SinglePageProps {
  data: GeneralData
}

const SinglePage: NextPage<SinglePageProps> = ({ data }) => {
  return (
    <Main
      meta={
        <Meta
          title={`${data.name} -
              ${data.category.name},
            ${data.locale.name}`}
          description={data.name}
        />
      }
    >
      <ItemSingle data={data} />
    </Main>
  )
}

export default SinglePage
