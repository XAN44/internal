import { NextResponse } from "next/server";
import { getCurrentUser } from "../../lib/auth/getSession";
import { db } from "../../lib/db";

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { courseId } = await req.json();

    if (!courseId) {
      return new NextResponse("Course ID is required", { status: 400 });
    }

    await db.enrollment.deleteMany({
      where: {
        userId: user.id,
        courseId: courseId,
      },
    });

    return NextResponse.json({ success: "Enrollment deleted successfully" });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error: Something went wrong", { status: 500 });
  }
}
