import Container from '@/components/Container'
import { MdMuseum, MdAttractions, MdLocalLibrary } from 'react-icons/md'
import { GiFilmProjector } from 'react-icons/gi'
import { TbBuildingCircus } from 'react-icons/tb'
import CategoryBox from '@/components/CategoryBox'
import { useSearchParams } from 'next/navigation'

export const categories = [
  {
    label: 'Музеи',
    icon: MdMuseum,
  },
  {
    label: 'Парки',
    icon: MdAttractions,
  },
  {
    label: 'Библиотеки',
    icon: MdLocalLibrary,
  },
  {
    label: 'Кинотеатры',
    icon: GiFilmProjector,
  },
  {
    label: 'Цирки',
    icon: TbBuildingCircus,
  },
]

const Categories = () => {
  const params = useSearchParams()
  const categoryParams = params?.get('category')

  return (
    <Container>
      <div className="flex items-center justify-around pt-4 overflow-x-auto flex-row gap-4">
        {categories.map((category) => (
          <CategoryBox
            key={category.label}
            icon={category.icon}
            label={category.label}
            selected={categoryParams === category.label}
          />
        ))}
      </div>
    </Container>
  )
}
export default Categories
