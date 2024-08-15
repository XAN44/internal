"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  headerImg: string;

  children: React.ReactNode;
}

export default function CardWrapper({ children, headerImg }: Props) {
  const path = usePathname();

  return (
    <div
      className=" 
       relative 
      w-screen h-screen 
      xsm:overflow-y-auto
      xsm:overflow-hidden
      lg:overflow-hidden 
      flex 
      lg:flex-row
      xsm:flex-col
   ">
      {/* Left Card */}
      <div
        className="
    flex items-center justify-center
    lg:flex-1
    lg:h-full
    lg:w-full
     ">
        <div
          className="
     
      relative
      xsm:absolute
      xsm:rounded-b-full
      xsm:top-0
      xsm:transform
      xsm:w-[660px]
      xsm:h-[450px]
      xsm:-translate-y-[270px]

      
      xms:w-[1000px]
      xms:h-[850px]
      xms:-translate-y-[690px]



      md:w-[1600px]
      md:h-[990px]
      md:-translate-y-[750px]
      
      sm:top-0
      sm:w-[1200px]
      sm:h-[910px]
      sm:-translate-y-[650px]

       

    
      lg:absolute
      lg:top-1/2
      lg:rounded-full
      lg:w-[2000px]
      lg:h-[2000px]
      lg:transform
      lg:-translate-y-1/2
      lg:-translate-x-[730px]
      xl:-translate-x-[700px]
      2xl:-translate-x-[700px]
      3xl:-translate-x-[600px]
      4xl:-translate-x-[600px]
      max:-translate-x-[600px]

    
      xsm:from-sky-500  xsm:to-purple-500

      xsm:bg-gradient-to-r
      lg:bg-gradient-to-t

     
        ">
          <Image
            src="/vannessLogo.png"
            alt="Vannes Plus"
            quality={100}
            width={100}
            height={100}
            className="
            object-contain
            lg:top-1/2
            xsm:absolute
            xsm:right-16
            xs:right-0
            xsm:z-10 
            xsm:w-20
            xsm:translate-y-[100px] 
            xsm:transform xsm:brightness-0 xsm:invert xsm:filter
            xsm:top-[190px] 
            xsm:-translate-x-[170px] 

            xms:top-[600px] 
            xms:z-10 
            xms:-translate-x-[240px] 
            

             lg:hidden
            sm:right-36
            sm:top-[600px]
            sm:-translate-x-[150px]

            md:right-[300px]
            md:top-[700px]
            md:-translate-x-[150px]
          
          "
          />
          <Image
            src={headerImg}
            alt="Vannes Plus"
            width={1075}
            height={400}
            quality={100}
            className="
            object-contain
              xsm:absolute 
              xsm:left-0 xsm:right-0 
              xsm:top-[360px] 
              xsm:z-50 xsm:mx-auto 
              xsm:flex 
              xsm:h-72  
             

              xsm:-translate-y-[90px] 
              xsm:transform

              xms:translate-y-[300px]
              
              sm:translate-y-[410px]
              md:translate-y-[390px]
              lg:absolute
              xsm:w-[300px]
              xms:w-[350px]
              md:w-[400px]
              md:h-[400px]
              lg:w-[500px]
              lg:h-[500px]
              xl:w-[500px]
              xl:h-[500px]
              2xl:w-[600px]
              2xl:h-[600px]
              3xl:w-[700px]
              3xl:h-[700px]
              4xl:w-[800px]
              4xl:h-[800px]

              lg:top-1/2
              lg:transform
              lg:translate-x-[730px]
              xl:translate-x-[700px]
              2xl:translate-x-[680px]
              3xl:translate-x-[600px]
              4xl:translate-x-[580px]
              
              lg:-translate-y-1/2
              animate-myAnimation
           "
          />
        </div>
      </div>
      {/* Right Card */}
      <div
        className="
        flex-1
        flex
        w-full h-full mx-auto
        lg:items-center
        lg:justify-center
        lg:mx-auto
        xsm:items-start
        xsm:justify-center
        xsm:mx-auto
        xsm:mt-96

        lg:mt-0
  
        z-50
         ">
        <Image
          src="/vannessLogo.png"
          alt="Vannes Plus"
          quality={100}
          width={1075}
          height={1000}
          className="
          object-contain
          lg:flex
          xsm:hidden
          lg:w-36 
          lg:h-36 
          xl:w-20
          xl:h-20
          absolute 
          top-2 right-10
          "
        />
        <div
          className="
        flex 
        flex-col 
        items-center 
        justify-center 
        font-bold 
        xsm:absolute
        xsm:top-[250px]
        md:top-[400px]
        xl:static
        xl:top-auto
        ">
          {path === "/auth/sign-in" ? (
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-col text-start  ">
                <p className="text-4xl">WELCOME TO</p>
                <p className="text-3xl text-blue-800">Training Sessions</p>
                <p className="text-blue-800/65">
                  Have you boosted your skills today?
                </p>
              </div>
              <Image
                src="/bubld.jpg"
                alt=""
                priority
                width={100}
                height={100}
                className="xsm:hidden lg:flex w-20 h-20 object-cover"
              />
            </div>
          ) : null}

          {path === "/auth/sign-up" ? (
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-col text-start  ">
                <p className="text-3xl">
                  <span className="text-blue-800">SIGN UP </span>
                  <span>TO BEGIN</span>
                </p>
                <p className="text-2xl text-black">Your Training Journey</p>
                <p className="text-blue-800/65">
                  Do you want to create an account?
                </p>
              </div>
              <Image
                src="/bubld.jpg"
                alt=""
                priority
                width={100}
                height={100}
                className="xsm:hidden lg:flex w-20 h-20 object-cover"
              />
            </div>
          ) : null}
          {path === "/aboutYourself" ? (
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-col text-center  ">
                <p className="text-3xl">ALMOST FINISH!</p>
                <p className="text-2xl">Tell us more about yourself</p>
              </div>
            </div>
          ) : null}
          <div className="flex flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
}
