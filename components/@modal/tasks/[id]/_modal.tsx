'use client'
import { useRouter } from 'next/navigation'

export const Modal: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const handleClick = () => router.back()

  return (
    <div className="fixed inset-0 flex h-dvh w-dvw items-center justify-center">
      <div
        onClick={handleClick}
        className="absolute h-full w-full bg-background/50 backdrop-blur"
      />
      {children}
    </div>
  )
}
