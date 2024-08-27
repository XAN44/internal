"use client";
import React, { useEffect, useState } from "react";
import UserAvatarAndEdit from "./UserContent/AvatarAndEdit";
import UserBasicInfo from "./UserContent/UserBasicInfo";
import { elysia } from "../../../../elysia/client";

interface Porps {
  name: string;
  job: string;
  departMent: string;
  avatar: string;
  isLoading?: boolean;
}

function Userinfo({ isLoading, avatar, departMent, job, name }: Porps) {
  return (
    <div
      className="
        flex 
        items-center 
        justify-center
        bg-gradient-to-l
        from-blue-300
        via-green-200
        to-blue-300
        rounded-2xl
        p-[1px]
    ">
      <div
        className="
        flex
        border-1 p-3 
        rounded-2xl
        w-full
        bg-white
        ">
        <div className=" flex flex-col w-1/2 items-center justify-center gap-3">
          <UserAvatarAndEdit avatar={avatar} isLoading={isLoading} />
        </div>
        <UserBasicInfo
          departMent={departMent}
          job={job}
          name={name}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default Userinfo;
