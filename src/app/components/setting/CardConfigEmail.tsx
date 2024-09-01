import { Switch } from "@nextui-org/react";
import React from "react";

function CardConfigEmail() {
  return (
    <div className="w-full h-full">
      <div className="flex w-full items-center justify-center">
        <p className="text-blue-500">EMAIL ALERT PREFERENCES</p>
      </div>
      <div className="flex flex-col w-full h-full items-center justify-center text-gray-500 mt-3">
        <div className="w-full flex xsm:flex-col sm:flex-row items-center justify-between mb-4">
          <p className="w-1/2 line-clamp-1">DEADLINES</p>
          <Switch defaultSelected aria-label="Automatic updates" />
        </div>
        <div className="w-full flex xsm:flex-col sm:flex-row items-center justify-between mb-4">
          <p className="w-1/2 line-clamp-1">COURSE COMPLETION</p>
          <Switch defaultSelected aria-label="Automatic updates" />
        </div>
        <div className="w-full flex xsm:flex-col sm:flex-row items-center justify-between mb-4">
          <p className="w-1/2 line-clamp-1">COURSE UPDATES</p>
          <Switch defaultSelected aria-label="Automatic updates" />
        </div>
        <div className="w-full flex xsm:flex-col sm:flex-row items-center justify-between mb-4">
          <p className="w-1/2 line-clamp-1">NEW COURSES ALERTS</p>
          <Switch defaultSelected aria-label="Automatic updates" />
        </div>
        <div className="w-full flex xsm:flex-col sm:flex-row items-center justify-between mb-4">
          <p className="w-full line-clamp-1">SYSTEM ANNOUNCEMENTS</p>
          <Switch defaultSelected aria-label="Automatic updates" />
        </div>
      </div>
    </div>
  );
}

export default CardConfigEmail;
