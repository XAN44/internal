"use client";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import SearchBar from "../home/searchCourse/searchBar";
import CourseButton from "./CourseButton";
import { Link } from "@nextui-org/react";
import { cardCourses } from "../../../../fakeMe";
import CourseMain from "./Course";
import SelectChapter from "./SelectChapter";
import { db } from "../../lib/db";

type Props = {
  title: string;
  course: {
    id: string;
    title: string;
    imageURL: string | null;
    descriptions: string | null;
    Chapter: {
      id: string;
      title: string;
    }[];
    Category: {
      name: string;
    };
    User: {
      username: string;
      image: string | null;
      role: string | null;
    };
  };
};

function CourseTitle({ title, course }: Props) {
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
          <div
            className="
                flex 
                sm:flex-row 
                xsm:flex-col 
                justify-center 
                items-center
                gap-6
                ">
            <div
              className="
                xsm:w-[300px] 
                sm:w-[300px] 
                md:w-[200px] 
                lg:w-[290px]
                xl:w-[400px]
                ">
              {/* รอทำ */}
              {/* <SearchBar /> */}
            </div>
          </div>
        </div>
        <div className="mt-6 flex  h-full items-center justify-center ">
          <div className="w-full bg-white p-1 rounded-lg">
            <CourseMain
              chapter={course?.Chapter || []} // ต้องเป็นอาเรย์
              description={course?.descriptions || ""}
              id={course?.id || ""}
              imageURL={course?.imageURL || ""}
              title={course?.title || ""}
              User={{
                image: course?.User.image || "",
                username: course?.User?.username || "",
                role: course?.User.role || "",
              }}
              category={{
                categoryname: course?.Category?.name || "",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseTitle;
