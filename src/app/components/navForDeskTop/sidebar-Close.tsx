import React from "react";
import { SideBarModal } from "../../lib/sr/sideBar";
import DesktopItem from "./item/desktopItem";
import SignOutButton from "../auth/sign-out/signOut";
import { FiAlignJustify } from "react-icons/fi";

interface Data {
  notificationCount: number;
  toggleOpen: () => void;
}

function SidebarClose({ notificationCount, toggleOpen }: Data) {
  const route = SideBarModal();

  return (
    <div className="h-full flex flex-col">
      <div className="flex-none p-4">
        <FiAlignJustify
          className="w-10 h-10 cursor-pointer"
          onClick={toggleOpen}
        />
      </div>

      <ul
        role="list"
        className="flex-grow overflow-y-auto flex flex-col space-y-4 px-4">
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

        <div className="flex-none p-4">
          <SignOutButton />
        </div>
      </ul>
    </div>
  );
}

export default SidebarClose;
