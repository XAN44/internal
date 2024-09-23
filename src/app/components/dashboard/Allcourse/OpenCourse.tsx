import { Button } from "@nextui-org/button";
import { Progress } from "@nextui-org/react";
import clsx from "clsx";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedCourse: {
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
  } | null;
}

function OpenCourse({ isOpen, onClose, selectedCourse }: Props) {
  return (
    <>
      {isOpen && selectedCourse ? (
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
            w-full
            max-w-lg
            bg-white 
            rounded-xl
            p-6
            ">
            <Button
              variant="light"
              onClick={onClose}
              isIconOnly
              aria-label="Close"
              className=" 
              absolute 
              right-2
              top-2
              ">
              X
            </Button>
            <div className="flex flex-col w-full justify-center ">
              <h2 className="text-xl text-blue-500 font-bold mb-4 text-center w-full">
                {selectedCourse.title}
              </h2>
              <div
                className="
                grid grid-cols-2 
              place-items-end 
              items-center 
              justify-end
              place-content-center
              w-full
              ">
                <Progress
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
                  className="w-full"
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
                  <div className={clsx("badge badge-outline")}>
                    {selectedCourse.Category.name}
                  </div>
                </div>
              </div>
              <div className="w-full mt-6">
                <p className="text-medium text-blue-500 mb-6 text-center">
                  Chapter
                </p>
                {selectedCourse.Chapter && selectedCourse.Chapter.length > 0 ? (
                  selectedCourse.Chapter.map((i, index) => (
                    <div
                      className="w-full text-start flex justify-between items-center"
                      key={index}>
                      <div className="w-full flex items-center justify-start">
                        <ul className="list-disc text-gray-500">
                          <li key={i.id}>
                            <p>{i.title}</p>
                            <p>{i.isCompleted ? "Success" : "Pending"}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">
                    No chapters available
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default OpenCourse;
