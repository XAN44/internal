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

interface SelectInterestProps {
  form: ReturnType<typeof useForm<z.infer<typeof InterestSchema>>>;
  onSubmit: (data: z.infer<typeof InterestSchema>) => void;
}

export default function SelectInterest({
  form,
  onSubmit,
}: SelectInterestProps) {
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
                  <div
                    className="   
                        grid 
                        p-4
                        ssm:grid-cols-1
                        smd:grid-cols-2
                        lg:grid-cols-4 
                        xsm:grid-cols-2 
                        gap-5  ">
                    {list.map((item, index) => (
                      <Card
                        shadow="sm"
                        key={index}
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
                              {item.title}
                            </p>
                            <p className="text-xs">{item.description}</p>
                          </div>
                          <Checkbox
                            isSelected={field.value.includes(item.title)}
                            onChange={(e) => {
                              // TODO ใช้สำหรับเช็คค่าที่ถูกเลือกหรือยกเลิก
                              const newValue = e.target.checked
                                ? [...field.value, item.title]
                                : field.value.filter(
                                    (val) => val !== item.title
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
                    ))}
                  </div>
                </FormControl>
              </FormItem>
            )}></FormField>
        </form>
      </Form>
    </div>
  );
}
