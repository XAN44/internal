"use client";
import { Button } from "@nextui-org/button";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { BiEdit, BiPencil } from "react-icons/bi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../../../../components/ui/form";
import { Input, Textarea } from "@nextui-org/input";
import { elysia } from "../../../../../elysia/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios";
import { Spinner } from "@nextui-org/react";
import { TitleFormSchema } from "../../../lib/schema/auth/zodCourse";
interface TitleProps {
  initials: {
    title: string;
  };
  courseId: string;
}

function TitleForm({ initials, courseId }: TitleProps) {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const togleEdit = () => {
    setIsEditing((current) => !current);
  };
  const form = useForm<z.infer<typeof TitleFormSchema>>({
    resolver: zodResolver(TitleFormSchema),
    defaultValues: initials,
  });

  const { isSubmitting, isValid } = form.formState;
  const [isPending, startTransition] = useTransition();
  const onSubmit = (value: z.infer<typeof TitleFormSchema>) => {
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
        <p className="text-gray-400">Course Title</p>
        <Button variant="ghost" onClick={togleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <BiPencil className="h-4 w-4 mr-2" />
              Edit Title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="mt-2 text-gray-500">{initials.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            className="space-y-6 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      isInvalid={!!form.formState.errors.title}
                      errorMessage={form.formState.errors.title?.message}
                      classNames={{
                        inputWrapper: "bg-blue-input/60 ring-2 ",
                      }}
                      disabled={isSubmitting}
                      placeholder="e.g Advance web development"
                      {...field}
                    />
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

export default TitleForm;
