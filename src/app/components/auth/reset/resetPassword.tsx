import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import React from "react";
import EmailForReset from "./emailForReset";

export default function ResetPassword() {
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
            w-[500px] h-full rounded-2xl
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
                <p className="text-sm">
                  Please enter your email address. You will receive a link to
                  create a new password via email.
                </p>
              </CardHeader>
              <CardBody>
                <EmailForReset />
              </CardBody>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
