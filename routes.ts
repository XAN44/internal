/***
 *
 * Path public ที่สามารถเข้าถึงได้
 * โดยไม่ต้องมีการ Login
 *
 */
export const publicRoutes = ["/"];

/**
 * Path สำหรับใช้ในำการสมัครและเข้าสู่ระบบ
 */

export const authRoutes = ["/auth/sign-in", "/auth/sign-up"];

/**
 *
 * Path สำหรับที่อยู่ของ File API ROUTE
 */

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/home";
