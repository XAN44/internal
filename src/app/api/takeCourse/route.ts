import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function GET(
  req: Request,
  { params }: { params: { course: string } }
) {
  try {
    // เช็คว่ามีค่า params.course และไม่ใช่ string ว่าง
    if (!params.course) {
      return new NextResponse("Course parameter is missing", { status: 400 });
    }

    const data = await db.course.findFirst({
      where: {
        title: params.course,
      },
      select: {
        id: true,
        title: true,
        Chapter: {
          select: {
            id: true,
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
