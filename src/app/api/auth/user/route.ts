import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../lib/auth/getSession";
import { db } from "../../../lib/db";
import { redirect } from "next/navigation";
import { AboutYourSelfSchema } from "../../../lib/schema/aboutYourself/zodSelf";

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();

    const userData = await db.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        interests: true,
        Department: true,
        role: true,
      },
    });

    if (!userData) {
      return new NextResponse("User not found", { status: 404 });
    }

    const hasRole = userData.role ? userData.role.length > 0 : false;
    const hasInterests = userData.interests?.length > 0;
    const hasDepartment = userData.Department !== null;
    if (!hasInterests || !hasDepartment || !hasRole) {
      return redirect("/auth/aboutYourself");
    }

    return redirect("/home");
  } catch (error) {
    console.error(error);
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const value = await req.json();

    const validateField = AboutYourSelfSchema.safeParse(value);

    if (!validateField.success) {
      console.log(validateField.error);
      return new NextResponse("Invalid Field", { status: 400 });
    }

    const { firstName, lastName, department, role, username } =
      validateField.data;
    const departmentId = Number(department);
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: firstName,
        last: lastName,
        role,
        departmentId,
        username,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Error something went wrong", { status: 500 });
  }
}
