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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id) {
    return {
      props: {},
      notFound: true,
    }
  }

  const theaters: RootObject = await fetcher(
    `https://opendata.mkrf.ru/v2/theaters/$?f={"nativeId":{"$eq":${params?.id?.toString()}}}`
  )

  return {
    props: {
      id: params?.id,
      data: theaters.data[0]?.data.general,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const theaters: RootObject = await getAllMuseums('1')
  const theaters: RootObject = await fetcher(
    'https://opendata.mkrf.ru/v2/theaters/$'
  )

  const paths = theaters.data.map((museum) => ({
    params: { id: museum.nativeId.toString() },
  }))
  return { paths, fallback: 'blocking' }
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
