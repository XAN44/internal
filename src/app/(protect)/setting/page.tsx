import React from "react";
import SettingCard from "../../components/setting/SettingCard";
import CourseManageMent from "../../components/setting/CourseManageMent";
import SettingChangePassword from "../../components/setting/SettingChangePassword";
import CourseHistory from "../../components/setting/CourseHistory";
import CardConfigEmail from "../../components/setting/CardConfigEmail";
import SettingEmailAlert from "../../components/setting/SettingEmailAlert";
import CardSupport from "../../components/setting/CardSupport";
import { getCurrentUser } from "../../lib/auth/getSession";
import { db } from "../../lib/db";
import { format } from "date-fns";

async function Page() {
  const user = await getCurrentUser();
  if (!user?.id) {
    return null;
  }

  const data = await db.department.findMany({
    select: {
      id: true,
      departname: true,
    },
  });
  const departnames = data.map((department) => ({
    id: department.id,
    departname: department.departname,
  }));

  const userInfo = await db.user.findFirst({
    where: {
      id: user.id,
    },
    select: {
      id: true,
      username: true,
      name: true,
      last: true,
      email: true,
      image: true,
      role: true,
      Department: {
        select: {
          id: true,
          departname: true,
        },
      },
    },
  });

  const enrollment = await db.enrollment.findMany({
    where: {
      userId: user.id,
    },
    select: {
      courseId: true,
      enrolledAt: true,
      isEnrollment: true,
      Course: {
        select: {
          title: true,
          isPublished: true,

          Chapter: {
            select: {
              id: true,
              isPublished: true,
            },
          },
        },
      },
    },
  });

  const LessonProgress = await db.userLessonProgress.findMany({
    where: {
      userId: user.id,
    },
    select: {
      isCompleted: true,
      lesson: {
        select: {
          chapterId: true,
        },
      },
    },
  });

  const QuizProgress = await db.userQuizProgress.findMany({
    where: {
      userId: user.id,
    },
    select: {
      isCompleted: true,
      quiz: {
        select: {
          chapterId: true,
        },
      },
    },
  });

  const completedChapters = new Set();

  // สร้างชุดของบทเรียนที่เสร็จสิ้น
  LessonProgress.forEach((lesson) => {
    if (lesson.isCompleted) {
      completedChapters.add(lesson.lesson.chapterId);
    }
  });
  QuizProgress.forEach((quiz) => {
    if (quiz.isCompleted) {
      completedChapters.add(quiz.quiz.chapterId);
    }
  });

  const filterEnrolment = enrollment.map((f) => {
    const course = f.Course;

    // ตรวจสอบบทเรียนที่เผยแพร่
    const publishedChapters = course.Chapter.filter(
      (chapter) => chapter.isPublished
    );

    // ตรวจสอบว่าบทเรียนทั้งหมดถูกทำหรือไม่
    const isCompleted = publishedChapters.every((chapter) =>
      completedChapters.has(chapter.id)
    );

    let status;
    if (!f.isEnrollment) {
      status = "Cancelled";
    } else if (isCompleted) {
      status = "Completed";
    } else {
      status = "Pending";
    }

    const formattedEnrolledAt = format(new Date(f.enrolledAt), "MMM d, yyyy");

    return {
      id: f.courseId,
      name: f.Course.title,
      enrolledAt: formattedEnrolledAt,
      isCompleted: isCompleted,
      status: status,
    };
  });

  return (
    <div className="w-full min-h-screen p-6">
      <p className="text-xl font-bold mb-6">Setting</p>
      <div
        className="
        sm:grid 
        sm:grid-rows-2 
        lg:grid-flow-col 
         sm:grid-cols-2
         lg:grid-cols-4
        gap-6
        w-full h-full
        xsm:space-y-3
        sm:space-y-0
        ">
        <div className="col-span-1">
          <SettingCard userInfo={userInfo!} departnames={departnames} />
        </div>
        <div className="col-span-1 ">
          <SettingChangePassword />
        </div>
        <div className=" col-span-2 ">
          <CourseManageMent enrolement={enrollment} />
        </div>
        <div className="col-span-2">
          <CourseHistory initials={filterEnrolment} />
        </div>

        <div className="col-span-2">
          <CardSupport />
        </div>
      </div>
    </div>
  );
}

export default Page;
