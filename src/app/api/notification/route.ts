import { NextResponse } from "next/server";
import { getCurrentUser } from "../../lib/auth/getSession";
import { db } from "../../lib/db";

export async function GET(req: Request) {
  try {
    // ตรวจสอบผู้ใช้
    const user = await getCurrentUser();
    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ดึงข้อมูลการแจ้งเตือนที่ยังไม่ได้อ่าน
    const unreadNotifications = await db.notification.count({
      where: {
        userId: user.id,
        isRead: false,
      },
    });

    // ส่งคืนจำนวนการแจ้งเตือนที่ยังไม่ได้อ่าน
    return NextResponse.json({ count: unreadNotifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
