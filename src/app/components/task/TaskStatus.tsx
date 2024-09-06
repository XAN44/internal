"use client";
import React, { useEffect, useState } from "react";
import CardDashBoard from "../../components/dashboard/CardDashBoard";
import TashCard from "./TashCard";
import TaskShowTask from "./TaskShowTask";
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

interface Props {
  initals: {
    id: string;
    title: string;
    isCompleted: boolean;
    skillType: string;
    assignedDate: string;
    dueDate: string;
    nameCourse: string;
  }[];
}

export default function Page({ initial, isLoading, initals }: Props) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <>
      <CardDashBoard>
        <TashCard initial={initial} isLoading={loading} />
      </CardDashBoard>
      <div className="divider pt-3" />
      <CardDashBoard>
        <TaskShowTask initals={initals} />
      </CardDashBoard>
    </>
  );
}
