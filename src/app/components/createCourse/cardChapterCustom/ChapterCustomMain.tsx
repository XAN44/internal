import Link from "next/link";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { ChapterActions } from "./ChapterActions";
import { MdDashboardCustomize, MdVideoSettings } from "react-icons/md";
import ChapterTitleForm from "./ChapterTitleForm";
import ChapterDescriptionForm from "./ChapterDescription";
import ChapterVideoForm from "./ChapterVideoForm";
import { Chapter, Lesson } from "@prisma/client";

interface Data {
  params: {
    courseId: string;
    chapterId: string;
  };
  completedText: string;
  isCompleted: boolean;
  chapter: Chapter;
  lesson: Lesson;
}

function ChapterCustomMain({
  chapter,
  completedText,
  isCompleted,
  lesson,
  params,
}: Data) {
  return (
    <div className=" p-6">
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
              <h1 className="text-2xl font-medium">Custom lesson</h1>
              <span className="text-sm text-slate-700">
                Complete all fields {completedText}
              </span>
            </div>
            <ChapterActions
              disabled={!isCompleted}
              courseId={params.courseId}
              chapterId={params.chapterId}
              isPublished={chapter.isPublished}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-x-2">
              <MdDashboardCustomize size={30} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <ChapterTitleForm
              initials={chapter}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
            <ChapterDescriptionForm
              initials={chapter}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <MdVideoSettings size={25} />
              <h2 className="text-xl">Add a video</h2>
            </div>
            <ChapterVideoForm
              chapterId={params.chapterId}
              courseId={params.courseId}
              initials={lesson!}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChapterCustomMain;
