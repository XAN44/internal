import React from "react";
import { SideBarModal } from "../../../lib/sr/sideBar";
import { Link } from "@nextui-org/react";
import clsx from "clsx";

interface Props {
  label: string;
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

function DesktopItem({ icon: Icon, href, label, active, onClick }: Props) {
  const route = SideBarModal();
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
        flex
        gap-x-3
        p-3
        text-sm
        font-semibold
        leading-6
        text-gray-500

        rounded-md
        hover:text-balance
        hover:bg-gray-100
        `,
          active && "bg-gray-100 text-black"
        )}>
        <Icon className="w-6 h-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}

export default DesktopItem;
