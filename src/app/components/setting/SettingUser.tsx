import { Avatar, Image } from "@nextui-org/react";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { FiMail } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";

function SettingUser() {
  return (
    <div className="w-full h-full grid grid-cols-1 place-items-center gap-5 items-center justify-center ">
      <p className="text-blue-500 font-bold">ACCOUNT SETTING</p>
      <Avatar
        src="https://images.unsplash.com/photo-1720048171419-b515a96a73b8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="w-24 h-24 bg-blue-500 rounded-full object-cover"
      />
      <p className="font-bold">Employee Name</p>
      <div className="full flex flex-col gap-3 p-8">
        <div className="relative p-2 border-2 rounded-xl border-blue-500/50 flex  items-center justify-between">
          <p className="text-sm text-blue-500/60 w-full text-center">
            FULL STACK WEB Developer
          </p>
          <CiEdit className="text-blue-600 right-3  static" size={25} />
        </div>
        <div className="relative p-2 border-2 rounded-xl border-blue-500/50 flex  items-center justify-between">
          <p className="text-sm text-blue-500/60 w-full text-center">
            Department
          </p>
          <CiEdit className="text-blue-600 right-3  static" size={25} />
        </div>
        <div
          className="relative p-2 bg-gradient-to-r from-green-400/40 via-blue-400/50 to-blue-500/40 top-0 rounded-xl   
        flex  items-center justify-between">
          <RxAvatar className="text-blue-600 right-3  static" size={25} />
          <p className="text-sm text-blue-500/60 w-full text-center">
            USERNAME
          </p>
        </div>
        <div className="relative p-2 bg-gradient-to-r from-green-400/40 via-blue-400/50 to-blue-500/40 top-0 rounded-xl flex  items-center justify-between">
          <FiMail className="text-blue-600 right-3  static" size={25} />
          <p className="text-sm text-blue-500/60 w-full text-center">E-MAIL</p>
        </div>
      </div>
    </div>
  );
}

export default SettingUser;
