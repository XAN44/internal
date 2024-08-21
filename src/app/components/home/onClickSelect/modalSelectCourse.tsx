"use client";
import { select, Select, SelectItem } from "@nextui-org/react";
import React, { ChangeEvent, useState } from "react";
import { FakeCourse } from "../../../lib/modal/fakeSelectCourse";

interface SelectCategory {
  value: {
    key: string;
    label: string;
  }[];
  onChange: (key: string) => void;
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
        defaultSelectedKeys={["All Course"]}
        placeholder="Select">
        {value.map((item) => (
          <SelectItem key={item.key} value={item.key}>
            {item.label}
          </SelectItem>
        ))}
      </Select>
    </>
  );
}

export default ModalSelectCourse;
