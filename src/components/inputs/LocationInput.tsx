// eslint-disable-next-line import/no-extraneous-dependencies
import Select from 'react-select'

import useLocation from '@/hooks/useLocation'

export type LocationInputValue = {
  value: number
  label: string
  latlng: number[]
}

interface LocationInputProps {
  value?: LocationInputValue
  onChange: (value: LocationInputValue) => void
}

const LocationInput: React.FC<LocationInputProps> = ({
  value,
  onChange,
}) => {
  const { getAll } = useLocation()
  return (
    <>
      <Select
        placeholder="Начните выбирать"
        isClearable
        options={getAll()}
        value={value}
        onChange={(val) => onChange(val as LocationInputValue)}
      />
      <input
        type="text"
        onChange={({ target }) =>
          onChange({
            value: 1,
            label: '',
            latlng: target.value
              .split(',')
              .map((item) => parseFloat(item)),
          })
        }
        placeholder="56.270987, 59.346273"
        className={`
        desabled:opacity-70
        peer
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
      <label
        className={`
       absolute
       top-5
       z-10
       origin-[0]
       -translate-y-3
       text-base
       duration-150
      `}
      >
        Координаты
      </label>
    </>
  )
}
export default LocationInput
