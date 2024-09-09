import React, { useCallback } from "react";
import { getCurrentUser } from "../../../lib/auth/getSession";
import { redirect } from "next/navigation";
import { db } from "../../../lib/db";

import { MdDashboardCustomize } from "react-icons/md";
import TitleForm from "../../../components/createCourse/cardCourseCustom/TitleForm";
import DescriptionForm from "../../../components/createCourse/cardCourseCustom/DescriptionForm";
import ImageForm from "../../../components/createCourse/cardCourseCustom/ImageForm";
import CategoryForm from "../../../components/createCourse/cardCourseCustom/CategoryForm";
import { FaFileUpload, FaIdBadge } from "react-icons/fa";
import { RxListBullet } from "react-icons/rx";
import { FiFileMinus } from "react-icons/fi";
import AttachmentsForm from "../../../components/createCourse/cardCourseCustom/AttachmentsForm";
import ChapterForm from "../../../components/createCourse/cardCourseCustom/ChapterForm";
import Banner from "../../../components/banner";
import { Actions } from "../../../components/createCourse/cardCourseCustom/ChapterActions";

async function page({ params }: { params: { courseId: string } }) {
  const user = await getCurrentUser();

  if (!user?.id) {
    return redirect("/auth/sign-in");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId: user.id,
    },
    include: {
      Chapter: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createAt: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course?.id) {
    return redirect("/home");
  }

  const requiredfield = [
    course.title,
    course.descriptions,
    course.imageURL,
    course.categoryId,
    course.Chapter.some((Chapter) => Chapter.isPublished),
  ];

  const totalfield = requiredfield.length;
  const completedField = requiredfield.filter(Boolean).length;
  const completedText = `(${completedField}/ ${totalfield})`;

  const isCompleted = requiredfield.every(Boolean);
  return (
    <>
      {!course.isPublished && (
        <Banner label="This course is unpublished. It will not be visible to the students." />
      )}
      <div className=" p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold text-blue-500">Course setup</h1>
            <span className="text-gray-400 text-sm">
              Complete all fields {completedText}
            </span>
          </div>
          <Actions
            disabled={!isCompleted}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <MdDashboardCustomize size={30} />
              <h2 className="text-xl">Customize your course </h2>
            </div>
            <TitleForm initials={course} courseId={course.id} />
            <DescriptionForm initials={course} courseId={course.id} />
            <ImageForm initials={course} courseId={course.id} />
            <CategoryForm
              initials={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <RxListBullet size={30} />
                <h2 className="text-xl">Course Chapter</h2>
              </div>
              <ChapterForm initials={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <FaFileUpload size={30} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentsForm initials={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
