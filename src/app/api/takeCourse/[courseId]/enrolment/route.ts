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

    const userData = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        username: true,
      },
    });

    const findCourse = await db.course.findUnique({
      where: {
        id: idEnrollment,
      },
      select: {
        id: true,
        userId: true,
        title: true,
      },
    });
    if (!findCourse || !findCourse.title) {
      return NextResponse.json(
        { error: "Course title not found." },
        { status: 404 }
      );
    }

    const checkEnrolment = await db.enrollment.findFirst({
      where: {
        userId: user.id,
        courseId: findCourse?.id,
      },
    });

    console.log(findCourse.title);

    if (checkEnrolment) {
      await db.enrollment.update({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: findCourse.id,
          },
        },
        data: { isEnrollment: true },
      });

      // สร้างการแจ้งเตือนไปยังเจ้าของคอร์ส
      await db.notification.create({
        data: {
          userId: findCourse.userId,
          title: "Re-enrollment notification",
          body: `${userData?.username} has re-enrolled in your course: ${findCourse.title}`,
          link: findCourse.id,
        },
      });

      return NextResponse.json({ success: "Re-enrolled successfully" });
    } else {
      await db.enrollment.create({
        data: { userId: user.id, courseId: findCourse.id, isEnrollment: true },
      });

      // สร้างการแจ้งเตือนไปยังเจ้าของคอร์ส
      await db.notification.create({
        data: {
          userId: findCourse.userId,
          title: "New enrollment notification",
          body: `${userData?.username} has enrolled in your course: ${findCourse.title}`,
          link: `/course/${findCourse.id}`,
        },
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
