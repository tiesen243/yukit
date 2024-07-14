import type { NextPage } from 'next'

import { TaskFilters } from '@/components/task/filters'
import { TaskList } from '@/components/task/list'
import { api, HydrateClient } from '@/lib/trpc/server'

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

      <TaskFilters isDone={isDone} />

      <TaskList isDone={isDone} />
    </HydrateClient>
  )
}

export default Page
