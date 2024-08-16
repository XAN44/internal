import React from "react";
import { SideBarModal } from "../../lib/sr/sideBar";
import { FiAlignJustify } from "react-icons/fi";
import DesktopItem from "./item/desktopItem";
import SignOutButton from "../auth/sign-out/signOut";

function SidebarClose() {
  const route = SideBarModal();

  return (
    <>
      <ul
        role="list"
        className="
         
                flex
                flex-col
                flex-grow
                items-start 
                justify-center
               
                sm:space-y-6
                md:space-y-8
                lg:space-y-0
                2xl:space-y-3

                ">
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
          flex flex-col mt-auto
    
          leading-6
          rounded-md
          hover:text-gray-500
          hover:bg-gray-100
          hover:cursor-pointer
        ">
        <SignOutButton />
      </div>
    </>
  );
}

export default SidebarClose;
