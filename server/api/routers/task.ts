import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'

export const taskRouter = createTRPCRouter({
  getTasks: protectedProcedure
    .input(z.object({ isDone: z.boolean().optional() }))
    .query(async ({ ctx, input }) => {
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

  createTask: protectedProcedure
    .input(z.object({ title: z.string(), content: z.string(), due: z.date().optional() }))
    .mutation(async ({ ctx, input }) => {
      const newTask = await ctx.db.task.create({
        data: { ...input, userId: ctx.session.userId },
      })

      if (!newTask)
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create task' })

      return newTask
    }),
})
