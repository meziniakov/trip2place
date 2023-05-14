import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import MuseumItemList from '@/components/MuseumItemList'
import Categories from '@/components/navbar/Categories'
import { Meta } from '@/layouts/Meta'
import { getAllPlaces } from '@/services/museums'
import { Main } from '@/templates/Main'
import type { RootDataMuseum } from '@/types/Museum.type'

const Index = () => {
  const params = useSearchParams()
  const categoryParams = params.get('category') || undefined
  const localeParams = params.get('locale') || undefined

  const [museums, setMuseums] = useState<RootDataMuseum[]>([])
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

  useEffect(() => {
    if (fetching) {
      getAllPlaces(currentPage, categoryParams, localeParams)
        .then(({ data }) => {
          setMuseums([...museums, ...data])
          setCurrentPage((prevState) => prevState + 20)
        })
        .catch(() => {
          throw new Error('Ошибка сервера')
        })
        .finally(() => setFetching(false))
    }
  }, [fetching, categoryParams])

  useEffect(() => {
    if (categoryParams) {
      getAllPlaces(currentPage, categoryParams)
        .then(({ data }) => {
          setMuseums([...data])
        })
        .catch(() => {
          throw new Error('Ошибка сервера')
        })
    }
  }, [categoryParams])

  const emptyState = false

  if (emptyState) {
    return (
      <Main
        meta={
          <Meta
            title="Next.js Boilerplate Presentation"
            description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
          />
        }
      >
        <EmptyState showReset />
      </Main>
    )
  }

  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <div className="fixed z-10 w-full bg-white shadow-sm">
        <Categories />
      </div>
      <Container>
        <MuseumItemList museums={museums} />
      </Container>
    </Main>
  )
}

export default Index
