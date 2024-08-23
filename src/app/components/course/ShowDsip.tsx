import React from "react";

interface Props {
  showDescription: boolean;
  toggleShowFull: () => void;
  description: string;
}

function ShowDsip({ showDescription, toggleShowFull, description }: Props) {
  return (
    <>
      {showDescription && (
        <div
          className="
                    fixed
                    z-50
                    inset-0
                    flex items-center 
                    justify-center
                    bg-opacity-85
                    bg-black
                    text-black
                    ">
          <div
            className="flex flex-col
          bg-white w-1/2 h-96
          xsm:w-64
          xssx:w-80
          sm:w-4/6
          p-6
          ">
            <div className="flex items-center justify-between ">
              <div className="text-xl">Description</div>
              <div
                className="cursor-pointer text-black"
                onClick={toggleShowFull}>
                x
              </div>
            </div>
            <div className="overflow-y-auto">
              <p
                className="
              font-serif 
              antialiased  
              text-justify
              mt-6 mb-6 sm:w-full
              indent-8">
                {description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShowDsip;
