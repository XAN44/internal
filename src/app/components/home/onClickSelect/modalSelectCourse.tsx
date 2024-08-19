"use client";
import { Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import { FakeCourse } from "../../../lib/modal/fakeSelectCourse";

function ModalSelectCourse() {
  return (
    <Select
      className="bg-none"
      classNames={{
        mainWrapper: "xsm:w-[120px]",
        base: " sm:w-36  text-center items-center justify-center ",

        trigger: " bg-gradient-to-r from-purple-300/50 to-purple-300/50  ",
      }}
      items={FakeCourse}
      defaultSelectedKeys={["all course"]}
      placeholder="Select">
      {FakeCourse.map((item) => (
        <SelectItem key={item.key}>{item.label}</SelectItem>
      ))}
    </Select>
  );
}
export default ModalSelectCourse;
