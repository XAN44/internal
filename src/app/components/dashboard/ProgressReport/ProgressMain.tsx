"use client";
import React, { useEffect, useMemo, useState } from "react";
import CardDashBoard from "../CardDashBoard";
import CardProgressMain from "./CardProgressMain";

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

function ProgressMain({
  AllcourseProcess,
  requireCoursePerCentage,
  isLoading,
  statusCompleted,
  statusPending,
  courseDistribution,
  badgeFar,
  badgeNew,
}: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  // ใช้ useMemo เพื่อจัดเตรียมข้อมูลที่ส่งไปยัง CardProgressMain
  const memoizedData = useMemo(
    () => ({
      courseDistribution,
      badgeFar,
      badgeNew,
      statusCompleted,
      statusPending,
      AllcourseProcess,
      requireCoursePerCentage,
    }),
    [
      courseDistribution,
      badgeFar,
      badgeNew,
      statusCompleted,
      statusPending,
      AllcourseProcess,
      requireCoursePerCentage,
    ]
  );

  return (
    <CardDashBoard>
      <CardProgressMain {...memoizedData} isLoading={loading} />
    </CardDashBoard>
  );
}

export default ProgressMain;
