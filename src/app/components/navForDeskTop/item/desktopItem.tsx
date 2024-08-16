import React from "react";
import { SideBarModal } from "../../../lib/sr/sideBar";
import { Link } from "@nextui-org/react";
import clsx from "clsx";
import { motion } from "framer-motion";
interface Props {
  label: string;
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
  isOpen?: boolean;
}

function DesktopItem({
  icon: Icon,
  href,
  label,
  active,
  onClick,
  isOpen,
}: Props) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={onClick}>
      <Link
        href={href}
        className={clsx(
          `
        group
     
        gap-x-3
        p-3
       
        text-sm
        font-semibold
        leading-6
        text-white
        flex
        rounded-md
        hover:text-balance
        hover:bg-white/50
        
        `,
          {
            "  text-black rounded-l-3xl ": active && isOpen,
          },
          {
            "bg-white/50 text-white ": active,
          }
        )}>
        <Icon
          className="
        md:w-5 
        md:h-5
        
        md:m-3

        xl:w-5
        xl:h-5

        xl:m-2


        w-6 
        h-6 
        
        shrink-0"
        />
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
