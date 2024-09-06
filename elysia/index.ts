import { Elysia, t } from "elysia";
import { messageController } from "./controllers/message";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { SignUpController } from "./controllers/register";
import { getUserByEmail } from "./controllers/getUser";
import { Login } from "./controllers/login";
import { createCourse } from "./controllers/forCreate/createcourse";
import { getCourse } from "./controllers/forCreate/getCourse";
import { customizeCourse } from "./controllers/forCreate/customize";

export const elysiaApp = new Elysia({ prefix: "/api" })
  .use(
    cors({
      methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    })
  )
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
  .post("/createcourse", createCourse, {
    body: t.Object({
      title: t.String(),
    }),
  })
  .patch(
    "/updatecourse/:courseId",
    async ({ params, request }) => {
      const body = await request.json();
      return customizeCourse({ params, body });
    },
    {
      params: t.Object({
        courseId: t.String(),
      }),
    }
  )
  .get("/getcreatecourse/:courseId", ({ params }) => getCourse(params), {
    params: t.Object({
      courseId: t.String(),
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
