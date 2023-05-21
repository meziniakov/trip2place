import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import ItemList from '@/components/ItemList'
import Categories from '@/components/navbar/Categories'
import { Meta } from '@/layouts/Meta'
import { getAllPlaces } from '@/services/museums'
import { Main } from '@/templates/Main'
import type { RootData } from '@/types/MKRF.type'

const Index = () => {
  const params = useSearchParams()
  const categoryParams = params.get('category') || 'museums'
  const localeParams = params.get('location') || 'Москва'
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
      getAllPlaces(currentPage, categoryParams, localeParams)
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
  }, [fetching, categoryParams, localeParams])

  useEffect(() => {
    if (categoryParams || localeParams) {
      getAllPlaces(0, categoryParams, localeParams)
        .then((fetchData) => {
          setData([...fetchData.data])
        })
        .catch(() => {
          throw new Error('Ошибка сервера')
        })
    }
  }, [categoryParams, localeParams])

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
        <ItemList items={data} category={categoryParams} />
      </Container>
    </Main>
  )
}

export default Index
