import { Header } from '@/components/header'

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
  </>
)

export default MainLayout
