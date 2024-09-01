import React from "react";

function AvatarSkelton() {
  return (
    <div className="h-full w-full  ">
      <div
        className="flex 
      sm:flex-row xsm:flex-col gap-3 
      sm:justify-start sm:items-start
      xsm:justify-center xsm:items-center 
      ">
        <div className="flex-col flex items-center justify-center gap-3">
          <div className="animate-pulse skeleton h-28 rounded-full w-28"></div>
          <div className="animate-pulse skeleton h-10 rounded-xl w-16"></div>
        </div>
        <div className="flex-col flex items-start justify-center gap-3">
          <div className="animate-pulse skeleton h-10 rounded-xl w-48"></div>
          <div className="animate-pulse skeleton h-10 rounded-xl w-44"></div>
          <div className="animate-pulse skeleton h-10 rounded-xl w-40"></div>
        </div>
      </div>
    </div>
  );
}

export default AvatarSkelton;
