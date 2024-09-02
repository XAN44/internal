import { Elysia, t } from "elysia";
import { messageController } from "./controllers/message";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { SignUpController } from "./controllers/register";

export const elysiaApp = new Elysia({ prefix: "/api" })
  .use(cors())
  .use(swagger())
  .use(messageController)
  .post("/signUp", SignUpController, {
    body: t.Object({
      initialsData: t.Object({
        username: t.String(),
        email: t.String(),
        password: t.String(),
        confirmPassword: t.String(),
      }),
    }),
    response: t.Object({
      success: t.Optional(t.String()),
      error: t.Optional(t.String()),
    }),
  })
  .onError(({ code, error }) => {
    console.log(code);
    return new Response(JSON.stringify({ error: error.toString() }), {
      status: 500,
    });
  });

export type TElysiaApp = typeof elysiaApp;
