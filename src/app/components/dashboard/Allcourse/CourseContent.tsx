import { Progress } from "@nextui-org/react";
import clsx from "clsx";
import React from "react";
import OpenCourse from "./OpenCourse";

interface Course {
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
}

interface Props {
  AllCourse: Course[];
  isOpen: boolean;
  handleOpen: (val: string) => void;
  handleClose: () => void;
  selectCourse: any;
}

function CourseContent({
  handleOpen,
  AllCourse,
  isOpen,
  handleClose,
  selectCourse,
}: Props) {
  return (
    <div className="overflow-y-auto">
      {/* Header สำหรับ Desktop */}
      <div className="hidden xsm:grid grid-cols-4 place-items-center justify-center items-start">
        <p className="text-blue-500 font-bold h-16">ENROLLED COURSES</p>
        <p className="text-blue-500 font-bold h-16">REQUIREMENT</p>
        <p className="text-blue-500 font-bold h-16">SKILL SETS</p>
        <p className="text-blue-500 font-bold h-16">COURSE PROGRESS</p>
      </div>

      {/* Content สำหรับ Mobile และ Desktop */}
      <div className="grid grid-cols-1 xsm:grid-cols-4 overflow-y-auto h-96">
        {AllCourse.map((course, index) => (
          <div className="flex flex-col w-full" key={course.id}>
            <div
              onClick={() => handleOpen(course.id)}
              className="text-gray-700 sm:h-16 xsm:h-full xsm:hover:cursor-pointer">
              <h2 className="text-blue-500 font-bold mb-2">
                {index + 1}. {course.title}
              </h2>
              <div className="grid grid-cols-2 place-items-center items-center justify-center w-full">
                <Progress
                  aria-label="Progress"
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
                <div className="grid grid-cols-1 gap-3">
                  <div
                    className={clsx(
                      "badge badge-outline",
                      course.isRequired ? "text-yellow-500" : "text-green-500"
                    )}>
                    {course.isRequired ? "Required" : "Optional"}
                  </div>
                  <div>{course.Category.name}</div>
                </div>
              </div>
            </div>
            <div className="divider"></div>
          </div>
        ))}
      </div>

      {/* เปิดคอร์ส */}
      <OpenCourse
        isOpen={isOpen}
        onClose={handleClose}
        selectedCourse={selectCourse}
      />
    </div>
  );
}

export default CourseContent;
