import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const lanceRouter = createTRPCRouter({
  sendEnquiry: protectedProcedure
    .input(
      z.object({
        lancerId: z.string(),
        whatToBuild: z.string(),
        timeFrame: z.string(),
        budget: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { lancerId, whatToBuild, timeFrame, budget } = input;
      const { id } = ctx.session.user;

      const enquiry = await ctx.prisma.enquiry.create({
        data: {
          lancerId,
          userId: id,
          whatToBuild,
          timeFrame,
          budget,
        },
      });

      return enquiry;
    }),
});
