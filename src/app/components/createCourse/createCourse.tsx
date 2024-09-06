"use client";
import React, { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "../../../../components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateCourseSchema } from "../../lib/schema/auth/zodCourse";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "@nextui-org/react";

function CreateCourse() {
  const form = useForm<z.infer<typeof CreateCourseSchema>>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onSubmit = async (value: z.infer<typeof CreateCourseSchema>) => {
    startTransition(async () => {
      try {
        const response = await axios.post("/api/course", value);
        if (response.data.success) {
          toast.success(response.data.success);
          const courseId = response.data.id;
          if (courseId) {
            router.push(`/createcourse/${courseId}`);
          } else {
            toast.error("Course ID is missing");
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          let message = error.response?.data.error;
          toast.error(message);
        }
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center p-6 flex-col ">
      <p className="text-xl font-bold text-blue-500">Name your course</p>
      <p className="text-blue-500 text-sm">
        Create new course , You can change this later.
      </p>
      <Form {...form}>
        <form className="mt-8 space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="e.g 'Basic UX/UI Design'"
                    errorMessage={form.formState.errors.title?.message}
                    isInvalid={!!form.formState.errors.title}
                    color="primary"
                    radius="full"
                    size="sm"
                    classNames={{
                      inputWrapper: "bg-blue-input/60 ring-2 ",
                    }}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  what will you tech in this course ?
                </FormDescription>
              </FormItem>
            )}
          />
          <div className="flex items-center justify-center gap-3">
            <Link href="/home">
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </Link>
            <Button
              className="bg-blue-500/50"
              type="submit"
              disabled={!isValid || isSubmitting}>
              {isPending ? <Spinner /> : "Continue"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateCourse;
