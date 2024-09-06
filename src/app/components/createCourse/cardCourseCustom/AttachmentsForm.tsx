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

import { AttachmentsSchema } from "../../../lib/schema/auth/zodCourse";
import { Attachments, Course } from "@prisma/client";
import { FaImage, FaPlusCircle } from "react-icons/fa";
import { FileUpload } from "../../fileUpload";
import Image from "next/image";
import { RiFilePaperFill, RiLoader2Fill } from "react-icons/ri";
import { HiX } from "react-icons/hi";
interface AttachmentsFormProps {
  initials: Course & { attachments: Attachments[] };
  courseId: string;
}

function AttachmentsForm({ initials, courseId }: AttachmentsFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeleting] = useState<string | null>(null);

  const router = useRouter();
  const togleEdit = () => {
    setIsEditing((current) => !current);
  };

  const [isPending, startTransition] = useTransition();
  const onSubmit = (value: z.infer<typeof AttachmentsSchema>) => {
    startTransition(async () => {
      try {
        const response = await axios.post(
          `/api/course/${courseId}/attachments`,
          value
        );
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

  const onDeleted = async (id: string) => {
    try {
      setDeleting(id);
      await axios.delete(`/api/course/${courseId}/attachments/${id}`);
      toast.success("Attachments deleted");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex items-center justify-between  ">
        <p className="text-gray-400">Course Attachments</p>
        <Button variant="ghost" onClick={togleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <FaPlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initials.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}
          {initials.attachments.length > 0 && (
            <div className="space-y-2">
              {initials.attachments.map((attachment) => (
                <div
                  className="
                  relative
                  flex 
                  items-center 
                  p-3 w-full 
                  bg-sky-100 
                  border-sky-200 
                  border 
                  text-sky-700 
                  rounded-md"
                  key={attachment.id}>
                  <RiFilePaperFill className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div className="absolute right-3">
                      <RiLoader2Fill className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      onClick={() => onDeleted(attachment.id)}
                      className="ml-auto hover:opacity-75 transition">
                      <HiX className="h-4 w-4 " />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="cousreAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the course
          </div>
        </div>
      )}
    </div>
  );
}

export default AttachmentsForm;
