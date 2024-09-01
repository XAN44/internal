import React from "react";
import { Doughnut } from "react-chartjs-2";

interface Props {
  statusCompleted: number;
  statusPending: number;
  HardSkill: number;
  SoftSkill: number;
}

function Dough({
  HardSkill,
  SoftSkill,
  statusCompleted,
  statusPending,
}: Props) {
  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Courses",
        data: [statusCompleted, statusPending],
        backgroundColor: ["#79c3ea", "#7b96d4"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
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

  const data1 = {
    labels: ["Hard Skill", "Soft Skill"],
    datasets: [
      {
        label: "Courses",
        data: [HardSkill, SoftSkill],
        backgroundColor: ["#FF914D", "#FEBE00"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options1 = {
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
        <Doughnut data={data} options={options} className="w-full" />
        <p className="pt-6 pb-6 font-semibold text-blue-500">
          COURSES LEFT TO COMPLETE
        </p>
      </div>
      <div className="w-full p-8 lg:h-52 xsm:h-56 flex flex-col items-center justify-center">
        <Doughnut data={data1} options={options1} className="w-full" />
        <p className="pt-6 pb-6 font-semibold text-blue-500">
          HOURS LEFT TO COMPLETE
        </p>
      </div>
    </>
  );
}

export default Dough;
