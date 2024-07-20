'use client'

import { TRPCReactProvider } from '@/lib/trpc/react'
import { ClerkProvider } from '@clerk/nextjs'
import { dark, experimental__simple as light } from '@clerk/themes'
import { ThemeProvider, useTheme } from 'next-themes'

import { Toaster } from '@/components/ui/sonner'

const BaseProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme()

  return (
    <ClerkProvider appearance={{ baseTheme: theme === 'dark' ? dark : light }}>
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </ClerkProvider>
  )
}

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
    <BaseProvider>{children}</BaseProvider>
    <Toaster richColors />
  </ThemeProvider>
)
