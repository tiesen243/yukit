import './globals.css'

import { Inter } from 'next/font/google'

import { Provider } from '@/components/provider'
import { siteConfig } from '@/lib/site'

export const metadata = siteConfig.meta
export const viewport = siteConfig.viewport

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={`${inter.variable} font-sans`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%2318181b'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      {process.env.VERCEL_PROJECT_PRODUCTION_URL}
      <Provider>{children}</Provider>
    </body>
  </html>
)

export default RootLayout
