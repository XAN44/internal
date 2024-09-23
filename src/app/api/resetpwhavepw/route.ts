import { NextResponse } from "next/server";
import { getCurrentUser } from "../../lib/auth/getSession";
import { db } from "../../lib/db";
import bcrypt from "bcryptjs";

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    const { currentPassword, password } = await req.json();

    if (!user?.id) {
      return NextResponse.json({ error: "Don't have account, please sign in" });
    }

    const userInfo = await db.user.findUnique({
      where: { id: user.id },
      include: { accounts: true }, // รวมข้อมูลบัญชีเพื่อการตรวจสอบ
    });

    if (!userInfo) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ตรวจสอบว่าผู้ใช้เข้าสู่ระบบด้วยบัญชี Google หรือไม่
    const googleAccount = userInfo.accounts.find(
      (account) => account.provider === "google"
    );

    if (googleAccount) {
      return NextResponse.json(
        {
          error:
            "Users signed in with Google accounts do not need to change their passwords.",
        },
        { status: 400 }
      );
    }

    const isMatch = userInfo.password
      ? await bcrypt.compare(currentPassword, userInfo.password)
      : false;

    if (!isMatch) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // แฮชรหัสผ่านใหม่
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ success: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
