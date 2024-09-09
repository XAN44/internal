"use client";
import { Button } from "@nextui-org/button";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { BiPencil } from "react-icons/bi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../../../../components/ui/form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "@nextui-org/react";
import { cn } from "../../../../../lib/utils";
import { Chapter, Course } from "@prisma/client";
import { ChapterDescriptionFormSchema } from "../../../lib/schema/auth/zodChapter";
import { Editor } from "../../editor";
import { Preview } from "../../preview";
interface ChapterDescriptionProps {
  initials: Chapter;
  courseId: string;
  chapterId: string;
}

function ChapterAccessForm({
  initials,
  courseId,
  chapterId,
}: ChapterDescriptionProps) {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const togleEdit = () => {
    setIsEditing((current) => !current);
  };
  const form = useForm<z.infer<typeof ChapterDescriptionFormSchema>>({
    resolver: zodResolver(ChapterDescriptionFormSchema),
    defaultValues: {
      description: initials.description ?? "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const [isPending, startTransition] = useTransition();
  const onSubmit = (value: z.infer<typeof ChapterDescriptionFormSchema>) => {
    startTransition(async () => {
      try {
        await axios.patch(
          `/api/course/${courseId}/chapter/${chapterId}`,
          value
        );
        togleEdit();
        router.refresh();
        toast.success("Chapter description updated");
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex items-center justify-between font-medium">
        <p className="text-gray-400">Chapter Description</p>
        <Button variant="ghost" onClick={togleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <BiPencil className="h-4 w-4 mr-2" />
              Edit Descriptions
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !initials.description && "text-slate-500 italic"
          )}>
          {initials.description && "No descriptions"}
          {initials.description && <Preview value={initials.description} />}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            className="space-y-6 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                {isPending ? <Spinner /> : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

export default ChapterAccessForm;
