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
import { cn } from "../../../../../lib/utils";
import { DescriptionFormSchema } from "../../../lib/schema/auth/zodCourse";
interface DescriptionProps {
  initials: {
    descriptions: string | null;
  };
  courseId: string;
}

function DescriptionForm({ initials, courseId }: DescriptionProps) {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const togleEdit = () => {
    setIsEditing((current) => !current);
  };
  const form = useForm<z.infer<typeof DescriptionFormSchema>>({
    resolver: zodResolver(DescriptionFormSchema),
    defaultValues: {
      descriptions: initials.descriptions ?? "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const [isPending, startTransition] = useTransition();
  const onSubmit = (value: z.infer<typeof DescriptionFormSchema>) => {
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
        <p className="text-gray-400">Course Description</p>
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
        <p
          className={cn(
            "text-sm mt-2",
            !initials.descriptions && "text-slate-500 italic"
          )}>
          {initials.descriptions || "No descriptions"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            className="space-y-6 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="descriptions"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      isInvalid={!!form.formState.errors.descriptions}
                      errorMessage={form.formState.errors.descriptions?.message}
                      classNames={{
                        inputWrapper: "bg-blue-input/60 ring-2 ",
                      }}
                      disabled={isSubmitting}
                      placeholder="e.g 'this course is about ...'"
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

export default DescriptionForm;
