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
        Chapter: true,
      },
    });

    if (!course) {
      return new NextResponse("Not Found", { status: 401 });
    }

    const hashPublishedChapter = course.Chapter.some(
      (chapter) => chapter.isPublished
    );

    if (
      !course.title ||
      !course.descriptions ||
      !course.imageURL ||
      !course.categoryId ||
      !hashPublishedChapter
    ) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    const publishedChapter = await db.course.update({
      where: {
        id: params.courseId,
        userId: user.id,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.log(error);

    return new NextResponse("Initials Error", { status: 401 });
  }
}
