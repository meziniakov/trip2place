import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import ItemListEvent from '@/components/ItemListEvent'
import Categories from '@/components/navbar/Categories'
import { Meta } from '@/layouts/Meta'
import { getAllEvents } from '@/services/museums'
import { Main } from '@/templates/Main'
import type { RootData } from '@/types/MKRF.type'

const Events = () => {
  const params = useSearchParams()
  const localeParams = params.get('location') || 'Москва'
  const price = params.get('price') || '0'
  // let currentPage = params.get('page') || 0

  const [data, setData] = useState<RootData[]>([])
  const [fetching, setFetching] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)

  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      200
    ) {
      setFetching(true)
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  // let currentQuery = {}

  // if (params) {
  //   currentQuery = queryString.parse(params.toString())
  // }

  useEffect(() => {
    if (fetching) {
      getAllEvents(currentPage, localeParams)
        .then((fetchData) => {
          setData([...data, ...fetchData.data])

          // const updateQuery: any = {
          //   ...currentQuery,
          //   page: +currentPage + 20,
          // }
          // const url = queryString.stringifyUrl(
          //   {
          //     url: '/',
          //     query: updateQuery,
          //   },
          //   { skipNull: true }
          // )

          // router.push(url, undefined, { shallow: true })
          setCurrentPage((prevState) => prevState + 20)
        })
        .catch(() => {
          throw new Error('Ошибка сервера')
        })
        .finally(() => setFetching(false))
    }
  }, [fetching, localeParams])

  useEffect(() => {
    if (localeParams || price) {
      getAllEvents(0, localeParams, price)
        .then((fetchData) => {
          setData([...fetchData.data])
        })
        .catch(() => {
          throw new Error('Ошибка сервера')
        })
    }
  }, [localeParams, price])

  let emptyState = false

  if (data.length === 0) {
    emptyState = true
  }

  if (emptyState) {
    return (
      <Main
        meta={
          <Meta
            title="Поиск достопримечательностей, красивых мест и досуга - Trip2place.com"
            description="Поиск достопримечательностей, красивых мест и досуга - Trip2place.com"
          />
        }
      >
        <div className="sticky top-[83px] z-10 w-full bg-white shadow-sm">
          <Categories />
        </div>

        <EmptyState showReset />
      </Main>
    )
  }

  return (
    <Main
      meta={
        <Meta
          title="Поиск достопримечательностей, красивых мест и досуга - Trip2place.com"
          description="Поиск достопримечательностей, красивых мест и досуга - Trip2place.com"
        />
      }
    >
      <div className="sticky top-[83px] z-10 w-full bg-white shadow-sm">
        <Categories />
      </div>
      <Container>
        <ItemListEvent items={data} />
      </Container>
    </Main>
  )
}

export default Events
