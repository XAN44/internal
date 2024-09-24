"use client";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import SearchBar from "../home/searchCourse/searchBar";
import CourseButton from "./CourseButton";
import { Link } from "@nextui-org/react";
import CourseMain from "./Course";
import { db } from "../../lib/db";

type Props = {
  userId: string;
  title: string;
  courseId: string;
  course: {
    id: string;
    title: string;
    imageURL: string | null;
    descriptions: string | null;
    attachments: {
      name: string;
      url: string;
    }[];
    Chapter: {
      id: string;
    }[];
    Enrollment: {
      isEnrollment: boolean;
    }[];
    Category: {
      name: string;
    } | null;
    User: {
      id: string;
      username: string | null;
      image: string | null;
      role: string | null;
    };
  };
};

function CourseTitle({ title, course, courseId, userId }: Props) {
  const enrollment = course.Enrollment;
  const categoryName = course.Category?.name || "";
  const username = course.User.username || "";
  const userImage = course.User.image || "";
  const userRole = course.User.role || "";
  const attachments = course.attachments;
  const currentId = course.User.id;

  return (
    <div className="w-full h-full antialiased mx-auto">
      <div className="flex flex-col items-center justify-center p-6">
        <div
          className="
              flex 
              xsm:flex-col
              md:flex-row
              md:justify-between 
              items-center 
              text-center
              gap-3 
              w-full 
            ">
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/home"
              className="p-1 bg-blue-600 rounded-full   text-white">
              <FaArrowLeft />
            </Link>
            <p className="font-bold  sm:text-xl xsm:text-medium">{title}</p>
          </div>
        </div>
        <div className="mt-6 flex  h-full items-center justify-center ">
          <div className="w-full bg-white p-1 rounded-lg">
            <CourseMain
              userId={userId}
              attachments={attachments}
              Enrollment={enrollment}
              chapter={course?.Chapter || []}
              description={course?.descriptions || ""}
              courseId={courseId}
              imageURL={course?.imageURL || ""}
              title={course?.title || ""}
              User={{
                id: currentId,
                image: userImage,
                username: username,
                role: userRole,
              }}
              category={{
                categoryname: categoryName,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseTitle;
