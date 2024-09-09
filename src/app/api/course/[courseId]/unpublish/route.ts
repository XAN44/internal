import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { getCurrentUser } from "../../../../lib/auth/getSession";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      },
      include: {
        Chapter: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Not Found", { status: 401 });
    }

    const UnpublishedChapter = await db.course.update({
      where: {
        id: params.courseId,
        userId: user.id,
      },
      data: {
        isPublished: false,
      },
    });
    return NextResponse.json(UnpublishedChapter);
  } catch (error) {
    return new NextResponse("Initials Error", { status: 401 });
  }
}
