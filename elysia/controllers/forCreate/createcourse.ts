import { getServerSession } from "next-auth";
import { SignUpSchema } from "../../../src/app/lib/schema/auth/zodAuth";
import { getCurrentUser } from "../../../src/app/lib/auth/getSession";
import { CreateCourseSchema } from "../../../src/app/lib/schema/auth/zodCourse";
import { db } from "../../../src/app/lib/db";

export const createCourse = async (request: {
  body: {
    title: string;
  };
}) => {
  const { title } = request.body;
  try {
    const validateField = CreateCourseSchema.safeParse({
      title: request.body.title,
    });
    if (!validateField.success) {
      return { error: "Invalid field!" };
    }
    const user = await getCurrentUser();

    if (!user?.id) {
      return { error: "Unauthorized" };
    }

    const data = await db.course.create({
      data: {
        userId: user.id,
        title,
      },
    });

    return { success: "Success Created", data };
  } catch (error) {
    return { error: `${error}` };
  }
};
