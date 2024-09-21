"use client";

import React, { useEffect, useMemo, useState } from "react";
import InterestCard from "./InterestCard";
import CardDashBoard from "../CardDashBoard";
interface UserProps {
  interest: { name: string }[];

  isLoading: boolean;
}
function UserInterests({ interest, isLoading }: UserProps) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const initialsData = useMemo(() => {
    return interest; // หรืออาจจะใช้ spread operator ถ้าต้องการ
  }, [interest]);

  return (
    <CardDashBoard>
      <InterestCard interest={initialsData} isLoading={loading} />
    </CardDashBoard>
  );
}

export default UserInterests;
