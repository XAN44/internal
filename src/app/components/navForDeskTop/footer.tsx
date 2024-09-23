"use client";
import React from "react";
import { Navbar, NavbarContent } from "@nextui-org/react";
import { SideBarModal } from "../../lib/sr/sideBar";
import DesktopItem from "./item/desktopItem";

function Footer() {
  const route = SideBarModal();

  return (
    <div
      className="
       w-full
      
        sm:hidden 
        xsm:flex">
      <ul
        role="list"
        className="
          w-full
          xsm:flex 
          overflow-hidden
          justify-center
          items-center
          mx-auto">
        {route.map((item, index) => (
          <div
            className="w-full mx-auto flex items-center justify-center"
            key={index}>
            <DesktopItem
              key={index}
              icon={item.Icon}
              href={item.href}
              label={item.label}
              active={item.active}
            />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
