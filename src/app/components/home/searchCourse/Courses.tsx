import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
} from "@nextui-org/react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

interface CoursesProps {
  filteredCourses: {
    id: string;
    category: string;
    title: string;
    name: string;
    role: string;
    thumnel: string;
    avatar: string;
    description: string;
  }[];
}

function Courses({ filteredCourses }: CoursesProps) {
  const [likedCourses, setLikedCourses] = useState<Record<string, boolean>>({});
  const useTruncate = (text: string, maxWords: number) => {
    const truncate = () => {
      const words = text.split(" ");
      if (words.length <= maxWords) {
        return text;
      }
      return `${words.slice(0, maxWords).join(" ")}...`;
    };

    return truncate();
  };
  const handleLike = (courseId: string) => {
    setLikedCourses((prevLikes) => ({
      ...prevLikes,
      [courseId]: !prevLikes[courseId],
    }));
  };
  if (filteredCourses.length === 0) {
    return <p>No courses available</p>;
  }

  return (
    <motion.div
      className=" 
  
      xsm:flex
      xsm:flex-col
      xsm:space-y-3
       
      xms:grid 
      xms:grid-cols-1

        sm:grid
        sm:grid-cols-1    
        sm:gap-6
        sm:space-y-0
       
      md:grid 
      md:grid-cols-1
      md:gap-6

      lg:grid-cols-1

      
      2xl:grid
      2xl:grid-cols-3

      max:grid-cols-3
 
      ">
      {filteredCourses.map((course, index) => (
        <motion.div key={course.id}>
          <Card
            radius="lg"
            shadow="lg"
            className="
                
                bg-gradient-to-b 
                from-blue-400/75 
                to-blue-500 p-4
               
                w-[340px]    
                h-96
                ">
            <CardBody
              className="
                    overflow-visible 
                    p-0 w-full 
                    flex 
                    items-center 
                    justify-center">
              <Image
                shadow="sm"
                radius="lg"
                src={course.thumnel}
                className="object-cover h-52 w-80 "
              />
              <h1 className="font-bold sm:text-xl xsm:text-lg mt-3 mb-3">
                {course.title}
              </h1>
              <div className="w-full flex flex-col relative">
                <div className="flex flex-row gap-1">
                  <Avatar
                    src={course.avatar}
                    className="object-cover w-9 h-9"
                    radius="full"
                    size="sm"
                  />
                  <div className="flex-col">
                    <h1 className="font-bold">{course.name}</h1>
                    <p className="text-xs ">{course.role}</p>
                  </div>
                  <div className=" absolute right-0">
                    <Button
                      onClick={() => handleLike(course.id)}
                      isIconOnly
                      className="bg-white">
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
                <p className="text-xs mt-3">
                  {useTruncate(course.description, 8)}
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default Courses;
