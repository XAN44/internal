"use client";
import { Button } from "@nextui-org/button";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { BiPencil } from "react-icons/bi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios";

import { ImageFormSchema } from "../../../lib/schema/auth/zodCourse";
import { Course } from "@prisma/client";
import { FaImage, FaPlusCircle } from "react-icons/fa";
import { FileUpload } from "../../fileUpload";
import Image from "next/image";
interface ImageFormProps {
  initials: Course;
  courseId: string;
}

function ImageForm({ initials, courseId }: ImageFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const togleEdit = () => {
    setIsEditing((current) => !current);
  };
  const form = useForm<z.infer<typeof ImageFormSchema>>({
    resolver: zodResolver(ImageFormSchema),
    defaultValues: {
      imageURL: initials.imageURL ?? "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const [isPending, startTransition] = useTransition();
  const onSubmit = (value: z.infer<typeof ImageFormSchema>) => {
    startTransition(async () => {
      try {
        const response = await axios.patch(`/api/course/${courseId}`, value);
        togleEdit();
        router.refresh();
        if (response.data.success) {
          toast.success(response.data.success);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          const message = error.response?.data.error;
          toast.error(message);
        }
      }
    });
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex items-center justify-between font-medium">
        <p className="text-gray-400">Course Image</p>
        <Button variant="ghost" onClick={togleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initials.imageURL && (
            <>
              <FaPlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initials.imageURL && (
            <>
              <BiPencil />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initials.imageURL ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <FaImage className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initials.imageURL}
            />
            Current Image
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageURL: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommanded
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageForm;
