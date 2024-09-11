"use client";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/react";
import React, { useEffect, useRef } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar({ onChange, value }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full">
      <Input
        ref={inputRef}
        value={value}
        onChange={onChange}
        placeholder="Explore courses..."
        classNames={{
          inputWrapper: "ring-1 ring-purple-300 rounded-full",
        }}
        endContent={
          <Kbd className="bg-black text-white" keys={["ctrl"]}>
            k
          </Kbd>
        }
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
