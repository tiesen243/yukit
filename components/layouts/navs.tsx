'use client'

import { FilePlus2Icon, LayoutDashboardIcon, ListTodoIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const Navs: React.FC = () => {
  const pathName = usePathname()

  return (
    <nav className="flex flex-1 flex-row justify-center md:flex-col md:justify-start">
      {navs.map(({ title, href, Icon }, idx) => (
        <Link
          key={idx}
          href={href}
          className={cn(
            buttonVariants(),
            'justify-start gap-2 underline-offset-4',
            'bg-transparent text-foreground hover:bg-transparent hover:underline',
            'md:bg-transparent md:text-foreground md:hover:bg-accent md:hover:text-accent-foreground md:hover:no-underline',
            pathName === href ? 'underline md:bg-accent/50 md:no-underline' : '',
          )}
        >
          <Icon className="hidden md:block" />
          <span>{title}</span>
        </Link>
      ))}
    </nav>
  )
}

const navs = [
  {
    title: 'Dashboard',
    href: '/',
    Icon: LayoutDashboardIcon,
  },
  {
    title: 'Tasks',
    href: '/tasks',
    Icon: ListTodoIcon,
  },
  {
    title: 'Create Task',
    href: '/create-task',
    Icon: FilePlus2Icon,
  },
]
