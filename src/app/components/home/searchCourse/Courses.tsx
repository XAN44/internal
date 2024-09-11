"use client";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Link,
} from "@nextui-org/react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

interface CoursesProps {
  filteredCourses: {
    id: string;
    title: string;
    imageURL: string | null;
    descriptions: string | null;
    User: {
      username: string | null;
      image: string | null;
      role: string | null;
    };
  }[];
}

function Courses({ filteredCourses }: CoursesProps) {
  function createSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, ""); // ลบอักขระที่ไม่ใช่ตัวอักษรหรือตัวเลข (ยกเว้นขีดกลางและขีดล่าง)
  }

  const [likedCourses, setLikedCourses] = useState<Record<string, boolean>>({});
  if (!filteredCourses) {
    return null;
  }
  const handleLike = (courseId: string) => {
    setLikedCourses((prevLikes) => ({
      ...prevLikes,
      [courseId]: !prevLikes[courseId],
    }));
  };

  return (
    <div
      className=" 
  
      xsm:grid
      xsm:grid-cols-1
      xsm:gap-3

      xssx:grid-cols-2

      xms:grid 
      xms:grid-cols-2

      sm:grid
      sm:grid-cols-2    
      sm:gap-6
      sm:space-y-0
       
      md:grid 
      md:grid-cols-2
      md:gap-6

      lg:grid-cols-2
      
      xl:grid
      xl:grid-cols-2

      2xl:grid
      2xl:grid-cols-4

      max:grid-cols-4
 
      ">
      <AnimatePresence>
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            className="w-full"
            initial={{ opacity: 0, x: 0 }}
            animate={{
              opacity: 1,
              x: 1,
              transition: {
                type: "just",
                delay: index * 0.1,
              },
            }}>
            <Link
              className="h-full w-full"
              key={course.id}
              href={`/course/${createSlug(course.title)}`}>
              <Card
                radius="lg"
                shadow="lg"
                className="
                bg-gradient-to-b 
                from-blue-400/75 
                to-blue-500 p-4

                md:w-[300px]
               
                sm:w-[250px]    
                sm:h-full 
            
                xsm:w-[200px]
                xsm:h-[350px]

                xms:w-[250px]

              
                ">
                <CardBody
                  className="
                    overflow-visible 
                    p-0 w-full 
                    flex 
                    items-center 
                    justify-center">
                  <Image
                    alt={course.imageURL || ""}
                    shadow="sm"
                    radius="lg"
                    src={course?.imageURL || "/course.png"}
                    className="
                    object-cover 
                    sm:h-52 sm:w-80
                    xsm:h-32 xsm:w-80
                    "
                  />
                  <h1
                    className="
              font-bold 
              sm:text-xl 
              xsm:text-xs mt-3 mb-3">
                    {course.title}
                  </h1>
                  <div className="w-full flex flex-col relative">
                    <div className="flex flex-row gap-1 items-center justify-center">
                      <Avatar
                        src={course.User.image || "/Avatar.png"}
                        className="
                        object-cover 
                        xsm:w-8 xsm:h-6
                        sm:w-14 sm:h-11
                        rounded-full
                        "
                        radius="full"
                        size="sm"
                      />
                      <div className="leading-normal flex justify-between items-center w-full">
                        <div className="flex-col">
                          <h1
                            className="
                          font-bold text-pretty  xsm:text-xs">
                            {course.User.username}
                          </h1>
                          <p className="xsm:text-xs text-gray-600 ">
                            {course.User.role}
                          </p>
                        </div>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            handleLike(course.id);
                          }}
                          isIconOnly>
                          <FaHeart
                            className={clsx(
                              likedCourses[course.id]
                                ? "text-red-800"
                                : "text-black"
                            )}
                          />
                        </Button>
                      </div>
                    </div>
                    <p className="truncate text-xs mt-3 xsm:hidden xms:block">
                      {course.descriptions}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default Courses;
