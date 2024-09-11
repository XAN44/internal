import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../../../lib/auth/getSession";
import { db } from "../../../../../../lib/db";

export async function PUT(
  req: Request,
  { params }: { params: { chapterId: string; quizId: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { list } = await req.json();

    // ตรวจสอบสิทธิ์ของผู้ใช้ใน Quiz
    const quizOwner = await db.quiz.findUnique({
      where: {
        id: params.quizId,
        chapterId: params.chapterId,
      },
    });

    if (!quizOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // อัพเดตตำแหน่งของคำถาม
    for (let item of list) {
      await db.question.update({
        where: {
          id: item.id,
        },
        data: {
          position: item.position,
        },
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error something wrong", { status: 500 });
  }
}
