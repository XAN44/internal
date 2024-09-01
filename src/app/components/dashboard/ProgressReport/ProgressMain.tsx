"use client";
import React, { useEffect, useState } from "react";
import CardDashBoard from "../CardDashBoard";
import CardProgressMain from "./CardProgressMain";

interface Props {
  AllcourseProcess: number;
  requireCoursePerCentage: number;
  isLoading: boolean;
  statusCompleted: number;
  statusPending: number;
  HardSkill: number;
  SoftSkill: number;
  badgeNew: number;
  badgeFar: number;
}

function ProgressMain({
  AllcourseProcess,
  requireCoursePerCentage,
  isLoading,
  statusCompleted,
  statusPending,
  HardSkill,
  SoftSkill,
  badgeFar,
  badgeNew,
}: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <CardDashBoard>
      <CardProgressMain
        badgeFar={badgeFar}
        badgeNew={badgeNew}
        HardSkill={HardSkill}
        SoftSkill={SoftSkill}
        statusCompleted={statusCompleted}
        statusPending={statusPending}
        isLoading={loading}
        AllcourseProcess={AllcourseProcess}
        requireCoursePerCentage={requireCoursePerCentage}
      />
    </CardDashBoard>
  );
}

export default ProgressMain;
