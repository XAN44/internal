"use client";
import React, { useState } from "react";
import { Video } from "../../lib/video";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import clsx from "clsx";
import ShowDsip from "./ShowDsip";
import { useRouter } from "next/navigation";
import { FcReading } from "react-icons/fc";

interface Course {
  title: string;
  imageURL: string | null;
  description: string | null;
  id: string;
  chapter: {
    id: string;
    title: string;
  }[];
  category: {
    categoryname: string;
  };
  User: {
    username: string;
    image: string | null;
    role: string | null;
  };
}

function CourseMain({
  User,
  description,
  id,
  imageURL,
  title,
  category,
  chapter,
}: Course) {
  const [showDescription, setShowDescription] = useState(false);
  const router = useRouter();

  const toggleShowFull = () => {
    setShowDescription((val) => !val);
  };
  const firstChapterId = chapter.length > 0 ? chapter[0].id : "";

  const togleToCourse = (courseId: string, chapterId: string) => {
    router.push(`/course/${courseId}/chapter/${chapterId}`);
  };

  return (
    <>
      <div key={id}>
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
            src={imageURL || ""}
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
                src={User.image || "/Avatar.png"}
                alt="sd"
                fallbackSrc={title}
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
                  {User.username}
                </p>
                <p className="text-xs">{User.role}</p>
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
              {category.categoryname}
            </div>
          </CardFooter>
          <p
            className="
            text-medium 
            mt-5
            ">
            {title}
          </p>
          <Button
            variant="flat"
            className="text-blue-800"
            onClick={toggleShowFull}>
            {showDescription ? "Reading . ." : " Read Description  "}
          </Button>
          <CardFooter>
            <div className="w-full flex items-center justify-center">
              <Button
                variant="shadow"
                className="bg-blue-500/50 hover:bg-blue-500"
                startContent={<FcReading className="w-4 h-4 " />}
                onClick={() => {
                  console.log("Button clicked");
                  if (firstChapterId) {
                    togleToCourse(id, firstChapterId);
                  } else {
                    console.error("No firstChapterId available");
                  }
                }}>
                Begin Course
              </Button>
            </div>
          </CardFooter>
        </Card>
        <ShowDsip
          description={description || ""}
          showDescription={showDescription}
          toggleShowFull={toggleShowFull}
        />
      </div>
    </>
  );
}

export default CourseMain;
