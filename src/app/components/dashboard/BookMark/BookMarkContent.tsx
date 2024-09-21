"use client";
import React, { useMemo } from "react";
import CardDashBoard from "../CardDashBoard";
import BookMarkCard from "./BookMarkCard";

interface BookMarkContentProps {
  bookMarkedCourses: {
    name: string;
    isChecked: boolean;
    descriptions: string;
  }[];
}

function BookMarkContent({ bookMarkedCourses }: BookMarkContentProps) {
  const memoizedCourses = useMemo(() => bookMarkedCourses, [bookMarkedCourses]);

  return (
    <CardDashBoard>
      <BookMarkCard bookMarkedCourses={memoizedCourses} />
    </CardDashBoard>
  );
}

export default BookMarkContent;
