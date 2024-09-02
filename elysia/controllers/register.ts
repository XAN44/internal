import { Elysia, t } from "elysia";
import { db } from "../../src/app/lib/db";
import * as z from "zod";
import { SignUpSchema } from "../../src/app/lib/schema/auth/zodAuth";

export const SignUpController = async (request: {
  body: {
    initialsData: {
      username: string;
      email: string;
      password: string;
    };
  };
}) => {
  const validateField = SignUpSchema.safeParse(request.body.initialsData);
  console.log(validateField.data);
  if (!validateField.success) {
    return { error: "Invalid field!" };
  }

  const { username, email, password } = validateField.data;
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
      },
    });

    if (existingUser) {
      return { error: "Existing user" };
    }

    await db.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    return {
      success: "Create Account Success",
    };
  } catch (error) {
    console.log(error);
    return {
      error:
        "Failed to create account: " +
        (error instanceof Error ? error.message : "Unknown error"),
    };
  }
};
