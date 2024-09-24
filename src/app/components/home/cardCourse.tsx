"use client";
import React, { useEffect, useMemo, useState } from "react";
import { IoMdArrowDown } from "react-icons/io";
import { MdKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import ModalSelectCourse from "./onClickSelect/modalSelectCourse";
import SearchBar from "./searchCourse/searchBar";
import ButtonCourse from "./searchCourse/ButtonCourse";
import Courses from "./searchCourse/Courses";
import { FakeCourse } from "../../lib/modal/fakeSelectCourse";
import ContinueLearning from "./searchCourse/ContinueLearning";
import ForYou from "./searchCourse/ForYou";
import { Category } from "@prisma/client";

interface Props {
  currentId: string;
  category: {
    id: string;
    name: string;
    course: {
      id: string;
      title: string;
      imageURL: string | null;
      descriptions: string | null;
      isPublished: boolean;

      Enrollment: {
        id: string;
        userId: string;
        courseId: string;
        enrolledAt: Date;
        isEnrollment: boolean;
      }[];
      User: {
        username: string | null;
        image: string | null;
        role: string | null;
      };
    }[];
  }[];
  userInterests: {
    id: string;
    name: string;
  }[];
  filterCourseContinue: {
    id: string;
    category: string;
    role: string;
    title: string;
    thumnel: string;
    description: string;
    avatar: string;
    name: string;
    enrollment:
      | {
          id: string;
          userId: string;
          courseId: string;
          enrolledAt: Date;
          dueDate: Date | null;
          isEnrollment: boolean;
        }
      | undefined;
    progress: number;
  }[];
  filteredCoursesForUser: {
    id: string;
    title: string;
    imageURL: string | null;
    descriptions: string | null;
    Enrollment: {
      id: string;
      userId: string;
      courseId: string;
      enrolledAt: Date;
      isEnrollment: boolean;
    }[];
    User: {
      username: string | null;
      image: string | null;
      role: string | null;
    };
  }[];
}
function CardCouse({
  category,
  currentId,
  filteredCoursesForUser,
  userInterests,
  filterCourseContinue,
}: Props) {
  const [SelectCategory, setSelectCategory] = useState<string>("All_Course_ID");
  const [currentPage, setCurrentPage] = useState(0);
  const [currentProcess, setCurrentProcess] = useState(0);
  const [currentForyou, setCurrentForyou] = useState(0);

  const itemPerPage = 4;

  const itemProcess = 1;

  const itemPerYou = 2;

  const ShowCategories = [
    { id: "All_Course_ID", label: "All Course" },
    ...category.map((val) => ({ id: val.id, label: val.name })),
  ];

  const handleCategoryChange = (key: string) => {
    setSelectCategory(key);
    setCurrentPage(0);
  };

  const startIndexForProces = currentProcess * itemProcess;
  const startIndexForYou = currentForyou * itemPerYou;
  const startIndex = currentPage * itemPerPage;

  const [filterValue, setFilterValue] = useState("");

  const filteredCourses = useMemo(() => {
    let course =
      SelectCategory === "All_Course_ID"
        ? category.flatMap((course) => course.course)
        : category.find((course) => course.id === SelectCategory)?.course || [];

    if (filterValue) {
      return course.filter((course) =>
        course.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return course;
  }, [SelectCategory, category, filterValue]);

  const filterCousreForU = useMemo(() => {
    return category.flatMap((cat) => {
      if (userInterests.some((interest) => interest.id === cat.id)) {
        return cat.course
          .filter((course) => course.isPublished)
          .map((course) => {
            const enrollment = course.Enrollment.find(
              (e) => e.userId === currentId
            );
            return {
              id: course.id,
              category: cat.name,
              title: course.title,
              name: course.User?.username || "Unknown",
              role: course.User?.role || "Unknown",
              thumnel: course.imageURL || "default-image.png",
              avatar: course.User?.image || "default-avatar.png",
              description: course.descriptions || "No description available",
            };
          });
      }
      return [];
    });
  }, [category, userInterests, currentId]);

  const ShowCourses = filteredCourses.slice(
    startIndex,
    startIndex + itemPerPage
  );
  const ShowForYouCourses = filterCousreForU.slice(
    startIndexForYou,
    startIndexForYou + itemPerYou
  );

  const ShowProcressCourses = filterCourseContinue.slice(
    startIndexForProces,
    startIndexForProces + itemProcess
  );

  const handleNextPageYou = () => {
    if (startIndexForYou + itemPerYou < filterCousreForU.length)
      setCurrentForyou(currentForyou + 1);
  };

  const handlePrevPageeYou = () => {
    if (currentForyou > 0) {
      setCurrentForyou(currentForyou - 1);
    }
  };

  const handleNextPage2 = () => {
    if (startIndexForProces + itemProcess < filterCourseContinue.length)
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
  const overallProgressPercentage = ShowProcressCourses.length
    ? ShowProcressCourses.reduce(
        (acc, course) => acc + (course.progress ?? 0),
        0
      ) / ShowProcressCourses.length
    : 0;

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
            <div className="w-full flex flex-col">
              {ShowProcressCourses.length > 0 && (
                <>
                  <div
                    className="
            flex 
            items-center 
            justify-between 
            xsm:flex-col 
            md:flex-row 
            pb-3 pt-3
          ">
                    <h1 className="text-2xl font-bold">Continue Learning</h1>
                    <ButtonCourse
                      onBack={handlePrevPage2}
                      onNext={handleNextPage2}
                      canGoBack={currentProcess > 0}
                      canGoNext={
                        (currentProcess + 1) * itemProcess <
                        filterCourseContinue.length
                      }
                    />
                  </div>
                  <ContinueLearning
                    filteredCourses={ShowProcressCourses}
                    overallProgressPercentage={overallProgressPercentage}
                  />
                </>
              )}
            </div>
          </div>

          <div>
            {ShowForYouCourses.length > 0 && (
              <>
                <div
                  className="
          flex 
          items-center 
          justify-between 
          xsm:flex-col 
          md:flex-row 
          pb-3 pt-3
        ">
                  <ButtonCourse
                    onBack={handlePrevPageeYou}
                    onNext={handleNextPageYou}
                    canGoBack={currentForyou > 0}
                    canGoNext={
                      (currentForyou + 1) * itemPerYou < filterCousreForU.length
                    }
                  />
                </div>
                <ForYou filteredCourses={ShowForYouCourses} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardCouse;
