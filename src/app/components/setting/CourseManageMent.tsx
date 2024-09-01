import React from "react";
import CardDashBoard from "../dashboard/CardDashBoard";
import ManageMentCard from "./ManageMentCard";

function CourseManageMent() {
  return (
    <div className="w-full h-full flex">
      <CardDashBoard>
        <ManageMentCard />
      </CardDashBoard>
    </div>
  );
}

export default CourseManageMent;
