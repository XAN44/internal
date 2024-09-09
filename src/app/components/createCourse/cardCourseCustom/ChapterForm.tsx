"use client";
import { Button } from "@nextui-org/button";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { BiEdit, BiLoader, BiPencil, BiPlusCircle } from "react-icons/bi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../../../../components/ui/form";
import { Input, Textarea } from "@nextui-org/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios";
import { Spinner } from "@nextui-org/react";
import { cn } from "../../../../../lib/utils";
import {
  TitleChapterQuizShema,
  TitleChapterShema,
} from "../../../lib/schema/auth/zodCourse";
import { Course, Chapter } from "@prisma/client";
import ChapterList from "./ChapterList";
interface ChapterProps {
  initials: Course & { Chapter: Chapter[] };
  courseId: string;
}

function ChapterForm({ initials, courseId }: ChapterProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdateing] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [formType, setFormType] = useState<"lesson" | "quiz">("lesson");

  const [isCreateQuiz, setIsCreateQuiz] = useState(false);
  const [isCreateLeason, setIsCreateLeason] = useState(false);

  const togleCreating = () => {
    setCreating((current) => !current);
  };

  const togleCreateQuiz = () => {
    setIsCreateQuiz((current) => !current);
    setFormType("quiz");
  };
  const togleCreateLeason = () => {
    setIsCreateLeason((current) => !current);
    setFormType("lesson");
  };

  const leassonForm = useForm<z.infer<typeof TitleChapterShema>>({
    resolver: zodResolver(TitleChapterShema),
    defaultValues: {
      title: "",
    },
  });
  const QuizForm = useForm<z.infer<typeof TitleChapterQuizShema>>({
    resolver: zodResolver(TitleChapterQuizShema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = leassonForm.formState;
  const [isPending, startTransition] = useTransition();
  const onSubmitLesson = (value: z.infer<typeof TitleChapterShema>) => {
    startTransition(async () => {
      try {
        const response = await axios.post(
          `/api/course/${courseId}/chapter`,
          value
        );
        togleCreating();
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

  const onReoder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdateing(true);
      await axios.put(`/api/course/${courseId}/chapter/reoder`, {
        list: updateData,
      });
      router.refresh();
      toast.success("Chapters reordered");
    } catch (error) {
      toast.error("Something went wrong ");
    } finally {
      setIsUpdateing(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/createcourse/${courseId}/chapter/${id}`);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 relative">
      {isUpdating && (
        <div className="absolute h-full w-full animate-pulse bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <BiLoader className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        <p className="text-gray-400">Course Chapter</p>
        <Button variant="ghost" onClick={togleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <BiPlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <div>
          <div className="mb-4 gap-6 flex mt-4 ">
            <Button
              onClick={togleCreateQuiz}
              className={cn(formType === "quiz" && "bg-black text-white")}>
              Create Quiz
            </Button>
            <Button
              onClick={togleCreateLeason}
              className={cn(formType === "lesson" && "bg-black text-white")}>
              Create Leason
            </Button>
          </div>
          {formType === "lesson" && (
            <Form {...leassonForm}>
              <form
                className="space-y-6 mt-4"
                onSubmit={leassonForm.handleSubmit(onSubmitLesson)}>
                <FormField
                  control={leassonForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          isInvalid={!!leassonForm.formState.errors.title}
                          errorMessage={
                            leassonForm.formState.errors.title?.message
                          }
                          classNames={{
                            inputWrapper: "bg-blue-input/60 ring-2 ",
                          }}
                          disabled={isSubmitting}
                          placeholder="e.g ' Introduction to the course'"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button disabled={!isValid || isSubmitting} type="submit">
                  {isPending ? <Spinner /> : "Create"}
                </Button>
              </form>
            </Form>
          )}
          {formType === "quiz" && <>Quiz</>}
        </div>
      )}

      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2 ",
            !initials.Chapter.length && "text-slate-500 italic"
          )}>
          {!initials.Chapter.length && "No chapter"}

          <ChapterList
            onEdit={onEdit}
            onReoder={onReoder}
            items={initials.Chapter || []}
          />
        </div>
      )}

      {!isCreating && (
        <p className="text-sm text-muted-foreground mt-4">
          Drag and drop to reorder the chapter
        </p>
      )}
    </div>
  );
}

export default ChapterForm;
