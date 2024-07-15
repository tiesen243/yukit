'use client'

import { api } from '@/lib/trpc/react'
import { TaskCard } from './card'

export const DeadlineList: React.FC<{ isDone?: boolean }> = () => {
  const { data: tasks, isLoading } = api.task.getDeadlines.useQuery()

  if (isLoading || !tasks) return <p>Loading...</p>

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </section>
  )
}
