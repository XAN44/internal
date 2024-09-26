import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function GET(req: Request) {
  try {
    const data = await db.category.findMany();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json("null");
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    // ตรวจสอบว่ามีการเลือก Category นี้ในคอร์สอยู่หรือไม่
    const relatedCourses = await db.course.findMany({
      where: {
        categoryId: id,
      },
    });

    if (relatedCourses.length > 0) {
      return NextResponse.json(
        {
          message:
            "This category cannot be deleted because it is being used in other courses.",
        },
        { status: 400 }
      );
    }

    const deleteCategory = await db.category.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      message: "Category deleted successfully",
      deleteCategory,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "error something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, ...value } = await req.json();

    const updateCategory = await db.category.update({
      where: {
        id: id,
      },
      data: value,
    });

    return NextResponse.json({
      message: "Category Update successfully",
      updateCategory,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "error something went wrong",
      },
      { status: 500 }
    );
  }
}
