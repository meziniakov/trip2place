import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'

import MuseumSingle from '@/components/MuseumSingle'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import type { RootObject } from '@/types/Museum.type'

export const fetcher = (req: string) =>
  fetch(req, {
    headers: {
      'X-API-KEY': process.env.NEXT_PUBLIC_MINCULT_API_KEY || '',
    },
  }).then((res) => res.json())

export const getStaticPaths: GetStaticPaths = async () => {
  // const museums: RootObject = await getAllMuseums('1')
  const museums: RootObject = await fetcher(
    'https://opendata.mkrf.ru/v2/museums/$?s=1&l=10&o=false'
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

  // const museum: RootObject = await getMuseumByNativeId(params?.id.toString())
  const museum: RootObject = await fetcher(
    `https://opendata.mkrf.ru/v2/museums/$?f={"nativeId":{"$eq":${params?.id.toString()}}}`
  )

  return {
    props: {
      id: params!.id?.toString(),
      museum: museum.data[0],
    },
  }
}

const MuseumPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Main
      meta={
        <Meta
          title={`${props.museum.data.general.name} -
              ${props.museum.data.general.category.name},
            ${props.museum.data.general.locale.name}`}
          description={props.museum.data.general.name}
        />
      }
    >
      <MuseumSingle museum={props.museum.data.general} />
    </Main>
  )
}

export default MuseumPage
