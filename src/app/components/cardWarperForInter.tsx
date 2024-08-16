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
      
      xsm:overflow-hidden
      lg:overflow-hidden 
      flex 
      lg:flex-row
      xsm:flex-col
 
   ">
      {/* Left Card */}
      <div
        className="
    flex 
    items-center 
    justify-center
 
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
      md:w-[1000px]
      xsm:-translate-y-[370px]
      
      sm:w-[1200px]
      sm:h-[910px]
      sm:-translate-y-[800px]
      

    
      lg:absolute
      lg:top-1/2
      lg:rounded-full
      lg:w-[2000px]
      lg:h-[2000px]
      lg:transform
      lg:-translate-y-1/2
      lg:-translate-x-[800px]
      xl:-translate-x-[700px]
      2xl:-translate-x-[700px]
      3xl:-translate-x-[600px]
      4xl:-translate-x-[600px]
      max:-translate-x-[600px]



    
      md:hidden
      
    
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
            smd:top-[300px]
            lg:top-1/2
            xsm:z-10 
            xsm:-translate-x-[150px] 
            sm:-translate-x-[300px]
            sm:translate-y-[500px]
            md:-translate-x-[150px]
            xsm:w-20 
            xsm:translate-y-[100px] 
         

            xsm:transform 
            xsm:brightness-0 xsm:invert xsm:filter

            md:hidden
            
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
          md:flex
          xsm:hidden
          md:w-24
          md:h-24 

    
          absolute 
          top-2 right-10
          "
        />
        <div
          className="
        absolute 
        xsm:top-[60px]
        xsx:top-[10px]
        xssx:top-[44px]
        xms:top-[0px]
        sm:-top-[10px]
        smd:top-[40px]
        mmd:top-[50px]
        lg:top-0
        
        w-full h-full flex flex-col ">
          {children}
        </div>
      </div>
    </div>
  );
}
