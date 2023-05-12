import { useCallback } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

interface CounterProps {
  title: string
  subtitle?: string
  value: number
  onChange: (value: number) => void
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  onChange,
  value,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1)
  }, [value, onChange])

  const onReduce = useCallback(() => {
    if (value === 1) {
      return
    }
    onChange(value - 1)
  }, [onChange, value])

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="">{title}</div>
        <div className="">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-800 transition hover:opacity-70"
        >
          <AiOutlineMinus />
        </div>
        <div className="text-xl font-light text-neutral-600">{value}</div>
        <div
          onClick={onAdd}
          className=" flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-800 transition hover:opacity-70"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  )
}
export default Counter
