import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from './Avatar'
import MenuItem from './MenuItem'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { useState, useCallback, useRef } from 'react'

const UserMenu = () => {
  const ref = useRef()
  const [isOpen, setIsOpen] = useState(false)

  const toogleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  useOnClickOutside(ref, () => setIsOpen(false))

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden rounded-full hover:bg-neutral-100 transition cursor-pointer  md:block py-3 px-4 text-sm font-semibold">
          Airbnb home
        </div>
        <div
          onClick={toogleOpen}
          ref={ref}
          className="
        p-4
        md:py-1
        md:px-2
        border-[1px]
        border-neutral-200
        flex
        flex-row
        items-center
        gap-3
        cursor-pointer
        hover:shadow-md
        transition
        rounded-full
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
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            <MenuItem onClick={() => {}} label="Войти" />
            <MenuItem onClick={() => {}} label="Регистрация" />
          </div>
        </div>
      )}
    </div>
  )
}
export default UserMenu
