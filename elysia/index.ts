// app/[[...slugs]]/route.ts
import { Elysia, t } from "elysia";
import { messageController, messageController1 } from "./controllers/message";

export const elysiaApp = new Elysia({ prefix: "/api" })
  .use(messageController)
  .use(messageController1)
  .onError(({ code, error }) => {
    console.log(code);
    return new Response(JSON.stringify({ error: error.toString() }), {
      status: 500,
    });
  });

export type TElysiaApp = typeof elysiaApp;
