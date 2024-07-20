'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const ToggleTheme: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => setIsMounted(true), [])
  if (!isMounted) return null

  const Icon = theme === 'dark' ? SunIcon : MoonIcon

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      <Icon />
    </button>
  )
}
