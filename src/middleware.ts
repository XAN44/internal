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

  // ถ้าผู้ใช้เข้าสู่ระบบแล้วให้ผ่านไป
  return NextResponse.next();
}

// กำหนด matcher ให้ middleware ทำงานเฉพาะหน้าที่อยู่ในโฟลเดอร์ (protect) และ auth
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
