import React from "react";
import CardDashBoard from "../dashboard/CardDashBoard";
import CourseHistoryContent from "./CourseHistoryContent";
interface Props {
  initials: {
    id: string;
    name: string;
    enrolledAt: string;
    status: string;
  }[];
}
function CourseHistory({ initials }: Props) {
  return (
    <CardDashBoard>
      <CourseHistoryContent initials={initials} />
    </CardDashBoard>
  );
}

export default CourseHistory;
