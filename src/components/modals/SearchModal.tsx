import Modal from '@/components/modals/Modal'
import useSearchModal from '@/hooks/useSearchModal'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useCallback, useMemo } from 'react'
import { Range } from 'react-date-range'
import qs from 'query-string'
import { formatISO } from 'date-fns'
import Heading from '@/components/Heading'
import Calendar from '@/components/inputs/Calendar'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter()
  const params = useSearchParams()
  const searchModal = useSearchModal()

  const [step, setStep] = useState(STEPS.LOCATION)
  const [roomCount, setRoomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })

  // const Map = useMemo(() => dynamic(() => import('../Map'), {
  //   ssr: false
  // }),[location])

  const onBack = useCallback(() => {
    setStep((value) => value - 1)
  }, [])

  const onNext = useCallback(() => {
    setStep((value) => value + 1)
  }, [])

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext()
    }
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updateQuery: any = {
      ...currentQuery,
      roomCount,
    }

    if (dateRange.startDate) {
      updateQuery.startDate = formatISO(dateRange.startDate)
    }
    if (dateRange.endDate) {
      updateQuery.endDate = formatISO(dateRange.endDate)
    }
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updateQuery,
      },
      { skipNull: true }
    )

    console.log(step)

    setStep(STEPS.LOCATION)
    searchModal.onClose()
    router.push(url)
  }, [step, searchModal, dateRange, roomCount, params, onNext, router])

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Поиск'
    }
    return 'Далее'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }
    return 'Назад'
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Выберите город"
        subtitle="В каком городе вас интересуют "
      />
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Выбрите даты"
          subtitle="Выберите интересующую дату или диапазон дат"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Мало фильтров?"
          subtitle="Что бы вы еще хотели выбрать?"
        />
      </div>
    )
  }

  return (
    <Modal
      onClose={searchModal.onClose}
      isOpen={searchModal.isOpen}
      onSubmit={onSubmit}
      title="Фильтры"
      actionLabel={actionLabel}
      body={bodyContent}
      secondaryLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    />
  )
}

export default SearchModal
