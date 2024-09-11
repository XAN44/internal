"use client";
import { select, Select, SelectItem } from "@nextui-org/react";
import React, { ChangeEvent, useState } from "react";
import { FakeCourse } from "../../../lib/modal/fakeSelectCourse";

interface SelectCategory {
  value: {
    id: string;
    label: string;
  }[];
  onChange: (id: string) => void;
}

function ModalSelectCourse({ value, onChange }: SelectCategory) {
  const handleCategoryChange = (value: ChangeEvent<HTMLSelectElement>) => {
    const key = value.target.value;
    onChange(key);
  };

  return (
    <>
      <Select
        aria-label="Select Category"
        className="bg-none"
        classNames={{
          mainWrapper: "xsm:w-[120px]",
          base: "sm:w-36 text-center items-center justify-center",
          trigger: "bg-gradient-to-r from-purple-300/50 to-purple-300/50",
        }}
        onChange={handleCategoryChange}
        placeholder="Select">
        {value.map((item) => (
          <SelectItem key={item.id} value={item.id}>
            {item.label}
          </SelectItem>
        ))}
      </Select>
    </>
  );
}

export default ModalSelectCourse;
