'use client'

import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/trpc/react'

export const DeleteTask: React.FC<{ id: string }> = ({ id }) => {
  const utils = api.useUtils()
  const { mutate, isPending } = api.task.deleteTask.useMutation({
    onSuccess: () => {
      toast.success('Task deleted')
      void utils.task.invalidate()
    },
    onError: (error) => toast.error(error.message),
  })

  const handleClick = () => mutate({ id })

  return (
    <Button variant="destructive" onClick={handleClick} isLoading={isPending}>
      Delete
    </Button>
  )
}
