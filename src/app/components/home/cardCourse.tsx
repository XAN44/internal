"use client";
import React, { useEffect, useState } from "react";
import { IoMdArrowDown } from "react-icons/io";
import { MdKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import ModalSelectCourse from "./onClickSelect/modalSelectCourse";
import SearchBar from "./searchCourse/searchBar";
import DeskTopCalendar from "../navFor/DeskTopCalendar";

function CardCouse() {
  const [showCalendar, setShowCalendar] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCalendar(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className="
            flex 
            xsm:items-start 
            xsm:justify-between 
            xsm:flex-col
            sm:flex-row
            ">
      <div
        className="
            flex 
            w-full
            sm:flex-row
            xsm:flex-col
            items-center 
            justify-center">
        <h1
          className="
            font-bold 
            xsm:text-medium 
            sm:text-2xl">
          Courses
        </h1>
        <ModalSelectCourse />
      </div>
      <div
        className=" 
          xsm:mt-6
          sm:mt-0
          flex
          justify-center items-center
          w-full
          ">
        <SearchBar />
      </div>
      <div
        className=" 
        sm:block 
        bottom-0
        w-full
        mb-32
        xsm:hidden 
            ">
        <DeskTopCalendar />
      </div>
    </div>
  );
}

export default CardCouse;
