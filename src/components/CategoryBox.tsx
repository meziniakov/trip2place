import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useCallback } from 'react'
import type { IconType } from 'react-icons'

interface CategoryBoxProps {
  icon: IconType
  label: string
  value: string
  selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  value,
  selected,
}) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    if (value === 'enjoy') {
      router.push(`/${value}`)
      return
    }

    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updateQuery: any = {
      ...currentQuery,
      category: value,
    }

    if (params?.get('category') === value) {
      delete updateQuery.category
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updateQuery,
      },
      { skipNull: true }
    )

    router.push(url)
  }, [params, label, router])

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        cursor-pointer 
        flex-col 
        items-center
        justify-center
        gap-2
        border-b-2
        p-3
        transition
        hover:border-b-neutral-800
        hover:text-neutral-800
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
    `}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  )
}
export default CategoryBox
