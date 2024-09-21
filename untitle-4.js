import React from "react";
import Userinfo from "../../components/dashboard/userinfo";
import UserInterests from "../../components/dashboard/interest/UserInterests";
import BadgeMain from "../../components/dashboard/badge/BadgeMain";
import { db } from "../../lib/db";
import { getCurrentUser } from "../../lib/auth/getSession";
import ProgressMain from "../../components/dashboard/ProgressReport/ProgressMain";

async function page() {
  const user = await getCurrentUser();
  if (!user?.id) {
    return <div>Error: User not found</div>;
  }

  let initial = null;
  let isLoading = true;
  let error = null;
  let badge = null;
  let totalCourses = 0;
  let completedCourses = 0;
  let pendingCourses = 0;
  let totalInterest = 0;
  let totalRequired = 0;
  let completedRequiredCourses = 0;
  let userBadge: { Course: { id: string; title: string } }[] = [];
  let allCoursePercent = 0;

  try {
    // ดึงข้อมูลผู้ใช้และคอร์สที่ลงทะเบียนพร้อมกัน
    const [userCourses, allCourses] = await Promise.all([
      db.user.findFirst({
        where: {
          id: user.id,
        },
        select: {
          username: true,
          name: true,
          last: true,
          role: true,
          email: true,
          image: true,

          Enrollment: {
            select: {
              progress: true,
              Course: {
                select: {
                  id: true,
                  title: true,
                  isPublished: true,
                  Chapter: {
                    select: {
                      id: true,
                      Lesson: {
                        select: {
                          UserLessonProgress: {
                            where: { userId: user.id },
                            select: { isCompleted: true },
                          },
                        },
                      },
                      Quiz: {
                        select: {
                          UserQuizProgress: {
                            where: { userId: user.id },
                            select: { isCompleted: true },
                          },
                        },
                      },
                    },
                  },
                  Category: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
          Department: {
            select: {
              departname: true,
            },
          },
          interests: {
            select: {
              name: true,
            },
          },
        },
      }),
      db.course.findMany({
        where: {
          isPublished: true,
        },
        select: {
          id: true,
          title: true,
          isPublished: true,
          Category: {
            select: {
              name: true,
            },
          },
        },
      }),
    ]);

    initial = userCourses;
    if (initial) {
      totalCourses = initial.Enrollment.length;

      completedCourses = initial.Enrollment.filter((enrollment) => {
        const allChapter = enrollment.Course.Chapter;

        return allChapter.every((chapter) => {
          const allLessonCompleted =
            chapter.Lesson?.UserLessonProgress?.length ?? 0 > 0
              ? chapter.Lesson?.UserLessonProgress?.every(
                  (f) => f.isCompleted === true
                )
              : false;

          const allQuizCompleted =
            chapter.Quiz?.UserQuizProgress?.length ?? 0 > 0
              ? chapter.Quiz?.UserQuizProgress.every(
                  (f) => f.isCompleted === true
                )
              : false; // ใช้ false ถ้าไม่มีข้อมูล

          console.log("Chapter ID:", chapter.id);
          console.log(
            "Lesson Progress:",
            chapter.Lesson?.UserLessonProgress || []
          );
          console.log("Quiz Progress:", chapter.Quiz?.UserQuizProgress || []);
          console.log("All Lesson Completed:", allLessonCompleted);
          console.log("All Quiz Completed:", allQuizCompleted);

          return allLessonCompleted && allQuizCompleted;
        });
      }).length;
      // คำนวณเปอร์เซ็นต์ของคอร์สทั้งหมดที่เสร็จสมบูรณ์
      allCoursePercent =
        totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;

      console.log("Completed Courses Count:", completedCourses);
      console.log("All Course Percent:", allCoursePercent);

      // คำนวณเปอร์เซ็นต์ของคอร์สทั้งหมดที่เสร็จสมบูรณ์
      allCoursePercent =
        totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;

      totalInterest = initial.interests.length;
      pendingCourses = totalCourses - completedCourses;

      const userInterestCategories = initial.interests.map(
        (interest) => interest.name
      );
      const requiredCourses = allCourses.filter((course) =>
        userInterestCategories.includes(course.Category?.name || "")
      );
      totalRequired = requiredCourses.length;
      completedRequiredCourses = initial.Enrollment.filter((enrollment) =>
        userInterestCategories.includes(enrollment.Course.Category?.name || "")
      ).filter((enrollment) =>
        enrollment.Course.Chapter.some((chapter) => {
          const allLessonCompleted =
            chapter.Lesson?.UserLessonProgress.some(
              (f) => f.isCompleted === true
            ) ?? true;

          const allQuizCompleted =
            chapter.Quiz?.UserQuizProgress.some(
              (f) => f.isCompleted === true
            ) ?? true;

          return allLessonCompleted && allQuizCompleted;
        })
      ).length;
      userBadge = initial.Enrollment.filter((enrolment) => {
        const allChapter = enrolment.Course.Chapter;

        return allChapter.every((chapter) => {
          const allLessonCompleted =
            chapter.Lesson?.UserLessonProgress?.some(
              (f) => f.isCompleted === true
            ) ?? true;

          const allQuizCompleted =
            chapter.Quiz?.UserQuizProgress?.some(
              (f) => f.isCompleted === true
            ) ?? true;

          return allLessonCompleted && allQuizCompleted;
        });
      });
    }
  } catch (err) {
    error = `An error occurred `;
  } finally {
    isLoading = false;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!initial) {
    return <div>No user data available.</div>;
  }

  const userInterests = initial.interests;

  const progressPercent =
    totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;

  const requiredCoursePercent =
    totalRequired > 0 ? (completedRequiredCourses / totalRequired) * 100 : 0;

  return (
    <div className="w-full min-h-screen p-6">
      <div className="grid xsm:grid-cols-1 md:grid-cols-3 items-stretch place-items-center gap-3">
        <Userinfo initialState={initial} isLoading={isLoading} />
        <UserInterests interest={userInterests} isLoading={isLoading} />
        <BadgeMain Course={userBadge} />
      </div>
      <div className="mt-6">
        <ProgressMain
          isLoading={isLoading}
          AllcourseProcess={allCoursePercent}
          requireCoursePerCentage={requiredCoursePercent}
          statusCompleted={completedCourses}
          statusPending={pendingCourses}
        />
      </div>
      <div className="mt-6">
        {/* <AllCourseToUse AllCourse={AllCourse} isLoading={isLoading} /> */}
      </div>
      <div className="mt-6">
        {/* <BookMarkContent bookMarkedCourses={bookMarkedCourses} /> */}
      </div>
    </div>
  );
}

export default page;
