import React, { useEffect, useState } from "react";
import { SideBarModal } from "../../lib/sr/sideBar";
import { FiAlignJustify } from "react-icons/fi";
import DesktopItem from "./item/desktopItem";
import SignOutButton from "../auth/sign-out/signOut";
import { IoSparklesOutline } from "react-icons/io5";
import { Avatar, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import MobileCalendar from "../navFor/MobileCalendar";
interface Props {
  isOpen?: boolean;
  userData: {
    username: string | null;
    image: string | null;
  } | null;
}

function SidebarOpen({ isOpen, userData }: Props) {
  const route = SideBarModal();
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCalendar(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 100 }}
        className="
        xsm:top-0
        xsm:-space-y-0
        sm:space-y-0
        sm:top-0
        flex 
        flex-col text-center
        tems-center 
        justify-center
         ">
        <p className="font-sans text-2xl">Hello!</p>
        <p className="">{userData?.username}</p>
        <Avatar
          radius="full"
          className="
          object-contain 
     
          text-2xl
          
          // Mobile Responsive

          xsm:w-20 xsm:h-20

          "
          fallback="Avatar"
          src={userData?.image || "/Avatar.png"}
          name="User"
        />
      </motion.div>

      <div
        className="
      w-full 
      h-full 
      flex 
      items-center 
      justify-center
      xsm:mb-36
      ">
        {showCalendar && <MobileCalendar />}
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
