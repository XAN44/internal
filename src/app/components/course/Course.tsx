"use client";
import React, { useState } from "react";
import { Video } from "../../lib/video";
import { Avatar, Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import clsx from "clsx";
import ShowDsip from "./ShowDsip";
import { useRouter } from "next/navigation";
import { FcReading } from "react-icons/fc";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

interface Course {
  userId: string;
  title: string;
  imageURL: string | null;
  description: string | null;
  courseId: string;
  chapter: {
    id: string;
  }[];
  Enrollment: {
    isEnrollment: boolean;
  }[];
  attachments: {
    name: string;
    url: string;
  }[];
  category: {
    categoryname: string;
  };
  User: {
    id: string;

    username: string;
    image: string | null;
    role: string | null;
  };
}

function CourseMain({
  User,
  description,
  courseId,
  imageURL,
  title,
  category,
  chapter,
  Enrollment,
  attachments,
  userId,
}: Course) {
  const [loading, setLoading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleShowFull = () => {
    setShowDescription((val) => !val);
  };

  function openNewTab(url: string) {
    window.open(url, "_blank");
  }

  const handleEnrollment = async (idEnrollment: string) => {
    setLoading(true);
    try {
      if (Enrollment?.length > 0 && Enrollment[0].isEnrollment) {
        await axios.delete(`/api/takeCourse/${courseId}/enrolment`, {
          data: { idEnrollment: courseId },
        });
        router.refresh();
        toast.success("Canceled successfully");
      } else {
        await axios.post(`/api/takeCourse/${courseId}/enrolment`, {
          idEnrollment,
        });
        router.refresh();
        toast.success("Enrolled successfully");
        const firstChapterId = chapter[0]?.id;
        if (firstChapterId) {
          router.push(`/course/${courseId}/chapter/${firstChapterId}`);
        } else {
          toast.error("No chapters available");
        }
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error;
        setErrorMessage(message);
      } else {
        setErrorMessage("Network error or server is down");
      }
    } finally {
      setLoading(false); // ตั้งค่า loading เป็น false หลังจากเสร็จสิ้น
    }
  };
  const firstChapterId = chapter[0]?.id;

  const togleToCourse = (courseId: string, chapterId: string) => {
    router.push(`/course/${courseId}/chapter/${chapterId}`);
  };

  return (
    <>
      <div key={courseId}>
        <div className="w-full flex items-center mt-3 mb-3 justify-end">
          {Enrollment?.length > 0 && Enrollment[0].isEnrollment && (
            <>
              <Button
                onClick={() => togleToCourse(courseId, firstChapterId)}
                className="bg-blue-500/50 hover:bg-blue-500">
                Enter to course
              </Button>
            </>
          )}
        </div>
        <Card
          isFooterBlurred
          radius="lg"
          className="
              flex 
              flex-col 
              items-center 
              justify-center               
                  ">
          <div className="relative aspect-video w-full">
            <Image
              className="absolute inset-0 object-cover rounded-md"
              src={imageURL || ""}
              alt="Picture of the author"
              fill
            />
          </div>
          <CardFooter
            className="
                flex 
                items-center 
                justify-between 
                xsm:flex-col
                w-full 
                mt-5
                gap-3
                relative
                ">
            <div
              className="
                flex 
                gap-3
                items-center 
                xsm:justify-center
                sm:justify-start
                xsm:flex-col
                sm:flex-row
                w-full
                ">
              <Avatar
                src={User.image || "/Avatar.png"}
                alt="sd"
                className="
                    rounded-full 
                    object-contain 
                    bg-black
                    sm:w-9
                    sm:h-9
                    xsm:w-8
                    xsm:h-8
                    "
              />
              <div className="">
                <p
                  className="
                    font-bold
                    sm:text-lg
                    xsm:text-xs
                    ">
                  {User.username}
                </p>
                <p className="text-xs">{User.role}</p>
              </div>
            </div>
            <div
              className="
                  text-xs badge 
                  sm:absolute 
                  sm:right-0 
                  badge-neutral 
                  sm:badge-lg 
                  xsm:badge-sm">
              {category.categoryname}
            </div>
          </CardFooter>
          <p
            className="
              text-medium 
              mt-5
              ">
            {title}
          </p>
          <Button
            variant="flat"
            className="text-blue-800"
            onClick={toggleShowFull}>
            {showDescription ? "Reading . ." : " Read Description  "}
          </Button>
          <CardFooter>
            <div className="w-full flex items-center justify-center">
              {userId === User.id ? (
                <p className="text-red-500">
                  You cannot enroll in your own course
                </p>
              ) : (
                <Button
                  variant="shadow"
                  className="bg-blue-500/50 hover:bg-blue-500"
                  startContent={<FcReading className="w-4 h-4 " />}
                  onClick={() => handleEnrollment(courseId)}
                  disabled={loading}>
                  {loading
                    ? "Processing..."
                    : Enrollment?.length > 0 && Enrollment[0].isEnrollment
                    ? "Cancel Course"
                    : "Begin Course"}
                </Button>
              )}
            </div>
          </CardFooter>
          {attachments.map((a) => (
            <div
              key={a.url}
              className="items-center 
                  p-3 w-full 
                  bg-sky-100 
                  border-sky-200 
                  border 
                  text-sky-700 
                  rounded-md">
              <p className="font-bold">Attachments </p>
              <p
                className="text-xs line-clamp-1 hover:cursor-pointer"
                onClick={() => openNewTab(a.url)}>
                {a.name}
              </p>
            </div>
          ))}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </Card>
        <ShowDsip
          description={description || ""}
          showDescription={showDescription}
          toggleShowFull={toggleShowFull}
        />
      </div>
    </>
  );
}

export default CourseMain;
