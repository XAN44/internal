import { Input } from "@nextui-org/input";
import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";

function SearchBar() {
  return (
    <div className="w-full">
      <Input
        placeholder="Explore courses..."
        classNames={{
          inputWrapper: "ring-1 ring-purple-300 rounded-full",
        }}
        startContent={
          <div
            className="
        bg-purple-300/50
        rounded-full 
        p-1 
        flex 
        items-center 
        justify-center 
        text-center">
            <BiSearchAlt2 />
          </div>
        }
      />
    </div>
  );
}

export default SearchBar;
