import React from "react";

interface Props {
  children: React.ReactNode;
}

function CardDashBoard({ children }: Props) {
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
        bg-white
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
           ">
          {children}
        </div>
      </div>
    </div>
  );
}

export default CardDashBoard;
