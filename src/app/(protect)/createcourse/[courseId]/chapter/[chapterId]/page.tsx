import React from "react";
import { getCurrentUser } from "../../../../../lib/auth/getSession";
import { redirect } from "next/navigation";
import { db } from "../../../../../lib/db";
import Link from "next/link";
import { BiArrowBack, BiVideoPlus } from "react-icons/bi";
import { MdDashboardCustomize, MdVideoSettings } from "react-icons/md";
import ChapterTitleForm from "../../../../../components/createCourse/cardChapterCustom/ChapterTitleForm";
import ChapterDescriptionForm from "../../../../../components/createCourse/cardChapterCustom/ChapterDescription";
import { FaEye } from "react-icons/fa";
import ChapterAccessForm from "../../../../../components/createCourse/cardChapterCustom/ChapterAccessForm";
import ChapterVideoForm from "../../../../../components/createCourse/cardChapterCustom/ChapterVideoForm";
import Banner from "../../../../../components/banner";
import { boolean } from "zod";
import { ChapterActions } from "../../../../../components/createCourse/cardChapterCustom/ChapterActions";

async function Page({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const user = await getCurrentUser();
  if (!user?.id) {
    redirect("/auth/sign-in");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/home");
  }

  const requiredfield = [chapter.title, chapter.description, chapter.videoUrl];

  const totalfield = requiredfield.length;
  const completedField = requiredfield.filter(Boolean).length;
  const completedText = `(${completedField}/${totalfield})`;

  const isCompleted = requiredfield.every(Boolean);
  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        />
      )}
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
                <h1 className="text-2xl font-medium"></h1>
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
                initials={chapter}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
