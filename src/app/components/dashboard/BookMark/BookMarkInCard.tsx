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
import axios from "axios";
import { useRouter } from "next/navigation";
interface SelectInterestProps {
  form: ReturnType<typeof useForm<z.infer<typeof InterestSchema>>>;
  bookMarkedCourses: {
    name: string;
    isChecked: boolean;
    descriptions: string;
  }[];
}

export default function BookMarkInCard({
  form,
  bookMarkedCourses,
}: SelectInterestProps) {
  const router = useRouter();
  const handleCheckboxChange = async (course: {
    name: string;
    isChecked: boolean;
  }) => {
    const action = course.isChecked ? "remove" : "add";

    try {
      const response = await axios.patch("/api/interest", {
        interestName: course.name,
        action,
      });

      toast.success(response.data.message);
      router.refresh();
      // อัปเดตสถานะ checkbox หรือจัดการ state ตามความจำเป็น
    } catch (error) {
      console.error("Error updating interest:", error);
      toast.error("Failed to update interest");
    }
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="rounded-[calc(1.5rem-1px)] w-full h-full overflow-y-auto space-x-6 items-start justify-center p-0">
      <Form {...form}>
        <form className="w-full">
          <FormField
            control={form.control}
            name="interest"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={container}
                    className="grid p-4 xsm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
                    {bookMarkedCourses.map((course) => (
                      <motion.div
                        key={course.name}
                        variants={{
                          hidden: { y: 100, opacity: 0 },
                          visible: { y: 0, opacity: 1 },
                        }}>
                        <Card
                          shadow="sm"
                          className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700">
                          <CardBody className="w-full h-full p-4 items-start justify-center overflow-visible">
                            <div className="flex flex-col text-white">
                              <p className="font-bold text-xl slg:text-2xl xl:text-3xl">
                                {course.name}
                              </p>
                              <p className="font-bold text-sm">
                                {course.descriptions}
                              </p>
                            </div>
                            <Checkbox
                              isRequired={true}
                              isSelected={course.isChecked}
                              size="lg"
                              color="success"
                              radius="full"
                              className="sm:absolute sm:top-2 sm:right-[20px]"
                              onChange={() => handleCheckboxChange(course)}
                            />
                          </CardBody>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </FormControl>
              </FormItem>
            )}></FormField>
        </form>
      </Form>
    </div>
  );
}
