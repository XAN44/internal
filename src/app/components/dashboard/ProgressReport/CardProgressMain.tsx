import { Progress } from "@nextui-org/react";
import React from "react";
import ProgressAR from "./ProgressAR";
import ProgressSkelton from "./ProgressSkelton";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";
import Dough from "./Dough";
import Badge from "./Badge";

ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

interface Props {
  AllcourseProcess?: number;
  requireCoursePerCentage?: number;
  isLoading: boolean;
  statusCompleted?: number;
  statusPending?: number;
  courseDistribution: { [category: string]: number };
  badgeNew?: number;
  badgeFar?: number;
}

function CardProgressMain({
  badgeFar,
  badgeNew,
  AllcourseProcess,
  requireCoursePerCentage,
  isLoading,
  courseDistribution,
  statusCompleted,
  statusPending,
}: Props) {
  return (
    <>
      {isLoading ? (
        <ProgressSkelton />
      ) : (
        <div className="w-full h-full">
          <div className="flex w-full h-full flex-col">
            <p className="text-xl font-bold">ANNUAL PROGRESS REPORT</p>
            <div
              className="
              grid 
              lg:grid-cols-4
              xsm:grid-cols-1 
              gap-4
              items-center 
              place-content-center
              justify-center
              ">
              <div className=" sm:h-full  ">
                <ProgressAR
                  AllcourseProcess={AllcourseProcess}
                  requireCoursePerCentage={requireCoursePerCentage}
                />
              </div>
              <Dough
                courseDistribution={courseDistribution}
                statusCompleted={statusCompleted}
                statusPending={statusPending}
              />
              <Badge badgeFar={badgeFar} badgeNew={badgeNew} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CardProgressMain;
