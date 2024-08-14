"use server";

import { z } from "zod";
import { SignInSchema, SignUpSchema } from "../src/app/lib/schema/auth/zodAuth";
import { AboutYourSelfSchema } from "../src/app/lib/schema/aboutYourself/zodSelf";
import { InterestSchema } from "../src/app/lib/schema/interest/interestSchema";

export async function TEST(value: z.infer<typeof SignInSchema>) {
  const validate = SignInSchema.safeParse(value);
  if (!validate.success) {
    return { error: "" };
  }

  const { password, username } = validate.data;
  console.log(username, password);
  return { success: "Fake Success" };
}

export async function TEST1(value: z.infer<typeof SignUpSchema>) {
  const validate = SignUpSchema.safeParse(value);
  if (!validate.success) {
    return { error: "error" };
  }

  const { password, username, email } = validate.data;
  console.log(username, password, email);
  return { success: "Fake Success" };
}

export async function TEST2(value: z.infer<typeof AboutYourSelfSchema>) {
  const validate = AboutYourSelfSchema.safeParse(value);
  if (!validate.success) {
    return { error: "error" };
  }

  try {
    const { firstName, lastName, department, role } = validate.data;
    console.log(firstName, lastName, department, role);

    return { success: "Success" };
  } catch (error) {
    return { error: "ERROR" };
  }
}

export async function TEST3(value: z.infer<typeof InterestSchema>) {
  const validate = InterestSchema.safeParse(value);
  if (!validate.success) {
    return { error: "error" };
  }

  try {
    const { interest } = validate.data;
    console.log(interest);

    return { success: "Success" };
  } catch (error) {
    return { error: "ERROR" };
  }
}
