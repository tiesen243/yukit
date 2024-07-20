import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { Header } from '@/components/header'

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { userId } = auth()
  if (!userId) redirect('/landing')

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}

export default MainLayout
