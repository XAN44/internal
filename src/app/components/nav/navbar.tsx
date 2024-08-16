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
import React from "react";
import SideBar from "./sidebar";

function NavbarProtect() {
  return (
    <>
      <Navbar shouldHideOnScroll isBordered>
        <NavbarContent className="sm:hidden xsm:flex" justify="start">
          ForClick
        </NavbarContent>
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
