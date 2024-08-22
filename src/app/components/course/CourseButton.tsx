import { Button } from "@nextui-org/button";
import clsx from "clsx";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PropButton {
  //   onNext: () => void;
  //   onBack: () => void;
  canGoNext?: boolean;
  canGoBack?: boolean;
}
function CourseButton({ canGoBack, canGoNext }: PropButton) {
  return (
    <div
      className="
         flex 
        items-center 
        justify-center
        space-x-6">
      <Button className="bg-blue-800/50 p-3 rounded-lg">
        <IoIosArrowBack
          className={clsx(canGoBack ? "text-blue-700" : "text-white")}
        />
      </Button>
      <Button className="bg-blue-800/50 p-3 rounded-lg">
        <IoIosArrowForward
          className={clsx(canGoNext ? "text-blue-700" : "text-white")}
        />
      </Button>
    </div>
  );
}

export default CourseButton;
