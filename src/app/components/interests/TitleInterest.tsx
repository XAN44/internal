"use client";
import React from "react";
import SelectInterest from "./selectInterest";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InterestSchema } from "../../lib/schema/interest/interestSchema";
import { zodResolver } from "@hookform/resolvers/zod";

function TitleInterest() {
  const form = useForm<z.infer<typeof InterestSchema>>({
    resolver: zodResolver(InterestSchema),
    defaultValues: {
      interest: [],
    },
  });
  return (
    <div className="w-full h-full  flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="text-start ">
          <p className="space-x-1 flex xsm:flex-col lg:flex-row">
            <span className="text-3xl">SELECT YOUR</span>
            <span className="text-blue-800 text-3xl">INTERESTS</span>
          </p>
          <p className=" text-blue-800/65">
            to Personalize Your Training Experience
          </p>
        </div>
      </div>
      <div
        className="
      xl:w-11/12
      lg:w-[750px]   
      lg:h-[600px] 
      ssm:h-[360px]
      sm:h-[460px]
      smd:h-[400px]
      xsm:w-[300px]
      ssm:w-[250px]
      sm:w-[350px]
      smd:w-[400px]
      mmd:w-[450px]
      slg:w-[550px]
      flex 
      items-center 
      justify-center 
      flex-col 
      overflow-y-auto 
      p-[2px]  bg-gradient-to-b from-purple-300 to-purple-300
      rounded-3xl
      ">
        <SelectInterest form={form} />
      </div>
      <Button type="submit">OK</Button>
    </div>
  );
}

export default TitleInterest;
