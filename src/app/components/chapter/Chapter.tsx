"use client";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ChapterMain from "./ChapterMain";
import { TypeChapter } from "@prisma/client";
import { ChapterCard } from "./ChapterCard";

interface ChapterProps {
  courseId: string;
  chapterId: string;
  chapter: {
    course: {
      title: string;
    };
    title: string;
    type: TypeChapter;
    Lesson: {
      id: string;
      videoUrl: string | null;
      chapterId: string;
      createAt: Date;
      updateAt: Date;
      description?: string | null;
      UserLessonProgress?: {
        lessonId: string; // เพิ่มการประกาศ lessonId
        isCompleted: boolean;
      }[]; // รวม lessonId ใน type
    } | null;
    Quiz: {
      id: string;
      position: number;
      chapterId: string;
      createAt: Date;
      updateAt: Date;
      questions: {
        id: string;
        question: string;
        options: string[];
        correctAnswer: string | null;
        position: number;
        quizId: string;
        createAt: Date;
        updateAt: Date;
      }[];
      UserQuizProgress?: {
        quizId: string; // เพิ่มการประกาศ quizId
        isCompleted: boolean;
      }[]; // รวม quizId ใน type
    } | null;
  };
  chapters: {
    id: string;
    title: string;
    type: TypeChapter;
    Lesson: {
      id: string;
      videoUrl: string | null;
      chapterId: string;
      createAt: Date;
      updateAt: Date;
      description?: string | null;
      UserLessonProgress?: {
        lessonId: string; // เพิ่มการประกาศ lessonId
        isCompleted: boolean;
      }[]; // รวม lessonId ใน type
    } | null;
    Quiz: {
      id: string;
      position: number;
      chapterId: string;
      createAt: Date;
      updateAt: Date;
      questions: {
        id: string;
        question: string;
        options: string[];
        correctAnswer: string | null;
        position: number;
        quizId: string;
        createAt: Date;
        updateAt: Date;
      }[];
      UserQuizProgress?: {
        quizId: string; // เพิ่มการประกาศ quizId
        isCompleted: boolean;
      }[]; // รวม quizId ใน type
    } | null;
    isCompletedLesson: boolean;
    isCompletedQuiz: boolean;
  }[];
}

export function ChapterTitle({
  chapter,
  chapters,
  chapterId,
  courseId,
}: ChapterProps) {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const courseTitle = chapter?.course?.title || "Course Not Found";

  const selectedChapter = chapter;

  const chapterIndex = chapters?.findIndex(
    (ch) => ch.title.toLowerCase() === chapter.title.toLowerCase()
  );

  const chapterNumber = chapterIndex !== undefined ? chapterIndex + 1 : 1;

  const filteredCourses = chapters.map((ch) => ({
    id: ch.id,
    title: ch.title,
    type: ch.type,
    isCompletedQuiz:
      ch.Quiz?.UserQuizProgress?.find(
        (progress) => progress.quizId === ch.Quiz?.id
      )?.isCompleted ?? false,
    isCompletedLesson:
      ch.Lesson?.UserLessonProgress?.find(
        (progress) => progress.lessonId === ch.Lesson?.id
      )?.isCompleted ?? false,
  }));

  return (
    <div className="w-full h-full antialiased mx-auto">
      <div className="flex flex-col items-center justify-center p-6">
        <div className="flex xsm:flex-col md:flex-row md:justify-between items-center text-center gap-3 w-full">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleBackClick}
              className="p-1 bg-blue-600 rounded-full text-white">
              <FaArrowLeft />
            </button>

            <p className="font-bold sm:text-xl xsm:text-medium">
              {courseTitle}
            </p>
          </div>
        </div>
        <div className="w-full grid sm:grid-cols-5 md:grid-cols-6 xsm:grid-cols-1 sm:gap-3">
          <div className="sm:col-span-4 md:col-span-5 mt-6 flex items-center justify-center bg-gradient-to-r from-purple-500 to-sky-500 rounded-xl p-[1px] flex-grow">
            <div className="w-full h-full bg-white sm:p-6 xsm:p-2 rounded-xl">
              {selectedChapter ? (
                <ChapterMain
                  description={selectedChapter.Lesson?.description || ""}
                  chapterId={chapterId}
                  courseId={courseId}
                  type={selectedChapter.type}
                  title={selectedChapter.title}
                  url={selectedChapter.Lesson?.videoUrl || ""}
                  chapter={chapterNumber}
                  questions={selectedChapter.Quiz?.questions || []}
                  quizId={selectedChapter.Quiz?.id || ""}
                  lessonId={selectedChapter.Lesson?.id || ""}
                  isCompletedQuiz={
                    selectedChapter.Quiz?.UserQuizProgress?.[0]?.isCompleted ??
                    false
                  }
                  isCompletedLesson={
                    selectedChapter.Lesson?.UserLessonProgress?.[0]
                      ?.isCompleted ?? false
                  }
                />
              ) : (
                <p className="sm:text-lg font-bold xsm:text-sm flex w-full items-center justify-center">
                  Not found content chapter
                </p>
              )}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center bg-gradient-to-r from-purple-500 to-sky-500 rounded-xl p-[1px] flex-grow">
            <div className="h-full w-full flex bg-white p-4 rounded-xl">
              {chapters.length > 0 ? (
                <ChapterCard
                  courseId={courseId}
                  courseSlug={courseTitle}
                  filteredCourses={filteredCourses}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <p className="sm:text-lg font-bold xsm:text-sm">
                    Not found chapter
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
