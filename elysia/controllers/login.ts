import { DEFAULT_LOGIN_REDIRECT } from "../../routes";
import { SignInSchema } from "../../src/app/lib/schema/auth/zodAuth";
import { signIn } from "next-auth/react";
export const Login = async (request: {
  body: {
    initialsData: {
      email: string;
      password: string;
    };
  };
}) => {
  const validateField = SignInSchema.safeParse(request.body.initialsData);
  console.log(validateField.data);

  if (!validateField.success) {
    return { error: "Invalid field!" };
  }

  const { email, password } = validateField.data;

  try {
    await signIn("credentials", {
      email,
      password,
    });
    return { success: "Login successful" };
  } catch (error) {
    console.log(error);
  }
};
