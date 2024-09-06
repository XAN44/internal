import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../lib/auth/getSession";
import { db } from "../../../lib/db";

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
      success: "Update course success",
      course,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error something wrong", { status: 500 });
  }
}
