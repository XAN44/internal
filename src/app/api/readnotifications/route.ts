import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function PATCH(req: Request) {
  try {
    const { notificationsId } = await req.json();
    if (!notificationsId) {
      return NextResponse.json(
        { error: "Missing notification ID" },
        { status: 400 }
      );
    }

    await db.notification.update({
      where: {
        id: notificationsId,
      },
      data: {
        isRead: true,
      },
    });
    return NextResponse.json({
      message: "Notification status updated successfully",
    });
  } catch (error) {
    return NextResponse.json("Error something went wrong");
  }
}
