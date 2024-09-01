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

interface SelectInterestProps {
  form: ReturnType<typeof useForm<z.infer<typeof InterestSchema>>>;
  onSubmit: (data: z.infer<typeof InterestSchema>) => void;
  bookMarkedCourses: Array<{
    id: string;
    title: string;
    duration: number;
    isCompleted: boolean;
    isBookMark: boolean;
    isRequired: boolean;
  }>;
}

export default function BookMarkInCard({
  form,
  onSubmit,
  bookMarkedCourses,
}: SelectInterestProps) {
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

  const items = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div
      className="
    rounded-[calc(1.5rem-1px)] 
    w-full h-full 
    overflow-y-auto  
    space-x-6 items-start justify-center p-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
                    className="   
                        grid 
                        p-4
                        xsm:grid-cols-1
                        md:grid-cols-2
                        lg:grid-cols-4 
                        2xl:grid-cols-3
                        gap-5  ">
                    {bookMarkedCourses.map((course) => (
                      <motion.div
                        key={course.id}
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
                                {course.title}
                              </p>
                              <p className="text-xs">
                                {`${
                                  course.isRequired
                                    ? "Recommended"
                                    : "Unrecommended"
                                } `}
                              </p>
                              <p className="text-xs">{`Duration: ${course.duration} hours`}</p>

                              {course.isBookMark && (
                                <p className="text-xs text-yellow-400">
                                  Bookmarked
                                </p>
                              )}
                            </div>
                            <Checkbox
                              isRequired={true}
                              isSelected={course.isBookMark}
                              size="lg"
                              color="success"
                              radius="full"
                              className="sm:absolute sm:top-2 sm:right-[20px]"
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
