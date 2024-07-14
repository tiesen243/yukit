import Image from 'next/image'
import Link from 'next/link'

import { Auth } from './auth'
import { Navs } from './navs'
import { ThemeBtn } from './theme-btn'

export const SideBar: React.FC = () => (
  <aside className="col-span-3 hidden h-dvh flex-col border-r md:flex lg:col-span-2">
    <Link href="/" className="flex items-center gap-2 p-4 pb-0 text-lg font-bold">
      <Image src="/imgs/logo.svg" alt="Yukit" width={28} height={28} className="dark:invert" />
      <span>Yukit</span>
    </Link>

    <hr className="my-4" />

    <Navs />

    <hr className="my-4" />

    <ThemeBtn />

    <Auth />
  </aside>
)
