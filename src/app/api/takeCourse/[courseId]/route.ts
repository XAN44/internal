import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { getCurrentUser } from "../../../lib/auth/getSession";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // เช็คว่ามีค่า params.course และไม่ใช่ string ว่าง
    if (!params.courseId) {
      return new NextResponse("Course parameter is missing", { status: 400 });
    }

    const data = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
      select: {
        id: true,
        title: true,
        imageURL: true,
        descriptions: true,
        Enrollment: {
          select: {
            isEnrollment: true,
          },
        },
        Chapter: {
          select: {
            id: true,
          },
        },
        Category: {
          select: {
            name: true,
          },
        },
        User: {
          select: {
            username: true,
            image: true,
            role: true,
          },
        },
      },
    });

    if (!data) {
      return new NextResponse("Course not found", { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Error something went wrong", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const { idEnrollment } = await req.json();

    if (!user?.id) {
      return NextResponse.json(
        { error: "Unauthorized: Please sign in to enroll in the course." },
        { status: 400 }
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
      return NextResponse.json(
        { error: "Course not found." },
        { status: 404 } // เปลี่ยนเป็น 404 หากไม่พบหลักสูตร
      );
    }

    const checkEnrolment = await db.enrollment.findFirst({
      where: {
        userId: user.id,
        courseId: findCourse?.id,
      },
    });
    if (checkEnrolment) {
      return NextResponse.json(
        { error: "You already enrolled in this course." },
        { status: 400 }
      );
    }

    await db.enrollment.create({
      data: {
        userId: user.id,
        courseId: findCourse?.id,
        isEnrollment: true,
      },
    });

    return NextResponse.json({ success: "Enrolled successfully" });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error something went wrong", { status: 500 });
  }
}
