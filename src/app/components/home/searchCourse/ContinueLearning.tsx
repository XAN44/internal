"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody, Image, Progress, Slider } from "@nextui-org/react";
import React from "react";

// กำหนดประเภทของข้อมูลที่รับเข้า
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
    progress: number; // เปอร์เซ็นต์ความคืบหน้า
  }[];
}

function ContinueLearning({ filteredCourses }: CoursesProps) {
  return (
    <div
      className="
    w-full 
    flex 
    flex-col 
    justify-center 
    font-bold 
    text-2xl 
    xsm:text-center 
    sm:text-start">
      {/* Continue Learning */}
      {filteredCourses.map((course) => (
        <Card
          isBlurred
          className="
          xsm:w-full
           bg-black        
          bg-gradient-to-b       
          from-blue-400/40 
          to-blue-500/40 p-4
            "
          shadow="sm">
          <CardBody>
            <div
              className="
            grid 
            grid-cols-6 
            md:grid-cols-12 
            gap-6 
            md:gap-4 
            items-center 
            justify-center">
              <div className="relative col-span-6 md:col-span-4">
                <Image
                  alt="Album cover"
                  className="object-cover w-96"
                  height={200}
                  shadow="md"
                  width="100%"
                  src={course.thumnel}
                />
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0">
                    <h3 className="font-semibold text-foreground/90">
                      {course.title}
                    </h3>
                    <p className="text-small text-foreground/80">
                      {course.name} || {course.role}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col mt-3 gap-1">
                  <Progress
                    isDisabled
                    maxValue={100}
                    minValue={0}
                    defaultValue={course.progress} // ใช้ progress จากข้อมูล
                    value={course.progress} // ตั้งค่า value ให้ตรงกับ progress
                    label={`${course.progress}%`} // แสดงเปอร์เซ็นต์ใน label
                    className="max-w-md"
                  />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default ContinueLearning;
