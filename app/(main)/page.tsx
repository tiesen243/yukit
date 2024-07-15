import type { NextPage } from 'next'

import { api, HydrateClient } from '@/lib/trpc/server'
import { DeadlineList } from '@/components/task/deadlines'

const Page: NextPage = () => {
  void api.task.getDeadlines.prefetch()

  return (
    <HydrateClient>
      <h1 className="my-4 text-2xl font-bold">Deadlines</h1>

      <DeadlineList />
    </HydrateClient>
  )
}

export default Page
