"use client";
import React, { useState } from "react";
import CreateCourse from "../../components/createCourse/createCourse";
import { Button } from "@nextui-org/button";
import GetCourse from "../../components/createCourse/geCourse/getCourse";
import { PlusCircle } from "lucide-react";

function Page() {
  const [isCreating, setIsCreateing] = useState(false);
  const handleCreateCourse = () => {
    setIsCreateing((val) => !val);
  };

  return (
    <>
      <div className="relative p-6 flex flex-col w-full h-full items-start space-y-5 ">
        <Button
          onClick={handleCreateCourse}
          variant="ghost"
          className="font-bold ">
          <PlusCircle />
          New Course
        </Button>
        {isCreating && (
          <div
            className="
            fixed 
            inset-0 
            flex 
            h-full 
            w-full 
            items-center 
            justify-center 
            bg-black bg-opacity-60">
            <CreateCourse handleCreateCourse={handleCreateCourse} />
          </div>
        )}
        {!isCreating && <GetCourse />}
      </div>
    </>
  );
}

export default Page;
