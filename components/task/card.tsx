import type { Task } from '@prisma/client'

import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { DeleteTask } from './delete-task'
import { ToggleDone } from './toggle-done'
import Link from 'next/link'

export const TaskCard: React.FC<{ task: Task }> = ({ task }) => (
  <Link href={`/tasks/${task.id}`}>
    <Card className="flex flex-col">
      <CardHeader className="flex-1">
        <p className="line-clamp-2">{task.content}</p>
      </CardHeader>

      <CardFooter className="grid grid-cols-2 gap-2">
        <CardDescription className="col-span-2">
          Due to: {task.due?.toUTCString() ?? 'No due date'}
          {!task.done && task.due && task.due < new Date() && (
            <span className="text-destructive"> (Overdue)</span>
          )}
        </CardDescription>

        <ToggleDone task={task} />

        <DeleteTask id={task.id} />
      </CardFooter>
    </Card>
  </Link>
)
