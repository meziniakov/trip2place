/* eslint-disable import/no-extraneous-dependencies */
import { useSearchParams } from 'next/navigation'
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
    icon: TbBrandInstagram,
  },
  {
    label: 'События',
    value: 'events',
    icon: MdLocalActivity,
  },
  {
    label: 'Музеи',
    value: 'muzeums',
    icon: MdMuseum,
  },
  {
    label: 'Парки',
    value: 'parks',
    icon: MdAttractions,
  },
  {
    label: 'Библиотеки',
    value: 'libraries',
    icon: MdLocalLibrary,
  },
  {
    label: 'Кинотеатры',
    value: 'cinema',
    icon: GiFilmProjector,
  },
  {
    label: 'Театры',
    value: 'theaters',
    icon: GiTheaterCurtains,
  },
  {
    label: 'Цирки',
    value: 'circuses',
    icon: TbBuildingCircus,
  },
  {
    label: 'Конц. залы',
    value: 'concert_halls',
    icon: GiPanFlute,
  },
]

const Categories = () => {
  const params = useSearchParams()
  const categoryParams = params?.get('category')

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
