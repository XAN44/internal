import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string | null;
  }
  interface Session {
    user: User & {
      id: string;
      username: string;
    };
    token: {
      id: string;
      username: string;
    };
  }
}
