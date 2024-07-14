'use client'

import { api } from '@/lib/trpc/react'
import { TaskCard } from './card'

export const TaskList: React.FC<{ isDone?: boolean }> = ({ isDone }) => {
  const [tasks] = api.task.getTasks.useSuspenseQuery({ isDone })

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </section>
  )
}
