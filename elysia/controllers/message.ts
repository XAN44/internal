import Elysia, { t } from "elysia";
import { faker } from "@faker-js/faker";

export const messageController = new Elysia({ prefix: "/Course" }).get(
  "/test1",
  {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
  },
  {
    response: t.Object({
      id: t.String(),
      name: t.String(),
    }),
  }
);
