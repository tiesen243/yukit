import { z } from 'zod'

export const getTasksSchema = z.object({ isDone: z.boolean().optional() })

export const createTaskSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
  due: z.date().optional(),
})

export const toggleDoneSchema = z.object({ id: z.string() })

export const deleteTaskSchema = z.object({ id: z.string() })
