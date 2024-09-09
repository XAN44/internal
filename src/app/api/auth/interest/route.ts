import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../lib/auth/getSession";
import { db } from "../../../lib/db";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const { interests } = await req.json();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // อัปเดตข้อมูลผู้ใช้
    const data = await db.user.update({
      where: { id: user.id },
      data: {
        interests: {
          connect: interests.map((interest: string) => ({
            name: interest,
          })),
        },
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating interests:", error);
    return new NextResponse("Error something went wrong", {
      status: 500,
    });
  }
}
