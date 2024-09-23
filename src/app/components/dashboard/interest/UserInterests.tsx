"use client";

import React, { useEffect, useMemo, useState } from "react";
import InterestCard from "./InterestCard";
import CardDashBoard from "../CardDashBoard";
interface UserProps {
  interest: { name: string }[];
}
function UserInterests({ interest }: UserProps) {
  const initialsData = useMemo(() => {
    return interest; // หรืออาจจะใช้ spread operator ถ้าต้องการ
  }, [interest]);

  return (
    <CardDashBoard>
      <InterestCard interest={initialsData} />
    </CardDashBoard>
  );
}

export default UserInterests;
