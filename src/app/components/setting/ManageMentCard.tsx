import React from "react";

function ManageMentCard() {
  const data = [
    {
      name: "mandatory courses 1",
      status: "Cancel",
    },
    {
      status: "Cancel",
      name: "mandatory courses 2",
    },
    {
      status: "Cancel",
      name: "mandatory courses 01",
    },
    {
      status: "Cancel",
      name: "mandatory courses 01",
    },
    {
      status: "Cancel",
      name: "mandatory courses 01",
    },
    {
      status: "Cancel",
      name: "mandatory courses 01",
    },
    {
      status: "Cancel",
      name: "mandatory courses 01",
    },
    {
      status: "Cancel",
      name: "mandatory courses 01",
    },
    {
      status: "Cancel",
      name: "mandatory courses 01",
    },
    {
      status: "Cancel",
      name: "mandatory courses 01",
    },
    {
      status: "Cancel",
      name: "mandatory courses 01",
    },
    {
      status: "Cancel",
      name: "mandatory courses 01",
    },
    {
      status: "Cancel",
      name: "mandatory courses 01",
    },
    {
      status: "Cancel",
      name: "mandatory courses 01",
    },
    {
      status: "Cancel",
      name: "mandatory courses 01",
    },
    {
      status: "Cancel",
      name: "mandatory courses 01",
    },
    {
      status: "Cancel",
      name: "mandatory courses 01",
    },
    {
      status: "Cancel",
      name: "mandatory courses 01",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 place-items-center gap-5 items-start justify-center">
      <p className="text-blue-500 font-bold">COURSE MANAGEMENT</p>
      <div
        className="
        grid grid-cols-2 
        place-items-center 
        place-content-center 
        items-start
        w-full h-full 
        
          ">
        <p className="text-blue-500 ">ENROLLED COURSES</p>
        <p className="text-blue-500 ">ENROLLMENT STATUS</p>
      </div>
      <div
        className="
        h-96 
        w-full 
        grid 
        grid-cols-4 
        overflow-y-auto
        place-items-center 
        place-content-start
        items-start
        ">
        <div className="flex flex-col items-start col-span-2 justify-center gap-3 ">
          {data.map((i, index) => (
            <div
              className="text-gray-500 w-full h-full  line-clamp-1"
              key={index}>
              {i.name}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start col-span-2 justify-center gap-3 ">
          {data.map((i, index) => (
            <div className="text-gray-500 w-full h-full" key={index}>
              {i.status}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageMentCard;
