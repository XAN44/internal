import { NextResponse } from "next/server";
import { getCurrentUser } from "../../lib/auth/getSession";
import { db } from "../../lib/db";
import { DepartmentForm } from "../../lib/schema/auth/zodUser";

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    const value = await req.json();

    if (!user?.id) {
      return NextResponse.json({ error: "Dont have account pless sign-in" });
    }
    const userInfo = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...value,
      },
    });
    return NextResponse.json({
      success: "Update success",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error something wrong", { status: 500 });
  }
}
