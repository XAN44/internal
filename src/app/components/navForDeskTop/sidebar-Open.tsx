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
        items-center 
        justify-center
        w-full
        h-full
         ">
        <p className="font-sans text-2xl">Hello!</p>
        <p className="">{userData?.username}</p>
        <Avatar
          radius="full"
          className="
          object-contain 
          mt-6 
          xl:w-28
          xl:h-28
          sm:w-36 
          sm:h-36 
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
      flex flex-col
      items-center 
      justify-center
      xsm:mb-36
      space-y-14
      ">
        {showCalendar && <MobileCalendar />}
        <SignOutButton isOpen={isOpen} />
      </div>
    </>
  );
}

export default SidebarOpen;
