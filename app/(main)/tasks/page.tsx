import type { NextPage } from 'next'

import { TaskCard } from '@/components/task/card'
import { api } from '@/lib/trpc/server'

const Page: NextPage = async () => {
  void api.task.getTasks.prefetch({})
  const tasks = await api.task.getTasks({})

  return (
    <>
      <h1 className="my-4 text-2xl font-bold">Tasks</h1>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </section>
    </>
  )
}

export default Page
