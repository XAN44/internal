"use client";
import { Avatar, Button } from "@nextui-org/react";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { ImMail4 } from "react-icons/im";
import { RxAvatar } from "react-icons/rx";

interface Props {
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

function AvatarAndName({ initialState }: Props) {
  const { image, Department, email, role, name, last, username } = initialState;

  return (
    <div
      className="
            w-full 
            h-full
            flex 
            xsm:flex-col
            xl:flex-row
            xl:items-start 
            xl:justify-center 
            xl:text-start
            xsm:items-center
            xsm:justify-center
            xsm:text-center
            gap-4 p-0
            ">
      <div
        className="
            flex 
            flex-col 
            items-center 
            justify-center 
            gap-3
            ">
        <Avatar
          src={image || ""}
          alt="avatar"
          className="
                xsm:w-28 xsm:h-28
                rounded-full
                bg-cardAvatar/70 
                object-cover"
        />
        <Button
          variant="bordered"
          className="w-16 border-cardAvatar"
          endContent={<FiEdit size={60} />}>
          Edit
        </Button>
      </div>
      <div
        className="
            w-full 
            flex 
            flex-col 
            gap-y-3 
            justify-between
            xl:items-start
            xsm:items-center
            ">
        <div className="flex-grow">
          <p className="font-bold text-xl">
            {name} {last}
          </p>
          <p className="text-sm text-blue-600">{role}</p>
          <p className="text-xs">{Department?.departname}</p>
        </div>
        <div
          className="
              flex 
              items-center justify-start
              xsm:w-full
              xssx:w-2/3
              sm:w-1/2
              md:w-full
              h-10
              gap-3 
              pl-2 pr-2 
              text-center 
              text-sm 
              bg-blue-input/60 
              rounded-xl">
          <RxAvatar size={25} className="text-sky-600/60" />
          <p>{username}</p>
        </div>
        <div
          className="
            flex 
              items-center justify-start
              xsm:w-full
              xssx:w-2/3
              sm:w-1/2
              md:w-full
              h-10
              gap-3 
              pl-2 pr-2 
              text-center 
              text-sm 
              bg-blue-input/60 
              rounded-xl">
          <span className="flex items-center gap-3 justify-center ">
            <ImMail4 size={25} className="text-sky-600/60" />
            <p>{email}</p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AvatarAndName;
