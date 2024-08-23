// app/[[...slugs]]/route.ts
import { Elysia, t } from "elysia";
import { messageController } from "./controllers/message";
import { cors } from "@elysiajs/cors";
export const elysiaApp = new Elysia({ prefix: "/api" })
  .use(cors())
  .use(messageController)
  .onError(({ code, error }) => {
    console.log(code);
    return new Response(JSON.stringify({ error: error.toString() }), {
      status: 500,
    });
  });

export type TElysiaApp = typeof elysiaApp;
