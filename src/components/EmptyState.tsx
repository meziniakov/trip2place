import { useRouter } from 'next/navigation'

import Button from './Button'
import Heading from './Heading'

interface EmptyStateProps {
  title?: string
  subtitle?: string
  showReset?: boolean
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Нет подходящих материалов',
  subtitle = 'Попробуйте изменить или удалить выбранные фильтры',
  showReset,
}) => {
  const router = useRouter()
  return (
    <div
      className="
  flex
  h-[60vh]
  flex-col
  items-center
  justify-center
  gap-2
  "
    >
      <Heading title={title} subtitle={subtitle} center />
      <div className="mt-4 w-48">
        {showReset && (
          <Button
            outline
            label="Сбросить фильтры"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  )
}
export default EmptyState
