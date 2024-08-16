import React from "react";
import { Navbar, NavbarContent } from "@nextui-org/react";

function Footer() {
  return (
    <Navbar
      classNames={{
        base: "ring-[0.5px] ring-black",
      }}>
      <NavbarContent
        justify="start"
        className="
        sm:hidden 
            xsm:flex">
        ForClick
      </NavbarContent>
      <NavbarContent justify="end"></NavbarContent>
    </Navbar>
  );
}

export default Footer;
