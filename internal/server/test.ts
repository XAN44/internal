"use server";

import { z } from "zod";
import { SignInSchema, SignUpSchema } from "../src/app/lib/schema/tsae";

export async function TEST(value: z.infer<typeof SignInSchema>) {
  const validate = SignInSchema.safeParse(value);
  if (!validate.success) {
    return { error: "" };
  }

  const { password, username } = validate.data;

  console.log(username, password);
}

export async function TEST1(value: z.infer<typeof SignUpSchema>) {
  const validate = SignUpSchema.safeParse(value);
  if (!validate.success) {
    return { error: "error" };
  }

  const { password, username, email } = validate.data;

  console.log(username, password, email);
}
