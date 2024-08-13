import Image from "next/image";
import React from "react";
interface Props {
  children: React.ReactNode;
}

export default function CardWarperForInter({ children }: Props) {
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
 
     ">
        <div
          className="
     
      relative
      xsm:absolute
      xsm:rounded-b-full
      xsm:top-0
      xsm:transform
      xsm:w-[760px]
      xsm:h-[500px]
      smd:w-[860px]
      smd:h-[600px]
      mmd:w-[950px]
      mmd:h-[900px]
      mlg:w-[1000px]
      mlg:h-[950px]
      xsm:-translate-y-[370px]
      smd:-translate-y-[360px]
      mmd:-translate-y-[650px]
      mlg:-translate-y-[700px]



    
      lg:hidden
      
    
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
            xsm:absolute
            xsm:right-16
            xsm:top-[300px] 
            smd:top-[280px]
            lg:top-1/2
            xsm:z-10 
            xsm:-translate-x-[240px] 
            sm:-translate-x-[150px]
            md:-translate-x-[150px]
            smd:-translate-x-[180px]
            mmd:-translate-x-[180px]
            slg:-translate-x-[140px]
            xsm:w-20
            mmd:w-24 mmd:h-24
            ssm:-translate-x-[220px]
            xsm:translate-y-[100px] 
            mmd:translate-y-[400px] 
            mlg:translate-y-[450px] 


          xsm:transform xsm:brightness-0 xsm:invert xsm:filter

          lg:hidden
          
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
          absolute 
          top-2 right-10
          "
        />
        <div className="flex flex-col">{children}</div>
      </div>
    </div>
  );
}
