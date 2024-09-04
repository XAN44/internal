import { Elysia, t } from "elysia";
import { db } from "../../src/app/lib/db";
import * as z from "zod";
import { SignUpSchema } from "../../src/app/lib/schema/auth/zodAuth";
import bcrypt from "bcryptjs";
import { sendVerificationEmailByNodemailer } from "../../src/app/lib/Mailer/reg";
import { generateVerificationToken } from "../../server/token";
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
      return { error: "This account is already registered." };
    }

    const hashPw = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        username,
        email,
        password: hashPw,
      },
    });
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmailByNodemailer(
      verificationToken.email,
      verificationToken.token
    );
    return {
      success: "Register Success , Check the email you used to register ",
    };
  } catch (error) {
    return {
      error: "Failed to create account (error something went wrong) ",
    };
  }
};
