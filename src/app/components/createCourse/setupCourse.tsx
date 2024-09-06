import React from "react";
import { MdDashboardCustomize } from "react-icons/md";
import CardCustom from "./cardCourseCustom/cardCustom";

interface Props {
  completedText: string;
  initialData: {
    title: string;
  };
  courseId: string;
}

function SetupCourse({ completedText, courseId, initialData }: Props) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <p className="text-xl text-blue-500 font-bold">Course Setup</p>
          <span className="text-sm text-gray-400">
            Completed All Fields {completedText}
          </span>
        </div>
      </div>
      <div
        className="
        mt-16
        grid-cols-1
        md:grid-cols-2
        gap-6        
        ">
        <div>
          <div className="flex items-center gap-x-2">
            <MdDashboardCustomize size={30} />
            <p className="text-medium font-bold">Customize your course</p>
          </div>
        </div>
        <CardCustom courseId={courseId} initialData={initialData} />
      </div>
    </>
  );
}

export default SetupCourse;
