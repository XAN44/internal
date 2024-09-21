import React from "react";
import Userinfo from "../../components/dashboard/userinfo";
import UserInterests from "../../components/dashboard/interest/UserInterests";
import BadgeMain from "../../components/dashboard/badge/BadgeMain";
import { db } from "../../lib/db";
import { getCurrentUser } from "../../lib/auth/getSession";
import ProgressMain from "../../components/dashboard/ProgressReport/ProgressMain";
import AllCourseToUse from "../../components/dashboard/Allcourse/AllCourse";
import BookMarkContent from "../../components/dashboard/BookMark/BookMarkContent";

async function page() {
  const user = await getCurrentUser();
  if (!user?.id) {
    return <div>Error: User not found</div>;
  }

  let userData = null;
  let isLoading = true;
  let error = null;
  let totalCourses = 0;
  let completedCourses = 0;
  let pendingCourses = 0;
  let totalRequired = 0;
  let completedRequiredCourses = 0;
  let userInterests: {
    name: string;
  }[] = [];
  let userBadges: { name: string; level: number }[] = [];
  let courseDistribution: { [category: string]: number } = {};
  let enrolledCourses: {
    id: string;
    title: string;
    isRequired: boolean;
    Chapter: {
      id: string;
      title: string;
      isCompleted: boolean;
    }[];
    Category: {
      name: string;
    };
  }[] = [];
  let allCategories: {
    name: string;
    isChecked: boolean;
    descriptions: string;
  }[] = [];
  let overallProgressPercentage = 0;

  try {
    const [
      userInfo,
      allCourses,
      enrollments,
      totalLessons,
      totalQuizzes,
      LessonProgress,
      QuizProgress,
      categories,
    ] = await Promise.all([
      db.user.findFirst({
        where: { id: user.id },
        select: {
          id: true,
          name: true,
          last: true,
          username: true,
          role: true,
          email: true,
          image: true,
          interests: { select: { name: true } },
          Department: { select: { departname: true } },
        },
      }),
      db.course.findMany({
        where: { isPublished: true },
        select: {
          id: true,
          title: true,
          isPublished: true,
          Category: { select: { name: true } },
        },
      }),
      db.enrollment.findMany({
        where: { userId: user.id, isEnrollment: true },
        select: {
          courseId: true,
          Course: {
            select: {
              id: true,
              title: true,
              imageURL: true,
              Chapter: {
                select: {
                  id: true,
                  title: true,
                },
              },
              Category: { select: { name: true } },
            },
          },
        },
      }),
      db.lesson.count(),
      db.quiz.count(),
      db.userLessonProgress.findMany({
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
      }),
      db.userQuizProgress.findMany({
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
      }),
      db.category.findMany({ select: { name: true, description: true } }),
    ]);

    userData = userInfo;
    userInterests = userInfo?.interests || [];
    const userInterestNames = userInterests.map((interest) => interest.name);

    const enrolledCourseIds = enrollments.map(
      (enrollment) => enrollment.courseId
    );

    allCategories = categories.map((category) => ({
      name: category.name,
      isChecked: userInterestNames.includes(category.name),
      descriptions: category.description,
    }));
    totalCourses = enrolledCourseIds.length;

    enrollments.forEach((enrollment) => {
      const categoryName = enrollment.Course.Category?.name || "Unknown";
      courseDistribution[categoryName] =
        (courseDistribution[categoryName] || 0) + 1;
    });

    const progressPromises = enrolledCourseIds.map(async (courseId) => {
      const [
        totalLessonsInCourse,
        completedLessonsInCourse,
        totalQuizzesInCourse,
        completedQuizzesInCourse,
      ] = await Promise.all([
        db.lesson.count({ where: { chapter: { courseId } } }),
        db.userLessonProgress.count({
          where: {
            userId: user.id,
            isCompleted: true,
            lesson: { chapter: { courseId } },
          },
        }),
        db.quiz.count({ where: { chapter: { courseId } } }),
        db.userQuizProgress.count({
          where: {
            userId: user.id,
            isCompleted: true,
            quiz: { chapter: { courseId } },
          },
        }),
      ]);

      const totalItemsInCourse = totalLessonsInCourse + totalQuizzesInCourse;
      const completedItemsInCourse =
        completedLessonsInCourse + completedQuizzesInCourse;

      if (completedItemsInCourse === totalItemsInCourse) {
        completedCourses += 1;
        const courseCategory = enrollments.find(
          (enrollment) => enrollment.courseId === courseId
        )?.Course.Category?.name;

        if (courseCategory) {
          const existingBadgeIndex = userBadges.findIndex(
            (badge) => badge.name === courseCategory
          );

          if (existingBadgeIndex !== -1) {
            userBadges[existingBadgeIndex].level += 1;
          } else {
            userBadges.push({
              name: courseCategory,
              level: 1,
            });
          }
        }
      }
    });

    await Promise.all(progressPromises);

    const completedLessons = LessonProgress.filter(
      (progress) => progress.isCompleted
    ).length;
    const completedQuizzes = QuizProgress.filter(
      (progress) => progress.isCompleted
    ).length;

    const totalTasks = totalLessons + totalQuizzes;
    const completedTasks = completedLessons + completedQuizzes;
    const overallProgress =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    overallProgressPercentage = overallProgress;

    const userInterestCategories =
      userData?.interests.map((interest) => interest.name) || [];
    const completedChapters = new Set(); // ใช้เพื่อเก็บ chapter ที่เรียนเสร็จแล้ว

    // สร้าง Set สำหรับตรวจสอบว่า chapter ไหนเรียนเสร็จ
    LessonProgress.forEach((lesson) => {
      if (lesson.isCompleted) {
        completedChapters.add(lesson.lesson.chapterId); // สมมุติว่ามี. ใน lesson
      }
    });

    QuizProgress.forEach((quiz) => {
      if (quiz.isCompleted) {
        completedChapters.add(quiz.quiz.chapterId);
      }
    });

    enrolledCourses = enrollments.map((enrollment) => {
      const courseCategory = enrollment.Course.Category?.name || "Unknown";
      const chapters = enrollment.Course.Chapter || [];
      const isRequired = userInterestCategories.includes(courseCategory);

      return {
        id: enrollment.courseId,
        title: enrollment.Course.title,
        Chapter: chapters.map((chapter) => ({
          id: chapter.id,
          title: chapter.title,
          isCompleted: completedChapters.has(chapter.id),
        })),
        Category: {
          name: courseCategory,
        },
        isRequired,
      };
    });

    const requiredCourses = allCourses.filter((course) =>
      userInterestCategories?.includes(course.Category?.name || "")
    );

    totalRequired = requiredCourses.length;

    const completedRequiredCoursesPromises = enrollments
      .filter((enrolment) =>
        userInterestCategories?.includes(enrolment.Course.Category?.name || "")
      )
      .map(async (enrolment: any) => {
        const courseId = enrolment.courseId;
        const [
          totalLessonsInCourse,
          completedLessonsInCourse,
          totalQuizzesInCourse,
          completedQuizzesInCourse,
        ] = await Promise.all([
          db.lesson.count({ where: { chapter: { courseId } } }),
          db.userLessonProgress.count({
            where: {
              userId: user.id,
              isCompleted: true,
              lesson: { chapter: { courseId } },
            },
          }),
          db.quiz.count({ where: { chapter: { courseId } } }),
          db.userQuizProgress.count({
            where: {
              userId: user.id,
              isCompleted: true,
              quiz: { chapter: { courseId } },
            },
          }),
        ]);

        const totalItemsInCourse = totalLessonsInCourse + totalQuizzesInCourse;
        const completedItemsInCourse =
          completedLessonsInCourse + completedQuizzesInCourse;

        return completedItemsInCourse === totalItemsInCourse ? enrolment : null;
      });

    completedRequiredCourses = (
      await Promise.all(completedRequiredCoursesPromises)
    ).filter(Boolean).length;

    pendingCourses = totalCourses - completedCourses;
  } catch (err) {
    error = `An error occurred `;
  } finally {
    isLoading = false;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>No user data available.</div>;
  }

  const progressPercent =
    totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;
  const requiredCoursePercent =
    totalRequired > 0 ? (completedRequiredCourses / totalRequired) * 100 : 0;
  const badgeNew = userBadges.filter((badge) => badge.level === 1).length;
  const badgeFar = userBadges.length;

  return (
    <div className="w-full min-h-screen p-6">
      <div className="grid xsm:grid-cols-1 md:grid-cols-3 items-stretch place-items-center gap-3">
        <Userinfo initialState={userData} isLoading={isLoading} />
        <UserInterests interest={userData.interests} isLoading={isLoading} />
        <BadgeMain badges={userBadges} isLoading={isLoading} />
      </div>
      <div className="mt-6">
        <ProgressMain
          isLoading={isLoading}
          AllcourseProcess={progressPercent}
          statusCompleted={completedCourses}
          statusPending={pendingCourses}
          requireCoursePerCentage={requiredCoursePercent}
          courseDistribution={courseDistribution}
          badgeFar={badgeFar}
          badgeNew={badgeNew}
        />
      </div>
      <div className="mt-6">
        <AllCourseToUse
          overallProgressPercentage={overallProgressPercentage}
          AllCourse={enrolledCourses}
          isLoading={isLoading}
        />
      </div>
      <div className="mt-6">
        <BookMarkContent bookMarkedCourses={allCategories} />
      </div>
    </div>
  );
}

export default page;
