import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      let id: string;
      if (input?.id) {
        id = input.id;
      } else {
        id = ctx.session.user.id;
      }

      const user = await ctx.prisma.platformUser.findUnique({
        where: { userId: id },
      });

      return user;
    }),

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

      const user = await ctx.prisma.platformUser.upsert({
        where: { userId: id },
        update: input,
        create: {
          userId: id,
          ...input,
        },
      });

      return {
        userId: user.id,
      };
    }),
});
