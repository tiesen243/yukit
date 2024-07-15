'use client'

import { api } from '@/lib/trpc/react'
import { TaskCard } from './card'

export const DeadlineList: React.FC<{ isDone?: boolean }> = () => {
  const [tasks] = api.task.getDeadlines.useSuspenseQuery()

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </section>
  )
}
