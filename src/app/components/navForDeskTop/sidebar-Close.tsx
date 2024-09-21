import React, { useEffect, useState } from "react";
import { SideBarModal } from "../../lib/sr/sideBar";
import DesktopItem from "./item/desktopItem";
import SignOutButton from "../auth/sign-out/signOut";
import axios from "axios";
interface Data {
  notificationCount: number;
}

function SidebarClose({ notificationCount }: Data) {
  const route = SideBarModal();

  return (
    <>
      <ul
        role="list"
        className="flex-col flex-grow items-start justify-center sm:space-y-6 md:space-y-8 2xl:space-y-3 xsm:hidden sm:flex">
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
