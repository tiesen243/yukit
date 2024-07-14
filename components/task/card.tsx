import type { Task } from '@prisma/client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const TaskCard: React.FC<{ task: Task }> = ({ task }) => (
  <Card>
    <CardHeader>
      <CardTitle>{task.title}</CardTitle>
      <CardDescription>Due to: {task.due?.toDateString()}</CardDescription>
    </CardHeader>

    <CardContent>{task.content}</CardContent>

    <CardFooter className="grid grid-cols-2 gap-2">
      <Button>{task.done ? 'Undone' : 'Done'}</Button>

      <Button variant="destructive">Delete</Button>
    </CardFooter>
  </Card>
)
