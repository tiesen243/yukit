import { z } from 'zod'

export const taskSchema = {
  getTasks: z.object({ isDone: z.boolean().optional() }),

  createTask: z.object({
    content: z.string().min(1, { message: 'Content is required' }),
    due: z.date().optional(),
  }),

  editTask: z.object({
    id: z.string(),
    content: z.string().min(1, { message: 'Content is required' }),
    due: z.date().optional(),
  }),

  toggleDone: z.object({ id: z.string() }),

  deleteTask: z.object({ id: z.string() }),
}
