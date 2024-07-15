import type { NextPage } from 'next'

import { DeadlineList } from '@/components/task/deadlines'

const Page: NextPage = () => (
  <>
    <h1 className="my-4 text-2xl font-bold">Deadlines</h1>

    <DeadlineList />
  </>
)

export default Page
