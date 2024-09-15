import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

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
    console.error(error);
    return new NextResponse("Error something went wrong", { status: 500 });
  }
}
