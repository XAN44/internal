import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import authConfig from "./auth.config";
import { db } from "./src/app/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
});
