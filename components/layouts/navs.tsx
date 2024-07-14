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
            buttonVariants({ variant: 'ghost' }),
            'justify-start gap-2',
            pathName === href ? 'bg-accent/50' : '',
          )}
        >
          <Icon />
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
