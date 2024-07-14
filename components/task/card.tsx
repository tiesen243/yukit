import type { Task } from '@prisma/client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DeleteTask } from './delete-task'
import { ToggleDone } from './toggle-done'

export const TaskCard: React.FC<{ task: Task }> = ({ task }) => (
  <Card>
    <CardHeader>
      <CardTitle>{task.title}</CardTitle>
      <CardDescription>Due to: {task.due?.toDateString() ?? 'No due date'}</CardDescription>
    </CardHeader>

    <CardContent>{task.content}</CardContent>

    <CardFooter className="grid grid-cols-2 gap-2">
      <ToggleDone task={task} />

      <DeleteTask id={task.id} />
    </CardFooter>
  </Card>
)
