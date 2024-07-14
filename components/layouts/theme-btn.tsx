'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

export const ThemeBtn: React.FC = () => {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => setIsMounted(true), [])
  if (!isMounted) return <Button variant="ghost" isLoading />

  return (
    <Button variant="ghost" className="justify-start gap-2" onClick={toggleTheme}>
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      <span className="sr-only capitalize md:not-sr-only">{theme} mode</span>
    </Button>
  )
}
