import { NextRequest, NextResponse } from "next/server";
import { db } from "../../lib/db";
import { getCurrentUser } from "../../lib/auth/getSession";

export async function PATCH(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    const { quizId, answers } = await req.json();

    const quiz = await db.quiz.findUnique({
      where: { id: quizId },
      include: { chapter: { include: { course: true } } },
    });

    if (!quiz) {
      return NextResponse.json(
        { success: false, message: "Quiz not found" },
        { status: 404 }
      );
    }

    const quizResults = await db.question.findMany({
      where: { quizId, id: { in: Object.keys(answers) } },
    });

    const correctAnswers = quizResults.map((question) => ({
      id: question.id,
      correct: question.correctAnswer === answers[question.id],
    }));

    const allCorrect = correctAnswers.every((item) => item.correct);

    await db.userQuizProgress.upsert({
      where: {
        userId_quizId: {
          userId: user?.id || "",
          quizId: quizId,
        },
      },
      update: { isCompleted: allCorrect },
      create: {
        userId: user?.id || "",
        quizId: quizId,
        isCompleted: allCorrect,
      },
    });

    // ตรวจสอบความก้าวหน้าทั้งหมดในคอร์ส
    const courseQuizzes = await db.quiz.findMany({
      where: { chapter: { courseId: quiz.chapter.course.id } },
    });

    const allQuizzesCompleted = await Promise.all(
      courseQuizzes.map(async (q) => {
        const progress = await db.userQuizProgress.findUnique({
          where: {
            userId_quizId: {
              userId: user?.id || "",
              quizId: q.id,
            },
          },
        });
        return progress?.isCompleted;
      })
    );

    if (allQuizzesCompleted.every(Boolean)) {
      await db.enrollment.update({
        where: {
          userId_courseId: {
            userId: user?.id || "",
            courseId: quiz.chapter.course.id,
          },
        },
        data: { dueDate: new Date() }, // อัปเดต dueDate
      });
    }

    return NextResponse.json({
      success: true,
      correctAnswers,
      score: correctAnswers.filter((item) => item.correct).length,
      chapterId: quiz.chapter.id,
      courseId: quiz.chapter.course.id,
      message: "Quiz submitted successfully!",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error submitting quiz" },
      { status: 500 }
    );
  }
}
