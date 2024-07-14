import Image from 'next/image'
import Link from 'next/link'

import { Auth } from './auth'
import { Navs } from './navs'
import { ThemeBtn } from './theme-btn'

export const Header: React.FC = () => (
  <header className="sticky inset-0 z-50 border-b bg-background/70 py-2 backdrop-blur-xl backdrop-saturate-150 md:hidden">
    <div className="container flex items-center justify-between gap-4">
      <Link href="/" className="flex gap-2 text-lg font-bold">
        <Image src="/imgs/logo.svg" alt="Yukit" width={28} height={28} className="dark:invert" />
        <span>Yukit</span>
      </Link>

      <Navs />

      <div className="flex items-center gap-2">
        <Auth />
        <ThemeBtn />
      </div>
    </div>
  </header>
)
