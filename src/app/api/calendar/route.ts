// app/api/enrollments/route.ts

import { NextResponse } from "next/server";
import { db } from "../../lib/db";
import { getCurrentUser } from "../../lib/auth/getSession";

export async function GET() {
  try {
    // ดึงข้อมูลผู้ใช้ที่ล็อกอิน
    const user = await getCurrentUser();
    if (!user?.id) {
      return NextResponse.json({ error: "Please sign-in" });
    }

    // ดึงข้อมูลการลงทะเบียนของผู้ใช้
    const enrollments = await db.enrollment.findMany({
      where: {
        userId: user.id,
      },
      include: {
        Course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    // ส่งข้อมูลการลงทะเบียนกลับไป
    const enrollmentDetails = enrollments.map((enrollment) => ({
      courseId: enrollment.Course.id,
      courseTitle: enrollment.Course.title,
      enrolledAt: enrollment.enrolledAt,
    }));

    return NextResponse.json(enrollmentDetails);
  } catch (error) {
    return NextResponse.error();
  }
}
