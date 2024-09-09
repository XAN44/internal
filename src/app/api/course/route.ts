import { NextResponse } from "next/server";
import { getCurrentUser } from "../../lib/auth/getSession";
import { CreateCourseSchema } from "../../lib/schema/auth/zodCourse";
import { db } from "../../lib/db";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Pless sign-in" });
  }
  try {
    const body = await req.json();

    const validateField = CreateCourseSchema.safeParse(body);

    if (!validateField.success) {
      return NextResponse.json({ error: "Validate Field" });
    }

    const { title } = validateField.data;

    const newCourse = await db.course.create({
      data: {
        title,
        userId: user.id,
      },
    });

    // ตรวจสอบว่า `id` ถูกส่งกลับ
    return NextResponse.json({
      success: "Course created successfully",
      id: newCourse.id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error Something went wrong" },
      { status: 500 }
    );
  }
}
