"use client";
import React, { useEffect, useMemo, useState } from "react";
import { IoMdArrowDown } from "react-icons/io";
import { MdKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import ModalSelectCourse from "./onClickSelect/modalSelectCourse";
import SearchBar from "./searchCourse/searchBar";
import DeskTopCalendar from "../navFor/DeskTopCalendar";
import ButtonCourse from "./searchCourse/ButtonCourse";
import Courses from "./searchCourse/Courses";
import { FakeCourse } from "../../lib/modal/fakeSelectCourse";
import ContinueLearning from "./searchCourse/ContinueLearning";
import ForYou from "./searchCourse/ForYou";
import { cardCourses } from "../../../../fakeMe";
import { Category } from "@prisma/client";

interface Props {
  category: {
    id: string;
    name: string;
    course: {
      id: string;
      title: string;
      imageURL: string | null;
      descriptions: string | null;
      User: {
        username: string | null;
        image: string | null;
        role: string | null;
      };
    }[];
  }[];
}
function CardCouse({ category }: Props) {
  const [SelectCategory, setSelectCategory] = useState<string>("All_Course_ID");
  const [currentPage, setCurrentPage] = useState(0);
  const [currentProcess, setCurrentProcess] = useState(0);

  const itemPerPage = 4;

  const itemProcess = 1;

  const ShowCategories = [
    { id: "All_Course_ID", label: "All Course" },
    ...category.map((val) => ({ id: val.id, label: val.name })),
  ];

  const handleCategoryChange = (key: string) => {
    setSelectCategory(key);
    setCurrentPage(0);
  };

  const getTwoCorse = cardCourses.slice(0, 2);

  const startIndexForProces = currentProcess * itemProcess;
  const [filterValue, setFilterValue] = useState("");

  const filteredCourses = useMemo(() => {
    let courses =
      SelectCategory === "All_Course_ID"
        ? category.flatMap((cat) => cat.course)
        : category.find((cat) => cat.id === SelectCategory)?.course || [];

    if (filterValue) {
      return courses.filter((course) =>
        course.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return courses;
  }, [SelectCategory, category, filterValue]);

  const ShowProcress = filteredCourses.slice(
    startIndexForProces,
    startIndexForProces + itemProcess
  );
  const startIndex = currentPage * itemPerPage;

  const ShowCourses = filteredCourses.slice(
    startIndex,
    startIndex + itemPerPage
  );

  const handleNextPage2 = () => {
    if (startIndexForProces + itemProcess < filteredCourses.length)
      setCurrentProcess(currentProcess + 1);
  };

  const handlePrevPage2 = () => {
    if (currentProcess > 0) {
      setCurrentProcess(currentProcess - 1);
    }
  };

  const handleNextPage = () => {
    if (startIndex + itemPerPage < filteredCourses.length)
      setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full h-full">
      <div
        className="
        flex 
        xsm:flex-col
        sm:flex-row
        items-center 
        justify-between
        pl-10
        pr-10
        ">
        <div
          className="
        flex 
        xsm:flex-col
        sm:flex-row
        items-center 
        justify-center">
          <h1
            className="
          font-bold   
          text-2xl 
          flex 
          md:block
          sm:hidden
          sm:w-32
          sm:pr-3
          sm:pb-0
          xsm:pb-4
          xsm:pr-0
          xsm:w-full 
          xsm:items-center 
          xsm:justify-center">
            Courses
          </h1>
          <ModalSelectCourse
            onChange={handleCategoryChange}
            value={ShowCategories}
          />
        </div>
        <div
          className="
          xsm:w-[290px] 
          md:w-[600px]
          xsm:mt-6 
          sm:mt-0 
          flex
          items-center justify-center
          sm:pt-3 sm:pb-3
          ">
          <SearchBar
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>
        <div className="xsm:mt-3 sm:mt-0">
          <ButtonCourse
            onBack={handlePrevPage}
            onNext={handleNextPage}
            canGoBack={currentPage > 0}
            canGoNext={(currentPage + 1) * itemPerPage < filteredCourses.length}
          />
        </div>
      </div>
      {/* Main Content */}
      <div
        className="
        xsm:p-0 
        xsm:mt-6 
        w-full 
        flex 
        flex-col
        items-center 
        justify-center
        divide-y
      ">
        <Courses filteredCourses={ShowCourses} />
        <div className="mt-16 w-full border-black sm:hidden xsm:block " />
        <div
          className="
          mt-6
          flex
          items-center
          justify-center
          sm:flex-col
          md:flex-row
          xms:flex-row
          xsm:flex-col 
          flex-row
          gap-5
          h-full

          ">
          <div
            className="
            flex
            xsm:flex-col
            sm:flex-row
            lg:w-full

            ">
            <div
              className="
              w-full  
              flex 
              flex-col">
              <div
                className="
                flex 
                items-center 
                justify-between 
                xsm:flex-col 
                md:flex-row 
                pb-3 pt-3
                ">
                <h1 className="text-2xl font-bold ">Continue Learning</h1>
                <ButtonCourse
                  onBack={handlePrevPage2}
                  onNext={handleNextPage2}
                  canGoBack={currentProcess > 0}
                  canGoNext={
                    (currentProcess + 1) * itemProcess < filteredCourses.length
                  }
                />
              </div>
              {/* <ContinueLearning filteredCourses={ShowProcress} /> */}
            </div>
          </div>
          <div
            className="
              
              xsm:w-[200px]
              xssx:w-64
              sm:w-80
              sm:mt-0
              xl:w-[480px]
              lg:w-[480px]
              md:mt-[85px]
              lg:mt-[70px]
              xms:mt-[95px]
            ">
            <ForYou filteredCourses={getTwoCorse} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardCouse;
