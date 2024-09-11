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
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { quizId, questionId, ...value } = await req.json();

    if (!quizId) {
      return new NextResponse("Quiz ID is required", { status: 400 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized course owner", { status: 401 });
    }

    // Check if the quiz exists
    const quiz = await db.quiz.findUnique({
      where: {
        id: quizId,
      },
    });

    if (!quiz) {
      return new NextResponse("Quiz not found", { status: 404 });
    }
    const lastQuestion = await db.question.findFirst({
      where: {
        quizId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastQuestion ? lastQuestion.position + 1 : 1;

    const upsertedQuestion = await db.question.upsert({
      where: {
        quizId,
        id: questionId || "",
      },
      update: {
        ...value,
        position: newPosition,
      },
      create: {
        ...value,
        quizId: quizId,
        position: newPosition,
      },
    });

    return NextResponse.json(upsertedQuestion);
  } catch (error) {
    console.log(error);
    return new NextResponse("Error something wrong", { status: 500 });
  }
}
