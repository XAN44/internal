import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../lib/auth/getSession";
import { db } from "../../../lib/db";

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user?.id) {
      return new NextResponse("User not found");
    }

    const data = await db.course.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createAt: "desc",
      },
      select: {
        id: true,
        title: true,
        isPublished: true,
        imageURL: true,
        Chapter: {
          select: {
            id: true,
          },
        },
        Enrollment: {
          // นับจำนวนผู้ใช้ที่เข้าร่วม
          select: {
            id: true,
          },
        },
      },
    });

    const result = data.map((course) => ({
      ...course,
      chapterCount: course.Chapter.length, // เพิ่มจำนวน chapter
      enrollmentCount: course.Enrollment.length, // นับจำนวนผู้ใช้ที่เข้าร่วม
    }));

    return NextResponse.json(result);
  } catch (error) {
    return new NextResponse("Error something went wrong");
  }
}
