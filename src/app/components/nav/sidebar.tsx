"use client";
import React from "react";
import { FiAlignJustify } from "react-icons/fi";
import { SideBarModal } from "../../lib/sr/sideBar";
import DesktopItem from "./item/desktopItem";
import { RiLogoutBoxRLine } from "react-icons/ri";
import SignOutButton from "../auth/sign-out/signOut";
import OpenDeskTopItem from "./item/openDeskTopItem";

function SideBar() {
  const route = SideBarModal();
  return (
    <div
      className="
        w-24 
        fixed 
        xsm:hidden
        sm:block
        z-50 
        bg-black 
        h-screen
        rounded-tr-full
        rounded-br-full    
        overflow-hidden
        ">
      <div
        className="
      text-white 
        items-center 
        justify-center
        flex flex-col
        h-full w-full
    
        ">
        <div className="pt-10 pb-10">
          <OpenDeskTopItem />
        </div>
        <ul
          role="list"
          className="flex flex-col items-start space-y-11 justify-center h-full">
          {route.map((item, index) => (
            <DesktopItem
              key={index}
              icon={item.Icon}
              href={item.href}
              label={item.label}
              active={item.active}
            />
          ))}
        </ul>

        <div
          className="
          mt-10
          mb-10
            gap-x-3
            p-3
            leading-6
            rounded-md
            hover:text-gray-500
            hover:bg-gray-100
            hover:cursor-pointer
        ">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
