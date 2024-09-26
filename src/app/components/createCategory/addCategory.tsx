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

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import toast from "react-hot-toast";
import { Spinner } from "@nextui-org/react";
import { CreateCategorySchema } from "../../lib/schema/auth/zodCourse";
import Link from "next/link";

interface Props {
  handleCreateCategory: () => void;
}

function AddCategory({ handleCreateCategory }: Props) {
  const form = useForm<z.infer<typeof CreateCategorySchema>>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (value: z.infer<typeof CreateCategorySchema>) => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/addcategory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });

        const data = await response.json();

        if (data.success) {
          toast.success("Add category success");
          handleCreateCategory();
        } else {
          toast.error(data.error || "An error occurred");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to add category");
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-start p-6 flex-col relative bg-white rounded-md">
      <p className="text-xl font-bold text-blue-500">ADD CATEGORY</p>
      <p className="text-blue-500 text-sm">
        Create new category, You can change this later.
      </p>
      <Form {...form}>
        <form className="mt-8 space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="e.g 'Design'"
                    errorMessage={form.formState.errors.name?.message}
                    isInvalid={!!form.formState.errors.name}
                    color="primary"
                    radius="full"
                    size="sm"
                    classNames={{ inputWrapper: "bg-blue-input/60 ring-2" }}
                    {...field}
                  />
                </FormControl>
                <FormDescription>What is the category about?</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="e.g 'Design'"
                    errorMessage={form.formState.errors.name?.message}
                    isInvalid={!!form.formState.errors.name}
                    color="primary"
                    radius="full"
                    size="sm"
                    classNames={{ inputWrapper: "bg-blue-input/60 ring-2" }}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Descriptions</FormDescription>
              </FormItem>
            )}
          />
          <div className="flex items-center justify-center gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={handleCreateCategory}>
              Cancel
            </Button>
            <Button
              className="bg-blue-500/50"
              type="submit"
              disabled={!isValid || isSubmitting}>
              {isPending ? <Spinner /> : "Continue"}
            </Button>
            <Link href="/allcategory">
              <p className="text-sm text-gray-600">All Category</p>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default AddCategory;
