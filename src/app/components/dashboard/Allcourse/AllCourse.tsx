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
  }[];

  overallProgressPercentage: number;
  isLoading: boolean;
}

function AllCourseToUse({
  AllCourse,
  isLoading,
  overallProgressPercentage,
}: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  // ใช้ useMemo เพื่อจัดเตรียมข้อมูลที่ส่งไปยัง CourseCard
  const memoizedCourses = useMemo(() => AllCourse, [AllCourse]);

  return (
    <CardDashBoard>
      <CourseCard
        AllCourse={memoizedCourses}
        isLoading={loading}
        overallProgressPercentage={overallProgressPercentage}
      />
    </CardDashBoard>
  );
}

export default AllCourseToUse;
