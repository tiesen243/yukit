'use client'

import type { Task } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/trpc/react'

export const ToggleDone: React.FC<{ task: Task }> = ({ task }) => {
  const utils = api.useUtils()
  const { mutate, isPending, data } = api.task.toggleDone.useMutation({
    onSuccess: () => void utils.task.invalidate(),
  })

  const isDone = data?.isDone ?? task.done

  const handleClick = () => mutate({ id: task.id })

  return (
    <Button onClick={handleClick} isLoading={isPending}>
      {isDone ? 'Mark as undone' : 'Mark as done'}
    </Button>
  )
}
