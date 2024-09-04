"use server";

import { db } from "../src/app/lib/db";
import { getUserByEmail } from "./getUser";
import { getVerificationTokenByToken } from "./verify_token";
export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {
      error:
        "The verification token you provided is invalid or does not exist. Please check the token or request a new verification email",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      error:
        "The verification token you provided has expired. Please request a new verification email.",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      error:
        " No user is associated with this verification token. Please ensure you are using the correct email address.",
    };
  }

  // Update user verification status
  const update = await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  // Return success message first
  const successResponse = {
    success:
      "Your email has been successfully verified. You can now proceed to sign in.",
  };

  setTimeout(async () => {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }, 5000);

  return successResponse;
};
