import React from "react";
import SelectInterest from "./selectInterest";

function TitleInterest() {
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
        <SelectInterest />
      </div>
    </div>
  );
}

export default TitleInterest;
