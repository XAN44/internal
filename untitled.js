// app/api/submitquiz/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function PATCH(req: NextRequest) {
  try {
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

    const score = correctAnswers.filter((item) => item.correct).length;

    await db.quiz.update({
      where: { id: quizId },
      data: { isCompleted: allCorrect },
    });

    // Calculate progress for the chapter
    const totalQuizzes = await db.quiz.count({
      where: { chapterId: quiz.chapter.id },
    });

    const completedQuizzes = await db.quiz.count({
      where: { chapterId: quiz.chapter.id, isCompleted: true },
    });

    const chapterProgress =
      totalQuizzes > 0
        ? Math.round((completedQuizzes / totalQuizzes) * 100)
        : 0;

    // Update chapter progress
    await db.chapter.update({
      where: { id: quiz.chapter.id },
      data: { progress: chapterProgress },
    });

    // Calculate progress for the course
    const totalChapters = await db.chapter.count({
      where: { courseId: quiz.chapter.course.id },
    });

    const completedChapters = await db.chapter.count({
      where: { courseId: quiz.chapter.course.id, progress: 100 },
    });

    const courseProgress =
      totalChapters > 0
        ? Math.round((completedChapters / totalChapters) * 100)
        : 0;

    // Update course progress
    await db.course.update({
      where: { id: quiz.chapter.course.id },
      data: { progress: courseProgress },
    });

    // Update enrollment progress
    await db.enrollment.updateMany({
      where: {
        userId: quiz.chapter.course.userId,
        courseId: quiz.chapter.course.id,
      },
      data: { progress: courseProgress },
    });

    return NextResponse.json({
      success: true,
      correctAnswers,
      score,
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
