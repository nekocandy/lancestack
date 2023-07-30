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

  incomingEnquiries: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session.user;

    const enquiries = await ctx.prisma.enquiry.findMany({
      where: {
        lancerId: id,
        accepted: false,
      },
      include: {
        user: true,
        lancer: true,
      },
    });

    return enquiries;
  }),

  createProject: protectedProcedure
    .input(
      z.object({
        enquiryId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { enquiryId } = input;
      const { id } = ctx.session.user;

      const enquiry = await ctx.prisma.enquiry.findUnique({
        where: {
          id: enquiryId,
        },
      });

      if (!enquiry) {
        throw new Error("Enquiry not found");
      }

      await ctx.prisma.enquiry.update({
        where: {
          id: enquiryId,
        },
        data: {
          accepted: true,
        },
      });

      const projectData = await ctx.prisma.project.create({
        data: {
          lancerId: id,
          userId: enquiry.userId,
          enquiryId: enquiry.id,
          status: "pending",
          payment: "pending",
        },
      });

      return projectData;
    }),

  myOngoingCommissions: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session.user;

    const projects = await ctx.prisma.project.findMany({
      where: {
        userId: id,
      },
      include: {
        lancer: true,
        enquiry: true,
      },
    });

    return projects;
  }),
});
