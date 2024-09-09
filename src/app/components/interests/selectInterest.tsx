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
import { InterestSchema } from "../../lib/schema/interest/interestSchema";
import { list } from "../../lib/modal/interest";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
interface SelectInterestProps {
  form: ReturnType<typeof useForm<z.infer<typeof InterestSchema>>>;
  onSubmit: (data: z.infer<typeof InterestSchema>) => void;
  initials: {
    name: string;
    id: string;
    description: string;
  }[];
}

export default function SelectInterest({
  form,
  onSubmit,
  initials,
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
    bg-white  
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
                    {initials.map((item, index) => (
                      <motion.div key={index} variants={items}>
                        <Card
                          shadow="sm"
                          onPress={() => console.log("item pressed")}
                          className="
                          h-32
                          smd:h-44
                          lg:h-44  
                          bg-gradient-to-br 
                        from-blue-500 
                        to-blue-700">
                          <CardBody
                            className="
                            w-full 
                            h-full 
                            items-start 
                            justify-center 
                            overflow-visible 
                            p-4
                            
                            ">
                            <div className="flex flex-col text-white">
                              <p
                                className="
                              slg:text-2xl
                              xl:text-3xl
                              font-bold text-xl ">
                                {item.name}
                              </p>
                              <p className="text-xs">{item.description}</p>
                            </div>
                            <Checkbox
                              isSelected={field.value.includes(item.name)}
                              onChange={(e) => {
                                // TODO ใช้สำหรับเช็คค่าที่ถูกเลือกหรือยกเลิก
                                const newValue = e.target.checked
                                  ? [...field.value, item.name]
                                  : field.value.filter(
                                      (val) => val !== item.name
                                    );
                                field.onChange(newValue);
                              }}
                              isRequired={true}
                              size="lg"
                              color="success"
                              radius="full"
                              className="absolute ssm:top-[20px] ssm:right-[15px] top-[38px] right-[20px]"
                              classNames={{ wrapper: "bg-white" }}
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
