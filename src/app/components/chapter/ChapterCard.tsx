"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@nextui-org/react";

interface Course {
  id: string;
  title: string;
  subChapter: string;
  description: string;
  url: string;
  type: string;
}

interface CoursesProps {
  courseSlug: string;
  filteredCourses: Course[];
}

function ChapterCard({ courseSlug, filteredCourses }: CoursesProps) {
  const router = useRouter();

  function createSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }

  const toggleToCourse = (chapterTitle: string) => {
    const chapterSlug = createSlug(chapterTitle);
    router.push(`/course/${courseSlug}/${chapterSlug}`);
  };

  return (
    <>
      <div
        className="
        flex 
        flex-col 
        gap-3
        overflow-y-auto 
        w-full
        h-full
        ">
        {filteredCourses.map((i, index) => (
          <div
            key={i.id}
            className="
            flex
            flex-col
            justify-start
            h-full
          ">
            <Link
              href={`/course/${courseSlug}/${createSlug(i.title)}`}
              className=" 
            flex 
            flex-col 
            items-start 
            h-full w-full 
            ">
              <p
                className="
              xsm:text-sm 
              sm:text-medium">
                {i.title}
              </p>
              <p
                className="
              xsm:text-xs 
              sm:text-sm 
              text-blue-600">
                Chapter {index + 1} : {i.subChapter}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default ChapterCard;
