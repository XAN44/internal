import { Progress } from "@nextui-org/react";
import React from "react";

interface Props {
  AllcourseProcess: number;
  requireCoursePerCentage: number;
}

function ProgressAR({ AllcourseProcess, requireCoursePerCentage }: Props) {
  return (
    <div className="flex flex-col items-center justify-evenly w-full h-full">
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
    </div>
  );
}

export default ProgressAR;
