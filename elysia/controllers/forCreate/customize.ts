"use server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../../../src/app/lib/auth/getSession";
import { db } from "../../../src/app/lib/db";
import { UpdateCoruse } from "../../../src/app/lib/schema/auth/zodCourse";
export const customizeCourse = async (request: {
  params: {
    courseId: string;
  };
  body: {
    initialsData: {
      title: string;
    };
  };
}) => {
  console.log("Received params:", request.params); // แสดงข้อมูล params
  console.log("Received body:", request.body); // แสดงข้อมูล body

  const validateField = UpdateCoruse.safeParse(request.body.initialsData);
  if (!validateField.success) {
    return { error: "Invalid field" };
  }

  try {
    const user = await getCurrentUser();
    const checkCourse = await db.course.findUnique({
      where: {
        id: request.params.courseId,
      },
    });

    if (!checkCourse) {
      return { error: "Course not found" };
    }

    const data = await db.course.update({
      where: {
        id: checkCourse.id,
      },
      data: validateField.data,
    });

    revalidatePath("/");
    return { success: "Course updated successfully", data };
  } catch (error) {
    console.error("Error:", error);
    return { error: "An error occurred while updating course data" };
  }
};
