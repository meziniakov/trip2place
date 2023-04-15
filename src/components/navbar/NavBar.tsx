import Container from '../Container'
import Search from '../navbar/Search'
import UserMenu from '../navbar/UserMenu'
import Logo from '../navbar/Logo'
import Categories from '@/components/navbar/Categories'
const NavBar = () => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default NavBar
