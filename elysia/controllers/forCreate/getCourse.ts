import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../src/app/lib/auth/getSession";
import { db } from "../../../src/app/lib/db";

export const getCourse = async (request: { courseId: string }) => {
  try {
    const data = await db.course.findUnique({
      where: {
        id: request.courseId,
      },
    });
    if (!data) {
      return { error: "Not found course" };
    }
    return { data };
  } catch (error) {
    return { error: "An error occurred while fetching the course data" };
  }
};
