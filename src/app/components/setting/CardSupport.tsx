import React from "react";
import CardDashBoard from "../dashboard/CardDashBoard";

function CardSupport() {
  return (
    <div
      className="
        xsm:w-full
        bg-gradient-to-l
        from-blue-300
        via-green-200
        to-blue-300
        rounded-2xl
        p-[1px]
        flex
        items-center justify-center
        relative
    ">
      <div
        className="
        flex
        items-center justify-center
        border-1 p-3 
        rounded-2xl
        w-full h-full
        bg-gradient-to-r
        from-slate-300/40
        via-blue-500/45
        to-blue-500/50
        gap-3
        ">
        <div
          className="  
            w-full 
            h-full
            flex 
            xsm:flex-col
            sm:flex-row
            sm:items-start 
            sm:justify-center 
            sm:text-start
            xsm:items-center
            xsm:justify-center
            xsm:text-center
            text-blue-500
           ">
          <div className="w-full flex flex-col">
            <p className="font-bold text-blue-500 w-full text-center">
              SUPPORT AND HELP
            </p>
            <div className="flex flex-col items-start justify-center">
              <p className="text-blue-500 text-sm mt-3">HEPL GUID</p>
              <p className="pl-6 text-sm">FAQ {">"} </p>
              <p className="pl-6 text-sm">USER GUID {">"}</p>
              <p className="text-blue-500 text-sm mt-3">HEPL GUID</p>
              <p className="pl-6 text-sm">CONTACT SUPPORT</p>
              <p className="pl-6 text-sm">support@test</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSupport;
