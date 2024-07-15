import type { NextPage } from 'next'

import { DeadlineList } from '@/components/task/deadlines'
import { HydrateClient } from '@/lib/trpc/server'

const Page: NextPage = () => (
  <HydrateClient>
    <h1 className="my-4 text-2xl font-bold">Deadlines</h1>

    <DeadlineList />
  </HydrateClient>
)

export default Page
