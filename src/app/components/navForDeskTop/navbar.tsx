"use client";
import {
  Button,
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import React, { useState } from "react";
import SideBar from "./sidebar";
import { FiAlignJustify, FiMenu } from "react-icons/fi";
import SidebarClose from "./sidebar-Close";
import { IoIosArrowBack } from "react-icons/io";
import SidebarOpen from "./sidebar-Open";

function NavbarProtect() {
  return (
    <>
      <Navbar shouldHideOnScroll isBordered>
        <NavbarContent
          className="sm:hidden xsm:flex"
          justify="start"></NavbarContent>

        <NavbarContent justify="end">
          <Image
            src="/vannessLogo.png"
            alt="LogoVannessPlus"
            width={100}
            height={100}
            className="object-contain"
          />
        </NavbarContent>
      </Navbar>
    </>
  );
}

export default NavbarProtect;
