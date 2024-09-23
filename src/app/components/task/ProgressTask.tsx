import { Progress } from "@nextui-org/react";
import React from "react";

interface TaskProgress {
  category: string;
  completed: number;
  total: number;
  percentage: number;
}

interface Props {
  progress: TaskProgress[];
}

const generateGradient = (index: number, totalCategories: number) => {
  const hueStart = (index * 360) / totalCategories; // เริ่มต้นเฉดสี
  const hueEnd = ((index + 1) * 360) / totalCategories; // สิ้นสุดเฉดสี
  return `bg-gradient-to-r from-[hsl(${hueStart}, 70%, 50%)] to-[hsl(${hueEnd}, 70%, 50%)]`;
};

function ProgressTask({ progress }: Props) {
  return (
    <div className="flex flex-col items-center justify-evenly w-full h-full">
      {progress.map((progressItem, index) => (
        <Progress
          key={progressItem.category}
          classNames={{
            track: "drop-shadow-md border border-default",
            indicator: generateGradient(index, progress.length),
            label: "tracking-wider font-medium text-default-600",
            value: "text-foreground/60",
          }}
          defaultValue={progressItem.percentage}
          value={progressItem.percentage}
          minValue={0}
          maxValue={100}
          showValueLabel={true}
          label={progressItem.category}
          size="md"
          radius="sm"
          className="w-full"
        />
      ))}
    </div>
  );
}

export default ProgressTask;
