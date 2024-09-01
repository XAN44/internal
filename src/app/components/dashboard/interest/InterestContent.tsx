import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import IsOpenCard from "./IsOpenCard";
import IsShowAllInterest from "./IsShowAllInterest";
interface UserProps {
  interest: {
    useInterest: string[];
  };
  onClick: (item: string) => void;
}
function InterestContent({ interest, onClick }: UserProps) {
  const [showAll, setShowAll] = useState(false);

  const handleShow = () => {
    setShowAll(!showAll);
  };

  const i = interest.useInterest.map((i) => i);
  const slice = i.slice(0, 6);
  const showInterest = i.map;

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center">
        <p
          className="
        font-bold 
        sm:text-xl 
        xsm:text-sm
        text-cardAvatar
        ">
          INTEREST
        </p>
        <Button onClick={handleShow} variant="light">
          {showAll ? "Show Less" : "Show More"}
        </Button>
      </div>
      <div
        className="
            mt-2
            grid 
            xsm:grid-cols-2
            gap-6
            items-center justify-center text-center
          ">
        {slice.map((item) => (
          <div
            onClick={() => onClick(item)}
            key={item}
            className="      
                bg-gradient-to-l
              from-blue-300
              via-green-200
              to-blue-300
                p-[1px]
                rounded-xl
              ">
            <div
              className="w-full 
                bg-white 
                rounded-xl 
                overflow-hidden
                hover:bg-blue-500
                hover:cursor-pointer
                ">
              <p
                className="
                  p-3 truncate 
                  text-base 
                  xsm:text-xs">
                {item}
              </p>
            </div>
          </div>
        ))}
      </div>
      <IsShowAllInterest isOpen={showAll} item={interest} onOpen={handleShow} />
    </div>
  );
}

export default InterestContent;
