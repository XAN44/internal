import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/auth/getSession";
import { db } from "../../../../lib/db";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const { idEnrollment } = await req.json();

    if (!user?.id) {
      return NextResponse.json(
        { error: "Unauthorized: Please sign in to enroll in the course." },
        { status: 401 }
      );
    }

    const findCourse = await db.course.findUnique({
      where: {
        id: idEnrollment,
      },
      select: {
        id: true,
      },
    });
    if (!findCourse?.id) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    const checkEnrolment = await db.enrollment.findFirst({
      where: {
        userId: user.id,
        courseId: findCourse?.id,
      },
    });

    if (checkEnrolment) {
      // อัปเดต isEnrollment เป็น true
      await db.enrollment.update({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: findCourse.id,
          },
        },
        data: { isEnrollment: true },
      });
      return NextResponse.json({ success: "Re-enrolled successfully" });
    } else {
      // สร้าง enrollment ใหม่
      await db.enrollment.create({
        data: { userId: user.id, courseId: findCourse.id, isEnrollment: true },
      });
      return NextResponse.json({ success: "Enrolled successfully" });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Error something went wrong", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    const { idEnrollment } = await req.json();

    if (!user?.id) {
      return NextResponse.json(
        { error: "Unauthorized: Please sign in to enroll in the course." },
        { status: 401 }
      );
    }

    const findEnrollment = await db.enrollment.findFirst({
      where: {
        userId: user.id,
        courseId: idEnrollment,
      },
    });

    if (!findEnrollment) {
      return NextResponse.json(
        { error: "Enrollment not found." },
        { status: 404 }
      );
    }

    await db.enrollment.update({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: findEnrollment.courseId,
        },
      },
      data: { isEnrollment: false },
    });

    return NextResponse.json({ success: "Enrollment canceled successfully" });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error something went wrong", { status: 500 });
  }
}
