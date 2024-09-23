"use client";

import React, { useEffect, useMemo, useState } from "react";
import CardDashBoard from "../CardDashBoard";
import CourseCard from "./CourseCard";

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
}

function AllCourseToUse({ AllCourse }: Props) {
  const memoizedCourses = useMemo(() => AllCourse, [AllCourse]);

  return (
    <CardDashBoard>
      <CourseCard AllCourse={memoizedCourses} />
    </CardDashBoard>
  );
}

export default AllCourseToUse;
