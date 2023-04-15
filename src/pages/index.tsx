import { useEffect, useState } from 'react'

import MuseumItemList from '@/components/MuseumItemList'
import { Meta } from '@/layouts/Meta'
import { getAllMuseums } from '@/services/museums'
import { Main } from '@/templates/Main'
import type { RootDataMuseum } from '@/types/Museum.type'

const Index = () => {
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
      getAllMuseums('4')
        .then(({ data }) => {
          console.log(data)
          setMuseums([...museums, ...data])
          setCurrentPage((prevState) => prevState + 20)
        })
        .catch(() => {
          throw new Error('Ошибка сервера')
        })
        .finally(() => setFetching(false))
    }
  }, [fetching])

  // getAllMuseums('4').then((data) => console.log(data))

  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <MuseumItemList museums={museums} />
    </Main>
  )
}

export default Index
