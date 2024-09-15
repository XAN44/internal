import { NextResponse } from "next/server";
import { getCurrentUser } from "../../lib/auth/getSession";

export async function POST(
  req: Request,
  { params }: { params: { course: string; chapter: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log(params.chapter, params.course);
  } catch (error) {
    return new NextResponse("Error something wrong", { status: 500 });
  }
}
