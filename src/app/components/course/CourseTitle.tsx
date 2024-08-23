import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import SearchBar from "../home/searchCourse/searchBar";
import CourseButton from "./CourseButton";
import { Link } from "@nextui-org/react";
import { cardCourses } from "../../../../fakeMe";
import CourseMain from "./Course";
import SelectChapter from "./SelectChapter";

type Props = {
  title: string;
};

function CourseTitle({ title }: Props) {
  const data = cardCourses.filter((val) => val.title === title);

  return (
    <div className="w-full h-full antialiased mx-auto">
      <div className="flex flex-col items-center justify-center p-6">
        <div
          className="
            flex 
            xsm:flex-col
            md:flex-row
            md:justify-between 
            items-center 
            text-center
            gap-3 
            w-full 
          ">
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/home"
              className="p-1 bg-blue-600 rounded-full   text-white">
              <FaArrowLeft />
            </Link>
            <p className="font-bold  sm:text-xl xsm:text-medium">{title}</p>
          </div>
          <div
            className="
                flex 
                sm:flex-row 
                xsm:flex-col 
                justify-center 
                items-center
                gap-6
                ">
            <div
              className="
                xsm:w-[300px] 
                sm:w-[300px] 
                md:w-[200px] 
                lg:w-[290px]
                xl:w-[400px]
                ">
              <SearchBar />
            </div>
          </div>
        </div>
        <div className="mt-6 flex  h-full items-center justify-center ">
          <div className="w-full bg-white p-1 rounded-lg">
            <CourseMain filteredCourses={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseTitle;
