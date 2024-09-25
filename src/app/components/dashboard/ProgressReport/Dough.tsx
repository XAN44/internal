import React from "react";
import { Doughnut } from "react-chartjs-2";

interface Props {
  statusCompleted?: number;
  statusPending?: number;
  courseDistribution: { [category: string]: number };
}

function Dough({ courseDistribution, statusCompleted, statusPending }: Props) {
  // กราฟสำหรับสถานะการเรียน (Completed vs Pending)
  const completionData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Courses",
        data: [statusCompleted || 0, statusPending || 0],
        backgroundColor: ["#79c3ea", "#7b96d4"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const completionOptions = {
    plugins: {
      datalabels: {
        display: true,
        color: "white",
        font: {
          weight: "bold" as const,
          size: 16,
        },
        formatter: (value: number) => `${value}`,
      },
    },
  };

  const distributionData = {
    labels: Object.keys(courseDistribution),
    datasets: [
      {
        label: "Courses by Category",
        data: Object.values(courseDistribution),
        backgroundColor: Object.keys(courseDistribution).map(
          (_, index) =>
            `hsl(${
              (index * 360) / Object.keys(courseDistribution).length
            }, 70%, 50%)`
        ),
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const distributionOptions = {
    plugins: {
      datalabels: {
        display: true,
        color: "white",
        font: {
          weight: "bold" as const,
          size: 16,
        },
        formatter: (value: number) => `${value}`,
      },
    },
  };

  return (
    <>
      <div className="w-full p-8 lg:h-52 xsm:h-56 flex flex-col items-center justify-center">
        <Doughnut
          data={completionData}
          options={completionOptions}
          className="w-full"
        />
        <p className="pt-6 pb-6 font-semibold text-blue-500">
          COURSES COMPLETION OVERVIEW
        </p>
      </div>
      <div className="w-full p-8 lg:h-52 xsm:h-56 flex flex-col items-center justify-center">
        <Doughnut
          data={distributionData}
          options={distributionOptions}
          className="w-full"
        />
        <p className="pt-6 pb-6 font-semibold text-blue-500">
          ENROLLED COURSES DISTRIBUTION
        </p>
      </div>
    </>
  );
}

export default Dough;
