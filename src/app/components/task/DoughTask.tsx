import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // นำเข้าปลั๊กอิน

// ลงทะเบียนคอมโพเนนต์ที่จำเป็น
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface Props {
  pendingTaskPersentage: number;
  completionTaskPersentage: number;
}

function DoughTask({ pendingTaskPersentage, completionTaskPersentage }: Props) {
  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Courses",
        data: [completionTaskPersentage, pendingTaskPersentage],
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
        formatter: (value: number) => `${Math.round(value)}%`, // เปลี่ยนการแสดงผลเป็นเปอร์เซ็นต์
      },
    },
  };

  return (
    <div className="w-full lg:h-52 xsm:h-48 flex flex-col items-center justify-center">
      <Doughnut data={data} options={options} className="w-full" />
    </div>
  );
}

export default DoughTask;
