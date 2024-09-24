import React from "react";
import { SideBarModal } from "../../../lib/sr/sideBar";
import { Badge, Link } from "@nextui-org/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { IoIosNotificationsOutline } from "react-icons/io";

interface Props {
  label: string;
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
  isOpen?: boolean;
  notificationCount?: number; // เพิ่ม prop สำหรับจำนวนการแจ้งเตือน
}

function DesktopItem({
  icon: Icon,
  href,
  label,
  active,
  onClick,
  isOpen,
  notificationCount,
}: Props) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li className="list-none" onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `group gap-x-3 p-3 text-sm font-semibold leading-6 sm:text-white xsm:text-blue-900/50 rounded-md hover:text-balance hover:bg-white/50 sm:flex`,
          {
            "xsm:text-blue-800 sm:text-black sm:rounded-l-3xl":
              active && isOpen,
            "xsm:text-blue-900/50 sm:bg-white/50 sm:text-white": active,
          }
        )}>
        <div className="relative flex items-center">
          <Icon className="w-6 h-6 shrink-0" />
          {Icon === IoIosNotificationsOutline && notificationCount ? (
            <span className="absolute top-[-5px] right-[-5px] inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-500 rounded-full">
              {notificationCount}
            </span>
          ) : null}
          {active && (
            <div className="absolute bottom-[-6px] left-[50%] transform -translate-x-1/2 xsm:block sm:hidden">
              <span className="block w-1.5 h-1.5 bg-blue-900/50 rounded-full"></span>
            </div>
          )}
        </div>
        <motion.span
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 100, x: -1 }}
          transition={{ duration: 1, ease: "easeInOut", staggerChildren: 1 }}
          className={clsx(isOpen ? "" : "sr-only")}>
          {label}
        </motion.span>
      </Link>
    </li>
  );
}

export default DesktopItem;
