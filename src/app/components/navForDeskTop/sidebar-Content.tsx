"use client";
import React, { useRef, useState } from "react";
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
        fixed 
        xsm:hidden  
        sm:block
        z-50 
       bg-gradient-to-br 
    from-blue-500 
    to-blue-700
        h-screen
       
         `,
        isOpen
          ? " rounded-tr-[90px] rounded-br-[90px] "
          : " rounded-tr-[90px] rounded-br-[90px]  "
      )}
      initial={{ width: "6rem" }}
      animate={{ width: isOpen ? "14rem" : "6rem" }}
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
            translate-x-3">
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
            <FiAlignJustify
              className="
              w-12 h-12 
              absolute
              top-6
              cursor-pointer"
              onClick={toggleOpen}
            />
            <SidebarCLose />
          </>
        )}
      </div>
    </motion.div>
  );
}

export default SidebarContent;
