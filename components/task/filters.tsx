import Link from 'next/link'

import { cn } from '@/lib/utils'

export const TaskFilters: React.FC<{ isDone?: boolean }> = ({ isDone }) => (
  <ul className="mb-4 flex gap-2">
    {filterTasks.map((filter, idx) => (
      <li key={idx}>
        <Link
          href={filter.href}
          className={cn(
            'rounded-md px-2 py-1',
            isDone === filter.value
              ? 'bg-accent text-accent-foreground'
              : 'hover:bg-secondary hover:text-secondary-foreground',
          )}
        >
          {filter.label}
        </Link>
      </li>
    ))}
  </ul>
)

const filterTasks = [
  {
    label: 'All',
    value: undefined,
    href: '/tasks',
  },
  {
    label: 'Done',
    value: true,
    href: '/tasks?isDone=true',
  },
  {
    label: 'Not Done',
    value: false,
    href: '/tasks?isDone=false',
  },
]
