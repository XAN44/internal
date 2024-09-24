import { Progress } from "@nextui-org/react";
import clsx from "clsx";
import React from "react";
import OpenCourse from "./OpenCourse";
interface Props {
  AllCourse: {
    id: string;
    title: string;
    isRequired: boolean;
    Chapter: {
      id: string;
      title: string;
      isCompleted: boolean;
    }[];
    Category: {
      name: string;
    };
    overallProgressPercentage: number;
  }[];
  isOpen: boolean;
  handleOpen: (val: string) => void;
  handleClose: () => void;
  selectCourse: any;
}
function CourseContentMobile({
  handleOpen,
  AllCourse,
  isOpen,
  handleClose,
  selectCourse,
}: Props) {
  return (
    <div className="sm:hidden xsm:h-96 overflow-y-auto">
      {AllCourse.map((selectedCourse) => (
        <div
          onClick={() => handleOpen(selectedCourse.id)}
          className="
            xsm:flex 
            xsm:flex-col 
            w-full 
            overflow-y-auto 
            xsm:justify-center sm:hidden
            
            "
          key={selectedCourse.id}>
          <h2 className=" text-blue-500 font-bold mb-4">
            {selectedCourse.title}
          </h2>
          <div
            className="
                grid grid-cols-2 
              place-items-center 
              items-center justify-center
              place-content-center
              w-full
              ">
            <Progress
              aria-label="Progress"
              classNames={{
                track: "drop-shadow-md border border-default",
                indicator: "bg-gradient-to-r from-sky-900 to-sky-500",
                label: "tracking-wider font-medium text-default-600",
                value: "text-foreground/60",
              }}
              defaultValue={selectedCourse.overallProgressPercentage}
              value={selectedCourse.overallProgressPercentage}
              minValue={0}
              maxValue={100}
              showValueLabel={true}
              size="md"
              radius="sm"
              className="w-full xsm:block sm:hidden"
            />
            <div className="grid grid-cols-1 gap-3">
              <div
                className={clsx(
                  "badge badge-outline",
                  selectedCourse.isRequired
                    ? "text-yellow-500"
                    : "text-green-500"
                )}>
                {selectedCourse.isRequired ? "Required" : "Optional"}
              </div>
              <div className="">{selectedCourse.Category.name}</div>
            </div>
          </div>
          <div className="divider"></div>
        </div>
      ))}
      <OpenCourse
        isOpen={isOpen}
        onClose={handleClose}
        selectedCourse={selectCourse}
      />
    </div>
  );
}

export default CourseContentMobile;
