import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/auth/getSession";
import { db } from "../../../../lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { title, type } = await req.json();
    console.log("type", type);
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

    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await db.chapter.create({
      data: {
        title,
        courseId: params.courseId,
        position: newPosition,
        type,
      },
    });

    if (chapter.type === "Quiz") {
      await db.quiz.create({
        data: {
          chapterId: chapter.id,
          position: newPosition,
        },
      });
    }

    if (chapter.type === "Lesson") {
      await db.lesson.create({
        data: {
          chapterId: chapter.id,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log(error);
    return new NextResponse("Error something wrong", { status: 500 });
  }
}
