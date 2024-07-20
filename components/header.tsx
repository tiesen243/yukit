import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

import { ToggleTheme } from './toggle-theme'

export const Header: React.FC = () => (
  <header className="container sticky inset-0 z-50 flex items-center justify-between gap-4 py-4">
    <Link href="/">
      <Image src="/imgs/logo.svg" alt="Logo" width={32} height={32} className="dark:invert" />
    </Link>

    <div className="flex items-center gap-2">
      <SignedIn>
        <UserButton />
      </SignedIn>

      <SignedOut>
        <Link href="/sign-in">Sign in</Link>
      </SignedOut>

      <ToggleTheme />
    </div>
  </header>
)
