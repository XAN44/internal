"use client";
import { Progress } from "@nextui-org/react";
import React, { useState } from "react";
import OpenCourse from "./OpenCourse";
import clsx from "clsx";
import CourseContentMobile from "./CoursContentMobile";
import CourseContentDesk from "./CourseContentDesk";
import SkeltonForMobile from "./SkeltonForMobile";
interface Props {
  AllCourse: {
    id: string;
    title: string;
    duration: number;
    isRequired: boolean;
    isCompleted: boolean;
    category: string;
    chapters: {
      id: string;
      title: string;
      duration: number;
      isCompleted: boolean;
    }[];
    completionPercentage: number;
  }[];
  isLoading: boolean;
}
function CourseCard({ AllCourse, isLoading }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectCourse, setSelectCourse] = useState<any>(null);

  const handleOpen = (courseId: string) => {
    const course = AllCourse.find((course) => course.id === courseId);
    setIsOpen(true);
    setSelectCourse(course || null);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectCourse(null);
  };
  return (
    <div className="w-full h-full p-6 ">
      {isLoading ? (
        <SkeltonForMobile />
      ) : (
        <>
          <CourseContentMobile
            handleClose={handleClose}
            AllCourse={AllCourse}
            handleOpen={handleOpen}
            isOpen={isOpen}
            selectCourse={selectCourse}
          />
          <CourseContentDesk
            handleClose={handleClose}
            AllCourse={AllCourse}
            handleOpen={handleOpen}
            isOpen={isOpen}
            selectCourse={selectCourse}
          />
        </>
      )}
    </div>
  );
}

export default CourseCard;
