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
    userName: string;
    email: string;
    name: string;
    job: string;
    departMent: string;
    avatar: string;
  };
  isLoading: boolean;
}

function UserAvatarAndEdit({ initialState, isLoading }: UserProps) {
  return (
    <>
      {isLoading ? (
        <AvatarSkelton />
      ) : (
        <AvatarAndName initialState={initialState} />
      )}
    </>
  );
}

export default UserAvatarAndEdit;
