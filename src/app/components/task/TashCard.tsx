import React from "react";
import DoughTask from "./DoughTask";
import ProgressAR from "../dashboard/ProgressReport/ProgressAR";
import ProgressTask from "./ProgressTask";

interface Props {
  initial: {
    pendingTask: number;
    pendingTaskPersentage: string;
    completedTask: number;
    completionTaskPersentage: string;
    hardSkillPercentage: number;
    softSkillPercentage: number;
  };
  isLoading: boolean;
}
function TashCard({ initial, isLoading }: Props) {
  const {
    completedTask,
    completionTaskPersentage,
    pendingTask,
    pendingTaskPersentage,
    softSkillPercentage,
    hardSkillPercentage,
  } = initial;
  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex flex-col gap-6">
          <div className="skeleton w-full">Loading...</div>
          <div className="skeleton w-full">Loading...</div>
          <div className="skeleton w-full">Loading...</div>
          <div className="skeleton w-full">Loading...</div>
          <div className="skeleton w-full">Loading...</div>
        </div>
      ) : (
        <div className="w-full h-full">
          <div
            className="
            w-full  
            grid 
            xsm:grid-cols-1 
            sm:grid-cols-3
            ">
            <div className="gap-2 grid grid-cols-2 place-items-center ">
              <p className="font-bold text-gray-500 text-sm w-full text-center">
                Pending Task
              </p>
              <div className=" w-full  bg-gradient-to-l from-yellow-700 to-yellow-500 p-[1px] rounded-xl">
                <div className="bg-white w-full text-center  p-[1px] rounded-xl">
                  {pendingTask}
                </div>
              </div>
              <p className="font-bold text-gray-500 text-sm w-full text-center">
                Completed Task
              </p>
              <div className=" w-full  bg-gradient-to-l from-green-700 to-green-500 p-[1px] rounded-xl">
                <div className="bg-white w-full  text-center p-[1px] rounded-xl">
                  {completedTask}
                </div>
              </div>
            </div>
            <div className="h-full">
              <DoughTask
                pendingTaskPersentage={pendingTask}
                completionTaskPersentage={completedTask}
              />
            </div>
            <div className="sm:h-full">
              <ProgressTask
                hardSkillPercent={hardSkillPercentage}
                softSkillPercent={softSkillPercentage}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TashCard;
