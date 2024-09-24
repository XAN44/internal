import { Progress } from "@nextui-org/react";
import React from "react";
import OpenCourse from "./OpenCourse";
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
    overallProgressPercentage: number;
  }[];
  isOpen: boolean;
  handleOpen: (val: string) => void;
  handleClose: () => void;
  selectCourse: any;
}
function CourseContentDesk({
  handleOpen,
  AllCourse,

  selectCourse,
}: Props) {
  return (
    <div
      className="
        xsm:hidden
            sm:grid 
    
      ">
      <div
        className="
          w-full 
          h-full 
          grid 
          grid-cols-4 
          place-items-center 
          justify-center items-start">
        <p className="text-blue-500 font-bold h-16  ">ENROLLED COURSES</p>{" "}
        <p className="text-blue-500 font-bold h-16">REQUIREMENT</p>
        <p className="text-blue-500 font-bold h-16">SKILL SETS</p>
        <p className="text-blue-500 font-bold h-16 ">COURSE PROGRESS</p>
      </div>
      <div className="h-96 w-full grid grid-cols-4 overflow-y-auto">
        <div className="flex flex-col items-start">
          {AllCourse.map((course, index) => (
            <p
              onClick={() => handleOpen(course.id)}
              key={course.id}
              className="text-gray-700 sm:h-16 xsm:h-full
                    xsm:hover:cursor-pointer
                ">
              {index + 1}.{course.title}
            </p>
          ))}
        </div>
        <div className="flex flex-col items-center">
          {AllCourse.map((course, index) => (
            <p key={course.id} className="text-gray-700 h-16">
              {course.isRequired ? "Required" : "Optional"}
            </p>
          ))}
        </div>
        <div className="flex flex-col items-center">
          {AllCourse.map((course, index) => (
            <p key={course.id} className="text-gray-700 h-16">
              {course.Category.name}
            </p>
          ))}
        </div>{" "}
        <div className="flex flex-col w-full ">
          {AllCourse.map((course, index) => (
            <div key={course.id} className="text-gray-700 h-16">
              <Progress
                aria-label="Prgoress For Desktop"
                key={index}
                classNames={{
                  track: "drop-shadow-md border border-default",
                  indicator: "bg-gradient-to-r from-sky-900 to-sky-500",
                  label: "tracking-wider font-medium text-default-600",
                  value: "text-foreground/60",
                }}
                defaultValue={course.overallProgressPercentage}
                value={course.overallProgressPercentage}
                minValue={0}
                maxValue={100}
                showValueLabel={true}
                size="md"
                radius="sm"
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseContentDesk;
