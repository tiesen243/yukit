import type { Task } from '@prisma/client'
import { TrashIcon } from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/trpc/react'
import { cn } from '@/lib/utils'

export const TaskCard: React.FC<{ task: Task; refresh: () => void }> = ({ task, refresh }) => {
  const { mutate: check, isPending: isChecking } = api.task.toggleDone.useMutation({
    onSuccess: () => refresh(),
  })

  const { mutate: remove, isPending: isDeleting } = api.task.deleteTask.useMutation({
    onSuccess: () => {
      refresh()
      toast.success('Task deleted')
    },
  })

  const { mutate: update, isPending: isUpdating } = api.task.editTask.useMutation({
    onSuccess: () => {
      refresh()
      toast.success('Task updated')
    },
  })

  const isPending = isChecking || isDeleting || isUpdating

  return (
    <motion.div
      className="rounded-lg bg-secondary text-secondary-foreground"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: task.isDone ? -25 : 25 }}
      layout
    >
      <div className="flex flex-row items-center justify-between p-4">
        <input
          type="checkbox"
          defaultChecked={task.isDone}
          onChange={() => check({ id: task.id })}
          disabled={isPending}
        />
        <h3
          className={cn(
            'basis-10/12 overflow-x-auto text-xl font-semibold',
            task.isDone && 'line-through',
            !task.isDone && task.due && task.due < new Date() && 'text-destructive',
          )}
          onBlur={(e) => {
            const content = e.target.innerText
            if (content !== task.content) update({ id: task.id, content })
          }}
          contentEditable={!isPending}
          suppressContentEditableWarning
        >
          {task.content} {isUpdating && '...'}
        </h3>

        <div className="flex items-center justify-center gap-2">
          <p>{task.due?.toDateString()}</p>

          <Button
            variant="destructive"
            size="icon"
            onClick={() => remove({ id: task.id })}
            disabled={isPending}
          >
            <TrashIcon />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
