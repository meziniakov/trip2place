import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'

const NavBar = () => {
  return (
    <div className="fixed z-10 w-full bg-white px-6 shadow-sm lg:px-28 2xl:px-56">
      <div className="border-b-[1px] py-4">
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
          <Logo />
          <Search />
          <UserMenu />
        </div>
      </div>
      {/* <Categories /> */}
    </div>
  )
}

export default NavBar
