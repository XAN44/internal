import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { GiEmptyChessboard } from "react-icons/gi";

function BadgeSkelton() {
  return (
    <div className="w-full h-full">
      <div className="animate-pulse skeleton h-28 rounded-full w-28"></div>
      <div className="mt-2 grid xsm:grid-cols-2 gap-6 items-center justify-center text-center">
        <div className="bg-gradient-to-l from-blue-300 via-green-200 to-blue-300 p-[1px] rounded-xl">
          <div className="w-full bg-white rounded-xl overflow-hidden hover:bg-blue-500 hover:cursor-pointer">
            <p className="p-3 truncate text-base xsm:text-xs"></p>
          </div>
        </div>
        ))
      </div>
    </div>
  );
}

export default BadgeSkelton;
