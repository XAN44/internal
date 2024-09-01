import React from "react";

function SkeltonForMobile() {
  return (
    <div className="h-full w-full  ">
      <div className="flex-col flex items-center justify-center gap-3">
        <div className="w-1/2 animate-pulse skeleton h-10 rounded-xl  "></div>
        <div className="w-full animate-pulse skeleton h-10 rounded-xl  "></div>
        <div className="w-full animate-pulse skeleton h-10 rounded-xl  "></div>
      </div>
    </div>
  );
}

export default SkeltonForMobile;
