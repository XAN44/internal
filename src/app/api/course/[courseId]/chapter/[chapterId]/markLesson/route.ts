// app/api/markLesson/route.ts
import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../../../lib/auth/getSession";
import { db } from "../../../../../../lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return NextResponse.json("Unauthorized");
    }

    // ตรวจสอบว่าบทเรียนหรือแบบทดสอบมีอยู่
    const findLesson = await db.lesson.findUnique({
      where: {
        chapterId: params.chapterId,
      },
    });

    if (!findLesson) {
      return NextResponse.json("Lesson or Quiz not found");
    }

    // อัพเดตความก้าวหน้าของบทเรียน
    if (findLesson) {
      await db.userLessonProgress.upsert({
        where: {
          userId_lessonId: {
            userId: user.id,
            lessonId: findLesson.id,
          },
        },
        update: {
          isCompleted: true,
        },
        create: {
          userId: user.id,
          lessonId: findLesson.id,
          isCompleted: true,
        },
      });
    }

    return NextResponse.json({
      lessonProgress: findLesson
        ? "Lesson progress updated"
        : "Lesson not found",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error: Something went wrong" });
  }
}
