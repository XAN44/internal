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

    const findLesson = await db.lesson.findUnique({
      where: { chapterId: params.chapterId },
    });

    if (!findLesson) {
      return NextResponse.json("Lesson or Quiz not found");
    }

    await db.userLessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: findLesson.id,
        },
      },
      update: { isCompleted: true },
      create: { userId: user.id, lessonId: findLesson.id, isCompleted: true },
    });

    // ตรวจสอบความก้าวหน้าทั้งหมดในคอร์ส
    const courseLessons = await db.lesson.findMany({
      where: { chapter: { courseId: params.courseId } },
    });

    const allLessonsCompleted = await Promise.all(
      courseLessons.map(async (lesson) => {
        const progress = await db.userLessonProgress.findUnique({
          where: {
            userId_lessonId: {
              userId: user.id,
              lessonId: lesson.id,
            },
          },
        });
        return progress?.isCompleted;
      })
    );

    if (allLessonsCompleted.every(Boolean)) {
      await db.enrollment.update({
        where: {
          userId_courseId: { userId: user.id, courseId: params.courseId },
        },
        data: { dueDate: new Date() }, // อัปเดต dueDate
      });
    }

    return NextResponse.json({ lessonProgress: "Lesson progress updated" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error: Something went wrong" });
  }
}
