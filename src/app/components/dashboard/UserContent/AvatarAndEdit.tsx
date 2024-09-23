"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@nextui-org/react";
import { FiEdit } from "react-icons/fi";
import { ImMail4 } from "react-icons/im";
import { RxAvatar } from "react-icons/rx";
import AvatarSkelton from "./AvatarSkelton";
import AvatarAndName from "./AvatarAndName";

interface UserProps {
  initialState: {
    id: string;
    username: string | null;
    name: string | null;
    last: string | null;
    role: string | null;
    email: string | null;
    image: string | null;
    Department: {
      departname: string;
    } | null;
  };
}

function UserAvatarAndEdit({ initialState }: UserProps) {
  return (
    <>
      <AvatarAndName initialState={initialState} />
    </>
  );
}

export default UserAvatarAndEdit;
