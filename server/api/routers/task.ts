import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

export const taskRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    }
  }),

  create: publicProcedure
    .input(z.object({ title: z.string().min(1), content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return ctx.db.task.create({
        data: {
          title: input.title,
          content: input.content,
          userId: '1',
        },
      })
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.task.findFirst({
      orderBy: { createdAt: 'desc' },
    })
  }),
})
