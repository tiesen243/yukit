import type { NextPage } from 'next'

import { TaskList } from '@/components/task/list'

const Page: NextPage = async () => {
  return (
    <>
      <h1 className="my-4 text-2xl font-bold">Tasks</h1>

      <TaskList />
    </>
  )
}

export default Page
