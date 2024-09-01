import React from "react";
import CardDashBoard from "../CardDashBoard";
import BookMarkCard from "./BookMarkCard";
interface BookMarkContentProps {
  bookMarkedCourses: Array<{
    id: string;
    title: string;
    duration: number;
    isRequired: boolean;
    isBookMark: boolean;
    isCompleted: boolean;
  }>;
}
function BookMarkContent({ bookMarkedCourses }: BookMarkContentProps) {
  return (
    <CardDashBoard>
      <BookMarkCard bookMarkedCourses={bookMarkedCourses} />
    </CardDashBoard>
  );
}

export default BookMarkContent;
