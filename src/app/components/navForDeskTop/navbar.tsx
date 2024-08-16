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
            className="object-contain 
            xsm:w-16 xsm:h-16
            sm:w-24 sm:h-24
            "
          />
        </NavbarContent>
      </Navbar>
    </>
  );
}

export default NavbarProtect;
