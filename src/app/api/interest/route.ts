import { NextResponse } from "next/server";
import { getCurrentUser } from "../../lib/auth/getSession";
import { db } from "../../lib/db";

// /api/interest
export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { interestName, action } = await req.json();

    if (action === "add") {
      const interestExists = await db.category.findUnique({
        where: { name: interestName },
      });

      if (!interestExists) {
        return NextResponse.json(
          { message: "Interest not found" },
          { status: 404 }
        );
      }

      await db.user.update({
        where: { id: user.id },
        data: {
          interests: {
            connect: { id: interestExists.id },
          },
        },
      });

      return NextResponse.json({ message: "Interest added successfully" });
    } else if (action === "remove") {
      // ลบ interest
      await db.user.update({
        where: { id: user.id },
        data: {
          interests: {
            disconnect: { name: interestName },
          },
        },
      });

      return NextResponse.json({ message: "Interest removed successfully" });
    } else {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error updating interests:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
