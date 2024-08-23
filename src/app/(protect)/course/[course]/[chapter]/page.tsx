import React from "react";
import CourseTitle from "../../../../components/course/CourseTitle";
import ChapterTitle from "../../../../components/chapter/Chapter";

function Chapter({ params }: { params: { chapter: string } }) {
  // ฟังก์ชันแปลง slug กลับเป็นชื่อคอร์ส
  function formatTitle(slug: string): string {
    return slug
      .replace(/-/g, " ") // แทนที่ขีดกลางด้วยเว้นวรรค
      .replace(/\b\w/g, (char) => char.toUpperCase()); // แปลงตัวอักษรตัวแรกของแต่ละคำเป็นพิมพ์ใหญ่
  }

  const courseTitle = formatTitle(params.chapter);

  return (
    <div className="w-full h-full  ">
      <div className="flex flex-col">
        <ChapterTitle title={courseTitle} />
      </div>
    </div>
  );
}

export default Chapter;
