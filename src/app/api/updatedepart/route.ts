import { NextResponse } from "next/server";
import { getCurrentUser } from "../../lib/auth/getSession";
import { db } from "../../lib/db";
import { DepartmentForm } from "../../lib/schema/auth/zodUser";

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    const value = await req.json();
    const validateField = DepartmentForm.safeParse(value);

    if (!validateField.success) {
      console.log(validateField.error);
      return new NextResponse("Invalid Field", { status: 400 });
    }

    if (!user?.id) {
      return NextResponse.json({ error: "Dont have account pless sign-in" });
    }
    const { departmentId } = validateField.data;

    const updatedData = {
      ...value,
      departmentId: Number(departmentId),
    };

    await db.user.update({
      where: {
        id: user.id,
      },
      data: updatedData,
    });

    return NextResponse.json({
      success: "Update success",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error something wrong", { status: 500 });
  }
}
