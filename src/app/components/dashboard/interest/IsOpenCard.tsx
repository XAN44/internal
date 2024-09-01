import { Button } from "@nextui-org/button";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedInterest: string | null;
}
function IsOpenCard({ isOpen, onClose, selectedInterest }: Props) {
  return (
    <>
      {isOpen ? (
        <div
          className="
          fixed
          flex
          items-center justify-center
          bg-black
          bg-opacity-50
          z-50
          inset-0
          w-screen  
          h-screen
          ">
          <div
            className="
            relative
            w-56
            h-20
            bg-white 
            rounded-xl">
            <Button
              variant="light"
              onClick={onClose}
              isIconOnly
              aria-label="Close"
              className=" 
              absolute 
              right-0
              ">
              X
            </Button>
            <div
              className="
              p-5
              w-full
              h-full
              flex
              items-center justify-center
              ">
              <p className="font-bold">{selectedInterest}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default IsOpenCard;
