import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../../lib/auth/getSession";
import { db } from "../../../../../lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentsId: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachments.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentsId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
