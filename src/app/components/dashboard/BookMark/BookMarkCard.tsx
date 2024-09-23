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
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { InterestSchema } from "../../../lib/schema/interest/interestSchema";
import clsx from "clsx";
import SelectInterest from "../../interests/selectInterest";
import { useRouter } from "next/navigation";
import BookMarkInCard from "./BookMarkInCard";
interface BookMarkContentProps {
  bookMarkedCourses: {
    name: string;
    isChecked: boolean;
    descriptions: string;
  }[];
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
        p-[2px]  ">
        <BookMarkInCard bookMarkedCourses={bookMarkedCourses} form={form} />
      </div>
    </div>
  );
}

export default BookMarkCard;
