/* eslint-disable import/no-extraneous-dependencies */
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import {
  GiFilmProjector,
  GiPanFlute,
  GiTheaterCurtains,
} from 'react-icons/gi'
import {
  MdAttractions,
  MdLocalActivity,
  MdLocalLibrary,
  MdMuseum,
} from 'react-icons/md'
import { TbBrandInstagram, TbBuildingCircus } from 'react-icons/tb'

import CategoryBox from '@/components/CategoryBox'
import Container from '@/components/Container'

export const categories = [
  {
    label: 'Впечатления',
    value: 'enjoy',
    path: 'enjoy',
    icon: TbBrandInstagram,
  },
  {
    label: 'События',
    value: 'events',
    path: 'events',
    icon: MdLocalActivity,
  },
  {
    label: 'Музеи',
    value: 'museums',
    path: 'muzei-i-galerei',
    icon: MdMuseum,
  },
  {
    label: 'Парки',
    value: 'parks',
    path: 'parki',
    icon: MdAttractions,
  },
  {
    label: 'Библиотеки',
    value: 'libraries',
    path: 'biblioteki',
    icon: MdLocalLibrary,
  },
  {
    label: 'Кинотеатры',
    value: 'cinema',
    path: 'kinoteatry',
    icon: GiFilmProjector,
  },
  {
    label: 'Театры',
    value: 'theaters',
    path: 'teatry',
    icon: GiTheaterCurtains,
  },
  {
    label: 'Цирки',
    value: 'circuses',
    path: 'cirki',
    icon: TbBuildingCircus,
  },
  {
    label: 'Конц. залы',
    value: 'concert_halls',
    path: 'koncertnye-ploshchadki',
    icon: GiPanFlute,
  },
]

const Categories = () => {
  const params = useSearchParams()
  const { pathname } = useRouter()
  const categoryParams =
    pathname === '/events' ? 'events' : params?.get('category')

  return (
    <Container>
      <div className="flex flex-row items-center justify-between gap-4 overflow-x-auto">
        {categories.map((category) => (
          <CategoryBox
            key={category.label}
            icon={category.icon}
            label={category.label}
            value={category.value}
            selected={categoryParams === category.value}
          />
        ))}
      </div>
    </Container>
  )
}
export default Categories
