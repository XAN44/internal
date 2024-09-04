import { Elysia, t } from "elysia";
import { messageController } from "./controllers/message";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { SignUpController } from "./controllers/register";
import { getUserByEmail } from "./controllers/getUser";
import { Login } from "./controllers/login";

export const elysiaApp = new Elysia({ prefix: "/api" })
  .use(cors())
  .use(swagger())
  .use(messageController)
  .get("/getUserByEmail", getUserByEmail, {
    body: t.Object({
      email: t.String(),
    }),
  })
  .post("/signIn", Login, {
    body: t.Object({
      initialsData: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }),
  })
  .post("/signUp", SignUpController, {
    body: t.Object({
      initialsData: t.Object({
        username: t.String(),
        email: t.String(),
        password: t.String(),
        confirmPassword: t.String(),
      }),
    }),
  })
  .onError(({ code, error }) => {
    console.log(code);
    return new Response(JSON.stringify({ error: error.toString() }), {
      status: 500,
    });
  });

export type TElysiaApp = typeof elysiaApp;
