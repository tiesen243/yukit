import { z } from 'zod'

export const getTasksSchema = z.object({ isDone: z.boolean().optional() })
export const getTaskSchema = z.object({ id: z.string() })

export const createTaskSchema = z.object({
  content: z.string().min(1, { message: 'Content is required' }),
  due: z.date().optional(),
})

export const editTaskSchema = z.object({
  id: z.string(),
  content: z.string().min(1, { message: 'Content is required' }),
  due: z.date().optional(),
})

export const toggleDoneSchema = z.object({ id: z.string() })

export const deleteTaskSchema = z.object({ id: z.string() })
