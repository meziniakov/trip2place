import type { ReactNode } from 'react'

import Footer from '@/components/Footer'
import SearchModal from '@/components/modals/SearchModal'
import NavBar from '@/components/navbar/NavBar'
import { AppConfig } from '@/utils/AppConfig'

type IMainProps = {
  meta: ReactNode
  children: ReactNode
}

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}

    <SearchModal />
    <NavBar />
    <div className="pb-20 pt-28">{props.children}</div>
    <Footer />

    <footer className="border-t border-gray-300 py-8 text-center text-sm">
      © Copyright {new Date().getFullYear()} {AppConfig.title}. с ❤️
    </footer>
  </div>
)

export { Main }
