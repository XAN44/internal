import React from "react";
import { SideBarModal } from "../../lib/sr/sideBar";
import { FiAlignJustify } from "react-icons/fi";
import DesktopItem from "./item/desktopItem";
import SignOutButton from "../auth/sign-out/signOut";
import { IoSparklesOutline } from "react-icons/io5";
import { Avatar, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import MobileCalendar from "../navForMobile/MobileCalendar";
interface Props {
  isOpen?: boolean;
}

function SidebarOpen({ isOpen }: Props) {
  const route = SideBarModal();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 100 }}
        className="
        flex 
        flex-col text-center
        tems-center 
        justify-center">
        <p className="font-sans text-2xl">Hello!</p>
        <p className="">Username</p>
        <Avatar
          className="
          object-contain 
          mt-6 
          xl:w-28
          xl:h-28
           
          w-36 
          h-36 
          text-2xl
          
          // Mobile Responsive

          xsm:w-20 xsm:h-20

          "
          fallback="Avatar"
          src="/Avatar.png"
          name="User"
        />
      </motion.div>
      <ul
        role="list"
        className="
                overflow-hidden
                 flex-col
                flex-grow
                items-start 
                justify-start
                mt-14
                space-y-6
                w-full
                sm:space-y-6
                md:space-y-8
                lg:space-y-0
                2xl:space-y-3
                md:overflow-y-auto
                // Responsive Mobile
                xsm:hidden
                sm:flex
                ">
        {route.map((item, index) => (
          <div className="w-full ml-[10%]" key={index}>
            <DesktopItem
              key={index}
              icon={item.Icon}
              href={item.href}
              label={item.label}
              active={item.active}
              isOpen={isOpen}
            />
          </div>
        ))}
      </ul>
      <div
        className="
      sm:hidden 
      w-full 
      h-full 
      flex 
      items-center 
      justify-center
      xsm:mb-16
      ">
        <MobileCalendar />
      </div>
      <div
        className="
          flex flex-col mt-auto
          gap-x-3
          p-3
          leading-6
          rounded-md
          hover:text-gray-500
          hover:bg-gray-100
          hover:cursor-pointer
        ">
        <SignOutButton isOpen={isOpen} />
      </div>
    </>
  );
}

export default SidebarOpen;
