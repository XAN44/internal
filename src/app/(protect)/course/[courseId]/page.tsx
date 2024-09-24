import CourseTitle from "../../../components/course/CourseTitle";
import axios from "axios";
import { db } from "../../../lib/db";
import { getCurrentUser } from "../../../lib/auth/getSession";

async function CoursePage({ params }: { params: { courseId: string } }) {
  const user = await getCurrentUser();
  if (!user?.id) {
    return null;
  }

  const courseData = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    select: {
      id: true,
      title: true,
      imageURL: true,
      descriptions: true,
      Enrollment: {
        where: {
          userId: user.id,
        },
        select: {
          isEnrollment: true,
        },
      },
      attachments: {
        select: {
          name: true,
          url: true,
        },
      },
      Chapter: {
        orderBy: {
          position: "asc",
        },
        where: {
          isPublished: true,
        },
        select: {
          id: true,
        },
      },
      Category: {
        select: {
          name: true,
        },
      },
      User: {
        select: {
          id: true,
          username: true,
          image: true,
          role: true,
        },
      },
    },
  });

  return (
    <div className="w-full h-full">
      <div className="flex flex-col">
        {courseData ? (
          <CourseTitle
            userId={user.id}
            courseId={params.courseId}
            course={courseData}
            title={courseData.title}
          />
        ) : (
          <div className="w-full h-full flex items-center flex-col justify-center gap-y-6">
            <div className="skeleton h-96 w-96"></div>
            <div className="skeleton h-8 w-96"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursePage;
