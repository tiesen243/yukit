import { TRPCError } from '@trpc/server'

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import * as task from '@/server/api/validates/task'

export const taskRouter = createTRPCRouter({
  getTasks: protectedProcedure.input(task.getTasksSchema).query(async ({ ctx, input }) => {
    const tasks = await ctx.db.task.findMany({
      where: {
        userId: ctx.session.userId,
        done: input.isDone,
      },
      orderBy: { updatedAt: 'desc' },
    })
    if (!tasks) throw new TRPCError({ code: 'NOT_FOUND', message: 'No tasks found' })

    return tasks
  }),

  getDeadline: protectedProcedure.query(async ({ ctx }) => {
    const deadline = await ctx.db.task.findFirst({
      where: {
        userId: ctx.session.userId,
        due: { lte: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
        done: false,
      },
      orderBy: { due: 'asc' },
    })
    if (!deadline) throw new TRPCError({ code: 'NOT_FOUND', message: 'No deadline found' })

    return deadline
  }),

  createTask: protectedProcedure.input(task.createTaskSchema).mutation(async ({ ctx, input }) => {
    if (input.due && input.due < new Date())
      throw new TRPCError({ code: 'BAD_REQUEST', message: 'Due date must be in the future' })

    const newTask = await ctx.db.task.create({
      data: { ...input, userId: ctx.session.userId },
    })

    if (!newTask)
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create task' })

    return newTask
  }),

  toggleDone: protectedProcedure.input(task.toggleDoneSchema).mutation(async ({ ctx, input }) => {
    const task = await ctx.db.task.findUnique({
      where: { id: input.id, userId: ctx.session.userId },
    })

    if (!task) throw new TRPCError({ code: 'NOT_FOUND', message: 'Task not found' })

    const updatedTask = await ctx.db.task.update({
      where: { id: input.id },
      data: { done: !task.done },
    })

    if (!updatedTask)
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to update task' })

    return updatedTask
  }),

  deleteTask: protectedProcedure.input(task.deleteTaskSchema).mutation(async ({ ctx, input }) => {
    const task = await ctx.db.task.delete({
      where: { id: input.id, userId: ctx.session.userId },
    })

    if (!task) throw new TRPCError({ code: 'NOT_FOUND', message: 'Task not found' })

    return task
  }),
})
