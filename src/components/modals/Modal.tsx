import { useCallback, useEffect, useState } from 'react'
import Button from '../Button'

import { IoMdClose } from 'react-icons/io'
interface ModalProps {
  isOpen?: boolean
  onClose: () => void
  onSubmit: () => void
  title: string
  body?: React.ReactElement
  footer?: React.ReactElement
  actionLabel?: string
  disabled: boolean
  secondaryAction?: () => void
  secondaryLabel?: string
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (disabled) {
      return
    }
    setShowModal(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [disabled, onClose])

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return
    }
    onSubmit()
  }, [disabled, onSubmit])

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return
    }
    secondaryAction()
  }, [disabled, secondaryAction])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="
    flex
    items-center
    justify-center
    fixed
    overflow-x-hidden
    overflow-y-auto
    outline-none
    focus:outline-none
    z-50
    inset-0
    bg-neutral-800/60"
    >
      <div
        className="
        relative
        w-full
        md:w-4/6
        lg:w-3/6
        xl:w-2/5
        my-6
        mx-auto
        h-full
        md:h-auto
        lg:h-auto
        "
      >
        <div
          className={`
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
         `}
        >
          <div
            className="
             translate
             h-full
             outline-none
             focus:outline-none
             bg-white
             w-full
             flex
             flex-col
             rounded-lg
             shadow-lg
             relative
             border-0
             lg:h-auto
             md:h-auto
             "
          >
            <div
              className="
                 flex
                 items-center
                 p-6
                 rounded-t
                 border-b-[1px]
                 justify-center
                 relative
                 "
            >
              <button
                onClick={handleClose}
                className="
                    p-1
                    border-0
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                "
              >
                <IoMdClose size={18} />
              </button>
              <div className="font-semibold text-lg">{title}</div>
            </div>
            <div className="relative p-6 flex-auto">{body}</div>
            <div className="flex flex-col gap-2 p-6">
              <div className="flex flex-row w-full items-center gap-4">
                {secondaryAction && secondaryLabel && (
                  <Button
                    outline
                    disabled={disabled}
                    onClick={handleSecondaryAction}
                    label={secondaryLabel}
                  />
                )}
                <Button
                  disabled={disabled}
                  onClick={handleSubmit}
                  label={actionLabel}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Modal
