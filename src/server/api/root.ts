import { lanceRouter } from "~/server/api/routers/lance";
import { userRouter } from "~/server/api/routers/user";
import { createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  user: userRouter,
  lancer: lanceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
