import Link from "next/link";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { ChapterActions } from "../cardChapterCustom/ChapterActions";
import { Chapter, Question, Quiz } from "@prisma/client";
import QuizForm from "./QuizForm";
import { QuizActions } from "./QuizActions";
import ChapterTitleForm from "../cardChapterCustom/ChapterTitleForm";

interface Data {
  params: {
    courseId: string;
    chapterId: string;
  };
  completedText: string;
  isCompleted: boolean;
  chapter: Chapter;
  quiz: (Quiz & { questions: Question[] }) | null;
}

function MainCardQuiz({
  chapter,
  completedText,
  isCompleted,
  params,
  quiz,
}: Data) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/createcourse/${params.courseId}`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6">
            <BiArrowBack className="h-4 w-4 mr-2" />
            Back to course setup
          </Link>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <div className="text-2xl font-medium">Custom Quiz</div>
              <span className="text-sm text-slat">
                Create all 5 questions {completedText}
              </span>
            </div>
            <QuizActions
              disabled={!isCompleted}
              courseId={params.courseId}
              chapterId={params.chapterId}
              isPublished={chapter.isPublished}
            />
          </div>
        </div>
      </div>
      <div
        className="
      grid grid-cols-1
      md:grid-cols-2
      
      ">
        <div className="">
          <ChapterTitleForm
            courseId={params.courseId}
            chapterId={params.chapterId}
            initials={chapter}
          />

          <QuizForm quiz={quiz} params={params} chapter={chapter} />
        </div>
      </div>
    </div>
  );
}

export default MainCardQuiz;
