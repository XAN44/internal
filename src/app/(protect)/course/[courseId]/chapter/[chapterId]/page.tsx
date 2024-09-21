import React from "react";
import { db } from "../../../../../lib/db";
import { getCurrentUser } from "../../../../../lib/auth/getSession";
import { ChapterTitle } from "../../../../../components/chapter/Chapter";

async function Chapter({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const user = await getCurrentUser();

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      isPublished: true,
    },
    include: {
      course: true,
      Lesson: {
        include: {
          UserLessonProgress: {
            where: {
              userId: user?.id,
            },
            select: {
              userId: true,
              lessonId: true,
              isCompleted: true,
            },
          },
        },
      },
      Quiz: {
        include: {
          questions: true,
          UserQuizProgress: {
            where: {
              userId: user?.id,
            },
            select: {
              userId: true,
              quizId: true,
              isCompleted: true,
            },
          },
        },
      },
    },
  });

  if (!chapter) {
    return <div>Chapter not found</div>;
  }

  // Fetch all chapters with user progress
  const chapters = await db.chapter.findMany({
    where: {
      courseId: params.courseId,
      isPublished: true,
    },
    include: {
      Lesson: {
        include: {
          UserLessonProgress: {
            where: {
              userId: user?.id,
            },
            select: {
              userId: true,
              lessonId: true,
              isCompleted: true,
            },
          },
        },
      },
      Quiz: {
        include: {
          questions: true,
          UserQuizProgress: {
            where: {
              userId: user?.id,
            },
            select: {
              userId: true,
              isCompleted: true,
              quizId: true,
            },
          },
        },
      },
    },
    orderBy: {
      position: "asc",
    },
  });

  const processedChapters = chapters.map((ch) => {
    // ตรวจสอบว่า Lesson มีอยู่
    const lessonProgress =
      ch.Lesson?.UserLessonProgress?.find(
        (progress) => progress.userId === user?.id
      )?.isCompleted ?? false;

    // ตรวจสอบว่า Quiz มีอยู่
    const quizProgress =
      ch.Quiz?.UserQuizProgress?.find(
        (progress) => progress.userId === user?.id
      )?.isCompleted ?? false;

    return {
      ...ch,
      isCompletedLesson: lessonProgress,
      isCompletedQuiz: quizProgress,
    };
  });

  return (
    <div className="w-full h-full">
      <div className="flex flex-col">
        <ChapterTitle
          chapterId={params.chapterId}
          courseId={params.courseId}
          chapter={chapter}
          chapters={processedChapters}
        />
      </div>
    </div>
  );
}

export default Chapter;
