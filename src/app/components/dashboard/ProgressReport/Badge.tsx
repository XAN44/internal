import React from "react";

interface Props {
  badgeNew?: number;
  badgeFar?: number;
}

function Badge({ badgeNew, badgeFar }: Props) {
  return (
    <div className="w-full h-full flex flex-col gap-6 items-center justify-center">
      <div className="relative w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
        <div className="text-white text-lg font-bold">
          <p>{badgeNew}</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center font-semibold text-gray-600">
        NEW BADGE ACHIEVEMENT THIS YEAR!
      </div>

      <div className="relative w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
        <div className="text-white text-lg font-bold">
          <p>{badgeFar}</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center font-semibold text-gray-600">
        BADGES YOU’VE ACHIEVED SO FAR THIS YEAR!
      </div>
    </div>
  );
}

export default Badge;
