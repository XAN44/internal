import { Button } from "@nextui-org/button";
import React from "react";
interface Badge {
  name: string;
  level: number;
}
interface Props {
  isOpen: boolean;
  onOpen: () => void;
  badges: Badge[];
}

function IsOpenBadge({ isOpen, badges, onOpen }: Props) {
  return (
    <>
      {isOpen ? (
        <div
          className="
            fixed
            flex
            items-center 
            justify-center
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
              w-96
              h-96
              bg-white 
              rounded-xl
              overflow-hidden
            ">
            <Button
              variant="light"
              onClick={onOpen}
              isIconOnly
              aria-label="Close"
              className="absolute right-0 m-2">
              X
            </Button>
            <div
              className="
                p-5
                w-full
                h-full
                grid
                grid-cols-2
                gap-4
                items-start 
                justify-center
                overflow-y-auto
              ">
              {badges.map((i, index) => (
                <div key={index} className="w-full">
                  <p className="font-bold">
                    {i.name} {i.level}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default IsOpenBadge;
