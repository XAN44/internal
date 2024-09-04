"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useTransition } from "react";
import { ResetPasswordSchema } from "../../../lib/schema/auth/zodAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import NewPasswordForm from "./newPasswordForm";

function NewPassword() {
  return (
    <div
      className="
    w-screen
    h-screen
    inset-0
    flex
    items-center justify-center
    bg-black
    backdrop-blur
    bg-opacity-50
    ">
      <div className=" fixed hero min-h-screen ">
        <div className="hero-content text-center">
          <Card
            className="
          
            bg-gradient-to-l
            from-emerald-600/30
            to-purple-400/60
           h-full rounded-2xl
            p-[3.5px]
        ">
            <div
              className="     
            bg-gradient-to-l
            from-indigo-500/50 
            to-blue-400
          rounded-[calc(1rem-1px)] 
">
              <CardHeader
                className="
            flex
            flex-col
            items-center   
            ">
                <Image
                  src="/vannessLogo.png"
                  className="
              w-60 h-60
              object-contain 
              brightness-100 invert-0 filter "
                  alt="logoVanness"
                  width={100}
                  height={100}
                />
                <h1
                  className="
              text-3xl 
              font-bold 
              text-blue-800">
                  Reset Your Password
                </h1>
                <p className="text-sm">Enter your new password</p>
              </CardHeader>
              <CardBody>
                <NewPasswordForm />
              </CardBody>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
