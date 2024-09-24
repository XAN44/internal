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

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    // ตรวจสอบว่ามีการส่ง id มาหรือไม่
    if (!id) {
      return NextResponse.json(
        { error: "Notification ID is required." },
        { status: 400 }
      );
    }

    // ลบการแจ้งเตือน
    const notification = await db.notification.delete({
      where: { id },
    });

    return NextResponse.json({
      success: "Notification deleted successfully",
      notification,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error deleting notification" },
      { status: 500 }
    );
  }
}
