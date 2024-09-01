"use client";

import React, { useEffect, useState } from "react";
import CardDashBoard from "../CardDashBoard";
import CourseCard from "./CourseCard";

interface Props {
  AllCourse: {
    id: string;
    title: string;
    duration: number;
    isRequired: boolean;
    isCompleted: boolean;
    category: string;
    chapters: {
      id: string;
      title: string;
      duration: number;
      isCompleted: boolean;
    }[];
    completionPercentage: number;
  }[];
  isLoading: boolean;
}

function AllCourseToUse({ AllCourse, isLoading }: Props) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <CardDashBoard>
      <CourseCard AllCourse={AllCourse} isLoading={loading} />
    </CardDashBoard>
  );
}

export default AllCourseToUse;
