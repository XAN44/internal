"use client";
import React, { useState } from "react";
import { Video } from "../../lib/video";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import ShowDsip from "../course/ShowDsip";

interface Course {
  id: string;
  title: string;
  subChapter: string;
  description: string;
  url: string;
  type: string;
}

interface CoursesProps {
  filteredCourses: Course[];
}
function ChapterCard({ filteredCourses }: CoursesProps) {
  const [showDescription, setShowDescription] = useState(false);
  const router = useRouter();

  function createSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }

  // ในโค้ดของคุณที่ใช้ฟังก์ชันนี้
  const togleToCourse = (title: string, chapterTitle: string) => {
    const titleSlug = createSlug(title);
    const chapterSlug = createSlug(chapterTitle);

    router.push(`/course/${titleSlug}`);
  };
  return (
    <div
      className="
      xl:w-full
      xl:h-full
      flex
      flex-col
      justify-between
      items-start
      p-2
    ">
      {filteredCourses.map((item, index) => (
        <div
          key={item.id}
          className="
            flex
            flex-col
          ">
          <p className=" font-bold text-medium">{item.title}</p>
          <p className="text-blue-500 font-bold text-sm">Chapter {index + 1}</p>
        </div>
      ))}
    </div>
  );
}

export default ChapterCard;
