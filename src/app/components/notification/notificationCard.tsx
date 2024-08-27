import { Image } from "@nextui-org/react";
import React from "react";

function Notifications() {
  return (
    <div className="w-full h-full p-6 font-bold text-lg">
      <div>Notification Center</div>
      <div
        className="
        flex
        mt-4
        group        
        ">
        <div
          className="
          group-hover:bg-blue-300 
          rounded-lg
          flex 
          items-center
          justify-between
          w-full
          p-3
        text-gray-400 
        group-hover:text-black
          ">
          <div className="flex gap-3">
            <div className="w-20 h-20">
              <Image removeWrapper src="/bubld.jpg" alt="Notification Image" />
            </div>
            <div
              className="
            flex 
            flex-col 
            ">
              <p className=" ">English grammar</p>
              <p className="text-sm">
                New Lessons Available! Check Out Now. · Conversation · English
                for Business
              </p>
            </div>
          </div>
          <p className="text-sm ">12:00 </p>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
