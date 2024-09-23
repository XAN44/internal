import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: any) {
  // ดึง token จาก request
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;
  console.log(pathname);

  if (token && (pathname === "/auth/sign-in" || pathname === "/auth/sign-up")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (
    !token &&
    (pathname === "/setting" ||
      pathname === "/home" ||
      pathname === "/dashboard" ||
      pathname === "/task" ||
      pathname === "/notification" ||
      pathname === "/createcourse")
  ) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/createcourse",
    "/setting",
    "/home",
    "/dashboard",
    "/task",
    "/notification",
    "/auth/sign-in",
    "/auth/sign-up",
  ],
};
