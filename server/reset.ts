"use server";

import { z } from "zod";
import { ResetSchema } from "../src/app/lib/schema/auth/zodAuth";
import { getUserByEmail } from "./getUser";
import { generatePasswordResetToken } from "./token";
import { sendPasswordResetEmail } from "../src/app/lib/Mailer/sendPasswordReset";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validateField = ResetSchema.safeParse(values);

  if (!validateField.success) {
    return { error: "Invalid email" };
  }

  const { email } = validateField.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
    existingUser.username || ""
  );

  return { success: "Reset email sent!" };
};
