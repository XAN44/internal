import React from "react";
import TaskStatus from "../../components/task/TaskStatus";
import { db } from "../../lib/db";
import { getCurrentUser } from "../../lib/auth/getSession";
import Chapter from "../course/[courseId]/chapter/[chapterId]/page";
import { title } from "process";

async function page() {
  let userData = null;
  let isLoading = true;
  let error = null;
  let courseEnrolmentData: {
    id: string;
    title: string;
    enrolledAt: Date;
    duelDate: Date | null;
    isCompleted: boolean;
  }[] = [];

  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return null;
    }

    const enrollments = await db.enrollment.findMany({
      where: { userId: user.id, isEnrollment: true },
      select: {
        id: true,
        courseId: true,
        dueDate: true,
        enrolledAt: true,
        Course: {
          select: {
            title: true,
            Category: {
              select: {
                name: true,
              },
            },
            Chapter: {
              select: {
                isPublished: true,
                id: true,
                Lesson: {
                  select: {
                    UserLessonProgress: {
                      where: { userId: user.id },
                      select: {
                        isCompleted: true,
                      },
                    },
                  },
                },
                Quiz: {
                  select: {
                    id: true,
                    UserQuizProgress: {
                      where: { userId: user.id },
                      select: {
                        isCompleted: true,
                      },
                    },
                  },
                },
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

    interface CategoryProgress {
      completed: number;
      total: number;
    }

    // เก็บข้อมูล categoryProgress สำหรับแต่ละ category
    let totalCompletedTasks = 0;
    let totalPendingTasks = 0;
    let categoryProgress: Record<string, CategoryProgress> = {};

    enrollments.forEach((enrollment) => {
      const category = enrollment.Course.Category?.name; // ดึงชื่อ category ของ course

      if (!category) {
        return null;
      }

      if (!categoryProgress[category]) {
        categoryProgress[category] = { completed: 0, total: 0 };
      }

      enrollment.Course.Chapter.forEach((chapter) => {
        // ตรวจสอบว่า chapter ถูกเผยแพร่หรือไม่
        if (chapter.isPublished) {
          if (chapter.Lesson) {
            const lessonProgress = chapter.Lesson.UserLessonProgress;
            if (lessonProgress.length > 0) {
              if (lessonProgress[0].isCompleted) {
                totalCompletedTasks += 1;
                categoryProgress[category].completed += 1;
              } else {
                totalPendingTasks += 1;
              }
              categoryProgress[category].total += 1;
            } else {
              totalPendingTasks += 1;
              categoryProgress[category].total += 1;
            }
          }

          // กรณีแบบทดสอบ (Quiz)
          if (chapter.Quiz) {
            const quizProgress = chapter.Quiz.UserQuizProgress;
            if (quizProgress.length > 0) {
              if (quizProgress[0].isCompleted) {
                totalCompletedTasks += 1;
                categoryProgress[category].completed += 1;
              } else {
                totalPendingTasks += 1; // เพิ่มในกรณีที่ยังไม่เสร็จสมบูรณ์
              }
              categoryProgress[category].total += 1; // เพิ่มจำนวนรวมแบบทดสอบใน category นี้
            } else {
              totalPendingTasks += 1; // เพิ่มในกรณีที่ไม่มี progress
              categoryProgress[category].total += 1;
            }
          }
        }
      });
    });

    const progressData = Object.keys(categoryProgress).map((category) => {
      const progress = categoryProgress[category];
      const percentage = (progress.completed / progress.total) * 100;
      return {
        category,
        completed: progress.completed,
        total: progress.total,
        percentage: Math.round(percentage * 100) / 100,
      };
    });

    const courseEnrolments = enrollments.map((enrollment) => {
      const course = enrollment.Course;

      const completedChapters = new Set();

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

      const isCompleted = course.Chapter.filter(
        (chapter) => chapter.isPublished
      ).every((chapter) => completedChapters.has(chapter.id));

      return {
        id: enrollment.courseId,
        title: enrollment.Course.title,
        enrolledAt: enrollment.enrolledAt,
        duelDate: enrollment.dueDate,
        isCompleted: isCompleted,
      };
    });

    courseEnrolmentData = courseEnrolments;

    userData = {
      pendingTasks: totalPendingTasks,
      completedTasks: totalCompletedTasks,
      progress: progressData,
    };
  } catch (err) {
    error = "An error occurred: ";
  } finally {
    isLoading = false;
  }

  if (!userData) {
    return <div>No data available.</div>;
  }

  return (
    <div className="w-full min-h-screen p-6">
      <p className="text-xl font-bold mb-6">Task Status</p>
      <TaskStatus initial={userData} courseEnrolment={courseEnrolmentData} />
    </div>
  );
}

export default page;
