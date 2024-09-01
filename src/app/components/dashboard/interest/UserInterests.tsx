"use client";

import React, { useEffect, useState } from "react";
import InterestCard from "./InterestCard";
import CardDashBoard from "../CardDashBoard";
interface UserProps {
  interest: {
    useInterest: string[];
  };
  isLoading: boolean;
}
function UserInterests({ interest, isLoading }: UserProps) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <CardDashBoard>
      <InterestCard interest={interest} isLoading={loading} />
    </CardDashBoard>
  );
}

export default UserInterests;
