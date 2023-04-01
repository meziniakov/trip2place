import type { ReactNode } from 'react'

import { AppConfig } from '@/utils/AppConfig'

type IMainProps = {
  meta: ReactNode
  children: ReactNode
}

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}

    <header className="border-b border-gray-300"></header>

    <main>{props.children}</main>

    <footer className="border-t border-gray-300 py-8 text-center text-sm">
      © Copyright {new Date().getFullYear()} {AppConfig.title}. Сделано с
      ❤️
    </footer>
  </div>
)

export { Main }
