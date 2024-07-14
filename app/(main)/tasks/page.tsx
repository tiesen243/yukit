import type { NextPage } from 'next'

import { TaskList } from '@/components/task/list'
import { api, HydrateClient } from '@/lib/trpc/server'
import Link from 'next/link'

interface Props {
  searchParams: {
    isDone?: string
  }
}

const Page: NextPage<Props> = async ({ searchParams }) => {
  void api.task.getTasks.prefetch({})
  const isDone = searchParams.isDone ? searchParams.isDone.toLowerCase() === 'true' : undefined

  return (
    <HydrateClient>
      <h1 className="my-4 text-2xl font-bold">Tasks</h1>

      <ul className="mb-4 flex gap-2">
        {filterTasks.map((filter, idx) => (
          <li key={idx}>
            <Link
              href={filter.href}
              className={`rounded-md px-2 py-1 ${isDone === filter.value ? 'bg-accent text-accent-foreground' : ''}`}
            >
              {filter.label}
            </Link>
          </li>
        ))}
      </ul>

      <TaskList isDone={isDone} />
    </HydrateClient>
  )
}

export default Page

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
