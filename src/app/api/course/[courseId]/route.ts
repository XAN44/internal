import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../lib/auth/getSession";
import { db } from "../../../lib/db";
import Mux from "@mux/mux-node";

export async function DELETE(
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
      return new NextResponse("Not found", { status: 401 });
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
        userId: user.id,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    return new NextResponse("Error something wrong", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await getCurrentUser();
    const value = await req.json();

    if (!user?.id) {
      return NextResponse.json({ error: "Dont have account pless sign-in" });
    }
    const course = await db.course.update({
      where: {
        id: params.courseId,
        userId: user.id,
      },
      data: {
        ...value,
      },
    });
    return NextResponse.json({
      success: "Update success",
      course,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error something wrong", { status: 500 });
  }
}
