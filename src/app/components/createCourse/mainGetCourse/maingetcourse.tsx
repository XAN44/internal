"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"; // นำเข้า axios
import { Button } from "@nextui-org/button";
import { PlusCircle } from "lucide-react";
import CreateCourse from "../createCourse";
import AddCategory from "../../createCategory/addCategory";
import GetCourse from "../geCourse/getCourse";

interface Data {
  isAdmin: boolean;
}

function MainGetCourse({ isAdmin }: Data) {
  const [isCreating, setIsCreateing] = useState(false);
  const [isAddCateogry, setIsCategory] = useState(false);

  const handleCreateCourse = () => {
    setIsCreateing((val) => !val);
  };

  const handleCreateCategory = () => {
    setIsCategory((val) => !val);
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

        {isAdmin && (
          <Button
            onClick={handleCreateCategory}
            variant="ghost"
            className="font-bold">
            <PlusCircle />
            Add Category
          </Button>
        )}
        {isCreating && (
          <div
            className="fixed 
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
        {isAddCateogry && (
          <div
            className="fixed 
            inset-0 
            flex 
            h-full 
            w-full 
            items-center 
            justify-center 
            bg-black bg-opacity-60">
            <AddCategory handleCreateCategory={handleCreateCategory} />
          </div>
        )}
        {!isCreating && !isAddCateogry && <GetCourse />}
      </div>
    </>
  );
}

export default MainGetCourse;
