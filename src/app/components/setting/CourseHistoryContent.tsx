import clsx from "clsx";
import React from "react";
import { format } from "date-fns";
import Link from "next/link";

interface Props {
  initials: {
    id: string;
    name: string;
    enrolledAt: string;
    status: string;
  }[];
}

function CourseHistoryContent({ initials }: Props) {
  return (
    <div className="w-full grid grid-cols-1 place-items-center gap-5 items-center justify-center">
      <p className="text-blue-500 font-bold">COURSE HISTORY</p>
      <div
        className="
        grid grid-cols-3
        place-items-center 
        place-content-start 
        items-start
        w-full h-full 
        
          ">
        <p className="text-blue-500 xsm:text-sm sm:text-medium">
          ALL ENROLLED COURSES
        </p>
        <p className="text-blue-500 xsm:text-sm sm:text-medium">STATUS</p>
        <p className="text-blue-500 xsm:text-sm sm:text-medium">
          ENROLLMENT DATE
        </p>
      </div>
      <div
        className="
        h-96 
        w-full 
        grid 
        grid-cols-3
        overflow-y-auto
        place-items-center 
        place-content-start
        items-start
        
        ">
        <div className="flex flex-col items-start gap-3 ">
          {initials.map((i, index) => (
            <div
              className="text-gray-500 w-full h-full  line-clamp-1"
              key={index}>
              <Link href={`/course/${i.id}`}>{i.name}</Link>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start line-clamp-2 gap-3  ">
          {initials.map((item, index) => (
            <div
              className={clsx("  line-clamp-1", {
                "  text-green-800": item.status === "Completed",
                " text-yellow-800": item.status === "Pending",
                "  text-red-800": item.status === "Cancelled",
              })}
              key={index}>
              {item.status}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center w-full justify-start gap-3">
          {initials.map((i, index) => (
            <div className="text-gray-500   line-clamp-1" key={index}>
              {i.enrolledAt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseHistoryContent;
