"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Image,
  Link,
  Spinner,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCallback, useEffect, useTransition } from "react";
import { TEST3 } from "@/server/test";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { InterestSchema } from "../../../lib/schema/interest/interestSchema";
import clsx from "clsx";
import SelectInterest from "../../interests/selectInterest";
import { useRouter } from "next/navigation";
import BookMarkInCard from "./BookMarkInCard";
interface BookMarkContentProps {
  bookMarkedCourses: Array<{
    id: string;
    title: string;
    duration: number;
    isBookMark: boolean;
    isRequired: boolean;
    isCompleted: boolean;
  }>;
}
function BookMarkCard({ bookMarkedCourses }: BookMarkContentProps) {
  const form = useForm<z.infer<typeof InterestSchema>>({
    resolver: zodResolver(InterestSchema),
    defaultValues: {
      interest: [],
    },
  });

  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const {
    formState: { errors, isValid, isDirty },
  } = form;

  const onSubmit = (value: z.infer<typeof InterestSchema>) => {
    startTransition(() => {
      TEST3(value).then((data) => {
        if (data.success) {
          toast.custom((t) => (
            <div
              className={`bg-white px-6 py-4 shadow-md rounded-full text-emerald-500 ${
                t.visible ? "animate-enter" : "animate-leave"
              }`}>
              {data.success}
            </div>
          ));
          router.push("/home");
        }
      });
    });
  };

  return (
    <div className="w-full h-full p-6 flex flex-col items-center justify-center">
      <p
        className="
        w-full 
        flex 
        items-start 
        text-start 
        font-bold 
        text-xl">
        BOOKMARK
      </p>

      <div
        className="
        w-full h-full
        flex 
        items-center 
        justify-center 
        flex-col 
        overflow-y-auto 
        p-[2px]  
      ">
        <BookMarkInCard
          bookMarkedCourses={bookMarkedCourses}
          form={form}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default BookMarkCard;
