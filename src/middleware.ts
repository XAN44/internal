import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: any) {
  // ดึง token จาก request
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // ถ้าไม่มี token แสดงว่าผู้ใช้ยังไม่ได้เข้าสู่ระบบ
  if (!token) {
    // Redirect ไปที่หน้า login หรือหน้าที่คุณต้องการ
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // ถ้าผู้ใช้เข้าสู่ระบบแล้วให้ผ่านไป
  return NextResponse.next();
}

// กำหนด matcher ให้ middleware ทำงานเฉพาะหน้าที่อยู่ในโฟลเดอร์ (protect)
export const config = {
  matcher: ["/setting", "/home", "/dashboard", "/task", "/notification"],
};
