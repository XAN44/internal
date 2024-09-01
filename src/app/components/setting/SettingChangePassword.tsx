import React from "react";
import CardDashBoard from "../dashboard/CardDashBoard";
import { Input } from "@nextui-org/input";
import { SlLock } from "react-icons/sl";

function SettingChangePassword() {
  return (
    <CardDashBoard>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-blue-500 font-bold">CHANGE PASSWORD</p>
        <div className="w-full gap-3 text-start flex flex-col items-start justify-start p-6">
          <p className="text-blue-500/50">Current Password</p>
          <Input
            className="w-full"
            startContent={<SlLock size={25} className="text-blue-500/50" />}
            color="primary"
            radius="full"
            size="sm"
            classNames={{
              inputWrapper: "bg-blue-input/60 ring-2 ",
            }}
          />
          <p className="text-blue-500/50">New Password</p>
          <Input
            className="w-full"
            startContent={<SlLock size={25} className="text-blue-500/50" />}
            color="primary"
            radius="full"
            size="sm"
            classNames={{
              inputWrapper: "bg-blue-input/60 ring-2 ",
            }}
          />
          <p className="text-blue-500/50">Confirm New Password</p>
          <Input
            className="w-full"
            startContent={<SlLock size={25} className="text-blue-500/50" />}
            color="primary"
            radius="full"
            size="sm"
            classNames={{
              inputWrapper: "bg-blue-input/60 ring-2 ",
            }}
          />
        </div>
      </div>
    </CardDashBoard>
  );
}

export default SettingChangePassword;
