"use client";
import { Image, Navbar, NavbarContent } from "@nextui-org/react";

function NavbarProtect() {
  return (
    <Navbar shouldHideOnScroll isBordered>
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
  );
}

export default NavbarProtect;
