"use client";
import React, { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { SideBarModal } from "../../lib/sr/sideBar";
import DesktopItem from "./item/desktopItem";
import { RiLogoutBoxRLine } from "react-icons/ri";
import SignOutButton from "../auth/sign-out/signOut";
import SidebarContent from "./sidebar-Content";

function SideBar() {
  return <SidebarContent />;
}

export default SideBar;
