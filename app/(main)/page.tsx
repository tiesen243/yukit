import type { NextPage } from 'next'

import { TaskList } from '@/components/task/list'
import { api, HydrateClient } from '@/lib/trpc/server'
import { CreateForm } from '@/components/task/create-form'

interface Props {
  searchParams: { isDone?: string }
}

const Page: NextPage<Props> = async ({ searchParams }) => {
  const isDone = searchParams.isDone ? searchParams.isDone === 'true' : undefined

  void api.task.getTasks.prefetch({ isDone })

  return (
    <HydrateClient>
      <TaskList isDone={isDone} />

      <CreateForm />
    </HydrateClient>
  )
}

export default Page
