"use client";
import React, { Children, useRef, useState } from "react";
import { FiAlignJustify } from "react-icons/fi";

import { motion } from "framer-motion";
import clsx from "clsx";
import SidebarCLose from "./sidebar-Close";
import SidebarOpen from "./sidebar-Open";
import { IoIosArrowBack } from "react-icons/io";

function SidebarContent() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      className={clsx(
        `
        xsm:fixed
        sm:block
        z-50 
        sm:h-screen
        rounded-tr-[90px]
        rounded-br-[90px]
        transition-all duration-300
        ${!isOpen ? "overflow-hidden h-16 hover:cursor-pointer" : "h-screen"}
        `,
        isOpen
          ? "bg-gradient-to-br from-blue-500 to-blue-700"
          : "xsm:bg-transparent sm:bg-gradient-to-br from-blue-500 to-blue-700"
      )}
      initial={{ width: "6rem" }}
      animate={{ width: isOpen ? "17rem" : "6rem" }}
      transition={{ duration: 0.6 }}>
      <div
        className="
        h-full 
        flex
        flex-col
        items-center
        justify-between
        text-white
        pt-10
        pb-10
    ">
        {isOpen && (
          <>
            <div
              className="
            absolute 
            top-0 
            right-0 
            transform 
            md:translate-y-16
            
            // Mobile Responsive
            xsm:translate-y-16
            translate-x-3
             ">
              <IoIosArrowBack
                className="
                w-6 
                h-6 
                cursor-pointer 
                rounded-full 
                border-2 
                bg-white
                border-sky-300 
                text-blue-800  "
                onClick={toggleOpen}
              />
            </div>
            <SidebarOpen isOpen={isOpen} />
          </>
        )}
        {!isOpen && (
          <>
            <div
              className="
              xsm:border-2
              xsm:border-blue-500
              xsm:rounded-full
              xsm:w-6 xsm:h-6
              xsm:p-4
              xsm:absolute xsm:top-4
              xsm:flex xsm:items-center xsm:justify-center
              sm:border-none
            ">
              <FiAlignJustify
                className="
              w-12 h-12 
              
              absolute
              sm:w-9 sm:h-9
              sm:top-6
              cursor-pointer
              sm:text-white
              
              // Responsive Mobile
              xsm:text-blue-500
              xsm:w-6 xsm:h-6
           
   
              "
                onClick={toggleOpen}
              />
            </div>
            <SidebarCLose />
          </>
        )}
      </div>
    </motion.div>
  );
}

export default SidebarContent;
