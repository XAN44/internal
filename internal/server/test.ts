"use server";

import { z } from "zod";
import { SignInSchema, SignUpSchema } from "../src/app/lib/schema/auth/zodAuth";
import { AboutYourSelfSchema } from "../src/app/lib/schema/aboutYourself/zodSelf";

export async function TEST(value: z.infer<typeof SignInSchema>) {
  const validate = SignInSchema.safeParse(value);
  if (!validate.success) {
    return { error: "" };
  }

  const { password, username } = validate.data;
  console.log(username, password);
  return { success: "Success" };
}

export async function TEST1(value: z.infer<typeof SignUpSchema>) {
  const validate = SignUpSchema.safeParse(value);
  if (!validate.success) {
    return { error: "error" };
  }

  const { password, username, email } = validate.data;
  console.log(username, password, email);
  return { success: "error" };
}

export async function TEST2(value: z.infer<typeof AboutYourSelfSchema>) {
  const validate = AboutYourSelfSchema.safeParse(value);
  if (!validate.success) {
    return { error: "error" };
  }

  try {
    const { firstName, lastName, department, role } = validate.data;
    console.log(firstName, lastName, department);

    return { success: "Success" };
  } catch (error) {
    return { error: "ERROR" };
  }
}
