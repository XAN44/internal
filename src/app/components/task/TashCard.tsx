import React from "react";
import DoughTask from "./DoughTask";
import ProgressAR from "../dashboard/ProgressReport/ProgressAR";
import ProgressTask from "./ProgressTask";

interface TaskProgress {
  category: string;
  completed: number;
  total: number;
  percentage: number;
}
interface Props {
  initial: {
    pendingTasks: number;
    completedTasks: number;
    progress: TaskProgress[];
  };
}
function TashCard({ initial }: Props) {
  const { pendingTasks, completedTasks, progress } = initial;
  return (
    <>
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
            <div className="    bg-gradient-to-l from-yellow-700 to-yellow-500 p-[1px] rounded-xl">
              <div className=" bg-white  text-center pr-[6px] pl-[6px] rounded-xl">
                {pendingTasks}
              </div>
            </div>
            <p className="font-bold text-gray-500 text-sm w-full text-center">
              Completed Task
            </p>
            <div className=" w-auto  bg-gradient-to-l from-green-700 to-green-500 p-[1px] rounded-xl">
              <div className="bg-white w-full   text-center  pr-[6px] pl-[6px] rounded-xl">
                {completedTasks}
              </div>
            </div>
          </div>
          <div className="h-full">
            <DoughTask
              pendingTaskPersentage={pendingTasks}
              completionTaskPersentage={completedTasks}
            />
          </div>
          <div className="sm:h-full">
            <ProgressTask progress={progress} />
          </div>
        </div>
      </div>
    </>
  );
}

export default TashCard;
