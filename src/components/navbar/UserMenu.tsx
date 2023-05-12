/* eslint-disable import/no-extraneous-dependencies */
import { useCallback, useRef, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

import usePlaceModal from '@/hooks/usePlaceModal'

import useOnClickOutside from '../../hooks/useOnClickOutside'
import Avatar from './Avatar'
import MenuItem from './MenuItem'

const UserMenu = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const toogleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  useOnClickOutside(ref, () => setIsOpen(false))
  const placeModal = usePlaceModal()

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={placeModal.onOpen}
          className="hidden cursor-pointer rounded-full px-4 py-3  text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          Airbnb home
        </div>
        <div
          onClick={toogleOpen}
          ref={ref}
          className="
        flex
        cursor-pointer
        flex-row
        items-center
        gap-3
        rounded-full
        border-[1px]
        border-neutral-200
        p-4
        transition
        hover:shadow-md
        md:px-2
        md:py-1
        "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute
            right-0
            top-12
            w-[40vw]
            overflow-hidden
            rounded-xl
            bg-white
            text-sm
            shadow-md
            md:w-3/4
          "
        >
          <div className="flex cursor-pointer flex-col">
            <MenuItem onClick={() => {}} label="Войти" />
            <MenuItem onClick={() => {}} label="Регистрация" />
          </div>
        </div>
      )}
    </div>
  )
}
export default UserMenu
