"use client";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
} from "@nextui-org/react";
import React from "react";

interface Props {
  AllcourseProcess?: number;
  requireCoursePerCentage?: number;
}

function ProgressAR({ AllcourseProcess, requireCoursePerCentage }: Props) {
  return (
    <div className="flex space-y-6 mt-3 flex-col items-center justify-evenly w-full h-full">
      <Progress
        classNames={{
          track: "drop-shadow-md border border-default",
          indicator: "bg-gradient-to-r from-green-900 to-green-500",
          label: "tracking-wider font-medium text-default-600",
          value: "text-foreground/60",
        }}
        defaultValue={AllcourseProcess}
        value={AllcourseProcess}
        minValue={0}
        maxValue={100}
        showValueLabel={true}
        label="ALL COURSE"
        size="md"
        radius="sm"
        className="w-full"
      />
      <Popover placement="top" backdrop="blur">
        <PopoverTrigger>
          <Button
            className="bg-gradient-to-r from-green-800 to-green-500"
            size="sm">
            ALL COURSE?
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          {(titleProps) => (
            <div className="px-1 py-2">
              <h3 className="text-xl font-bold" {...titleProps}>
                What is ALL COURSE?
              </h3>
              <div className="text-tiny">
                <p className="text-sm">
                  <strong>&quot;ALL COURSE &quot;</strong> represents the total
                  percentage of courses you have completed out of all the
                  courses you have registered for.
                </p>
                <p className="text-sm">
                  To increase the percentage of ALL COURSE:
                </p>
                <ul className="text-sm">
                  <li>
                    <strong>Complete More Courses:</strong> Finish more of the
                    courses you have registered for.
                  </li>
                  <li>
                    <strong>Track Progress:</strong> The percentage will
                    increase as you complete more of these registered courses.
                  </li>
                </ul>
                <p className="text-sm">
                  For example, if you have registered for 10 courses and you
                  complete 7 of them, the percentage of ALL COURSE completed
                  will increase accordingly.
                </p>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
      <Progress
        classNames={{
          track: "drop-shadow-md border border-default",
          indicator: "bg-gradient-to-r from-yellow-900 to-yellow-500",
          label: "tracking-wider font-medium text-default-600",
          value: "text-foreground/60",
        }}
        defaultValue={requireCoursePerCentage}
        value={requireCoursePerCentage}
        showValueLabel={true}
        label="REQUIRED COURSE"
        size="md"
        radius="sm"
        minValue={0}
        maxValue={100}
      />
      <Popover placement="top" backdrop="blur">
        <PopoverTrigger>
          <Button
            className="bg-gradient-to-r from-yellow-800 to-yellow-500"
            size="sm">
            REQUIRED COURSE?
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          {(titleProps) => (
            <div className="px-1 py-2">
              <h3 className="text-xl font-bold" {...titleProps}>
                What is REQUIRED COURSE?
              </h3>
              <div className="text-tiny">
                <p className="text-sm">
                  <strong>&quot;REQUIRED COURSE&quot;</strong> represents the
                  percentage of courses you need to complete based on your
                  selected interests or categories (e.g., Engineering,
                  Marketing).
                </p>
                <p className="text-sm">
                  To increase the percentage of REQUIRED COURSE:
                </p>
                <ul className="text-sm">
                  <li>
                    <strong>Complete More Courses:</strong> Finish more courses
                    within the categories of your interests.
                  </li>
                  <li>
                    <strong>Track Progress:</strong> The percentage will
                    increase as you complete more of these required courses.
                  </li>
                </ul>
                <p className="text-sm">
                  For example, if you have selected Engineering as an interest
                  and you complete more courses in Engineering, the percentage
                  of REQUIRED COURSE completed will increase.
                </p>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ProgressAR;
