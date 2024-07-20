import { TRPCError } from '@trpc/server'

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { taskSchema } from '@/server/api/validates/task'

export const taskRouter = createTRPCRouter({
  getTasks: protectedProcedure.input(taskSchema.getTasks).query(async ({ ctx, input }) => {
    const tasks = await ctx.db.task.findMany({
      where: { userId: ctx.session.userId, isDone: input.isDone },
      orderBy: { updatedAt: 'desc' },
    })
    if (!tasks) throw new TRPCError({ code: 'NOT_FOUND', message: 'No tasks found' })

    return tasks
  }),

  getDeadlines: protectedProcedure.query(async ({ ctx }) => {
    const deadlines = await ctx.db.task.findMany({
      where: {
        userId: ctx.session.userId,
        due: { lte: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
        isDone: false,
      },
      orderBy: { due: 'asc' },
    })
    if (!deadlines) throw new TRPCError({ code: 'NOT_FOUND', message: 'No deadlines found' })

    return deadlines
  }),

  createTask: protectedProcedure.input(taskSchema.createTask).mutation(async ({ ctx, input }) => {
    if (input.due && input.due < new Date())
      throw new TRPCError({ code: 'BAD_REQUEST', message: 'Due date must be in the future' })

    const newTask = await ctx.db.task.create({
      data: { ...input, userId: ctx.session.userId },
    })

    if (!newTask)
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create task' })

    return newTask
  }),

  toggleDone: protectedProcedure.input(taskSchema.toggleDone).mutation(async ({ ctx, input }) => {
    const task = await ctx.db.task.findUnique({
      where: { id: input.id, userId: ctx.session.userId },
    })

    if (!task) throw new TRPCError({ code: 'NOT_FOUND', message: 'Task not found' })

    const updatedTask = await ctx.db.task.update({
      where: { id: input.id },
      data: { isDone: !task.isDone },
    })

    if (!updatedTask)
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to update task' })

    return { isDone: updatedTask.isDone }
  }),

  editTask: protectedProcedure.input(taskSchema.editTask).mutation(async ({ ctx, input }) => {
    const task = await ctx.db.task.findUnique({ where: { id: input.id } })
    if (!task) throw new TRPCError({ code: 'NOT_FOUND', message: 'Task not found' })

    const updatedTask = await ctx.db.task.update({
      where: { id: input.id },
      data: { content: input.content ?? task.content, due: input.due ?? task.due },
    })

    if (!updatedTask)
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to update task' })

    return updatedTask
  }),

  deleteTask: protectedProcedure.input(taskSchema.deleteTask).mutation(async ({ ctx, input }) => {
    const task = await ctx.db.task.delete({
      where: { id: input.id, userId: ctx.session.userId },
    })

    if (!task) throw new TRPCError({ code: 'NOT_FOUND', message: 'Task not found' })

    return task
  }),
})
