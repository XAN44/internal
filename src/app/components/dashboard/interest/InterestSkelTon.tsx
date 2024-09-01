import React from "react";

function InterestSkelTon() {
  return (
    <div
      className="w-full h-full
           ">
      <p
        className="
            font-bold 
            sm:text-xl 
            xsm:text-sm
            skeleton
            w-24 h-10
            animate-pulse
            "></p>
      <div
        className="
            mt-2
            grid 
            xsm:grid-cols-2
            gap-6
            items-center justify-center text-center
            
          ">
        <div
          className="skeleton w-full h-11
            animate-pulse
            "></div>
        <div
          className="skeleton w-full h-11
            animate-pulse
            "></div>
        <div
          className="skeleton w-full h-11
            animate-pulse
            "></div>
        <div
          className="skeleton w-full h-11
            animate-pulse
            "></div>
        <div
          className="skeleton w-full h-11
            animate-pulse
            "></div>
        <div
          className="skeleton w-full h-11
            animate-pulse
            "></div>
      </div>
    </div>
  );
}

export default InterestSkelTon;
