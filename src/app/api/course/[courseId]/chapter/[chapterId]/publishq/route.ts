import { NextResponse } from "next/server";
import { db } from "../../../../../../lib/db";
import { getCurrentUser } from "../../../../../../lib/auth/getSession";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
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

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

    const quiz = await db.quiz.findFirst({
      where: {
        chapterId: params.chapterId,
      },
      include: {
        questions: true,
      },
    });

    if (!quiz?.id || !quiz?.questions) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const publishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: true,
      },
    });

    const enrolledUsers = await db.enrollment.findMany({
      where: {
        courseId: params.courseId,
        isEnrollment: true,
      },
      select: {
        userId: true,
      },
    });

    if (!enrolledUsers) {
      return new NextResponse("No enrolled users", { status: 404 });
    }

    const notifications = enrolledUsers.map((enrollment) => ({
      userId: enrollment.userId,
      title: courseOwner.title,
      link: params.courseId,
      body: `New Chapter Alert! · ${chapter?.title} · ${courseOwner.title} - Check out the latest addition to your course!`,
    }));

    await db.notification.createMany({ data: notifications });
    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.log(error);
    return new NextResponse("Initials Error", { status: 401 });
  }
}
