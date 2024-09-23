import React from "react";
import CardDashBoard from "../dashboard/CardDashBoard";
import ManageMentCard from "./ManageMentCard";

interface Props {
  enrolement: {
    courseId: string;
    isEnrollment: boolean;
    Course: {
      title: string;
    };
  }[];
}

function CourseManageMent({ enrolement }: Props) {
  return (
    <div className="w-full h-full flex">
      <CardDashBoard>
        <ManageMentCard enrolement={enrolement} />
      </CardDashBoard>
    </div>
  );
}

export default CourseManageMent;
