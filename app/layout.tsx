import './globals.css'

import { Provider } from '@/components/provider'
import { fonts } from '@/lib/fonts'
import { siteConfig } from '@/lib/site'

export const metadata = siteConfig.meta
export const viewport = siteConfig.viewport

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" suppressHydrationWarning>
    <body className={`${fonts} font-sans`}>
      <Provider>{children}</Provider>
    </body>
  </html>
)

export default RootLayout
