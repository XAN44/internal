import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { SignInSchema } from "../schema/auth/zodAuth";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../../../../server/getUser";
import { generateVerificationToken } from "../../../../server/token";
import { sendVerificationEmailByNodemailer } from "../Mailer/reg";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "../db";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
    error: "/auth/sign-in",
    verifyRequest: "/auth/verify-request",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validateField = SignInSchema.safeParse(credentials);
        if (!validateField.success) {
          throw new Error("Invalid credentials format.");
        }

        const { password, email } = validateField.data;
        const user = await getUserByEmail(email);

        if (!user || !user.password) {
          throw new Error("User not found.");
        }

        if (!user.emailVerified) {
          const verifyToken = await generateVerificationToken(user.email || "");
          await sendVerificationEmailByNodemailer(
            verifyToken.email,
            verifyToken.token
          );
          throw new Error("Confirmation email sent!");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          throw new Error("Incorrect password.");
        }

        return {
          id: user.id,
          username: user.username,
          email: user.email,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
        };
      }
      return token;
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
        },
      };
    },
  },
};
