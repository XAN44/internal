import React, { useEffect, useState } from "react";
import { SideBarModal } from "../../lib/sr/sideBar";
import DesktopItem from "./item/desktopItem";
import SignOutButton from "../auth/sign-out/signOut";
import axios from "axios";
import { FiAlignJustify } from "react-icons/fi";
interface Data {
  notificationCount: number;
  toggleOpen: () => void;
}

function SidebarClose({ notificationCount, toggleOpen }: Data) {
  const route = SideBarModal();

  return (
    <>
      <ul
        role="list"
        className="flex-col flex-grow items-start justify-center sm:space-y-6 md:space-y-8 2xl:space-y-3 xsm:hidden sm:flex">
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
        {route.map((item, index) => (
          <DesktopItem
            key={index}
            icon={item.Icon}
            href={item.href}
            label={item.label}
            active={item.active}
            notificationCount={notificationCount}
          />
        ))}
      </ul>

      <div className="flex flex-col mt-auto xsm:hidden leading-6 rounded-md hover:text-gray-500 hover:bg-gray-100 hover:cursor-pointer">
        <SignOutButton />
      </div>
    </>
  );
}

export default SidebarClose;
