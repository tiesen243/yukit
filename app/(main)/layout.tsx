import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { SideBar } from '@/components/layouts/side-bar'
import { Header } from '@/components/layouts/header'

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { userId } = auth()
  if (!userId) redirect('/landing')

  return (
    <div className="flex h-dvh grid-cols-12 flex-col gap-4 md:grid">
      <Header />
      <SideBar />
      <main className="container md:col-span-9 lg:col-span-10">{children}</main>
    </div>
  )
}

export default MainLayout
