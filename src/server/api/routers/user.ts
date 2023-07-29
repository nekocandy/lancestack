import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        primaryProfile: z.string(),
        techStack: z.string(),
        responseTime: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;

      const user = await ctx.prisma.platformUser.create({
        data: {
          userId: id,
          ...input,
        },
      });

      return {
        id: user.id,
      };
    }),

  update: protectedProcedure
    .input(
      z.object({
        primaryProfile: z.string().optional(),
        techStack: z.string().optional(),
        responseTime: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;

      const user = await ctx.prisma.platformUser.update({
        where: { userId: id },
        data: input,
      });

      return {
        userId: user.id,
      };
    }),
});
