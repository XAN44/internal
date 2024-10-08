import {
  Button,
  Card,
  CardBody,
  Image,
  Progress,
  Slider,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

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
function ForYou({ filteredCourses }: CoursesProps) {
  return (
    <div
      className="
      w-full 
      h-full
      rounded-xl 
      bg-gradient-to-b       
      from-purple-400/40 
      to-purple-500/40 p-4
    ">
      <div className="flex flex-col">
        <div
          className="
        bg-white 
        w-36
        rounded-xl 
        text-center
        font-bold
        md:text-lg
        xsm:text-sm
         ">
          For you!
        </div>
      </div>
      {filteredCourses.map((i, index) => (
        <Link key={i.id} href={`/course/${i.id}`}>
          <Card
            className="
          h-full
          flex 
          flex-col 
          gap-3 
          mt-1 
          overflow-hidden">
            <CardBody>
              <div
                className="
              flex 
              items-center 
              justify-start">
                <Image
                  alt="Album cover"
                  className="object-cover 
                w-full h-full
                
                "
                  height={80}
                  shadow="md"
                  src={i.thumnel}
                />
                <div className="w-full flex flex-col ml-3">
                  <h1 className="text-sm  font-bold"> {i.title}</h1>
                  <p className="text-sm ">
                    {i.name} | {i.role}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default ForYou;
