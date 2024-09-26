import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function POST(req: Request) {
  const { name, description } = await req.json();

  try {
    const newCategory = await db.category.create({
      data: {
        name,
        description,
      },
    });
    return NextResponse.json(
      { success: true, category: newCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to add category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create category" },
      { status: 500 }
    );
  }
}
