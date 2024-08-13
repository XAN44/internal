// * ใช้สำหรับตรวจสอบความถูกต้องของข้อมูล

import * as z from "zod";

export const SignInSchema = z.object({
  username: z.string().min(3, { message: "Username is required" }),
  password: z.string().min(6, { message: "Minimum of 6 characters required" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const ResetPasswordSchema = z.object({
  password: z.string().min(6, { message: "Minimum of 6 characters required" }),
});

export const SignUpSchema = z
  .object({
    username: z.string().min(3, { message: "Username is required" }),
    email: z.string().email({ message: "invalid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be more than 6 characters." }),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });
