import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { GiEmptyChessboard } from "react-icons/gi";

interface Badge {
  name: string;
  level: number;
}

interface BadgeMainProps {
  badges: Badge[];
}

function BadgeContent({ badges }: BadgeMainProps) {
  const [showAll, setShowAll] = useState(false);

  const handleShow = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center">
        <p className="font-bold sm:text-xl xsm:text-sm text-cardAvatar">
          Badge
        </p>
        <Button onClick={handleShow} variant="light">
          {showAll ? "Show Less" : "Show More"}
        </Button>
      </div>
      <div className="mt-2 grid xsm:grid-cols-2 gap-6 items-center justify-center text-center">
        {badges.length > 0 ? (
          badges.map((badge, index) => (
            <div
              key={index}
              className="bg-gradient-to-l from-blue-300 via-green-200 to-blue-300 p-[1px] rounded-xl">
              <div className="w-full bg-white rounded-xl overflow-hidden hover:bg-blue-500 hover:cursor-pointer">
                <p className="p-3 truncate text-base xsm:text-xs">
                  {badge.name}
                  {badge.level}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="relative w-full h-full col-span-2 items-center justify-center place-items-center place-content-center">
            <p className="text-center animate-pulse text-gray-500">
              No badges available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BadgeContent;
