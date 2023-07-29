import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  updateUser: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx: _ctx, input }) => {
      return {
        name: input.name,
      };
    }),
});
