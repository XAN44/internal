"use client";
import { Button } from "@nextui-org/button";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { BiPencil } from "react-icons/bi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Chapter, Lesson } from "@prisma/client";
import { FaPlusCircle } from "react-icons/fa";
import { FileUpload } from "../../fileUpload";
import { VideoUrl } from "../../../lib/schema/auth/zodChapter";
import { RiVideoFill } from "react-icons/ri";

interface ChapterVideoFormProps {
  initials: Lesson;
  courseId: string;
  chapterId: string;
}

function ChapterVideoForm({
  initials,
  courseId,
  chapterId,
}: ChapterVideoFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const togleEdit = () => {
    setIsEditing((current) => !current);
  };
  const form = useForm<z.infer<typeof VideoUrl>>({
    resolver: zodResolver(VideoUrl),
    defaultValues: {
      videoUrl: initials.videoUrl ?? "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const [isPending, startTransition] = useTransition();
  const onSubmit = (value: z.infer<typeof VideoUrl>) => {
    startTransition(async () => {
      try {
        await axios.patch(
          `/api/course/${courseId}/chapter/${chapterId}`,
          value
        );
        togleEdit();
        router.refresh();
        toast.success("Chapter video update");
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex items-center justify-between font-medium">
        <p className="text-gray-400">Course Video</p>
        <Button variant="ghost" onClick={togleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initials.videoUrl && (
            <>
              <FaPlusCircle className="h-4 w-4 mr-2" />
              Add an video
            </>
          )}
          {!isEditing && initials.videoUrl && (
            <>
              <BiPencil />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initials.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <RiVideoFill className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <video width="1800" height="1200" controls>
              <source src={initials.videoUrl} type="video/mp4" />
            </video>
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapherVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapte&apos;s video
          </div>
        </div>
      )}
      {initials.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Video can take a few minutes to process. refresh the page if video
          does not appear.
        </div>
      )}
    </div>
  );
}

export default ChapterVideoForm;
