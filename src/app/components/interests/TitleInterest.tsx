"use client";
import React, { useCallback, useEffect, useTransition } from "react";
import SelectInterest from "./selectInterest";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InterestSchema } from "../../lib/schema/interest/interestSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TEST3 } from "../../../../server/test";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Spinner } from "@nextui-org/react";
import clsx from "clsx";
import { Category } from "@prisma/client";
import axios from "axios";
import { useConfettiStore } from "../../../../hooks/use-confitti-store";

interface categories {
  categories: {
    id: string;
    name: string;
    description: string;
  }[];
}

function TitleInterest({ categories }: categories) {
  const confetti = useConfettiStore();
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
    startTransition(async () => {
      try {
        await axios.post("/api/auth/interest", { interests: value.interest });
        toast.success("Select success");
        router.push("/home");
        confetti.onOpen();
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <div className="w-full h-full  flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center mb-6 mt-6">
        <div className="text-start ">
          <p className="space-x-1 flex xsm:flex-col lg:flex-row">
            <span className="text-3xl xsm:text-2xl">SELECT YOUR</span>
            <span className="text-blue-800 text-3xl xsm:text-2xl">
              INTERESTS
            </span>
          </p>
          <p className=" text-blue-800/65">
            to Personalize Your Training Experience
          </p>
        </div>
      </div>

      <div
        className="
    
      xl:w-11/12
      
    

      xssx:w-[380px]
      xssx:h-[360px]

      xsm:transform
      xsm:translate-y-0
 
      xsm:w-[200px]
      xsm:h-[400px]
     
      
      xs:w-[300px]
      xs:h-[300px]

      xms:w-[500px]
      xms:h-[300px]

      sm:w-[600px]
      sm:h-[400px]
      

      md:w-[800px]
      md:h-[500px]

      2xl:w-[1000px]
      2xl:h-[800px]

      4xl:w-[1500px]
      4xl:h-[800px]

      flex 
      items-center 
      justify-center 
      flex-col 
      overflow-y-auto 
      p-[2px]  bg-gradient-to-b from-purple-300 to-purple-300
      rounded-3xl
      ">
        <SelectInterest initials={categories} form={form} onSubmit={onSubmit} />
      </div>

      {isPending ? (
        <Spinner />
      ) : (
        <Button
          type="submit"
          disabled={isPending || !isValid || !isDirty}
          className={clsx(
            `
              text-black
              rounded-2xl
              mt-2
              w-40
              md:h-[50px]
              xssx:h-[40px]
              xms:h-10
              xl:h-16
              2xl:h-[73px]
              4xl:h-[56px]
            `,
            isDirty ? "bg-yellow-300/90" : "bg-gray-400"
          )}
          onClick={() => form.handleSubmit(onSubmit)()}>
          {isDirty ? <>Completed</> : <>Pless Select</>}
        </Button>
      )}
    </div>
  );
}

export default TitleInterest;
