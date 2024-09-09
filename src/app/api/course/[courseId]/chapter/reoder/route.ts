import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../../lib/auth/getSession";
import { db } from "../../../../../lib/db";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { list } = await req.json();

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    for (let item of list) {
      await db.chapter.update({
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
    return new NextResponse("Error something wrong", { status: 500 });
  }
}
