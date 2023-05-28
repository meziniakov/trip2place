// import { formatISO } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRouter as Router } from 'next/router'
import qs from 'query-string'
import { useCallback, useMemo, useState } from 'react'
import type { Range } from 'react-date-range'

import Heading from '@/components/Heading'
import Calendar from '@/components/inputs/Calendar'
import Modal from '@/components/modals/Modal'
import useSearchModal from '@/hooks/useSearchModal'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  // INFO = 2,
}

const SearchModal = () => {
  const router = useRouter()
  const { pathname } = Router()
  const params = useSearchParams()
  const searchModal = useSearchModal()

  const [step, setStep] = useState(STEPS.LOCATION)
  const [location, setLocation] = useState('Москва')
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

  // eslint-disable-next-line consistent-return
  const onSubmit = useCallback(async () => {
    if (step !== STEPS.LOCATION) {
      return onNext()
    }
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updateQuery: any = {
      ...currentQuery,
      location,
    }

    // if (dateRange?.startDate) {
    //   updateQuery.startDate = formatISO(dateRange?.startDate)
    // }
    // if (dateRange?.endDate) {
    //   updateQuery.endDate = formatISO(dateRange?.endDate)
    // }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updateQuery,
      },
      { skipNull: true }
    )

    setStep(STEPS.LOCATION)
    searchModal.onClose()
    router.push(url)
  }, [step, searchModal, dateRange, location, params, onNext, router])

  const actionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
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
        subtitle="Введите вручную или выберите из списка"
      />
      <div className="flex flex-col">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Москва"
          className={`
        desabled:opacity-70
        peer
        flex
        w-full rounded-md
        border-2
        bg-white
        p-4
        pt-6
        font-light
        outline-none
        transition
        disabled:cursor-not-allowed
        `}
        />
      </div>
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
          onChange={(value) => setDateRange(value?.selection)}
        />
      </div>
    )
  }

  // if (step === STEPS.INFO) {
  //   bodyContent = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="Мало фильтров?"
  //         subtitle="Что бы вы еще хотели выбрать?"
  //       />
  //     </div>
  //   )
  // }

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
