"use client";
import React, { useState } from "react";
import { Video } from "../../lib/video";
import { Button, Image } from "@nextui-org/react";
import clsx from "clsx";
import ShowDsip from "./ShowDsip";

interface Course {
  id: string;
  category: string;
  title: string;
  name: string;
  role: string;
  thumnel: string;
  avatar: string;
  description: string;
}

interface CoursesProps {
  filteredCourses: Course[];
}
function CourseMain({ filteredCourses }: CoursesProps) {
  const [showDescription, setShowDescription] = useState(false);

  const toggleShowFull = () => {
    setShowDescription((val) => !val);
  };

  return (
    <>
      {filteredCourses.map((item) => (
        <div key={item.id}>
          <div
            className="
            flex 
            flex-col 
            items-center justify-center 
                p-11
                rounded-xl
                ">
            <Image
              removeWrapper
              isBlurred
              src={item.thumnel}
              alt="Picture of the author"
            />
            <p className="text-xl font-bold text-center">{item.title}</p>
            <div className=" w-full flex items-start justify-start  ">
              <Button
                variant="flat"
                className="text-blue-800"
                onClick={toggleShowFull}>
                {showDescription ? "Reading . ." : " Description  "}
              </Button>
            </div>
          </div>
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
