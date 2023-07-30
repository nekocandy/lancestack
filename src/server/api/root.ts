import { lanceRouter } from "~/server/api/routers/lance";
import { paymentsRouter } from "~/server/api/routers/payments";
import { userRouter } from "~/server/api/routers/user";
import { createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  user: userRouter,
  lancer: lanceRouter,
  payment: paymentsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
