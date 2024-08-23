"use client";
import React, { useState } from "react";
import { Video } from "../../lib/video";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import clsx from "clsx";
import ShowDsip from "./ShowDsip";
import { useRouter } from "next/navigation";

interface Course {
  id: string;
  category: string;
  title: string;
  name: string;
  role: string;
  thumnel: string;
  avatar: string;
  description: string;
  chapter: {
    title: string;
  }[];
}

interface CoursesProps {
  filteredCourses: Course[];
}
function CourseMain({ filteredCourses }: CoursesProps) {
  const [showDescription, setShowDescription] = useState(false);
  const router = useRouter();

  const toggleShowFull = () => {
    setShowDescription((val) => !val);
  };
  function createSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, ""); // ลบอักขระที่ไม่ใช่ตัวอักษรหรือตัวเลข (ยกเว้นขีดกลางและขีดล่าง)
  }

  // ในโค้ดของคุณที่ใช้ฟังก์ชันนี้
  const togleToCourse = (title: string, chapterTitle: string) => {
    const titleSlug = createSlug(title);
    const chapterSlug = createSlug(chapterTitle);

    router.push(`/course/${titleSlug}/${chapterSlug}`);
  };
  return (
    <>
      {filteredCourses.map((item) => (
        <div key={item.id}>
          <Card
            isFooterBlurred
            radius="lg"
            className="
            flex 
            flex-col 
            items-center 
            justify-center 
 
            
                ">
            <Image
              isBlurred
              src={item.thumnel}
              alt="Picture of the author"
              className="object-cover"
            />
            <CardFooter
              className="
              flex 
              items-center 
              justify-between 
              xsm:flex-col
              w-full 
              mt-5
              gap-3
              relative
              ">
              <div
                className="
              flex 
              gap-3
              items-center 
              xsm:justify-center
              sm:justify-start
              xsm:flex-col
              sm:flex-row
              w-full
              ">
                <Image
                  src="/avatar.png"
                  alt="sd"
                  fallbackSrc={item.name}
                  radius="full"
                  className="
                  rounded-full 
                  object-contain 
                  bg-black
                  sm:w-9
                  sm:h-9
                  xsm:w-8
                  xsm:h-8
                  "
                />
                <div className="">
                  <p
                    className="
                  font-bold
                  sm:text-lg
                  xsm:text-xs
                  ">
                    {item.name}
                  </p>
                  <p className="text-xs">{item.role}</p>
                </div>
              </div>
              <div
                className="
                text-xs badge 
                sm:absolute 
                sm:right-0 
                badge-neutral 
                sm:badge-lg 
                xsm:badge-sm">
                {item.category}
              </div>
            </CardFooter>
            <p
              className="
            text-medium 
            mt-5
            
            ">
              {item.title}
            </p>
            <Button
              variant="flat"
              className="text-blue-800"
              onClick={toggleShowFull}>
              {showDescription ? "Reading . ." : " Description  "}
            </Button>
            <CardFooter>
              <div className="w-full flex items-center justify-center">
                <Button
                  onClick={() =>
                    togleToCourse(item.title, item.chapter[0].title)
                  }>
                  Enter to course
                </Button>
              </div>
            </CardFooter>
          </Card>
          <ShowDsip
            description={item.description}
            showDescription={showDescription}
            toggleShowFull={toggleShowFull}
          />
        </div>
      ))}
    </>
  );
}

export default CourseMain;
