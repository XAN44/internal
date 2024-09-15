"use client";
import React, { useEffect, useState } from "react";
import CourseTitle from "../../../components/course/CourseTitle";
import axios from "axios";

export async function fetchcourse(courseId: string) {
  try {
    const result = await axios.get(`/api/takeCourse/${courseId}`);
    if (result.status !== 200) {
      throw new Error(`Error: ${result.status} - ${result.statusText}`);
    }

    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function CoursePage({ params }: { params: { courseId: string } }) {
  const [courseData, setCourseData] = useState<{
    id: string;
    title: string;
    imageURL: string | null;
    descriptions: string | null;
    Chapter: {
      id: string;
      title: string;
    }[];
    Category: {
      name: string;
    };
    User: {
      username: string;
      image: string | null;
      role: string | null;
    };
  } | null>(null);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const result = await fetchcourse(params.courseId);
        setCourseData(result);
      } catch (error) {
        console.log(error);
      }
    };

    getCourse();
  }, [params.courseId]);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col">
        {courseData ? (
          <CourseTitle course={courseData} title={courseData.title} />
        ) : (
          <div className="w-full h-full flex items-center flex-col justify-center gap-y-6">
            <div className="skeleton h-96 w-96"></div>
            <div className="skeleton h-8 w-96"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursePage;
