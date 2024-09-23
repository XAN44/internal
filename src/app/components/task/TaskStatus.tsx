"use client";
import React, { useEffect, useState } from "react";
import CardDashBoard from "../../components/dashboard/CardDashBoard";
import TashCard from "./TashCard";
import TaskShowTask from "./TaskShowTask";

interface TaskProgress {
  category: string;
  completed: number;
  total: number;
  percentage: number;
}
interface Props {
  courseEnrolment: {
    id: string;
    title: string;
    enrolledAt: Date;
    duelDate: Date | null;
    isCompleted: boolean;
  }[];
  initial: {
    pendingTasks: number;
    completedTasks: number;
    progress: TaskProgress[];
  };
}

export default function Page({ initial, courseEnrolment }: Props) {
  return (
    <>
      <CardDashBoard>
        <TashCard initial={initial} />
      </CardDashBoard>
      <div className="divider pt-3" />
      <CardDashBoard>
        <TaskShowTask initals={courseEnrolment} />
      </CardDashBoard>
    </>
  );
}
