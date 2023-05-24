/* eslint-disable import/no-extraneous-dependencies */
import { useSearchParams } from 'next/navigation'
import {
  GiFilmProjector,
  GiPanFlute,
  GiTheaterCurtains,
} from 'react-icons/gi'
import { MdAttractions, MdLocalLibrary, MdMuseum } from 'react-icons/md'
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
    label: 'Музеи',
    value: 'muzei-i-galerei',
    icon: MdMuseum,
  },
  {
    label: 'Парки',
    value: 'parki',
    icon: MdAttractions,
  },
  {
    label: 'Библиотеки',
    value: 'biblioteki',
    icon: MdLocalLibrary,
  },
  {
    label: 'Кинотеатры',
    value: 'kinoteatry',
    icon: GiFilmProjector,
  },
  {
    label: 'Театры',
    value: 'teatry',
    icon: GiTheaterCurtains,
  },
  {
    label: 'Цирки',
    value: 'cirki',
    icon: TbBuildingCircus,
  },
  {
    label: 'Конц. залы',
    value: 'koncertnye-ploshchadki',
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
