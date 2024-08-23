"use client";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import SearchBar from "../home/searchCourse/searchBar";
import { Link } from "@nextui-org/react";
import { cardCourses } from "../../../../fakeMe";
import ChapterCard from "./ChapterCard";
import Router from "next/router";
import { useRouter } from "next/navigation";
import ChapterMain from "./ChapterMain";
import SelectChapter from "../course/SelectChapter";

type Props = {
  title: string;
};

function ChapterTitle({ title }: Props) {
  const course = cardCourses.find((course) =>
    course.chapter.some(
      (chapter) => chapter.title.toLowerCase() === title.toLowerCase()
    )
  );

  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const courseTitle = course ? course.title : "Course Not Found";
  const selectedChapter = course?.chapter.find(
    (chapter) => chapter.title.toLowerCase() === title.toLowerCase()
  );

  const chapterIndex = course?.chapter.findIndex(
    (chapter) => chapter.title.toLowerCase() === title.toLowerCase()
  );

  const chapterNumber = chapterIndex !== undefined ? chapterIndex + 1 : 1;

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
            <button
              onClick={handleBackClick}
              className="p-1 bg-blue-600 rounded-full text-white">
              <FaArrowLeft />
            </button>

            <p className="font-bold sm:text-xl xsm:text-medium">
              {courseTitle}
            </p>
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
              <SearchBar />
            </div>
          </div>
        </div>
        <div
          className="
            flex 
            w-full 
            h-full
            items-start 
            justify-start
            xsm:flex-col
            xl:flex-row
            gap-10
            ">
          <div
            className="
            mt-6 
            flex 
             items-center 
            justify-center 
            bg-gradient-to-r 
            from-purple-500 
            to-sky-500 rounded-xl p-[1px]
             
            ">
            <div
              className="
              w-full
             bg-white sm:p-6 
             xsm:p-2  rounded-xl">
              {selectedChapter ? (
                <ChapterMain
                  title={selectedChapter.title}
                  url={selectedChapter.url}
                  chapter={chapterNumber}
                />
              ) : (
                <p>ไม่พบเนื้อหาสำหรับ Chapter นี้</p>
              )}
            </div>
          </div>
          <div
            className="
            mt-6    
            items-center 
            justify-center 
            bg-gradient-to-r 
            from-purple-500 
            to-sky-500 
            rounded-xl p-[1px]
      

            ">
            <div
              className="
              h-full
             bg-white 
              p-4 
              rounded-xl
            ">
              <ChapterCard filteredCourses={course?.chapter || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChapterTitle;
