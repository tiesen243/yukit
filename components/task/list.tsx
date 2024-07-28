'use client'

import { AnimatePresence } from 'framer-motion'

import { api } from '@/lib/trpc/react'
import { TaskCard } from './card'

export const TaskList: React.FC<{ isDone?: boolean }> = ({ isDone }) => {
  const [tasks, { refetch }] = api.task.getTasks.useSuspenseQuery({ isDone })

  return (
    <div className="container flex max-w-screen-md flex-col gap-4">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} refresh={refetch} />
        ))}
      </AnimatePresence>
    </div>
  )
}
