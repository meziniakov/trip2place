import useSWR from 'swr'

import CardsToRow from '@/components/CardsToRow'
import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import type { Listing } from '@/types/Listing.type'

// export const getServerSideProps = async () => {
//   const data = await getListings()
//   const listings: Listing[] = JSON.parse(JSON.stringify(data))

//   return {
//     props: { listings },
//   }
// }

export const fetcher = (req: any) => fetch(req).then((res) => res.json())

interface EnjoyProps {
  listings: Listing[]
}

const Enjoy = () => {
  const { data, isLoading, error } = useSWR<EnjoyProps>(
    '/api/listings',
    fetcher
  )

  // const listings = await getListings()
  // if (listings.length === 0) {
  //   return <EmptyState />
  // }
  if (error) return <div>Ошибка загрузки</div>
  if (isLoading)
    return (
      <Main meta={<Meta title="Впечатления" description="Впечатления" />}>
        <Container>
          <div className="flex h-full items-center justify-center">
            <div className="items-center">Загрузка...</div>
          </div>
        </Container>
      </Main>
    )
  if (!data)
    return (
      <Main meta={<Meta title="Впечатления" description="Впечатления" />}>
        <Container>
          <EmptyState />
        </Container>
      </Main>
    )
  return (
    <Main meta={<Meta title="Впечатления" description="Впечатления" />}>
      <Container>
        <CardsToRow listings={data?.listings} />
      </Container>
    </Main>
  )
}
export default Enjoy
