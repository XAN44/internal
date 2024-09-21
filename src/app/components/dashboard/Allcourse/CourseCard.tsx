"use client";
import React, { useState } from "react";
import CourseContentMobile from "./CoursContentMobile";
import CourseContentDesk from "./CourseContentDesk";
import SkeltonForMobile from "./SkeltonForMobile";
interface Props {
  AllCourse: {
    id: string;
    title: string;
    isRequired: boolean;
    Chapter: {
      id: string;
      title: string;
      isCompleted: boolean;
    }[];
    Category: {
      name: string;
    };
  }[];

  overallProgressPercentage: number;

  isLoading: boolean;
}
function CourseCard({
  AllCourse,
  isLoading,
  overallProgressPercentage,
}: Props) {
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
            overallProgressPercentage={overallProgressPercentage}
            handleClose={handleClose}
            AllCourse={AllCourse}
            handleOpen={handleOpen}
            isOpen={isOpen}
            selectCourse={selectCourse}
          />
          <CourseContentDesk
            overallProgressPercentage={overallProgressPercentage}
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
