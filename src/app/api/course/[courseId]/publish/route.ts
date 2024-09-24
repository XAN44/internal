import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { getCurrentUser } from "../../../../lib/auth/getSession";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      },
      include: {
        Chapter: true,
        Category: {
          include: {
            users: true, // Fetch users interested in this category
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Not Found", { status: 401 });
    }

    const hashPublishedChapter = course.Chapter.some(
      (chapter) => chapter.isPublished
    );

    if (
      !course.title ||
      !course.descriptions ||
      !course.imageURL ||
      !course.categoryId ||
      !hashPublishedChapter
    ) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId: user.id,
      },
      data: {
        isPublished: true,
      },
    });

    const interestedUsers = course.Category?.users || [];

    for (const interestedUser of interestedUsers) {
      await db.notification.create({
        data: {
          userId: interestedUser.id,
          title: `New Course Published: ${course.title}`,
          body: `A new course in the category "${course.Category?.name}" has been published. Check it out!`,
          link: course.id,
        },
      });
    }

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log(error);
    return new NextResponse("Initials Error", { status: 401 });
  }
}
