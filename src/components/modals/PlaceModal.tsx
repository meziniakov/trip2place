/* eslint-disable import/no-extraneous-dependencies */
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import usePlaceModal from '@/hooks/usePlaceModal'

import Heading from '../Heading'
import CategoryInput from '../inputs/CategoryInput'
import ImageUpload from '../inputs/ImageUpload'
import Input from '../inputs/Input'
import LocationInput from '../inputs/LocationInput'
import { categories } from '../navbar/Categories'
import Modal from './Modal'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  // INFO = 2,
  IMAGES = 2,
  DESCRIPTION = 3,
}

const PlaceModal = () => {
  const placeModal = usePlaceModal()
  const router = useRouter()
  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      media: [],
    },
  })

  const category = watch('category')
  const location = watch('location')
  const media = watch('media')

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.DESCRIPTION) {
      return 'Добавить'
    }
    return 'Далее'
  }, [step])

  const secondaryLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }
    return 'Назад'
  }, [step])

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    [location]
  )

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Выберите одну из категорий"
        subtitle="Укажите основную категорию добавляемого объекта"
      />
      <div className="grid max-h-[50hv] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              label={item.label}
              onClick={(cat) => {
                setCustomValue('category', cat)
              }}
              selected={category === item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Выберите регион"
          subtitle="Укажите местоположение"
        />
        <div className="flex w-full flex-col">
          <LocationInput
            value={location}
            onChange={(value) => setCustomValue('location', value)}
          />
          <hr className=" mt-3" />
          <Map center={location?.latlng} />
        </div>
      </div>
    )
  }

  // if (step === STEPS.INFO) {
  //   bodyContent = (
  //     <div className="flex flex-col gap-8">
  //       <Heading title="Выберите другие параметры" subtitle="Подробнее" />
  //       <Counter
  //         title="Выберите количество комнат"
  //         value={roomCount}
  //         onChange={(value) => setCustomValue('roomCount', value)}
  //       />
  //       <hr />
  //       <Counter
  //         title="Выберите количество объектов"
  //         value={roomCount}
  //         onChange={(value) => setCustomValue('roomCount', value)}
  //       />
  //       <hr />
  //     </div>
  //   )
  // }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Загрузка фотографий и видео"
          subtitle="Выберите загружаемые фото/видео"
        />
        <hr />
        <ImageUpload
          value={media}
          onChange={(value) => [
            ...media,
            setCustomValue('media', [...media, value]),
          ]}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Описание" subtitle="Добавьте описание" />
        <Input
          id="title"
          label="Заголовок"
          disabled={isLoading}
          required
          register={register}
          errors={errors}
        />
        <hr />
        <Input
          id="description"
          label="Описание"
          disabled={isLoading}
          required
          register={register}
          errors={errors}
        />
      </div>
    )
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.DESCRIPTION) {
      return onNext()
    }

    setIsLoading(true)

    fetch('/api/listings', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        toast.success('Удачно добавлено')
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        placeModal.onClose()
      })
      .catch(() => {
        toast.error('Неизвестная ошибка')
      })
      .finally(() => setIsLoading(false))
    return null
  }

  return (
    <Modal
      actionLabel={actionLabel}
      body={bodyContent}
      onClose={placeModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={placeModal.isOpen}
      secondaryLabel={secondaryLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Добавить новый объект"
    />
  )
}
export default PlaceModal
