// components/ChapterMain.tsx

import React, { useState } from "react";
import { Video } from "../../lib/video";
import { Question, TypeChapter } from "@prisma/client";
import { Quiz } from "../../lib/quiz";
import { Button } from "@nextui-org/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Preview } from "../preview";

interface Props {
  isOwner: boolean;
  courseId: string;
  title: string;
  url: string;
  chapter: number;
  type: TypeChapter;
  questions: Question[];
  quizId: string;
  isCompletedQuiz: boolean;
  isCompletedLesson: boolean;
  lessonId: string;
  chapterId: string;
  description: string;
}

function ChapterMain({
  title,
  url,
  courseId,
  chapter,
  type,
  questions,
  isCompletedQuiz,
  quizId,
  isCompletedLesson,
  lessonId,
  chapterId,
  description,
  isOwner,
}: Props) {
  const router = useRouter();
  const [showDescription, setShowDescription] = useState(false);
  const toggleShowFull = () => {
    setShowDescription((val) => !val);
  };

  const handleMark = async () => {
    try {
      await axios.patch(
        `/api/course/${courseId}/chapter/${chapterId}/markLesson`
      );
      toast.success("Mark success");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Error marking lesson");
    }
  };

  return (
    <div className="relative">
      {type === "Lesson" && (
        <div className=" flex items-center justify-end w-full">
          {!isOwner && (
            <Button
              disabled={isCompletedLesson}
              onClick={handleMark}
              variant="flat"
              className={
                isCompletedLesson ? "text-green-600" : "text-blue-600"
              }>
              {isCompletedLesson ? "Completed" : "Mark as Complete"}
            </Button>
          )}
        </div>
      )}
      {type === "Lesson" ? (
        <>
          <Video title={title} url={url} chapter={chapter} />
          <Button
            variant="flat"
            className="text-blue-800"
            onClick={toggleShowFull}>
            {showDescription ? "Reading . ." : " Read Description  "}
          </Button>
          {showDescription && (
            <div className="fixed z-50 inset-0 flex items-center justify-center bg-opacity-85 bg-black text-black">
              <div className="flex flex-col bg-white w-1/2 h-96 xsm:w-64 xssx:w-80 sm:w-4/6 p-6">
                <div className="flex items-center justify-between ">
                  <div className="text-xl font-bold">Description</div>
                  <div
                    className="cursor-pointer text-black"
                    onClick={toggleShowFull}>
                    x
                  </div>
                </div>
                <div className="overflow-y-auto">
                  <p className="antialiased mt-6 mb-6 sm:w-full indent-8">
                    {description && <Preview value={description} />}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <Quiz
          isOwner={isOwner}
          title={title}
          questions={questions || []}
          quizId={quizId}
          isCompleted={isCompletedQuiz}
        />
      )}
    </div>
  );
}

export default ChapterMain;
