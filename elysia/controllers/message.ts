import Elysia, { t } from "elysia";

export const messageController = new Elysia({ prefix: "/message" })
  .get(
    "/test1",
    {
      id: 1,
      name: "Test1",
    },
    {
      response: t.Object({
        id: t.Number(),
        name: t.String(),
      }),
    }
  )
  .get("/test2", {
    id: 1,
    name: "Test1",
  });

export const messageController1 = new Elysia({ prefix: "/message1" })
  .get(
    "/message1",
    {
      id: 1,
      name: "Test1",
    },
    {
      response: t.Object({
        id: t.Number(),
        name: t.String(),
      }),
    }
  )
  .get("/message1", {
    id: 1,
    name: "Test1",
  });
