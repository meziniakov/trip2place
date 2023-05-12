import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form'
import { AiOutlineDollar } from 'react-icons/ai'

interface InputProps {
  id: string
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <AiOutlineDollar
          size={24}
          className="absolute left-2 top-5 text-neutral-700"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
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
        ${formatPrice ? 'pl-9' : 'pl-4'}
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
       ${formatPrice ? 'left-9' : 'left-4'}
       ${errors ? 'text-rose-500' : 'text-zinc-400'}
      `}
      >
        {label}
      </label>
    </div>
  )
}
export default Input
