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

import { CategoryFormSchema } from "../../../lib/schema/auth/zodCourse";
import { Course } from "@prisma/client";
import { FaImage, FaPlusCircle } from "react-icons/fa";
import { FileUpload } from "../../fileUpload";
import Image from "next/image";
import { cn } from "../../../../../lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../../../../components/ui/form";
import { Textarea } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem, Spinner } from "@nextui-org/react";
import DescriptionForm from "./DescriptionForm";
interface CategoryProps {
  initials: Course;
  courseId: string;
  options: { label: string; value: string }[];
}

function CategoryForm({ initials, courseId, options }: CategoryProps) {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const togleEdit = () => {
    setIsEditing((current) => !current);
  };
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      categoryId: initials.categoryId ?? "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const [isPending, startTransition] = useTransition();
  const onSubmit = (value: z.infer<typeof CategoryFormSchema>) => {
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

  const selectedOptions = options.find(
    (options) => options.value === initials.categoryId
  );

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex items-center justify-between font-medium">
        <p className="text-gray-400">Course Category</p>
        <Button variant="ghost" onClick={togleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <BiPencil className="h-4 w-4 mr-2" />
              Edit Category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initials.categoryId && "text-slate-500 italic"
          )}>
          {selectedOptions?.label || "No category"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            className="space-y-6 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Autocomplete
                      selectedKey={field.value}
                      onSelectionChange={(key) => field.onChange(key)}
                      label="Select Category"
                      placeholder="Search an category"
                      defaultSelectedKey="cat"
                      defaultItems={options}
                      className="max-w-xs"
                      scrollShadowProps={{
                        isEnabled: false,
                      }}>
                      {(item) => (
                        <AutocompleteItem
                          key={item.value}
                          textValue={item.label}>
                          {item.label}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
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

export default CategoryForm;
