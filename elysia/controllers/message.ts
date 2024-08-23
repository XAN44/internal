import Elysia, { t } from "elysia";

export const messageController = new Elysia({ prefix: "/message" }).get(
  "/test1",
  {
    id: 1,
    name: "Testss1",
  },
  {
    response: t.Object({
      id: t.Number(),
      name: t.String(),
    }),
  }
);
